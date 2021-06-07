import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Center, Grid } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/layout";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useContext, useEffect, useRef, useState } from "react";
import FormInput from "../Views/FormInput";
import { Textarea } from "@chakra-ui/textarea";
import { Checkbox } from "@chakra-ui/checkbox";
import {
  DELETE_FILE_URL,
  PRODUCT_URL,
  SERVER_URL,
  UPLOAD_FILE_URL,
} from "../Config/Apis";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router";
import { TagLabel } from "@chakra-ui/tag";
import { Tag } from "@chakra-ui/tag";
import { TagCloseButton } from "@chakra-ui/tag";
import { Context } from "../Data/Context";
import Select from "react-select";

const AddSubscription = () => {
  const { auth } = useContext(Context);
  const form = useRef();
  const history = useHistory();
  const [subscriptionName, setSubscriptionName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [status, setStatus] = useState(false);
  const [price, setPrice] = useState("");
  const [upto, setUpto] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [deliveryDay, setDeliveryDay] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);

  const toast = useToast();

  const statusList = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inavtive" },
  ];
  const productsList = [];

  {
    products.map((pro, key) => {
      productsList.push({ value: pro.id, label: pro.productName });
    });
  }

  const uptoList = [
    { value: 1, label: "ONE_MONTH" }
  ];
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

  //get product

  useEffect(() => {
    const url = PRODUCT_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        filter: {},
        ascSort: true,
        pageSize: 10,
        pageNumber: 1,
      },
    };
    axios
      .get(url, config)
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

  const statusHandler = (e) => {
    if(e.label == 'Active'){
      console.log('Active');
      setStatus(true);
    }
  }

  const onCreateSubscription = (image) => {
    const url = SERVER_URL + "subscription";

    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
        Accept: "*/*",
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
    };

    const productList = [];
    {
      productId.map((id) => {
        productList.push({ id: id });
      });
    }
    const delivery_days = (
      deliveryDay.length > 0 &&
      deliveryDay.reduce((str, day) => str + "-" + day)
    );
      console.log(image[0], "img");
    const body = {
      name: subscriptionName,
      description: description,
      url: image[0],
      active: status,
      subscriptionPricesList: [
        {
          price: +price,
          upto: upto,
          frequency: frequency[0],
          deliveryDays: delivery_days,
        },
      ],
      productsList: productList,
    };
    console.log(body, "body");
    axios
      .post(url, body, config)
      .then(function (response) {
        console.log(response, "response");
        if (response.status === 200) {
          toastMessage("success", "Subscription Added successful.");
          history.push("/subscription");
        }
      })
      .catch(function (error) {
        console.log(error);
        toastMessage("error", "Subscription not added");
        deleteUploadedImages(image);
      })
      .then(function () {
        // always executed
      });
  };

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

  const uploadedImages = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
        Accept: "*/*",
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    image.forEach((file) => {
      formData.append("file", file);
    });

    console.log("Auth: ", auth.user.token);
    axios
      .post(UPLOAD_FILE_URL, formData, config)
      .then((res) => {
        toastMessage("success", "Images Uploaded !");
        onCreateSubscription(res.data);
      })
      .catch((reason) => {
        console.log(reason);
        toastMessage("error", "Images not Uploaded !");
      });
  };

  const deleteUploadedImages = (images) => {
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

  const submitHandler = (event) => {
    event.preventDefault();
    uploadedImages();
  }

  return (
    <>
      {/* <Box>
        <Text m="2" fontSize="lg" fontWeight="semibold">
          ADD New Subscription
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
                name="Dinne Russell"
                label="Receiver Name"
                type="text"
              />
              <Box m="2">
                <Text
                  m="2"
                  fontSize="md"
                  fontWeight="semibold"
                  color="blackAlpha.800"
                >
                  Subscription Period
                </Text>
                <Select name="sp_dto" placeholder="Select Subscription Period">
                  {periodList.map((period, key) => {
                    return (
                      <option key={key} value={key}>
                        {period.description}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Flex>

            <Flex>
              <FormInput
                name="date"
                label="Subscription Date (dd/mm/yyyy)"
                type="date"
              />
              <Box m="2">
                <Text
                  m="2"
                  fontSize="md"
                  fontWeight="semibold"
                  color="blackAlpha.800"
                >
                  Frequency
                </Text>
                <Select name="frequency_dto" placeholder="Select frequency">
                  {frequencyList.map((frequency, key) => {
                    return (
                      <option key={key} value={key}>
                        {frequency.description}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Flex>

            <Flex>
              <Box m="2">
                <FormInput name="amount" label="Paid Amount" type="text" />
              </Box>
            </Flex>

            <Button type="submit">Add New Subscription</Button>
          </form>
        </Box>
      </Box> */}
      <Box>
        <Text m="2" fontSize="lg" fontWeight="semibold">
          ADD New Subscription
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
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <Flex>
              <FormInput
                name=""
                label="Name Of Subscription"
                type="text"
                onChange={(e) => setSubscriptionName(e.target.value)}
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
                    placeholder="Select Option"
                    options={statusList}
                    onChange={statusHandler}
                  />
                </div>
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
                placeholder=""
                onChange={(e) => setDescription(e.target.value)}
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
            </Flex>
            <Text mb="4">Subscription Price</Text>
            <Divider mt="4" mb="4" />
            <Flex>
              <FormInput
                label="Price"
                type="text"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
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
                  <Select
                    isMulti
                    options={frequencyList}
                    name="frequency"
                    onChange={(e) => setFrequency(e.map((x) => x.label))}
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
                  Up To
                </Text>
                <div style={{ fontSize: "1.3rem", width: "15rem" }}>
                  <Select
                    placeholder="Select Option"
                    options={uptoList}
                    onChange={(e) => setUpto(e.label)}
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
                  <Select
                    isMulti
                    options={delivery_days}
                    name="deliveryDays"
                    onChange={(e) => setDeliveryDay(e.map((x) => x.label))}
                  />
                </div>
              </Box>
            </Flex>

            <Button type="submit">Add New Subscription</Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddSubscription;
