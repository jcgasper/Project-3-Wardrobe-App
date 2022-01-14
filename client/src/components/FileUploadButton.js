// based on code from https://github.com/chakra-ui/chakra-ui/issues/457#issuecomment-790826877
import React from 'react';
import { InputGroup, Icon, Button } from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";
import { useRef } from "react";

const FileUploadButton = ({ name, isLoading, placeholder, acceptedFileTypes, children, buttonText, isInvalid = false, isRequired = false, onChange, ...inputProps }) => {
  const inputRef = useRef();

  return (
    <InputGroup>
      <input type='file' accept={acceptedFileTypes} name={name} ref={inputRef} {...inputProps} onChange={onChange} style={{ display: 'none' }}></input>
      <Button isLoading={isLoading} leftIcon={<Icon as={FaFileUpload} />} onClick={() => inputRef.current.click()}>{children || "Click here ..."}</Button>
    </InputGroup>
  );
}

export default FileUploadButton;