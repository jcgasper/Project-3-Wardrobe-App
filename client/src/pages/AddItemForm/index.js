import React, { useEffect } from "react";
import {
  VStack,
  Heading,
  Button
} from "@chakra-ui/react";
import { useState } from "react";
import Auth from '../../utils/auth';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_ARTICLE } from '../../utils/mutations';
import CategoryControl from './CategoryControl';
import DescriptionControl from './DescriptionControl';
import TagForm from './TagForm';
import ImageUploadControls from './ImageUploadControls';


const AddItemForm = () => {
  const [formState, setFormState] = useState({ description: "", category: "Top", tags: [] });
  const [submitArticle, { loading: submittedArticleLoading }] = useMutation(ADD_ARTICLE, {onCompleted: () => {return <Redirect to="/" />}});
  
  // TODO fix authentication
  if (!Auth.loggedIn()) {
    // return <Redirect to="/" />;
  }
  const { _id: userId } = {_id: null} //Auth.getProfile();

  const handleSubmit = (event) => {
    event.preventDefault();
    // toast({
    //   title: "Form checked",
    //   description: JSON.stringify(formState),
    //   status: "success",
    //   duration: 4000,
    //   isClosable: true
    // });

    submitArticle({
      variables: {
        userId,
        ...formState
      }
    });
  };

  return (
    <VStack padding={4} spacing={6} align="stretch" mb={10}>
      <Heading>Add Item to Your Wardrobe</Heading>
      
      <CategoryControl setFormState={setFormState} formState={formState} />

      <ImageUploadControls userId={userId} />

      <DescriptionControl setFormState={setFormState} formState={formState} />

      <TagForm formState={formState} setFormState={setFormState} />
      
      <Button my={8} onClick={handleSubmit} isLoading={submittedArticleLoading}>
        Register New Item
      </Button>
    </VStack>
  );
};

export default AddItemForm;
