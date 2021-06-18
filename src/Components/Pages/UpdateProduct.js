import { Button } from "@chakra-ui/button";

import { Input } from "@chakra-ui/input";
import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory, useParams } from "react-router";
import {
  DELETE_FILE_URL,
  GST_URL,
  UPLOAD_FILE_URL,
  PRODUCT_UPDATE_URL,
  PRODUCT_ID_URL
} from "../Config/Apis";
import { Context } from "../Data/Context";
import FormInput from "../Views/FormInput";

export default function UpdateProduct() {
  const { id } = useParams();
  const history = useHistory();
  const { auth } = useContext(Context);
  const [images, setImages] = useState([]);
  const [editProductDetail, seteditProductDetail] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);
  const [gstList, setGstList] = useState([]);
  const toast = useToast();



  console.log(id, 'product id');


  const toastMessage = (status, title, description) => {
    toast({
      title: title,
      description: description ? description : "",
      status: status,
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };


  const onUpdateProduct = () => {
    // edit product
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      }
    };
    axios
      .patch(PRODUCT_UPDATE_URL, editProductDetail, config)
      .then(function (response) {
        console.log(response, 'response');
        if (response.status === 200) {
          history.push(`/products`);
          toastMessage("success", "Product Edit Successful.");
        } else {
          toastMessage("error", "Error while Editing Product!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  console.log(editProductDetail, "dataxcvbuimp");

  useEffect(() => {
    // get product detail
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: id
      },
    };
    axios
      .get(PRODUCT_ID_URL, config)
      .then(function (response) {
        seteditProductDetail(response.data.body)
        setUploadedImages(response.data.body.displayUrl)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    axios
      .get(GST_URL, config)
      .then((res) => {
        const list = res.data.body.content;
        console.log(list);
        setGstList(list);
      })
      .catch((r) => console.log(r));
  }, [auth, id]);



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
    <Box>
      <Text m="2" fontSize="lg" fontWeight="semibold">
        ADD PRODUCTS
      </Text>
      <Box
        w="100%"
        p="4"
        borderWidth="thin"
        borderRadius="5"
        borderColor="blackAlpha.300"
      >
        {/* <FormInput
          name="productId"
          type="hidden"
          value={editProductDetail.id}
          onChange={(e) => {
            seteditProductDetail({
              ...editProductDetail,
              id: e.target.value
            })
          }}
        /> */}

        <Flex flexWrap="wrap">
          <FormInput
            name="productName"
            label="product Name"
            type="text"
            value={editProductDetail.productName}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                productName: e.target.value
              })
            }}
          />
          <FormInput
            name="freshTill"
            label="fresh Till(in days)"
            type="number"
            value={editProductDetail.freshTill}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                freshTill: e.target.value
              })
            }}
          />
        </Flex>

        <Divider mt="4" mb="4" />

        <Flex flexWrap="wrap">
          {/* <FormInput name="count" label="count" type="number" /> */}
          <FormInput
            name="count"
            label="count"
            type="number"
            value={editProductDetail.count}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                count: e.target.value
              })
            }}
          />

          <FormInput
            name="quantity"
            label="quantity(in pieces)"
            type="number"
            value={editProductDetail.quantity}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                quantity: e.target.value
              })
            }}
          />
          <FormInput
            name="price"
            label="price(in ₹)"
            type="number"
            symbol="₹"
            value={editProductDetail.price}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                price: e.target.value
              })
            }}
          />
          <FormInput
            name="discount"
            label="discount(in %)"
            type="number"
            symbol="%"
            value={editProductDetail.discount}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                discount: e.target.value
              })
            }}
          />
          <FormInput
            name="weight"
            label="weight"
            type="number"
            value={editProductDetail.weight}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                weight: e.target.value
              })
            }}
          />
           <FormInput
            name="weightUnit"
            label="weight Unit"
            type="text"
            value={editProductDetail.weightUnit}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                weightUnit: e.target.value
              })
            }}
          />
          <Box m="2">
            <Text
              m="2"
              fontSize="md"
              fontWeight="semibold"
              color="blackAlpha.800"
            >
              Tax
              </Text>
            <Select name="gst" placeholder="Select option">
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

        <Flex flexWrap="wrap">
          <FormInput
            name="calories"
            label="calories"
            type="text"
            symbol="G"
            value={editProductDetail.calories}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                calories: e.target.value
              })
            }}
          />
          <FormInput
            name="proteins"
            label="proteins"
            type="text"
            symbol="G"
            value={editProductDetail.proteins}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                proteins: e.target.value
              })
            }} />

          <FormInput
            name="fats"
            label="fats"
            type="text"
            symbol="G"
            value={editProductDetail.fats}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                fats: e.target.value
              })
            }} />

          <FormInput
            name="curbs"
            label="curbs"
            type="text"
            symbol="G"
            value={editProductDetail.curbs}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                curbs: e.target.value
              })
            }} />

        </Flex>
        <Divider mt="4" mb="4" />

        <Box>
          <Text mb="4" fontSize="md" fontWeight="semibold" color="blackAlpha.800">DESCRIPTION</Text>
          <Textarea
            name="description"
            label="description"
            type="text"
            value={editProductDetail.description}
            onChange={(e) => {
              seteditProductDetail({
                ...editProductDetail,
                description: e.target.value
              })
            }} />
        </Box>

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

        <Button
          type="submit"
          background="green.400"
          color="white"
          onClick={() => onUpdateProduct()}>
          Submit
          </Button>
      </Box>
    </Box>
  );
}
