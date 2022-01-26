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
import TagFilter from './TagFilter';
import CategoryFilter from './CategoryFilter';

function ProfileFilter({clothes, categories, setCategories, setTags, tags}) {

    const [availableTags, setAvailableTags] = useState(getTags());

    function getTags() {
        let allTags = [];
        clothes.forEach(article => allTags = [...allTags, ...article.tags]);
        allTags = [...new Set(allTags)].sort();

        return allTags.map(tag => {
            return {value: tag, label: tag}
        });
    }

    useEffect(() => {
      if(!categories) {
        setAvailableTags(getTags());
      } else {
        let allTags = [];
        clothes.filter(article => article.category === categories)
          .forEach(article => allTags = [...allTags, ...article.tags]);
        
        allTags = [...new Set(allTags)].sort();

        setAvailableTags(allTags.map(tag => ({value: tag, label: tag})));
      }
    }, [categories]);
    

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
          <CategoryFilter clothes={clothes} setAvailableTags={setAvailableTags} setCategories={setCategories} />
          <TagFilter clothes={clothes} categories={categories} availableTags={availableTags} setAvailableTags={setAvailableTags} setTags={setTags} tags={tags} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default ProfileFilter;
