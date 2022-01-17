import React, { useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Box,
  useToast,
  IconButton,
  Image,
  ButtonGroup,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState } from 'react';
import FileUploadButton from '../../../components/FileUploadButton';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_TEMP_IMAGE } from '../../../utils/mutations';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../../../utils/firebase';
import { DEFAULT_IMAGE_LOCATION, generateFileName, getDownloadURLForImageFile, validateImageType } from '../../../utils/imageUploads';



const ImageUploadControls = ({ formState, setFormState }) => {
  const [addTempImage, { loading: addTempImageLoading }] = useMutation(ADD_TEMP_IMAGE);
  const [isUploading, setIsUploading] = useState(true);
  const [imageURL, setImageURL] = useState(DEFAULT_IMAGE_LOCATION);
  const toast = useToast();

  useEffect(() => {
    if (!formState.imageFile) {
      setIsUploading(false);
      setImageURL(DEFAULT_IMAGE_LOCATION);
      return;
    }
    getDownloadURLForImageFile(formState.imageFile)
      .then(url => {
        setImageURL(url);
        setIsUploading(false);
      });
  }, [formState.imageFile]);

  // if (getTempImageData?.tempImageFile && !(imageURL.includes(getTempImageData.tempImageFile))) {
  //   getDownloadURLForImageFile(getTempImageData.tempImageFile)
  //     .then(url => {
  //       setFormState({ ...formState, imageUploaded: true })
  //       setImageURL(url);
  //     });
  // }


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
        .then(() => {
          addTempImage({ variables: { filename: uploadFileName } });
          setFormState({ ...formState, hasChanges: true, imageFile: uploadFileName, imageAction: 'update' });
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
  }

  const discardImageHandler = () => {
    setFormState({ ...formState, hasChanges: true, imageFile: '', imageAction: 'delete' });
  };

  return (
    <Box>
      <FormControl mb={1}>
        <FormLabel htmlFor="fileUpload">Picture</FormLabel>
        <ButtonGroup>
          <FileUploadButton
            placeholder="Click here"
            acceptedFileTypes=".jpg, .jpeg, .png, .gif, .bmp"
            name="fileUpload"
            onChange={fileUploadHandler}
            isLoading={isUploading || addTempImageLoading}
          >Click to Upload</FileUploadButton>

          <IconButton aria-label='Discard Image' icon={<FaTrash />} isDisabled={imageURL === DEFAULT_IMAGE_LOCATION} onClick={discardImageHandler} />
        </ButtonGroup>
      </FormControl>
      {
        (isUploading || addTempImageLoading )
          ?
          <Center w="320px" h="512px" border={1} boxShadow="md">
            <Spinner size='xl' />
          </Center>
          :
          <Image maxH="512px" border={1} boxShadow="md" src={imageURL} />
      }

    </Box>
  );

}

export default ImageUploadControls;