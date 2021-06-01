import "./pages.css";
import React, { useContext, useState } from "react";
import { Context } from "../Data/Context";
import { Box, Flex, Spacer, Text, Stack, Center } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import ReactCharts from "../Views/ReactCharts";
import { BsChevronDown } from "react-icons/bs";
import Vector from "../../Vector.png";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Thead, Tr, Th } from "@chakra-ui/table";
import { Avatar } from "@chakra-ui/avatar";
import { Link } from "react-router-dom";

export default function Order() {
  const { setSelectedNavItem } = useContext(Context);
  setSelectedNavItem("orders");

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

  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");

  return (
    <Box w="90%">
      <Flex>
        <Text mb="2" fontSize="sm" fontWeight="semibold">
          Orders
        </Text>
        <Spacer />
        <Button backgroundColor="blue.200" as={Link} to="/add-order">
          Add Order
        </Button>
      </Flex>

      <Stack
        direction={isSmallerThan900 ? "column" : "row"}
        spacing="40px"
        ml="4"
        mt="4"
      >
        <Box w="250px">
          <Flex fontSize="sm" fontWeight="semibold">
            <Text color="#B7B7C2">Total Order</Text>
            <Spacer />
            <Text color="green.400">➚ +12.5%</Text>
          </Flex>
          <Box mt="2" mb="2" height="50px">
            <Text color="#828194" fontSize="large" fontWeight="semibold">
              19678
            </Text>
            <ReactCharts type={"small"} lineColor={"green"} />
          </Box>
        </Box>

        <Box w="250px">
          <Flex fontSize="sm" fontWeight="semibold">
            <Text color="#B7B7C2">Cancel Order</Text>
            <Spacer />
            <Text color="red.500">➘ -12.5%</Text>
          </Flex>
          <Text color="#828194" fontSize="large" fontWeight="semibold">
            19678
          </Text>
          <Box mt="2" mb="2" height="50px">
            <ReactCharts type={"small"} lineColor={"red"} />
          </Box>
        </Box>
      </Stack>

      <Flex mt="4" mr="4">
        <Text fontSize="large" fontWeight="semibold" color="#4C4C66">
          TODAY'S ORDER
        </Text>
        <Spacer />
        <Center mr="4">
          <img src={Vector} width="30px" />
        </Center>
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
      </Flex>

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
            {orderData.map((order, key) => {
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
