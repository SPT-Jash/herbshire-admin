import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Center, Flex, HStack, Stack, Text } from "@chakra-ui/layout";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { Context } from "../Data/Context";
import FileUpload from "../Views/FileUpload";

export default function AddProducts() {
  const { auth } = useContext(Context);
  const [image, setImage] = useState([]);

  const upload_media = useCallback(
    (event) => {
      event.preventDefault();
      const files = event.target.files;
      // event.target.value = "";
      const tempImages = [...image];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        let duplicate = false;
        tempImages.forEach((image) => {
          if (image.name === file.name) {
            console.log("Same Name");
            duplicate = true;
          }
        });
        if (!duplicate) tempImages.push(file);
      }
      setImage([...tempImages]);
      console.log(image);
      upload_image(tempImages[0]);
      return;
    },
    [image]
  );

  const upload_image = (file) => {
    const url = "http://api.herbshire.in/api/storage/uploadFile";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
        Accept: "*/*",
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("file", file);
    console.log("Auth: ", auth.user.token);
    axios
      .post(url, formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const removeImage = (deleteImage) => {
    const name = deleteImage.name;
    const oldImages = image;
    let newImages = [];
    oldImages.forEach((image) => {
      if (image.name !== name) {
        newImages.push(image);
      }
    });
    setImage([...newImages]);
  };

  const addProduct = () => {
    const url_product_add = "http://api.herbshire.in/product";
    const data = {
      id: 0,
      productName: "Test Product 1",
      weight: 1,
      quantity: 1,
      price: 1,
      discount: 1,
      description: "Description",
      displayUrl: "https://picsum.photos/200",
      freshTill: 0,
      count: 0,
      productImagesDTOS: [
        {
          id: 0,
          url: "https://picsum.photos/200",
        },
        {
          id: 1,
          url: "https://picsum.photos/200",
        },
      ],
      gst_dto: {
        id: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        description: "description",
      },
    };

    axios
      .post(url_product_add, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const SelectedImages = (
    <Stack direction={["column", "row"]} spacing={4}>
      {image.map((img) => (
        <Tag
          size="lg"
          h="50px"
          key={img.name}
          borderRadius="10px"
          variant="solid"
          colorScheme="green"
        >
          <TagLabel>{img.name}</TagLabel>
          <TagCloseButton onClick={() => removeImage(img)} />
        </Tag>
      ))}
    </Stack>
  );

  return (
    <Box w="100%" p="4">
      <Text mb="2" fontSize="sm" fontWeight="semibold">
        ADD PRODUCTS
      </Text>

      <form onSubmit={upload_media} encType="multipart/form-data">
        {/* <FileUpload /> */}
        <Flex
          w="300px"
          borderRadius="5"
          borderWidth="thin"
          borderColor="blackAlpha.100"
        >
          <Center>
            <Input
              placeholder="Image"
              type="file"
              opacity="0.2"
              w="300px"
              mt="3"
              borderWidth="thin"
              borderColor="blackAlpha.100"
              onChange={upload_media}
              multiple
            />
          </Center>
        </Flex>

        {SelectedImages}

        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}
