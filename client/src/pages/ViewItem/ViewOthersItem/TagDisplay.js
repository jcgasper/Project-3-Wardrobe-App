import React from 'react'
import {
  FormControl,
  FormLabel,
  Box,
  Tag,
  TagLabel,
  Flex
} from "@chakra-ui/react";

const TagDisplay = ({ tags }) => {


  return (
    <FormControl>
      <FormLabel htmlFor="tags" fontSize='lg' fontWeight='bold' textColor='pink.700'>Tags</FormLabel>
      <Box minH={3} pb={1}>
        <Flex id='tags' wrap='wrap'>
          {tags.map((tag) => (
            <Tag 
              key={tag}
              colorScheme='pink'
              borderRadius={0}
              me={1}
              mb={1}
            >
              <TagLabel py={2}>{tag}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </Box>
    </FormControl>
  );

}

export default TagDisplay;