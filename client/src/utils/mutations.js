import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: NewBook!) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        title
        image
        link
      }
    }
  }
`;

export const ADD_TEMP_IMAGE = gql`
  mutation addTempImage($userId: ID!, $filename: String!) {
    addTempImage(userId: $userId, filename: $filename) {
      _id: ID
      email: String
      displayname: String
      password: String
      tempImageFile: String
    }
  }
`;

export const REMOVE_TEMP_IMAGE = gql`
  mutation removeTempImage($userId: ID!) {
    removeTempImage(userId: $userId) {
      _id: ID
      email: String
      displayname: String
      password: String
      tempImageFile: String
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation addArticle($userId: ID!, $category: String, $description: String, $tags: [String]) {
    addArticle(userId: $userId, category: $category, description: $description, tags: $tags) {
      _id
      category
      description
      tags
      url
    }
  }
`;