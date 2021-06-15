import { Box, Flex, Text, Center, Grid, Divider } from "@chakra-ui/layout";
import { TagLabel, Tag, TagCloseButton } from "@chakra-ui/tag";
import { useToast } from "@chakra-ui/toast";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { SERVER_URL, PRODUCT_URL } from "../Config/Apis";
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
  const [productId, setProductId] = useState([]);
  const [subPriceList, setsubPriceList] = useState();
  const [subscriptionList, setsubscriptionList] = useState([]);

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
    const url = SERVER_URL + "subscription";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    };
    console.log(editSubDetail, "update");
    axios
      .patch(url, editSubDetail, config)
      .then(function (response) {
        console.log(response, "response");
        if (response.status === 200) {
          history.push("/subscription");
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
  };

  console.log(editSubDetail, "editSubDetail");

  useEffect(() => {
    // GET SUBSCRIPTION BY ID
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
  }, [id, auth]);

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

  const onDeleteSub = (subPriceId, index) => {
    let deleteUrl = SERVER_URL + "subscription/price";
    const deleteConfig = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: subPriceId,
      },
    };
    axios
      .delete(deleteUrl, deleteConfig)
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
    setsubPriceList(subPriceId);
  };

  const productChangeHandler = (e) => {
    let p;
    e.map((x) => {
      p = products.filter((pro) => pro.id === x.value);
    });
    editSubDetail.productsList.push(p[0]);
    console.log(p, "product");
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
    <>
      {editSubscription && <EditSubscription id={subPriceList} view="true" />}
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
                      <Tr>
                        <Td color="blackAlpha.700">{data.price}</Td>
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
            {/* <Button
                  color="#2A9F85"
                  backgroundColor="transparent"
                  fontSize="2rem"
                  marginTop="3rem"
                  // onClick={() => addHandler()}
                >
                  <BsPlusSquare />
                </Button> */}
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
