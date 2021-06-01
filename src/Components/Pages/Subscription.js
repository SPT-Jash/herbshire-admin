import "./pages.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Data/Context";
import { Box, Flex, Spacer, Text, Stack } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import ReactCharts from "../Views/ReactCharts";
import { BsChevronDown } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Thead, Tr, Th } from "@chakra-ui/table";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import axios from "axios";
import { SUBSCRIPTION_SEARCH_URL } from "../Config/Apis";
import { useHistory } from "react-router";


export default function Subscription() {
  const history = useHistory();
  const { setSelectedNavItem, auth } = useContext(Context);
  setSelectedNavItem("subscription");

  // const [isSmallerThan700] = useMediaQuery("(max-width: 700px)")
  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
  const [isSmallerThan925] = useMediaQuery("(max-width: 925px)");

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const newSubscribers = [
    { profileSrc: "https://bit.ly/dan-abramov", name: "Andrew" },
    { profileSrc: "https://bit.ly/dan-abramov", name: "Andrew" },
    { profileSrc: "https://bit.ly/dan-abramov", name: "Andrew" },
    { profileSrc: "https://bit.ly/dan-abramov", name: "Andrew" },
    { profileSrc: "https://bit.ly/dan-abramov", name: "Andrew" },
    { profileSrc: "https://bit.ly/dan-abramov", name: "Andrew" },
    { profileSrc: "https://bit.ly/dan-abramov", name: "Andrew" },
    { profileSrc: "https://bit.ly/dan-abramov", name: "Andrew" },
  ];
  const onAddSubsc = () => {
    history.push('/add-subscription')
  }


  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${auth.user.token}`,
    //   },
    //   params: {
    //     filter: {},
    //     ascSort: true,
    //     pageSize: 10,
    //     pageNumber: currentPage,
    //   },
    // };
    // axios
    //   .get(SUBSCRIPTION_SEARCH_URL, config)
    //   .then(function (response) {
    //     const data = response.data.body.content;
    //     setTotalPages(response.data.body.totalPages);
    //     console.log(data);
    //     setProducts(data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
  }, []);

  return (
    <Box w="100%">
      <Stack direction={isSmallerThan925 ? "column" : "row"} mt="4">
        <Flex direction="column" mt="4">
          <Text mb="2" fontSize="sm" fontWeight="semibold">
            SUBSCRIPTION
          </Text>
          <Stack
            direction={isSmallerThan900 ? "column" : "row"}
            spacing="40px"
            ml="4"
            mt="4"
            mr="4"
          >
            <Box w="250px">
              <Flex fontSize="sm" fontWeight="semibold">
                <Text color="#B7B7C2">Subscribe</Text>
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
                <Text color="#B7B7C2">Not Subscribers</Text>
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
        </Flex>
        <Spacer />
        <Box w="350px">
          <Text fontSize="sm" fontWeight="semibold" mt="4">
            New Subscribe
          </Text>
          <Flex mt="6" mb="2" height="50px">
            {newSubscribers.map((subscriber, key) => {
              if (key < 4) {
                return (
                  <Box>
                    <Avatar
                      size="md"
                      mr="2"
                      name={subscriber.name}
                      src={subscriber.profileSrc}
                    />
                    <Text fontSize="xs">{subscriber.name}</Text>
                  </Box>
                );
              } else {
                return "";
              }
            })}
            <AvatarGroup max={1}>
              {newSubscribers.map((subscriber, key) => {
                if (key > 4) {
                  return (
                    <Avatar
                      size="md"
                      mr="2"
                      name={subscriber.name}
                      src={subscriber.profileSrc}
                    />
                  );
                } else {
                  return "";
                }
              })}
            </AvatarGroup>
          </Flex>
          <Flex mt="5">
            <Button onClick={onAddSubsc}>Add Subscription</Button>
          </Flex>
        </Box>
      </Stack>

      <Box w="90%">
        <Flex mt="4" mr="4">
          <Text fontSize="large" fontWeight="semibold" color="#4C4C66">
            SUBSCRIBERS
          </Text>
          <Spacer />
          {/* <Center mr="4"><img src={Vector} width="30px" /></Center> */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<BsChevronDown />}
              borderColor="#E2E2E8"
              p="2"
            >
              Sort
            </MenuButton>
            <MenuList fontSize="sm">
              <MenuItem>Days</MenuItem>
              <MenuItem>Week</MenuItem>
              <MenuItem>Month</MenuItem>
              <MenuItem>Year</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Box overflow="auto" className="hide-scroll">
          {
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="#828194">Receiver</Th>
                  <Th color="#828194">Subscription</Th>
                  <Th color="#828194">Date</Th>
                  <Th color="#828194">Frequency</Th>
                  <Th color="#828194">Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {subscriptionData.map((subscription, key) => {
                  return (
                    <Tr fontSize="sm" className="order-table-row" key={key}>
                      <Td>
                        <Flex>
                          <Avatar
                            size="xs"
                            borderRadius="5"
                            name="Andrew"
                            src={subscription.profileSrc}
                          />
                          <Text ml="3" color="#828194" fontSize="large">
                            {subscription.receiver}
                          </Text>
                        </Flex>
                      </Td>
                      <Td color="#B7B7C2" fontSize="large">
                        {subscription.period}
                      </Td>
                      <Td color="#B7B7C2" fontSize="large" whiteSpace="nowrap">
                        {subscription.date}
                      </Td>
                      <Td color="#B7B7C2" fontSize="large">
                        {subscription.frequency}
                      </Td>
                      <Td color="#53C3AA" fontSize="large" whiteSpace="nowrap">
                        $ {subscription.amount}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          }
        </Box>
      </Box>
    </Box>
  );
}
