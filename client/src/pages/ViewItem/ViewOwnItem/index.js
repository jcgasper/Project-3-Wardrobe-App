import React from "react";
import { VStack, Heading, Button, useToast, HStack } from "@chakra-ui/react";
import { useState } from "react";
import Auth from '../../../utils/auth';
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import CategoryControl from './CategoryControl';
import DescriptionControl from './DescriptionControl';
import TagForm from './TagForm';
import ImageUploadControls from './ImageUploadControls';
import { UPDATE_ARTICLE } from '../../../utils/mutations';


const ViewOwnItem = ({article}) => {
  const initialFormState = {
    description: article.description,
    category: article.category,
    tags: [...article.tags],
    imageAction: 'none',
  }
  const [formState, setFormState] = useState(initialFormState);
  const [submitArticle, { loading, called }] = useMutation(UPDATE_ARTICLE, { onCompleted: () => { window.location.assign('/profile'); } });
  const toast = useToast();

  if (!Auth.loggedIn()) {
    return <Redirect to="/" />;
  }

  // if (called && !loading) {
  //   return <Redirect to="/profile" />;
  // }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(
          (article.imageFile && (!formState.discardImage))
          || formState.imageAction !== 'none' 
          || formState.description.trim()
        )
      )
    {
      toast({
        title: 'Cannot Update Item',
        description: "Your item must have an image or a description.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    submitArticle({
      variables: {
        category: formState.category,
        description: formState.description,
        tags: formState.tags
      }
    });
  };

  return (
    <VStack padding={4} spacing={6} align="stretch" mb={10}>
      <Heading>Add Item to Your Wardrobe</Heading>

      <CategoryControl setFormState={setFormState} formState={formState} />

      <ImageUploadControls setFormState={setFormState} formState={formState} />

      <DescriptionControl setFormState={setFormState} formState={formState} />

      <TagForm formState={formState} setFormState={setFormState} />

      <HStack spacing={4}>
        <Button my={8} onClick={handleSubmit} isLoading={loading}>
          Update Item
        </Button>
        <Button as={Link} to="/profile">Go Back without Updating</Button>
      </HStack>

    </VStack>
  );
};

export default ViewOwnItem;
