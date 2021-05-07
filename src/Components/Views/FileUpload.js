import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useController } from "react-hook-form";
import { useRef, use } from "react";

const FileUpload = ({}) => {
  return (
    <FormControl>
      <FormLabel htmlFor="writeUpFile">Image</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FiFile} />}
        />
        <input type="file" name="image" style={{ display: "block" }}></input>
        <Input
          placeholder={"Your file ..."}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        />
      </InputGroup>
    </FormControl>
  );
};

export default FileUpload;
