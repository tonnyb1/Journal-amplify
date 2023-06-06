/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
        owner
      }
      content
      createdAt
      updatedAt
      journalCommentsId
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
        owner
      }
      content
      createdAt
      updatedAt
      journalCommentsId
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
        owner
      }
      content
      createdAt
      updatedAt
      journalCommentsId
    }
  }
`;
export const onCreateJournal = /* GraphQL */ `
  subscription OnCreateJournal(
    $filter: ModelSubscriptionJournalFilterInput
    $owner: String
  ) {
    onCreateJournal(filter: $filter, owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdateJournal = /* GraphQL */ `
  subscription OnUpdateJournal(
    $filter: ModelSubscriptionJournalFilterInput
    $owner: String
  ) {
    onUpdateJournal(filter: $filter, owner: $owner) {
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
      owner
    }
  }
`;
export const onDeleteJournal = /* GraphQL */ `
  subscription OnDeleteJournal(
    $filter: ModelSubscriptionJournalFilterInput
    $owner: String
  ) {
    onDeleteJournal(filter: $filter, owner: $owner) {
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
      owner
    }
  }
`;
