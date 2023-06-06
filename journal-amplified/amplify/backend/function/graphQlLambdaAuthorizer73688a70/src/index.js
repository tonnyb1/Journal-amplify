

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: "us-east-1" }); // Create SES service object
const dynamoDBClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  console.log('reached here 1',event)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1); // get date 24 hours ago
  
  const params = {
    TableName: 'Journal-orqzzs3sivgzfbq6t2n3pdzxtm-dev',
    Key: {
      userJournalsId: 'df9aef2b-37cb-46b4-ba60-5c3c60b264ce'
    }
  };
  console.log('reached here 2')

  async function sendJournalEntry(recipientEmail, subject, message) {
    const AWS = require('aws-sdk');
    AWS.config.update({ region: 'us-west-2' }); // replace with your preferred AWS region
  
    const ses = new AWS.SES();
  
    try {
      await ses.sendEmail({
        Source: 'betttonny966@gmail.com',
        Destination: {
          ToAddresses: [recipientEmail]
        },
        Message: {
          Subject: { Data: subject },
          Body: { Text: { Data: message } }
        }
      }).promise();
    
      console.log(`Sent email to user ${recipientEmail} with subject "${subject}"`);
    } catch (err) {
      console.error('Failed to send email:', err);
    }
  }

  try {
      
    // Query DynamoDB for journal entries in the past 24 hours
    let entries;

    try {
      const data = await dynamoDBClient.scan(params).promise();

      entries= data.Items;

    } catch (err) {
      console.log('err1', err);
    }
    
    // Get list of users who posted an entry in the past 24 hours
    let users = entries.reduce((result, entry) => {
      if (!result.includes(entry.userJournalsId)) {
        result.push(entry.userJournalsId);
      }
      return result;
    }, []);

    console.log('reached here 3', users)
    
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
        UserPoolId: 'us-east-1_OpEmXTxRY', // Replace with your User Pool ID
        Username: recipientSub
      }).promise();

      console.log('reached here 4', recipientUser)
      
      const recipientEmail = recipientUser.UserAttributes.find(attr => attr.Name === 'email').Value;

      console.log('reached here 5', recipientEmail)
      
      const message = `Hello,\n\nHere's a journal entry submitted by another user:\n\nTitle: ${randomEntry.title}\nContent: ${randomEntry.content}`;

      console.log('reached here 6', message)
    }

    sendJournalEntry(recipientEmail, 'Your Daily Journal Entry', message);
    
    return 'Successfully sent emails';
    
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred');
  }
};
