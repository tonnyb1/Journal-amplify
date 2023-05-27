/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      Journals {
        items {
          id
          title
          content
          createdAt
          updatedAt
          userJournalsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      Journals {
        items {
          id
          title
          content
          createdAt
          updatedAt
          userJournalsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      Journals {
        items {
          id
          title
          content
          createdAt
          updatedAt
          userJournalsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createJournal = /* GraphQL */ `
  mutation CreateJournal(
    $input: CreateJournalInput!
    $condition: ModelJournalConditionInput
  ) {
    createJournal(input: $input, condition: $condition) {
      id
      title
      content
      user {
        id
        name
        email
        Journals {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          journalCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      userJournalsId
    }
  }
`;
export const updateJournal = /* GraphQL */ `
  mutation UpdateJournal(
    $input: UpdateJournalInput!
    $condition: ModelJournalConditionInput
  ) {
    updateJournal(input: $input, condition: $condition) {
      id
      title
      content
      user {
        id
        name
        email
        Journals {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          journalCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      userJournalsId
    }
  }
`;
export const deleteJournal = /* GraphQL */ `
  mutation DeleteJournal(
    $input: DeleteJournalInput!
    $condition: ModelJournalConditionInput
  ) {
    deleteJournal(input: $input, condition: $condition) {
      id
      title
      content
      user {
        id
        name
        email
        Journals {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          journalCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      userJournalsId
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      Journal {
        id
        title
        content
        user {
          id
          name
          email
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        userJournalsId
      }
      content
      createdAt
      updatedAt
      journalCommentsId
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      Journal {
        id
        title
        content
        user {
          id
          name
          email
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        userJournalsId
      }
      content
      createdAt
      updatedAt
      journalCommentsId
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      Journal {
        id
        title
        content
        user {
          id
          name
          email
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        userJournalsId
      }
      content
      createdAt
      updatedAt
      journalCommentsId
    }
  }
`;
