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
  Spinner,
  Image
} from "@chakra-ui/react";
import { useState } from "react";
import FileUploadControl from '../components/FileUploadControl';
import { generateFileName, validateImageType } from '../utils/imageUploads';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../utils/firebase';


const AddItemForm = () => {
  const DEFAULT_IMAGE_LOCATION = "/no_image_uploaded.png";
  const toast = useToast();
  const [formState, setFormState] = useState({ description: "", itemType: "Top", tags: [] });
  const [newTag, setNewTag] = useState("");
  const [imageURL, setImageURL] = useState(DEFAULT_IMAGE_LOCATION);
  const [isUploading, setIsUploading] = useState(false);


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
    if (!file) {
      return;
    }

    try {
      // upload to firebase
      validateImageType(file);
      const uploadFileName = generateFileName(file);
      const imageRef = ref(storage, uploadFileName);
      setIsUploading(true);
      uploadBytes(imageRef, file)
      .then(snapshot => getDownloadURL(snapshot.ref))
      .then(downloadURL => {
        setIsUploading(false);
        setImageURL(downloadURL);
        // TODO add mutation to record imageURL on backend
      })
    } catch (error) {
      console.error(error);
      toast({
        title: "The file you selected wasn't a valid image file!",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }


    
    // setImageURL(window.URL.createObjectURL(file))
    // toast({
    //   title: "Your image:",
    //   description: JSON.stringify({ name, size, type }),
    //   status: "error",
    //   duration: 3000,
    //   isClosable: true
    // });
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
      <Stack direction={["column", "row"]} w="100%" justifyContent="space-between">
        <HStack>
          <FileUploadControl
            placeholder="Click here"
            acceptedFileTypes=".jpg, .jpeg, .png, .gif, .bmp"
            name="fileUpload"
            onChange={fileUploadHandler}
          >
            Upload a Picture
          </FileUploadControl>
          { isUploading ? <Spinner /> : ''}
        </HStack>
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
