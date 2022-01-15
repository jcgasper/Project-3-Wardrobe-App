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

export const ADD_TEMP_IMAGE = gql`
  mutation addTempImage($filename: String!) {
    addTempImage(filename: $filename) {
      _id: ID
      email: String
      displayname: String
      password: String
      tempImageFile: String
    }
  }
`;

export const REMOVE_TEMP_IMAGE = gql`
  mutation removeTempImage {
    removeTempImage {
      _id: ID
      email: String
      displayname: String
      password: String
      tempImageFile: String
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation addArticle($category: String, $description: String, $tags: [String]) {
    addArticle(category: $category, description: $description, tags: $tags) {
      _id
      category
      description
      tags
      url
    }
  }
`;