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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import ReactCharts from "../Views/ReactCharts";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrDeliver } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Context } from "../Data/Context";

export default function Products() {
  const { auth } = useContext(Context);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const url = "https://api.herbshire.in/product";
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
        console.log(data);
        setProducts(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [currentPage]);

  const pageArray = [];
  for (let index = 0; index < totalPages; index++) {
    pageArray.push(index + 1);
  }

  console.log(totalPages, pageArray);

  return (
    <Box w="100%" p="4">
      <Box flex="1" flexDirection="row" mt="8">
        <Flex>
          <Text mb="2" fontSize="sm" fontWeight="semibold">
            ALL CUSTOMERS
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
      <Box overflow="auto" className="hide-scroll">
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
            </Tr>
          </Thead>
          <Tbody>
            {products.length < 1
              ? "No Data found :("
              : products.map((product, key) => {
                  return (
                    <Tr fontSize="sm" className="order-table-row">
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
                      <Td color="blackAlpha.700">{product.weight}</Td>
                      <Td color="blackAlpha.700">{product.quantity}</Td>
                      <Td color="blackAlpha.700">{product.price}</Td>
                      <Td color="blackAlpha.700">{product.discount}</Td>
                      <Td color="blackAlpha.700">{product.freshTill}</Td>
                      <Td color="blackAlpha.700">{product.count}</Td>
                      <Td color="blackAlpha.700">{product.calories}</Td>
                      <Td color="blackAlpha.700">{product.proteins}</Td>
                      <Td color="blackAlpha.700">{product.fats}</Td>
                      <Td color="blackAlpha.700">{product.curbs}</Td>
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
