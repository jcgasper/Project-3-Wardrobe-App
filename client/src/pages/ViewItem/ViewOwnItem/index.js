import React from "react";
import { VStack, Heading, Button, useToast, Flex, Divider } from "@chakra-ui/react";
import { useState } from "react";
import Auth from '../../../utils/auth';
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import CategoryControl from './CategoryControl';
import DescriptionControl from './DescriptionControl';
import TagForm from './TagForm';
import ImageUploadControls from './ImageUploadControls';
import { UPDATE_ARTICLE } from '../../../utils/mutations';
import DeleteButton from './DeleteButton';
import DateAcquiredControl from './DateAcquiredControl';
import WearingsSection from './WearingsSection';


const ViewOwnItem = ({ article }) => {
  const initialFormState = {
    description: article.description,
    category: article.category,
    tags: [...article.tags],
    imageAction: 'none',
    imageFile: article.imageFile,
    hasChanges: false, 
    dateAcquired: (article.dateAcquired ? article.dateAcquired : ''),
  }
  const [formState, setFormState] = useState(initialFormState);
  const [submitArticle, { loading }] = useMutation(UPDATE_ARTICLE, { onCompleted: () => { window.location.assign('/profile'); } });
  const toast = useToast();

  if (!Auth.loggedIn()) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(
      (article.imageFile && (!formState.discardImage))
      || formState.imageAction !== 'none'
      || formState.description.trim()
    )
    ) {
      toast({
        title: 'Cannot Update Item',
        description: "Your item must have an image or a description.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const variables = {
      articleId: article._id,
      category: formState.category,
      description: formState.description,
      tags: formState.tags,
      imageAction: formState.imageAction,
      dateAcquired: (formState.dateAcquired ? formState.dateAcquired : undefined)
    }
    console.log(article)
    console.log(formState);
    console.log(variables);
    submitArticle({
      variables
    });
  };

  return (
    <VStack padding={4} spacing={6} align="stretch" mt={8} mb={10}>
      <Heading textColor='pink.500'>View/Update Item in Your Wardrobe</Heading>

      <CategoryControl setFormState={setFormState} formState={formState} />

      <ImageUploadControls setFormState={setFormState} formState={formState} />

      <DescriptionControl setFormState={setFormState} formState={formState} />

      <DateAcquiredControl formState={formState} setFormState={setFormState} />
      
      <TagForm formState={formState} setFormState={setFormState} />


      <Flex flexDirection='row' spacing={4} my={8} wrap='wrap' maxW='100vw'>
        <Button
          onClick={handleSubmit}
          isLoading={loading}
          isDisabled={!formState.hasChanges}
          colorScheme='pink'
          borderRadius={0}
          flexShrink={0}
        >
          Save Changes
        </Button>
        <Button
          borderRadius={0}
          flexShrink={0}
          onClick={() => setFormState(initialFormState)}
          isDisabled={!formState.hasChanges}
        >
          Undo Changes
        </Button>
        <DeleteButton article={article} />
        <Button 
          as={Link}
          to="/profile"
          flexShrink={0}
          borderRadius={0}
          h='40px'
          mx={4}
          justifyContent='space-between'
          variant='link'
          colorScheme='pink'
        >
          Go Back
        </Button>
      </Flex>

      <Divider orientation='horizontal' />
      
      <WearingsSection articleId={article._id} wearings={article.wearings} />

    </VStack>
  );
};

export default ViewOwnItem;
