import "./pages.css";
import React, { useContext, useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Context } from "../Data/Context";
import { Box, Flex, Spacer, Text, Stack, HStack } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import ReactCharts from "../Views/ReactCharts";
import { BsChevronDown } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Thead, Tr, Th } from "@chakra-ui/table";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import axios from "axios";
import { SERVER_URL } from "../Config/Apis";
import { useHistory } from "react-router";
import avater from "../images/tt_avatar_small.jpg";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import ViewProduct from "../Popup/ViewProduct";
import ViewSubscription from "../Popup/ViewSubscription";

const Subscription = () => {
  const history = useHistory();
  const {
    setSelectedNavItem,
    auth,
    viewProduct,
    setViewProduct,
    viewSubscription,
    setViewSubscription,
  } = useContext(Context);
  setSelectedNavItem("subscription");

  // const [isSmallerThan700] = useMediaQuery("(max-width: 700px)")
  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
  const [isSmallerThan925] = useMediaQuery("(max-width: 925px)");

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [productDetails, setProductDetails] = useState([]);
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);

  const pageArray = [];
  for (let index = 0; index < totalPages; index++) {
    pageArray.push(index + 1);
  }

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
    history.push("/add-subscription");
  };

  useEffect(() => {
    const url = SERVER_URL + "subscription/search";
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
        setSubscriptionData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [currentPage, auth]);

  const onViewProduct = (add) => {
    setViewProduct(true);
    setProductDetails(add);
  };

  const onViewSubscription = (add) => {
    setViewSubscription(true);
    setSubscriptionDetails(add);
  };

  return (
    <>
      {viewProduct && <ViewProduct add={productDetails} view="true" />}
      {viewSubscription && (
        <ViewSubscription add={subscriptionDetails} view="true" />
      )}
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
              <Button backgroundColor="blue.200" onClick={onAddSubsc}>Add Subscription</Button>
            </Flex>
          </Box>
        </Stack>

        <Box w="90%">
          <Flex mt="4" mr="4">
            <Text fontSize="large" fontWeight="semibold" color="#4C4C66">
              SUBSCRIBERS
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
              <MenuList
                fontSize="sm"
                onSelect={(e) => console.log(e.target.value)}
              >
                {pageArray.map((page) => {
                  console.log(page);
                  return (
                    <MenuItem onClick={() => setCurrentPage(page)}>
                      {page}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </Flex>

          <Box overflow="auto" className="hide-scroll">
            {
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color="#828194">Sr.No</Th>
                    <Th color="#828194">Subscription Name</Th>
                    <Th color="#828194">Description</Th>
                    <Th color="#828194">Status</Th>
                    <Th color="#828194">Products List</Th>
                    <Th color="#828194">Subscription List</Th>
                    <Th color="#828194">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {subscriptionData.length < 1
                    ? "No Data found :("
                    : subscriptionData.map((customer, key) => {
                        return (
                          <Tr
                            fontSize="sm"
                            className="order-table-row"
                            key={key}
                          >
                            <Td>
                              <Flex>
                                <Avatar
                                  size="xs"
                                  borderRadius="5"
                                  name="Andrew"
                                  src={customer.imageUrl}
                                />
                                <Text
                                  ml="3"
                                  color="#828194"
                                  whiteSpace="nowrap"
                                >
                                  {key + 1}
                                </Text>
                              </Flex>
                            </Td>
                            <Td color="blackAlpha.700">{customer.name}</Td>
                            <Td color="blackAlpha.700">
                            
                              <ShowMoreText
                                lines={2}
                                more="Show more"
                                less="Show less"
                                expanded={false}
                                width={200}
                                anchorClass="more-anchor"
                              >
                               {customer.description}
                              </ShowMoreText>
                            </Td>
                            <Td color="blackAlpha.700">{customer.active}</Td>
                            <Td color="blackAlpha.700">
                              <Button
                                onClick={(add) =>
                                  onViewProduct(customer.productsList)
                                }
                              >
                                Product List
                              </Button>
                            </Td>
                            <Td color="blackAlpha.700">
                              <Button
                                onClick={(add) =>
                                  onViewSubscription(
                                    customer.subscriptionPricesList
                                  )
                                }
                              >
                                Subscription List
                              </Button>
                            </Td>
                            <Td as={HStack}>
                              <Button bg="transparent" color="green.400">
                                <MdEdit size="20px" />
                              </Button>
                              <Button bg="transparent" color="red.400">
                                <MdDeleteForever size="25px" color="red" />
                              </Button>
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
    </>
  );
};

export default Subscription;
