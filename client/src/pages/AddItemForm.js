import React from "react";
import {
  VStack,
  Box,
  Heading,
  Input,
  FormControl,
  useToast,
  FormLabel,
  Select,
  Text,
  Stack,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Image
} from "@chakra-ui/react";
import { useState } from "react";
import FileUploadControl from '../components/FileUploadControl';

const AddItemForm = () => {
  const DEFAULT_IMAGE_LOCATION = "/no_image_uploaded.png";
  const toast = useToast();
  const [formState, setFormState] = useState({ description: "", itemType: "Top", tags: [] });
  const [newTag, setNewTag] = useState("");
  const [imageURL, setImageURL] = useState(DEFAULT_IMAGE_LOCATION);


  const handleSubmit = (event) => {
    event.preventDefault();
    toast({
      title: "Form checked",
      description: JSON.stringify(formState),
      status: "success",
      duration: 4000,
      isClosable: true
    });

    // TODO send graphQL mutation
  };

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
  
  const fileUploadHandler = (event) => {
    const file = event.target.files[0];
    const {name, size, type} = file
    if (!file) {
      toast({
        title: "No file!",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }

    // TODO upload picture to firebase
    // TODO add hidden input for uploaded image URL
    setImageURL(window.URL.createObjectURL(file))
    toast({
      title: "Your image:",
      description: JSON.stringify({name, size, type}),
      status: "error",
      duration: 3000,
      isClosable: true
    }); 
  }

  return (
    <VStack padding={4} spacing={5}>
      <Heading>Add Item to Your Wardrobe</Heading>
      <FormControl isRequired>
        <FormLabel htmlFor="type">Item Type</FormLabel>
        <Select id="type" w={200} onChange={(e) => setFormState({ ...formState, itemType: e.target.value })}>
          <option>Top</option>
          <option>Bottom</option>
          <option>Outerwear</option>
          <option>Footwear</option>
          <option>Accessory</option>
        </Select>
      </FormControl>
      <Stack direction={["column", "row"]}>
        {/* TODO Check out https://github.com/chakra-ui/chakra-ui/issues/457
        <FormControl>
          <FormLabel htmlFor="fileUpload">Upload Image File</FormLabel>
          <Input
            id="fileUpload"
            name="fileUpload"
            accept=".jpg, .jpeg, .png, .gif, .bmp"
            type="file"
          />
        </FormControl> */}
        <FileUploadControl placeholder="Click here"
         acceptedFileTypes=".jpg, .jpeg, .png, .gif, .bmp"
         name="fileUpload" onChange={fileUploadHandler}
        >Upload a Picture</FileUploadControl>
        <Image maxW="320px" maxH="512px" src={imageURL} />
      </Stack>

      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          id="description"
          placeholder="Type a description of your item (optional)"
          value={formState.description}
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
          maxLength="100"
        />
      </FormControl>
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
      <Button my={8} onClick={handleSubmit}>
        Register New Item
      </Button>
    </VStack>
  );
};

export default AddItemForm;
