import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      email
      displayname
      tempImageFile
      clothing {
        _id
        category
        description
        tags
        imageFile
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query article($articleId: ID!) {
    article(articleId: $articleId) {
      _id
      category
      description
      tags
      imageFile
      owner {
        _id
        displayname
      }
    }
  }
`;

export const GET_TEMP_IMAGE_FILE = gql`
  query getTempImageFile {
    me {
      tempImageFile
    }
  }
`;
