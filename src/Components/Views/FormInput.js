import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

export default function FormInput({ label, name, type, value, onChange, symbol }) {
  return (
    <Box m="2">
      <Text m="2" fontSize="md" fontWeight="semibold" color="blackAlpha.800">
        {label.toUpperCase()}
      </Text>
      <InputGroup>
        <Input
          m="2"
          name={name}
          placeholder={label.toUpperCase()}
          type={type}
          borderRadius="8"
          value={value}
          onChange={onChange}
        />
        <InputLeftElement
          pointerEvents="fill"
          color="#00b6a1"
          fontSize="25px"
          children={symbol}
          style={{ marginTop: "6px", marginLeft:"5px" }}
        />
      </InputGroup>
    </Box>
  );
}
