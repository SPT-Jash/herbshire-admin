import "./pages.css";
import React, { useContext, useEffect, useState } from "react";
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
import { SERVER_URL } from "../Config/Apis";
import axios from "axios";
import ViewAddress from "../Popup/ViewAddress";
import ViewOrder from "../Popup/ViewOrder";

export default function Order() {
  const { setSelectedNavItem, auth, viewAddress, setviewAddress,viewOrder, setviewOrder } = useContext(Context);
  setSelectedNavItem("orders");
  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
  const [orderData, setOrderData] = useState([]);
  const [addressDetail, setaddressDetail] = useState([]);
  const [ordersDetail, setordersDetail] = useState([]);

  useEffect(() => {
    const url = SERVER_URL + "order/admin/get_all";

    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    };

    axios
      .get(url, config)
      .then(function (response) {
        if (response.status === 200) {
          setOrderData(response.data.body);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [auth]);

  const onViewAddress = (add) => {
    setviewAddress(true);
    setaddressDetail([add]);
  };

  const onViewOrder = (add) => {
    setviewOrder(true);
    setordersDetail([add]);
  };

  return (
    <>
    {viewAddress && <ViewAddress add={addressDetail} view="true" />}
    {viewOrder && <ViewOrder add={ordersDetail} view="true" />}
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
              <Th color="#828194">Status</Th>
              <Th color="#828194">Date</Th>
              <Th color="#828194">Amount</Th>
              <Th color="#828194">Address</Th>
              <Th color="#828134">Order</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderData.map((order, key) => {
              {console.log(order, "order")}
              const orderStatusColour =
                order.paymentStatus === "COMPLETED"
                  ? "#53C3AA"
                  : order.paymentStatus === "PENDING"
                  ? "#EEA662"
                  : "#FC6984";
              return (
                <Tr fontSize="sm" className="order-table-row" key={key}>
                  <Td>
                    <Flex>
                      <Avatar
                        size="xs"
                        borderRadius="5"
                        name="Andrew"
                        src={order.profileSrc}
                      />
                      <Text ml="3" color="#828194" fontSize="large">
                        {order.address.fullName}
                      </Text>
                    </Flex>
                  </Td>
                  <Td color={orderStatusColour} fontSize="large">
                    {order.paymentStatus}
                  </Td>
                  <Td color="#828194" fontSize="larg">
                    {order.date}
                  </Td>
                  <Td color="#53C3AA" fontSize="large">
                    $ {order.amount}
                  </Td>
                  <Td color="#000" fontSize="large">
                    <Button onClick={(add) => onViewAddress(order.address)}>
                      View Address
                    </Button>
                  </Td>
                  <Td color="#000" fontSize="large">
                    <Button onClick={(add) => onViewOrder(order)}>
                      View Order
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
    </>
  );
}
