// from https://github.com/chakra-ui/chakra-ui/issues/457#issuecomment-790826877
import React from 'react';
import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, Icon, Button } from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";
// import { useController } from "react-hook-form";
import { useRef } from "react";

const FileUploadControl = ({ name, placeholder, acceptedFileTypes, children, buttonText, isInvalid = false, isRequired = false, onChange, ...inputProps }) => {
  const inputRef = useRef();
  // const {
  //   field: { ref, value, ...inputProps },
  //   meta: { invalid, isTouched, isDirty },
  // } = useController({
  //   name,
  //   control,
  //   rules: { required: isRequired },
  // });
  // removed 

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{children}</FormLabel>
      <InputGroup>
        <input type='file' accept={acceptedFileTypes} name={name} ref={inputRef} {...inputProps} onChange={onChange} style={{ display: 'none' }}></input>
        {/* removed inputRef={ref}  from input's props */}
        <Button leftIcon={<Icon as={FaFileUpload} />} onClick={() => inputRef.current.click()}>{buttonText || "Click here ..."}</Button>
      </InputGroup>
      {/* <FormErrorMessage>
        {invalid}
      </FormErrorMessage> */}
    </FormControl>
  );
}

export default FileUploadControl;