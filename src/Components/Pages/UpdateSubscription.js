import { Box, Flex, Text, Center, Grid, Divider } from "@chakra-ui/layout";
import { TagLabel, Tag, TagCloseButton } from "@chakra-ui/tag";
import { useToast } from "@chakra-ui/toast";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { SERVER_URL, PRODUCT_URL } from "../Config/Apis";
import { Context } from "../Data/Context";
import FormInput from "../Views/FormInput";
import Select from "react-select";

const UpdateSubscription = () => {
  const { id } = useParams();
  const { auth } = useContext(Context);
  const form = useRef();
  const [image, setImage] = useState([]);
  const [editSubDetail, setEditSubDetail] = useState([]);
  const [sub, setSub] = useState([]);
  const toast = useToast();
  const [productList, setproductList] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);

  const statusList = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];

  const productsList = [];
  {
    products.map((pro, key) => {
      productsList.push({ value: pro.id, label: pro.productName });
    });
  }

  const uptoList = [{ value: 1, label: "ONE_MONTH" }];
  const frequencyList = [
    { value: 1, label: "ONCE_A_WEEK" },
    { value: 2, label: "TWICE_A_WEEK" },
  ];
  const delivery_days = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wensday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ];

  const toastMessage = (status, msg) => {
    toast({
      description: msg,
      status: status,
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    const url = SERVER_URL + "subscription";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: id,
      },
    };
    axios
      .get(url, config)
      .then(function (response) {
        // console.log(response);
        setEditSubDetail(response.data.body);
        setproductList(response.data.body.productsList);
        setSub(response.data.body.subscriptionPricesList[0]);
        setImage([]);
        console.log(editSubDetail, "edit");
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    const url2 = PRODUCT_URL + "/search";
    const config2 = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        filter: {},
        ascSort: true,
        pageSize: 100000,
        pageNumber: 1,
      },
    };
    axios
      .get(url2, config2)
      .then(function (response) {
        const data = response.data.body.content;
        setProducts(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [auth]);

  const add_media = (event) => {
    event.preventDefault();
    const files = event.target.files;
    const tempImages = [...image];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      let duplicate = false;
      if (!duplicate) tempImages.push(file);
    }
    setImage([...tempImages]);
    console.log("Add media", tempImages);
    return;
  };

  const removeImage = (id) => {
    const tempImages = image;
    const deletedImage = tempImages.splice(id, 1);
    toastMessage("warning", `${deletedImage[0].name} deleted !`);
    setImage([...tempImages]);
  };

  const removeProduct = (key) => {
    const tempProduct = productList;
    const deletedProduct = tempProduct.splice(key, 1);
    toastMessage("warning", `${deletedProduct[0].productName} deleted !`);
    setproductList([...tempProduct]);
  };

  const removeStatus = () => {
    toastMessage("warning", "Status deleted !");
    setEditSubDetail((prev) => ({ ...prev, active: null }));
  };

  const removeFrequency = () => {
    toastMessage("warning", "Frequency deleted !");
    setSub((prev) => ({ ...prev, frequency: null }));
    // setEditSubDetail({...editSubDetail, subscriptionPricesList: sub})
  };

  const SelectedImage = (
    <Flex display="block">
      {image.map((img, key) => (
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
      {console.log(editSubDetail, "edit", sub)}
      <Text m="2" fontSize="lg" fontWeight="semibold">
        Edit Subscription
      </Text>
      <Box
        w="100%"
        p="4"
        borderWidth="thin"
        borderRadius="5"
        borderColor="blackAlpha.300"
      >
        <form ref={form} encType="multipart/form-data">
          <Flex>
            <FormInput
              label="Name Of Subscription"
              type="text"
              value={editSubDetail.name}
              onChange={(e) =>
                setEditSubDetail((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Availability Status
              </Text>
              <div style={{ fontSize: "1.1rem", width: "10rem" }}>
                <Select
                  name="status"
                  options={statusList}
                  onChange={(e) =>
                    e.label === "Active"
                      ? setEditSubDetail({ ...editSubDetail, active: true })
                      : setEditSubDetail({ ...editSubDetail, active: false })
                  }
                />
              </div>
            </Box>
            <Box ml="4">
              {editSubDetail.active !== null && (
                <Tag
                  size="lg"
                  h="50px"
                  borderRadius="10px"
                  variant="solid"
                  colorScheme="green"
                  m="2"
                >
                  <TagLabel>
                    {editSubDetail.active
                      ? "Active"
                      : editSubDetail.active !== null && "Inactive"}
                  </TagLabel>
                  <TagCloseButton onClick={() => removeStatus()} />
                </Tag>
              )}
            </Box>
          </Flex>
          <Grid m="2">
            <Text
              m="2"
              fontSize="md"
              fontWeight="semibold"
              color="blackAlpha.800"
            >
              Description
            </Text>
            <Textarea
              mb="3"
              value={editSubDetail.description}
              onChange={(e) =>
                setEditSubDetail({
                  ...editSubDetail,
                  description: e.target.value,
                })
              }
            />
          </Grid>

          <Flex>
            <Box m="2">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Select subscription image
              </Text>
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
                    onChange={add_media}
                  />

                  <Text
                    position="absolute"
                    zIndex="-1"
                    fontSize="lg"
                    color="blackAlpha.500"
                  >
                    Drag &amp; Drop/Click Here
                  </Text>
                </Center>
              </Flex>
              {SelectedImage}
            </Box>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                List of Product
              </Text>
              <div style={{ fontSize: "1.3rem", width: "15rem" }}>
                <Select
                  isMulti
                  options={productsList}
                  name="product"
                  onChange={(e) => setProductId(e.map((x) => x.value))}
                />
              </div>
            </Box>
            <Box ml="4">
              {productList.map((list, key) => (
                <Tag
                  size="lg"
                  h="50px"
                  key={key}
                  borderRadius="10px"
                  variant="solid"
                  colorScheme="green"
                  m="2"
                >
                  <TagLabel>{list.productName}</TagLabel>
                  <TagCloseButton onClick={() => removeProduct(key)} />
                </Tag>
              ))}
            </Box>
          </Flex>
          <Text mb="4">Subscription Price</Text>
          <Divider mt="4" mb="4" />
          <Flex>
            <FormInput
              label="Price"
              type="text"
              name="price"
              value={sub.price}
              onChange={(e) => setSub(e.target.value)}
            />
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Frequency
              </Text>
              <div style={{ fontSize: "1.3rem", width: "16rem" }}>
                <Select isMulti options={frequencyList} name="frequency" />
              </div>
            </Box>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Up To
              </Text>
              <div style={{ fontSize: "1.3rem", width: "15rem" }}>
                <Select
                  placeholder="Select Option"
                  options={uptoList}
                  defaultValue={uptoList[0]}
                />
              </div>
            </Box>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Delivery Days
              </Text>
              <div style={{ fontSize: "1.3rem", width: "13rem" }}>
                <Select isMulti options={delivery_days} name="deliveryDays" />
              </div>
            </Box>
          </Flex>

          <Flex marginLeft="15rem">
            <Box ml="4">
              {sub.frequency !== null && (
                <Tag
                  size="lg"
                  h="50px"
                  borderRadius="10px"
                  variant="solid"
                  colorScheme="green"
                  m="2"
                >
                  <TagLabel>{sub.frequency}</TagLabel>
                  <TagCloseButton onClick={() => removeFrequency()} />
                </Tag>
              )}
            </Box>
            <Box ml="23rem">
              {sub.deliveryDays.split("-").map((day, key) => {
                return (
                  <Tag
                  key={key}
                  size="lg"
                  h="50px"
                  borderRadius="10px"
                  variant="solid"
                  colorScheme="green"
                  m="2"
                >
                  <TagLabel>{day}</TagLabel>
                  <TagCloseButton  />
                </Tag>
                );
              })}
            </Box>
          </Flex>
          <Button type="submit">Edit Subscription</Button>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateSubscription;
