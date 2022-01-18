import React, { useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Box,
  Image,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState } from 'react';
import { getDownloadURLForImageFile } from '../../../utils/imageUploads';



const ImageDisplay = ({ imageFile }) => {
  const [imageURL, setImageURL] = useState('');
  useEffect(() => { getDownloadURLForImageFile(imageFile).then(setImageURL) }, [imageFile]);


  return (
    <Box>
      <FormControl mb={1}>
        <FormLabel fontSize='lg' fontWeight='bold' textColor='pink.700'>Picture</FormLabel>
      </FormControl>
      {
        (!imageURL)
          ?
          <Center w="320px" h="512px" border={1} boxShadow="md">
            <Spinner size='xl' color='pink.500' />
          </Center>
          :
          <Image maxH="512px" border={1} boxShadow="md" src={imageURL} />
      }

    </Box>
  );
}

export default ImageDisplay;