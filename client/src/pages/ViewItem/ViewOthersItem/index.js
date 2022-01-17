import React from "react";
import { VStack, Heading } from "@chakra-ui/react";
import CategoryDisplay from './CategoryDisplay';
import DescriptionDisplay from './DescriptionDisplay';
import TagDisplay from './TagDisplay';
import ImageDisplay from './ImageDisplay';


const ViewOthersItem = ({article}) => {

  const {category, description, imageFile, tags, owner: {displayname}} = article;

  return (
    <VStack padding={4} spacing={6} align="stretch" mt={8} mb={10}>
      <Heading textColor='pink.500'>Item from {displayname}'s Wardrobe</Heading>

      <CategoryDisplay category={category} />

      {(imageFile ? <ImageDisplay imageFile={imageFile} /> : '')} 

      {(description ? <DescriptionDisplay description={description} /> : '')}

      {(tags?.length > 0 ?  <TagDisplay tags={tags} /> : '')}

    </VStack>
  );
};

export default ViewOthersItem;
