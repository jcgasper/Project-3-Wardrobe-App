import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Box
} from "@chakra-ui/react";
import { FaFilter } from 'react-icons/fa';
import FilterForm from './FilterForm';

function ProfileFilter({clothes, setCategories, setTags}) {

    const [availableTags, setAvailableTags] = useState(getTags());

    function getTags() {
        let allTags = [];
        clothes.forEach(article => allTags = [...allTags, ...article.tags]);
        allTags = [...new Set(allTags)];

        return allTags;
    }
    

  return (
    <Accordion allowToggle w='full'>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            <Icon as={FaFilter} /> Filter Your Wardrobe 
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <FilterForm />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default ProfileFilter;
