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
        url
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
