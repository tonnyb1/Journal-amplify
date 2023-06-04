

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const aws = require('aws-sdk');
const event = require('./event.json');
const ses = new aws.SES(); // Create SES service object
const dynamoDBClient = new aws.DynamoDB.DocumentClient();
const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();


exports.handler = async (event) => {
  console.log('reached here 1')
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1); // get date 24 hours ago
  
  console.log('reached here 1')
  const params = {
    TableName: 'journal',
    ExpressionAttributeValues: {
      ':start_date': yesterday.toISOString(),
      ':end_date': today.toISOString()
    },
    FilterExpression: 'createdAt between :start_date and :end_date'
  };
  console.log('reached here 2')
  try {
      
    // Query DynamoDB for journal entries in the past 24 hours
    const data = await dynamoDBClient.scan(params).promise();
    const entries = data.Items;
    
    // Get list of users who posted an entry in the past 24 hours
    let users = entries.reduce((result, entry) => {
      if (!result.includes(entry.userJournalsId)) {
        result.push(entry.userJournalsId);
      }
      return result;
    }, []);
    
    // Shuffle the array of user IDs to randomize the order
    for (let i = users.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [users[i], users[j]] = [users[j], users[i]];
    }
    
    // For each user who posted an entry, send them an email containing a journal entry submitted by another user
    for (let i = 0; i < users.length; i++) {
      
      const recipientSub = users[i];
      const matchingEntries = entries.filter(entry => entry.userJournalsId !== recipientSub);
      const randomEntry = matchingEntries[Math.floor(Math.random() * matchingEntries.length)];
      
      if (!randomEntry) {
        console.log(`No entry found for user ${recipientSub} in the past 24 hours`);
        continue;
      }
      
      // Retrieve user email from User Pool using sub value
      const recipientUser = await cognitoIdentityServiceProvider.adminGetUser({
        UserPoolId: 'us-east-1_boIhlFLhG', // Replace with your User Pool ID
        Username: recipientSub
      }).promise();
      
      const recipientEmail = recipientUser.UserAttributes.find(attr => attr.Name === 'email').Value;
      
      const message = `Hello,\n\nHere's a journal entry submitted by another user:\n\nTitle: ${randomEntry.title}\nContent: ${randomEntry.content}`;
      
      await ses.sendEmail({
        Source: 'sender@example.com',
        Destination: {
          ToAddresses: [recipientEmail]
        },
        Message: {
          Subject: { Data: 'Daily Journal Entry' },
          Body: { Text: { Data: message } }
        }
      }).promise();
      
      console.log(`Sent email containing journal entry from user ${randomEntry.userJournalsId} to user ${recipientEmail}`);
    }
    
    return 'Successfully sent emails';
    
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred');
  }
};
