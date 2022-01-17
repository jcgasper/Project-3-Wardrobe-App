import React from 'react'
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
import FileUploadButton from '../../components/FileUploadButton';
import { FaTrash } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TEMP_IMAGE, REMOVE_TEMP_IMAGE } from '../../utils/mutations';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../../utils/firebase';
import { DEFAULT_IMAGE_LOCATION, generateFileName, getDownloadURLForImageFile, validateImageType } from '../../utils/imageUploads';
import { GET_TEMP_IMAGE_FILE } from '../../utils/queries';



const ImageUploadControls = ({ formState, setFormState }) => {
  const [addTempImage, { loading: addTempImageLoading }] = useMutation(ADD_TEMP_IMAGE);
  const [removeTempImage, { loading: removeTempImageLoading }] = useMutation(REMOVE_TEMP_IMAGE);
  const [isUploading, setIsUploading] = useState(false);
  const [imageURL, setImageURL] = useState(DEFAULT_IMAGE_LOCATION);
  const { loading: getTempImageLoading, data: getTempImageData } = useQuery(GET_TEMP_IMAGE_FILE);
  const toast = useToast();

  if (getTempImageData?.tempImageFile && !(imageURL.includes(getTempImageData.tempImageFile))) {
    getDownloadURLForImageFile(getTempImageData.tempImageFile)
      .then(url => {
        setFormState({ ...formState, imageUploaded: true })
        setImageURL(url);
      });
  }


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
          addTempImage({ variables: { filename: uploadFileName } });
          setIsUploading(false);
          setImageURL(downloadURL);
          setFormState({ ...formState, imageUploaded: true });
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
    removeTempImage();
    setImageURL(DEFAULT_IMAGE_LOCATION);
    setFormState({ ...formState, imageUploaded: false });
  };

  return (
    <Box>
      <FormControl mb={2}>
        <FormLabel htmlFor="fileUpload" fontSize='lg' fontWeight='bold' textColor='pink.700'>Picture</FormLabel>
        <ButtonGroup>
          <FileUploadButton
            placeholder="Click here"
            acceptedFileTypes=".jpg, .jpeg, .png, .gif, .bmp"
            name="fileUpload"
            onChange={fileUploadHandler}
            isLoading={isUploading || addTempImageLoading}
          >Click to Upload</FileUploadButton>

          <IconButton 
            aria-label='Discard Image'
            borderRadius={0}
            variant='ghost'
            isLoading={removeTempImageLoading}
            icon={<FaTrash />}
            isDisabled={imageURL === DEFAULT_IMAGE_LOCATION} onClick={discardImageHandler}
          />
        </ButtonGroup>
      </FormControl>
      {
        (isUploading || addTempImageLoading || removeTempImageLoading || getTempImageLoading)
          ?
          <Center w="320px" h="512px" border={1} boxShadow="md">
            <Spinner size='xl' color='pink.800' />
          </Center>
          :
          <Image maxH="512px" border={1} boxShadow="md" src={imageURL} />
      }

    </Box>
  );

}

export default ImageUploadControls;