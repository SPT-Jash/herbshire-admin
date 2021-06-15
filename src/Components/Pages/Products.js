import "./pages.css";
import {
  Box,
  Spacer,
  Center,
  Flex,
  MenuItem,
  MenuList,
  useMediaQuery,
  Button,
  Menu,
  Text,
  Divider,
  MenuButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import ReactCharts from "../Views/ReactCharts";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { GrDeliver } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Context } from "../Data/Context";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { PRODUCT_DELETE_URL, PRODUCT_URL } from "../Config/Apis";

export default function Products() {

  const history = useHistory();
  const { auth } = useContext(Context);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const [refrest, setrefrest] = useState();
  // const [productUpdateButtonHover, setProductUpdateButtonHover] = useState(-1);
  // const [productDeleteButtonHover, setProductDeleteButtonHover] = useState(-1);

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

  useEffect(() => {
    const url = PRODUCT_URL + "/search";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        filter: {},
        ascSort: true,
        pageSize: 10,
        pageNumber: currentPage,
      },
    };
    axios
      .get(url, config)
      .then(function (response) {
        const data = response.data.body.content;
        setTotalPages(response.data.body.totalPages);
        console.log(response);
        setProducts(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [auth, currentPage, refrest]);

  const pageArray = [];
  for (let index = 0; index < totalPages; index++) {
    pageArray.push(index + 1);
  }

  const HandleProductDelete = (key) => {
    const id = products[key].id;
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    };
    axios
      .delete(PRODUCT_DELETE_URL + id, config)
      .then((res) => {
        const resData = res.data;
        if (resData.success) {
          toastMessage("success", `${resData.body.productName} Deleted !`);
          const tempProducts = products;
          tempProducts.splice(key, 1);
          setProducts([...tempProducts]);
        }
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        if (errorMessage === "Foreign key violation") {
          toastMessage(
            "error",
            "Product Not Deleted !",
            "Product is subscribed by users."
          );
        } else {
          toastMessage("error", "Product Not Deleted !");
        }
      });
  };

  const countHandler = (id) => {
    if (products[id].count) {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          Accept: "*/*",
          "content-type": "application/json",
          "access-control-allow-origin": "*",
        },
      };

      const count = 0;
      const body = { ...products[id], count: count };
      console.log("body inside handler", body);

      axios
        .put(PRODUCT_URL, body, config)
        .then(function (response) {
          console.log("response: ", response);
          toastMessage("success", "successfully you make product unavailable");
          setrefrest({});
        })
        .catch((error) => {
          const msg = error.response.data.message;
          console.error("Add Product response : ", msg);
          toastMessage("error", "failed to make product unavailable", msg);
        })
        .then(function () {
          // always executed
        });
    } else {
      toastMessage("info", "it is already unavailable");
    }
  };

  const editProduct = (id) => {
    history.push(`/update-product/${id}`);
  }

  return (
    <Box w="100%" p="4">
      <Box flex="1" flexDirection="row" mt="8">
        <Flex>
          <Text mb="2" fontSize="sm" fontWeight="semibold">
            ALL PRODUCTS
          </Text>
          <Spacer />
          <Button backgroundColor="blue.200" as={Link} to="/add-products">
            Add Product
          </Button>
        </Flex>
        <Flex pt="2" pb="1">
          <Flex ml="5">
            <Center>
              <Box
                width="2"
                height="2"
                borderColor={"red"}
                borderWidth="thick"
                borderRadius="20px"
              />
              <Text fontSize="md" ml="2">
                Tomato
              </Text>
            </Center>
          </Flex>

          <Spacer />

          {isSmallerThan600 ? (
            <Box mr="2">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<BsChevronDown />}
                  borderColor="#E2E2E8"
                  p="2"
                >
                  Year
                </MenuButton>
                <MenuList fontSize="sm">
                  <MenuItem>Days</MenuItem>
                  <MenuItem>Week</MenuItem>
                  <MenuItem>Month</MenuItem>
                  <MenuItem>Year</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <Flex
              borderWidth="thin"
              borderRadius="md"
              borderColor="#E2E2E8"
              mr="4"
            >
              <Text fontSize="sm" p="2.5" pr="2.5" borderLeftRadius="md">
                Days
              </Text>{" "}
              <Divider orientation="vertical" />
              <Text fontSize="sm" p="2.5" pr="2.5">
                Week
              </Text>{" "}
              <Divider orientation="vertical" />
              <Text fontSize="sm" p="2.5" pr="2.5">
                Month
              </Text>{" "}
              <Divider orientation="vertical" />
              <Text fontSize="sm" p="2.5" bg="green.500" borderRightRadius="md">
                Year
              </Text>
            </Flex>
          )}

          <Box>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<BsChevronDown />}
                borderColor="#E2E2E8"
                p="2"
              >
                2020-2021
              </MenuButton>
              <MenuList fontSize="sm">
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Box h={isSmallerThan600 ? "300px" : "300px"}>
          <ReactCharts type={"normal"} />
        </Box>
        {/* <Chart/> */}
      </Box>
      <Flex mt="4" mr="4">
        <Text fontSize="large" fontWeight="semibold" color="#4C4C66">
          Products
        </Text>
        <Spacer />
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<BsChevronDown />}
            borderColor="#E2E2E8"
            p="2"
          >
            {currentPage}
          </MenuButton>
          <MenuList fontSize="sm" onSelect={(e) => console.log(e.target.value)}>
            {pageArray.map((page) => {
              console.log(page);
              return (
                <MenuItem onClick={() => setCurrentPage(page)}>{page}</MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>
      <Box overflow="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="blackAlpha.500">productName</Th>
              <Th color="blackAlpha.500">weight</Th>
              <Th color="blackAlpha.500">quantity</Th>
              <Th color="blackAlpha.500">price</Th>
              <Th color="blackAlpha.500">discount</Th>
              <Th color="blackAlpha.500">freshTill</Th>
              <Th color="blackAlpha.500">count</Th>
              <Th color="blackAlpha.500">calories</Th>
              <Th color="blackAlpha.500">proteins</Th>
              <Th color="blackAlpha.500">fats</Th>
              <Th color="blackAlpha.500">curbs</Th>
              <Th color="blackAlpha.500">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.length < 1
              ? "No Data found :("
              : products.map((product, key) => {
                return (
                  <Tr fontSize="sm" className="order-table-row" key={key}>
                    <Td>
                      <Flex>
                        <Avatar
                          size="xs"
                          borderRadius="5"
                          name="Andrew"
                          src={product.displayUrl}
                        />
                        <Text ml="3" color="#828194" whiteSpace="nowrap">
                          {product.productName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td color="blackAlpha.700">{product.weight} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>G</span></Td>
                    <Td color="blackAlpha.700">{product.quantity} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>Pieces</span></Td>
                    <Td color="blackAlpha.700"><span style={{ color: "#00b6a1", fontWeight: "bold" }}>₹</span> {product.price}</Td>
                    <Td color="blackAlpha.700">{product.discount} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>%</span></Td>
                    <Td color="blackAlpha.700">{product.freshTill} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>Days</span></Td>
                    <Td color="blackAlpha.700">{product.count}</Td>
                    <Td color="blackAlpha.700">{product.calories} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>g</span></Td>
                    <Td color="blackAlpha.700">{product.proteins} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>g</span></Td>
                    <Td color="blackAlpha.700">{product.fats} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>g</span></Td>
                    <Td color="blackAlpha.700">{product.curbs} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>g</span></Td>
                    <Td as={HStack}>
                      <Button onClick={() => countHandler(key)} disabled={product.count ? false : true}>
                        {product.count ? "Unavailable" : "Available"}
                      </Button>
                      <Button
                        bg="transparent"
                        color="green.400"
                        onClick={(id) => editProduct(product.id)}
                      >
                        <MdEdit size="20px" />
                      </Button>
                      <Button
                        bg="transparent"
                        color="red.400"
                        onClick={() => HandleProductDelete(key)}
                      >
                        <MdDeleteForever size="25px" color="red" />
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
      Trending Products
      <Stack spacing="20px" ml="4" pt="4">
        <Flex alignItems="center">
          <Flex
            alignItems="center"
            justifyContent="center"
            h="50px"
            w="50px"
            borderRadius="5"
            bgGradient="linear(to-r, #FF7979, #FCAE73)"
            className="delivery-icon"
          >
            <GrDeliver />
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            w="100%"
            h="48px"
            ml="4"
          >
            <Slider
              aria-label="slider-ex-1"
              defaultValue={21}
              isReadOnly={true}
              mt="2"
            >
              <SliderTrack height="3" borderRadius="lg">
                <SliderFilledTrack
                  borderRadius="lg"
                  bgGradient="linear(to-r, #FF7979, #FCAE73)"
                />
              </SliderTrack>
            </Slider>
            <Text mt="2" fontSize="md" color="#B7B7C2">
              Deliveries
            </Text>
          </Flex>
          <Text
            alignSelf="flex-start"
            ml="2"
            color="#828194"
            fontSize="md"
            mt="1"
          >
            {21}%
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Flex
            alignItems="center"
            justifyContent="center"
            h="50px"
            w="50px"
            borderRadius="5"
            bgGradient="linear(to-r, #24DABE, #45AFEE)"
            className="shopping-cart-icon"
          >
            <FaShoppingCart />
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            w="100%"
            h="48px"
            ml="4"
          >
            <Slider
              aria-label="slider-ex-1"
              defaultValue={86}
              isReadOnly={true}
              mt="2"
            >
              <SliderTrack height="3" borderRadius="lg">
                <SliderFilledTrack
                  borderRadius="lg"
                  bgGradient="linear(to-r, #24DABE, #45AFEE)"
                />
              </SliderTrack>
            </Slider>
            <Text mt="2" fontSize="md" color="#B7B7C2">
              Pending
            </Text>
          </Flex>
          <Text
            alignSelf="flex-start"
            ml="2"
            color="#828194"
            fontSize="md"
            mt="1"
          >
            {86}%
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
}
