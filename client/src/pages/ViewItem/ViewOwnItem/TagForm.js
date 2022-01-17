import React from 'react'
import {
  FormControl,
  FormLabel,
  Box,
  Text,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Stack,
  Button,
  useToast,
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
    setFormState({ ...formState, tags: [...formState.tags, newTag.trim()], hasChanges: true });
    setNewTag("");
  };

  const removeTag = (tagToRemove) => {
    setFormState({ ...formState, tags: formState.tags.filter((tag) => tag !== tagToRemove), hasChanges: true });
  };

  return (
    <FormControl>
      <FormLabel htmlFor="tags">Tags</FormLabel>
      <Box minH={3} pb={1}>
        {formState.tags.length === 0 ? (
          <Text>
            No tags yet. Type a note to tag below and hit enter or the button
            to add one.
          </Text>
        ) : (
          <HStack>
            {formState.tags.map((tag) => (
              <Tag key={tag}>
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={(e) => removeTag(tag)} />
              </Tag>
            ))}
          </HStack>
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
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button id="addNewTagButton" type="submit">
          Add New Tag
        </Button>
      </Stack>
    </FormControl>
  );

}

export default TagForm;