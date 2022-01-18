import React from 'react'
import {
  FormControl,
  FormLabel,
  Box,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Stack,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState } from 'react';

const TagForm = ({ formState, setFormState }) => {
  const [newTag, setNewTag] = useState("");
  const toast = useToast();

  const addTagHandler = (event) => {
    event.preventDefault();
    if (!newTag) return;
    if (formState.tags.includes(newTag.trim())) {
      toast({
        title: "Tag already exists",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    setFormState({ ...formState, tags: [...formState.tags, newTag.trim()] });
    setNewTag("");
  };

  const removeTag = (tagToRemove) => {
    setFormState({ ...formState, tags: formState.tags.filter((tag) => tag !== tagToRemove) });
  };

  return (
    <FormControl>
      <FormLabel htmlFor="tags" fontSize='lg' fontWeight='bold' textColor='pink.700'>Tags</FormLabel>
      <Box minH={3} pb={1}>
        {formState.tags.length === 0 ? (
          <Text>
            No tags yet. Type a note to tag below and hit enter or the button
            to add one.
          </Text>
        ) : (
          <Flex wrap='wrap'>
            {formState.tags.map((tag) => (
              <Tag
                key={tag}
                colorScheme='pink'
                borderRadius={0}
                me={1}
                mb={1}
              >
                <TagLabel py={2}>{tag}</TagLabel>
                <TagCloseButton onClick={(e) => removeTag(tag)} />
              </Tag>
            ))}
          </Flex>
        )}
      </Box>
      <Stack
        as="form"
        name="tagForm"
        onSubmit={addTagHandler}
        direction={["column", "row"]}
      >
        <Input
          id="newTag"
          placeholder='"Size M", "Brown", "Polo shirt", "Gucci", etc.'
          value={newTag}
          borderRadius={0}
          borderColor='pink.700'
          focusBorderColor='pink.400'
          maxLength="50"
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button
          id="addNewTagButton"
          type="submit"
          colorScheme='pink'
          borderRadius={0}
          flexShrink={0}
        >
          Add New Tag
        </Button>
      </Stack>
    </FormControl>
  );

}

export default TagForm;