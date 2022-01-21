import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Box
} from "@chakra-ui/react";
import { FaFilter } from 'react-icons/fa'

function ProfileFilter() {
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
          Insert Form for Handling filters...
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default ProfileFilter;
