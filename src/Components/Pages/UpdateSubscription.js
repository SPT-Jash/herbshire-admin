import { Box, Flex, Text, Center, Grid, Divider } from "@chakra-ui/layout";
import { TagLabel, Tag, TagCloseButton } from "@chakra-ui/tag";
import { useToast } from "@chakra-ui/toast";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  PRODUCT_URL,
  SUB_UPDATE_URL,
  SUB_ID_URL,
  SUB_PRICE_DELETE_URL,
  SUB_PRICE_ADD_URL,
  UPLOAD_FILE_URL,
} from "../Config/Apis";
import { Context } from "../Data/Context";
import FormInput from "../Views/FormInput";
import Select from "react-select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import EditSubscription from "../Popup/EditSubscriptionPrice";
import { BsPlusSquare } from "react-icons/bs";

const UpdateSubscription = () => {
  const { id } = useParams();
  const history = useHistory();
  const { auth, editSubscription, seteditSubscription } = useContext(Context);
  const [image, setImage] = useState([]);
  const [editSubDetail, setEditSubDetail] = useState({});
  const toast = useToast();
  const [productList, setproductList] = useState([]);
  const [products, setProducts] = useState([]);
  const [subPriceId, setsubPriceId] = useState([]);
  const [subscriptionList, setsubscriptionList] = useState([]);
  const [subPriceList, setSubPriceList] = useState();

  const statusList = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];

  const productsListDisplay = [];
  {
    products.map((pro, key) => {
      productsListDisplay.push({ value: pro.id, label: pro.productName });
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
    { value: 3, label: "Wednesday" },
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

  const onUpdateSubscription = () => {
    // EDIT SUBSCRIPTION
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    };
    console.log(editSubDetail, "update");
    axios
      .patch(SUB_UPDATE_URL, editSubDetail, config)
      .then(function (response) {
        console.log(response, "response");
        if (response.status === 200) {
          history.push("/subscription");
          toastMessage("success", "Subscription Edit Successful.");
        } else {
          toastMessage("error", "Error while Editing Subscription!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const setState = (sub) => {
    setEditSubDetail(sub);
    setsubscriptionList(sub.subscriptionPricesList);
  };

  console.log(editSubDetail, "editSubDetail");

  useEffect(() => {
    // GET SUBSCRIPTION BY ID
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: id,
      },
    };
    axios
      .get(SUB_ID_URL, config)
      .then(function (response) {
        // console.log(response);
        setEditSubDetail(response.data.body);
        setsubscriptionList(response.data.body.subscriptionPricesList);
        setproductList(response.data.body.productsList);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    // GET PRODUCT LIST
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
      .get(PRODUCT_URL, config2)
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
  }, [auth, id]);

  const removeProduct = (key) => {
    const tempProduct = productList;
    const deletedProduct = tempProduct.splice(key, 1);
    toastMessage("warning", `${deletedProduct[0].productName} deleted !`);
    setproductList([...tempProduct]);
  };

  const onDeleteSub = (subPriceId, index) => {
    const deleteConfig = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: subPriceId,
      },
    };
    axios
      .delete(SUB_PRICE_DELETE_URL, deleteConfig)
      .then(function (response) {
        console.log(response, "delete response");
        if (response.status === 200) {
          const temp = subscriptionList;
          temp.splice(index, 1);
          setsubscriptionList([...temp]);
          toastMessage("success", "Subscription price list delete successful.");
        } else {
          toastMessage("error", "Subscription price list not deleted.");
        }
      })
      .catch(function (error) {
        console.log(error.response.message);
        toastMessage("error", "Subscription price list failed to delete.");
      })
      .then(function () {
        // always executed
      });
  };

  const onEditSub = (subPriceId) => {
    seteditSubscription(true);
    setsubPriceId(subPriceId);
  };

  const productChangeHandler = (e) => {
    let p;
    e.map((x) => {
      p = products.filter((pro) => pro.id === x.value);
    });
    editSubDetail.productsList.push(p[0]);
    console.log(p, "product");
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
    console.log(tempImages, "nkk");
  };

  const uploadedImage = () => {
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

    axios
      .post(UPLOAD_FILE_URL, formData, config)
      .then((res) => {
        console.log("imgres", res);
        if (res.status === 200) {
          toastMessage("success", "Images Uploaded !");
          const imgurl = res.data[0];
          // setUploadedImages(imgurl);
          setEditSubDetail({ ...editSubDetail, imageUrl: imgurl });
        }
      })
      .catch((reason) => {
        console.log(reason);
        toastMessage("error", "Images not Uploaded !");
      });
  };

  const SelectedImage = (
    editSubDetail.imageUrl && (<Flex display="block">
       <Tag
        size="lg"
        p="3"
        borderRadius="10px"
        variant="solid"
        colorScheme="green"
        m="2"
      >
        <Box>
          <img
            height="180px"
            width="180px"
            src={editSubDetail.imageUrl}
            alt="product"
          />
        </Box>
      </Tag>
    </Flex>)
  );

  const deliveryDaysHandler = (e) => {
    const days = e.map((x) => x.label);
    const daystr =
      days.length > 0 && days.reduce((str, day) => str + "-" + day);
    setSubPriceList({ ...subPriceList, deliveryDays: daystr });
  };

  const addHandler = () => {
    console.log(subPriceList, "sub");
    setSubPriceList({
      price: "",
      frequency: "",
      upto: "",
      deliveryDays: "",
      subscriptionDTO: {
        id: editSubDetail.id,
      },
    });
  };


  //create pricelist

  const addPriceListHandler = () => {
    console.log(subPriceList, "price");

    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      }
    }

    axios
      .post(SUB_PRICE_ADD_URL, subPriceList, config)
      .then((res) => {
        if(res.status === 200){
          setEditSubDetail(res.data.body);
          setsubscriptionList(res.data.body.subscriptionPricesList);
          setSubPriceList('');
          toastMessage("success","Subscription price list added successfully");
        }
      })
      .catch((error) => {
        toastMessage("error","Subscription price list not added!");
      })
      .then(()=> {
        //always execute
      })
  };

  return (
    <>
      {editSubscription && (
        <EditSubscription id={subPriceId} view="true" setState={setState} />
      )}
      <Box>
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
                  <TagCloseButton />
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
                    onChange={add_media}
                    multiple
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
            <Button marginTop="3.2rem" onClick={() => uploadedImage()}>ADD</Button>
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
                  options={productsListDisplay}
                  name="product"
                  onChange={(e) => productChangeHandler(e)}
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

          <Box overflow="auto">
            <Table variant="simple" fontSize="1rem">
              <Thead>
                <Tr>
                  <Th color="blackAlpha.500">Price</Th>
                  <Th color="blackAlpha.500">Frequency</Th>
                  <Th color="blackAlpha.500">Up To</Th>
                  <Th color="blackAlpha.500">Delivery Days</Th>
                  <Th color="blackAlpha.500">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {subscriptionList ? (
                  subscriptionList.map((data, index) => (
                    <>
                      <Tr key={index}>
                        <Td color="blackAlpha.700">
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            ₹
                          </span>{" "}
                          {data.price}
                        </Td>
                        <Td color="blackAlpha.700">{data.frequency}</Td>
                        <Td color="blackAlpha.700">{data.upto}</Td>
                        <Td color="blackAlpha.700">{data.deliveryDays}</Td>
                        <Td color="blackAlpha.700">
                          <Button
                            bg="transparent"
                            color="green.400"
                            onClick={(subPriceId) => onEditSub(data.id)}
                          >
                            <MdEdit size="20px" />
                          </Button>
                          <Button
                            bg="transparent"
                            color="red.400"
                            onClick={(subPriceId) =>
                              onDeleteSub(data.id, index)
                            }
                          >
                            <MdDeleteForever size="25px" color="red" />
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  ))
                ) : (
                  <h2>Add address to proceed payment.</h2>
                )}
              </Tbody>
            </Table>
          </Box>
          <Box>
            {subPriceList && (
              <Flex flexWrap="wrap">
                <FormInput
                  label="Price"
                  symbol="₹"
                  type="number"
                  name="price"
                  onChange={(event) =>
                    setSubPriceList({
                      ...subPriceList,
                      price: event.target.value,
                    })
                  }
                  value={subPriceList.price}
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
                      options={frequencyList}
                      name="frequency"
                      onChange={(e) =>
                        setSubPriceList({ ...subPriceList, frequency: e.label })
                      }
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
                      name="upto"
                      options={uptoList}
                      onChange={(e) =>
                        setSubPriceList({ ...subPriceList, upto: e.label })
                      }
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
                  <div style={{ fontSize: "1.3rem", width: "14rem" }}>
                    <Select
                      isMulti
                      options={delivery_days}
                      name="deliveryDays"
                      onChange={(e) => deliveryDaysHandler(e)}
                    />
                  </div>
                </Box>
                <Button
                  backgroundColor="#2A9F85"
                  color="#fff"
                  marginTop="3.3rem"
                  onClick={() => addPriceListHandler()}
                >
                  Add
                </Button>
              </Flex>
            )}
            <Button
              color="#2A9F85"
              backgroundColor="transparent"
              fontSize="1.5rem"
              marginTop="3rem"
              onClick={() => addHandler()}
            >
              <BsPlusSquare />
            </Button>
          </Box>
          <Button type="submit" onClick={() => onUpdateSubscription()}>
            Edit Subscription
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UpdateSubscription;
