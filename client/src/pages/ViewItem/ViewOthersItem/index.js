import React from "react";
import { VStack, Heading } from "@chakra-ui/react";
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
