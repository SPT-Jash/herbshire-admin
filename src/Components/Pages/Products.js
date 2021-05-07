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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactCharts from "../Views/ReactCharts";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";

export default function Products() {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const orderData = [
    {
      profileSrc: "https://bit.ly/dan-abramov",
      receiver: "Andrew",
      days: "Today",
      status: "Pending",
      date: "01 Apr 2020",
      amount: "75.65",
    },
    {
      profileSrc: "https://bit.ly/dan-abramov",
      receiver: "Andrew",
      days: "Today",
      status: "Cancel",
      date: "01 Apr 2020",
      amount: "75",
    },
    {
      profileSrc: "https://bit.ly/dan-abramov",
      receiver: "Andrew",
      days: "Today",
      status: "Pending",
      date: "01 Apr 2020",
      amount: "75.65",
    },
    {
      profileSrc: "https://bit.ly/dan-abramov",
      receiver: "Andrew",
      days: "Today",
      status: "Delivered",
      date: "01 Apr 2020",
      amount: "75",
    },
    {
      profileSrc: "https://bit.ly/dan-abramov",
      receiver: "Andrew",
      days: "Today",
      status: "Delivered",
      date: "01 Apr 2020",
      amount: "75.65",
    },
    {
      profileSrc: "https://bit.ly/dan-abramov",
      receiver: "Andrew",
      days: "Today",
      status: "Delivered",
      date: "01 Apr 2020",
      amount: "75",
    },
    {
      profileSrc: "https://bit.ly/dan-abramov",
      receiver: "Andrew",
      days: "Today",
      status: "Pending",
      date: "01 Apr 2020",
      amount: "75.65",
    },
  ];

  // useEffect(() => {
  //     const url = "http://api.herbshire.in/product";
  //     const data = {
  //         "id": 0,
  //         "productName": "Test Product 1",
  //         "weight": 1,
  //         "quantity": 1,
  //         "price": 1,
  //         "discount": 1,
  //         "description": "Description",
  //         "displayUrl": "https://picsum.photos/200",
  //         "freshTill": 0,
  //         "count": 0,
  //         "productImagesDTOS": [
  //             {
  //                 "id": 0,
  //                 "url": "https://picsum.photos/200"
  //             },
  //             {
  //                 "id": 1,
  //                 "url": "https://picsum.photos/200"
  //             }
  //         ],
  //         "gst_dto": {
  //             "id": 0,
  //             "cgst": 0,
  //             "sgst": 0,
  //             "igst": 0,
  //             "description": "description"
  //         }
  //     };
  //     axios.post(url, data)
  //         .then(function (response) {
  //             console.log(response);
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         })
  //         .then(function () {
  //             // always executed
  //         });
  // }, [])
  return (
    <Box w="100%" p="4">
      <Box flex="1" flexDirection="row" mt="8">
        <Text mb="2" fontSize="sm" fontWeight="semibold">
          ALL CUSTOMERS
        </Text>
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
        <Box h={isSmallerThan600 ? "300px" : "400px"}>
          <ReactCharts type={"normal"} />
        </Box>
        {/* <Chart/> */}
      </Box>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="#828194">Receiver</Th>
              <Th color="#828194">Days</Th>
              <Th color="#828194">Status</Th>
              <Th color="#828194">Date</Th>
              <Th color="#828194">Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderData.length < 1
              ? "No Data found :("
              : orderData.map((order, key) => {
                  const orderStatusColour =
                    order.status === "Delivered"
                      ? "#53C3AA"
                      : order.status === "Pending"
                      ? "#EEA662"
                      : "#FC6984";
                  return (
                    <Tr fontSize="sm" className="order-table-row">
                      <Td>
                        <Flex>
                          <Avatar
                            size="xs"
                            borderRadius="5"
                            name="Andrew"
                            src={order.profileSrc}
                          />
                          <Text ml="3" color="#828194" fontSize="large">
                            {order.receiver}
                          </Text>
                        </Flex>
                      </Td>
                      <Td color="#B7B7C2" fontSize="large">
                        {order.days}
                      </Td>
                      <Td color={orderStatusColour} fontSize="large">
                        {order.status}
                      </Td>
                      <Td color="#828194" fontSize="large" whiteSpace="nowrap">
                        {order.date}
                      </Td>
                      <Td color="#53C3AA" fontSize="large" whiteSpace="nowrap">
                        $ {order.amount}
                      </Td>
                    </Tr>
                  );
                })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
