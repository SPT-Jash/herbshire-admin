import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { BsChevronDown } from "react-icons/bs";
import ReactCharts from "../Views/ReactCharts";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Avatar } from "@chakra-ui/avatar";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import avater from "../images/tt_avatar_small.jpg";
import axios from "axios";
import { SERVER_URL } from "../Config/Apis";
import { Context } from "../Data/Context";
import ViewAddress from "../Popup/ViewAddress";
import ViewOrder from "../Popup/ViewOrder";
import { useToast } from "@chakra-ui/toast";

const Customers = () => {
    const toast = useToast();
  const { auth, viewAddress, setviewAddress, viewOrder, setviewOrder } =
    useContext(Context);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [UserDetail, setUserDetail] = useState([]);
  const [addressDetail, setaddressDetail] = useState([]);
  const [ordersDetail, setordersDetail] = useState([]);

  const pageArray = [];
  for (let index = 0; index < totalPages; index++) {
    pageArray.push(index + 1);
  }

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
    const url = SERVER_URL + "user/search";
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
        console.log(data, "data");
        setUserDetail(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [currentPage]);

  const onViewAddress = (add) => {
    setviewAddress(true);
    setaddressDetail(add);
  };

  const onViewOrder = (add) => {
    setviewOrder(true);
    setordersDetail(add);
  };

  const HandleCustomerDelete = (key) => {
    const url = SERVER_URL + "user";
    const id = UserDetail[key].id;
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    };
    axios
      .delete(url, config)
      .then((res) => {
        console.log(res);
        if (res.success === 200) {
          toastMessage("success", "user deleted successfuly!");
        }
      })
      .catch((error) => {
        toastMessage("error", "user Not Deleted !");
      });
  };

  return (
    <>
      {viewAddress && <ViewAddress add={addressDetail} view="true" />}
      {viewOrder && <ViewOrder add={ordersDetail} view="true" />}
      <Box w="100%" p="4">
        <Box flex="1" flexDirection="row" mt="8">
          <Flex>
            <Text mb="2" fontSize="sm" fontWeight="semibold">
              ALL CUSTOMERS
            </Text>
            <Spacer />
            <Button backgroundColor="blue.200" as={Link} to="/add-customer">
              Add Customer
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
                <Text
                  fontSize="sm"
                  p="2.5"
                  bg="green.500"
                  borderRightRadius="md"
                >
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
      </Box>

      <Flex mt="4" mr="4">
        <Text fontSize="large" fontWeight="semibold" color="#4C4C66">
          Customers
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
              <Th color="blackAlpha.500">Customer</Th>
              <Th color="blackAlpha.500">Customer Name</Th>
              <Th color="blackAlpha.500">Phone</Th>
              <Th color="blackAlpha.500">Email</Th>
              <Th color="blackAlpha.500">Subscribe</Th>
              <Th color="blackAlpha.500">Address List</Th>
              <Th color="blackAlpha.500">Order List</Th>
              <Th color="blackAlpha.500">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {UserDetail.length < 1
              ? "No Data found :("
              : UserDetail.map((customer, key) => {
                  return (
                    <Tr fontSize="sm" className="order-table-row" key={key}>
                      <Td>
                        <Flex>
                          <Avatar
                            size="xs"
                            borderRadius="5"
                            name="Andrew"
                            src={avater}
                          />
                          <Text ml="3" color="#828194" whiteSpace="nowrap">
                            {key + 1}
                          </Text>
                        </Flex>
                      </Td>
                      <Td color="blackAlpha.700">{customer.fullName}</Td>
                      <Td color="blackAlpha.700">{customer.phone}</Td>
                      <Td color="blackAlpha.700">{customer.email}</Td>
                      <Td color="blackAlpha.700">{customer.subscribe}</Td>
                      <Td color="blackAlpha.700">
                        <Button
                          onClick={(add) => onViewAddress(customer.addressList)}
                        >
                          View Address
                        </Button>
                      </Td>
                      <Td color="blackAlpha.700">
                        <Button
                          onClick={(add) => onViewOrder(customer.ordersList)}
                        >
                          View Order
                        </Button>
                      </Td>
                      <Td as={HStack}>
                        <Button bg="transparent" color="green.400">
                          <MdEdit size="20px" />
                        </Button>
                        <Button
                          bg="transparent"
                          color="red.400"
                          onClick={() => HandleCustomerDelete(key)}
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
    </>
  );
};

export default Customers;
