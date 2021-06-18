import { Textarea } from "@chakra-ui/textarea";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function TextAreaInput({ label, value, onChange }) {
    return (
      <Box m="2" width="100%">
        <Text m="2" fontSize="md" fontWeight="semibold" color="blackAlpha.800">
          {label.toUpperCase()}
        </Text>
        <Textarea
          mb="3"
          ml="4"
          placeholder={label.toUpperCase()}
          value={value}
          onChange={onChange}
        />
      </Box>
    );
  }
  
  