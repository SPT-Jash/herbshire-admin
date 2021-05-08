import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function FormInput({ label, name, type }) {
  return (
    <Box m="2">
      <Text m="2" fontSize="md" fontWeight="semibold" color="blackAlpha.800">
        {label.toUpperCase()}
      </Text>
      <Input
        m="2"
        name={name}
        placeholder={label.toUpperCase()}
        type={type}
        borderRadius="8"
      />
    </Box>
  );
}
