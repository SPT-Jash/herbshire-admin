import { Button } from "@chakra-ui/button";

import { Input } from "@chakra-ui/input";
import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DELETE_FILE_URL,
  GST_URL,
  PRODUCT_URL,
  UPLOAD_FILE_URL,
} from "../Config/Apis";
import { Context } from "../Data/Context";
import FormInput from "../Views/FormInput";

export default function UpdateProduct() {
  const { auth } = useContext(Context);
  const form = useRef();
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [gstList, setGstList] = useState([]);
  const toast = useToast();

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${auth.user.token}`,
  //     },
  //     params: {
  //       filter: {
  //         productName: "like-p",
  //       },
  //       ascSort: true,
  //       pageSize: 10,
  //       pageNumber: 1,
  //     },
  //   };
  //   axios
  //     .get(PRODUCT_URL, config)
  //     .then(function (response) {
  //       const data = response.data.body;
  //       console.log("Update product", data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .then(function () {
  //       // always executed
  //     });
  // }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    axios
      .get(GST_URL, config)
      .then((res) => {
        const list = res.data.body.content;
        console.log(list);
        setGstList(list);
      })
      .catch((r) => console.log(r));
  }, [auth]);

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
  const add_media = (event) => {
    event.preventDefault();
    const files = event.target.files;
    const tempImages = [...images];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      let duplicate = false;
      if (!duplicate) tempImages.push(file);
    }
    setImages([...tempImages]);
    console.log("Add media", tempImages);
    return;
  };
  const checkFormData = useCallback(() => {
    const formData = form.current;

    const productName = formData.productName.value
      ? formData.productName.value
      : "";
    const freshTill = formData.freshTill.value ? formData.freshTill.value : "";
    const quantity = formData.quantity.value ? formData.quantity.value : "";
    const price = formData.price.value ? formData.price.value : "";
    const discount = formData.discount.value ? formData.discount.value : "";
    const weight = formData.weight.value ? formData.weight.value : "";
    const count = formData.count.value ? formData.count.value : "";
    const calories = formData.calories.value ? formData.calories.value : "";
    const proteins = formData.proteins.value ? formData.proteins.value : "";
    const fats = formData.fats.value ? formData.fats.value : "";
    const curbs = formData.curbs.value ? formData.curbs.value : "";
    const description = formData.description.value
      ? formData.description.value
      : "";
    const gst = gstList[formData.gst.value];

    if (productName.trim() === "") {
      toastMessage("error", "Product Name Cannot be null !");
      return false;
    }
    if (freshTill.trim() === "") {
      toastMessage("error", "freshTill Cannot be null !");
      return false;
    }
    if (quantity.trim() === "") {
      toastMessage("error", "quantity Cannot be null !");
      return false;
    }
    if (price.trim() === "") {
      toastMessage("error", "price Cannot be null !");
      return false;
    }
    if (discount.trim() === "") {
      toastMessage("error", "discount Cannot be null !");
      return false;
    }
    if (weight.trim() === "") {
      toastMessage("error", "weight Cannot be null !");
      return false;
    }

    if (calories.trim() === "") {
      toastMessage("error", "calories Cannot be null !");
      return false;
    }
    if (count.trim() === "") {
      toastMessage("error", "calories Cannot be null !");
      return false;
    }
    if (proteins.trim() === "") {
      toastMessage("error", "proteins Cannot be null !");
      return false;
    }
    if (fats.trim() === "") {
      toastMessage("error", "fats Cannot be null !");
      return false;
    }
    if (curbs.trim() === "") {
      toastMessage("error", "curbs Cannot be null !");
      return false;
    }
    if (description.trim() === "") {
      toastMessage("error", "description Cannot be null !");
      return false;
    }
    if (!gst) {
      toastMessage("error", "Tax Cannot be null !");
      return false;
    }
    if (images.length < 1) {
      toastMessage("error", "Images Cannot be null !");
      return false;
    }

    const data = {
      productName,
      weight,
      quantity,
      price,
      discount,
      description,
      freshTill,
      count: 0,
      calories,
      proteins,
      fats,
      curbs,
      gst,
    };
    return data;
  }, [gstList, images]);

  const handelFormSubmit = (event) => {
    event.preventDefault();
    const data = checkFormData();
    if (!data) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
        Accept: "*/*",
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("file", file);
    });
    console.log("Auth: ", auth.user.token);
    axios
      .post(UPLOAD_FILE_URL, formData, config)
      .then((res) => {
        console.log("Res image: ", [...res.data]);
        const responseImageUrls = res.data;
        toastMessage("success", "Images Uploaded !");
        addProduct(data, responseImageUrls);
      })
      .catch((reason) => {
        console.log(reason);
        toastMessage("error", "Images not Uploaded !");
      });
  };

  const removeImage = (id) => {
    const tempImages = images;
    const deletedImage = tempImages.splice(id, 1);
    toastMessage("warning", `${deletedImage[0].name} deleted !`);
    setImages([...tempImages]);
  };

  const addProduct = (data, tempImages) => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
        Accept: "*/*",
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
    };

    let productImagesDTOS = [];
    tempImages.forEach((image, id) => {
      productImagesDTOS.push({
        id,
        url: image,
      });
    });
    data.displayUrl = tempImages[0];
    data.productImagesDTOS = productImagesDTOS;

    const formData = form.current;

    console.log("Add Product data: ", data);

    axios
      .post(PRODUCT_URL, data, config)
      .then(function (response) {
        console.log("Add product response: ", response);
        toastMessage("success", "Product Added !");
        formData.reset();
        setImages([]);
        setUploadedImages([]);
      })
      .catch((error) => {
        const msg = error.response.data.message;
        console.error("Add Product response : ", msg);
        toastMessage("error", "Product Not Added !", msg);
        deleteUploadedImages(tempImages);
      })
      .then(function () {
        // always executed
      });
  };

  const deleteUploadedImages = (images) => {
    console.log(uploadedImages);
    images.forEach((image) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${auth.user.token}`);

      var formdata = new FormData();
      formdata.append("url", image);

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(DELETE_FILE_URL, requestOptions)
        .then((response) => {
          response.text();
          toastMessage("info", "Image deteled !");
        })
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });
  };

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
          <TagCloseButton onClick={() => removeImage(key)} />
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
        <form
          ref={form}
          onSubmit={handelFormSubmit}
          encType="multipart/form-data"
        >
          <Flex flexWrap="wrap">
            <FormInput name="productName" label="product Name" type="text" />
            <FormInput name="freshTill" label="fresh Till" type="text" />
          </Flex>

          <Divider mt="4" mb="4" />

          <Flex flexWrap="wrap">
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
                onChange={add_media}
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

          <Button type="submit" background="green.400" color="white">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}
