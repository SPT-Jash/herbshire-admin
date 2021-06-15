import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Center } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/layout";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Tag, TagLabel } from "@chakra-ui/tag";
import React, { useRef, useState } from "react";
import FormInput from "../Views/FormInput";

const AddOrder = () => {
  const form = useRef();
  const [images, setImages] = useState([]);
  const [gstList, setGstList] = useState([]);

  const SelectedImages = (
    <Flex display="block">
      {images.map((img, key) => (
        <Tag
          size="lg"
          h="50px"
          key={key}
          borderRadius="10px"
          variant="solid"
          colorScheme="green"
          m="2"
        >
          <TagLabel>{img.name}</TagLabel>
          {/* <TagCloseButton onClick={() => removeImage(key)} /> */}
        </Tag>
      ))}
    </Flex>
  );

  return (
    <>
      <Box>
        <Text m="2" fontSize="lg" fontWeight="semibold">
          ADD ORDER
        </Text>
        <Box
          w="100%"
          p="4"
          borderWidth="thin"
          borderRadius="5"
          borderColor="blackAlpha.300"
        >
          <form
            ref={form}

            encType="multipart/form-data"
          >
            <Flex>
              <FormInput name="orderName" label="order Name" type="text" />
              <FormInput name="freshTill" label="fresh Till" type="text" />
            </Flex>

            <Divider mt="4" mb="4" />

            <Flex>
              {/* <FormInput name="count" label="count" type="number" /> */}
              <FormInput name="count" label="count" type="number" />
              <FormInput name="quantity" label="quantity" type="number" />
              <FormInput name="price" label="price" type="number" />
              <FormInput name="discount" label="discount" type="number" />
              <FormInput name="weight" label="weight" type="number" />
              <Box m="2">
                <Text
                  m="2"
                  fontSize="md"
                  fontWeight="semibold"
                  color="blackAlpha.800"
                >
                  Tax
                </Text>
                <Select name="gst_dto" placeholder="Select option">
                  {gstList.map((gst, key) => {
                    return (
                      <option key={key} value={key}>
                        {gst.description}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Flex>

            <Divider mt="4" mb="4" />

            <Flex>
              <FormInput name="calories" label="calories" type="text" />
              <FormInput name="proteins" label="proteins" type="text" />
              <FormInput name="fats" label="fats" type="text" />
              <FormInput name="curbs" label="curbs" type="text" />
            </Flex>
            <Divider mt="4" mb="4" />

            <Flex>
              <FormInput name="description" label="description" type="text" />
            </Flex>

            <Divider mt="4" mb="4" />

            <Flex
              w="300px"
              borderRadius="5"
              borderWidth="thin"
              borderColor="blackAlpha.200"
            >
              <Center>
                <Input
                  placeholder="Image"
                  type="file"
                  opacity="0"
                  w="300px"
                  mt="3"
                  borderWidth="thin"
                  borderColor="blackAlpha.200"

                  accept="images/*"
                  multiple
                />
                <Text
                  position="absolute"
                  zIndex="-1"
                  fontSize="lg"
                  color="blackAlpha.500"
                >
                  {" "}
                  File Upload{" "}
                </Text>
              </Center>
            </Flex>

            {SelectedImages}

            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddOrder;
