import { CircularProgress, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_ARTICLE } from '../../utils/queries';
import Auth from '../../utils/auth';
import ViewOthersItem from './ViewOthersItem';
import ViewOwnItem from './ViewOwnItem';
import { useQuery } from '@apollo/client';

const ViewItem = () => {
  const { articleId } = useParams();
  const { loading, data, error } = useQuery(GET_ARTICLE, { variables: { articleId } });
  
  const article = data?.article || {};

  if (loading) {
    return (
      <VStack>
        <Heading>View Item</Heading>
        <CircularProgress isIndeterminate size={72}/>
      </VStack>
    )
  }
  
  if (!Auth.loggedIn() || Auth.getProfile().data._id !== article.owner._id) {
    return <ViewOthersItem article={article} />
  }
  return <ViewOwnItem article={article} />

}

export default ViewItem;