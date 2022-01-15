import React from "react";
import { VStack, Heading, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Auth from '../../utils/auth';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_ARTICLE } from '../../utils/mutations';
import CategoryControl from './CategoryControl';
import DescriptionControl from './DescriptionControl';
import TagForm from './TagForm';
import ImageUploadControls from './ImageUploadControls';


const ViewOthersItem = ({article}) => {

  const {category, description, imageFile, tags, owner: {displayname}} = article;

  return (
    <VStack padding={4} spacing={6} align="stretch" mb={10}>
      <Heading>Item from {displayname}'s Wardrobe</Heading>

      <CategoryControl category={category} />

      {(imageFile ? <ImageUploadControls imageFile={imageFile} /> : '')} 

      {(description ? <DescriptionControl description={description} /> : '')}

      {(tags?.length > 0 ?  <TagForm tags={tags} /> : '')}

    </VStack>
  );
};

export default ViewOthersItem;
