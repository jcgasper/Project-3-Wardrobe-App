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
import { generateFileName, validateImageType } from '../../utils/imageUploads';
import { GET_TEMP_IMAGE_FILE } from '../../utils/queries';

const DEFAULT_IMAGE_LOCATION = "/no_image_uploaded.png";

const ImageUploadControls = ({ userId }) => {
  const [addTempImage, { loading: addTempImageLoading }] = useMutation(ADD_TEMP_IMAGE);
  const [removeTempImage, { loading: removeTempImageLoading }] = useMutation(REMOVE_TEMP_IMAGE);
  const [isUploading, setIsUploading] = useState(false);
  const [imageURL, setImageURL] = useState(DEFAULT_IMAGE_LOCATION);
  const { loading: getTempImageLoading, data: getTempImageData } = useQuery(GET_TEMP_IMAGE_FILE, { variables: { userId } });
  const toast = useToast();

  if (getTempImageData?.user.tempImageFile && !(imageURL.includes(getTempImageData.user.tempImageFile))) {
    getDownloadURL(ref(storage, getTempImageData.user.tempImageFile))
      .then(url => setImageURL(url));
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
          addTempImage({ variables: { userId, filename: uploadFileName } });
          setIsUploading(false);
          setImageURL(downloadURL);
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
    removeTempImage({ variables: { userId } });
    setImageURL(DEFAULT_IMAGE_LOCATION);
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

          <IconButton aria-label='Discard Image' isLoading={removeTempImageLoading} icon={<FaTrash />} isDisabled={imageURL === DEFAULT_IMAGE_LOCATION} onClick={discardImageHandler} />
        </ButtonGroup>
      </FormControl>
      {
        (isUploading || addTempImageLoading || removeTempImageLoading || getTempImageLoading)
          ?
          <Center w="320px" h="512px" border={1} boxShadow="md">
            <Spinner size='xl' />
          </Center>
          :
          <Image maxW="320px" maxH="512px" border={1} boxShadow="md" src={imageURL} />
      }

    </Box>
  );

}

export default ImageUploadControls;