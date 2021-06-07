import { Button } from "@chakra-ui/button";

import { Input } from "@chakra-ui/input";
import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import {
  DELETE_FILE_URL,
  GST_URL,
  PRODUCT_URL,
  UPLOAD_FILE_URL,
  SERVER_URL
} from "../Config/Apis";
import { Context } from "../Data/Context";
import FormInput from "../Views/FormInput";

export default function UpdateProduct() {
  const { id } = useParams();
  const { auth } = useContext(Context);
  const form = useRef();
  const [images, setImages] = useState([]);
  const [editProductDetail, seteditProductDetail] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [gstList, setGstList] = useState([]);
  const toast = useToast();
  // all porduct update names..
  const [editProductNamme, seteditProductNamme] = useState();
  const [editfreshTill, seteditfreshTill] = useState();
  const [editcount, seteditcount] = useState();
  const [editquantity, seteditquantity] = useState();
  const [editprice, seteditprice] = useState();
  const [editdiscount, seteditdiscount] = useState();
  const [editweight, seteditweight] = useState();
  const [editcalories, seteditcalories] = useState();
  const [editproteins, seteditproteins] = useState();
  const [editfats, seteditfats] = useState();
  const [editcurbs, seteditcurbs] = useState();
  const [editdescription, seteditdescription] = useState();



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

  }

  useEffect(() => {
    const url = SERVER_URL + "product";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: id
      },
    };
    axios
      .get(url, config)
      .then(function (response) {
        seteditProductDetail(response.data.body)
        setUploadedImages(response.data.body.displayUrl)
        console.log(editProductDetail, "dataxcvbuimp");
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);



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

        <Flex flexWrap="wrap">
          <FormInput
            name="productName"
            label="product Name"
            type="text"
            value={editProductDetail.productName}
            onChange={(e) => {
              seteditProductNamme({
                ...editProductDetail,
                productName: e.target.value
              })
            }}
          />
          <FormInput
            name="freshTill"
            label="fresh Till"
            type="text"
            value={editProductDetail.productName}
            onChange={(e) => {
              seteditfreshTill({
                ...editProductDetail,
                productName: e.target.value
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
              seteditcount({
                ...editProductDetail,
                count: e.target.value
              })
            }}
          />

          <FormInput
            name="quantity"
            label="quantity"
            type="number"
            value={editProductDetail.quantity}
            onChange={(e) => {
              seteditquantity({
                ...editProductDetail,
                quantity: e.target.value
              })
            }}
          />
          <FormInput
            name="price"
            label="price"
            type="number"
            value={editProductDetail.price}
            onChange={(e) => {

              seteditprice({
                ...editProductDetail,
                price: e.target.value
              })
            }}
          />
          <FormInput
            name="discount"
            label="discount"
            type="number"
            value={editProductDetail.discount}
            onChange={(e) => {
              seteditdiscount({
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
              seteditweight({
                ...editProductDetail,
                weight: e.target.value
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
            value={editProductDetail.calories}
            onChange={(e) => {
              seteditcalories({
                ...editProductDetail,
                calories: e.target.value
              })
            }}
          />
          <FormInput
            name="proteins"
            label="proteins"
            type="text"
            value={editProductDetail.proteins}
            onChange={(e) => {
              seteditproteins({
                ...editProductDetail,
                proteins: e.target.value
              })
            }} />

          <FormInput
            name="fats"
            label="fats"
            type="text"
            value={editProductDetail.fats}
            onChange={(e) => {
              seteditfats({
                ...editProductDetail,
                fats: e.target.value
              })
            }} />

          <FormInput
            name="curbs"
            label="curbs"
            type="text"
            value={editProductDetail.curbs}
            onChange={(e) => {
              seteditcurbs({
                ...editProductDetail,
                curbs: e.target.value
              })
            }} />

        </Flex>
        <Divider mt="4" mb="4" />

        <Box>
          <Text mb="4">Description</Text>
          <Textarea
            name="description"
            label="description"
            type="text"
            value={editProductDetail.description}
            onChange={(e) => {
              seteditdescription({
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
