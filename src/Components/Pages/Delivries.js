import "./pages.css"
import React, { useContext, useState } from 'react'
import { Context } from "../Data/Context";
import { Box, Flex, Spacer, Text, Center, Stack } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import { BsChevronDown } from "react-icons/bs";
import Vector from "../../Vector.png";
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Button } from '@chakra-ui/button';
import { Table, Tbody, Td, Thead, Tr, Th } from '@chakra-ui/table';
import { Avatar } from '@chakra-ui/avatar';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/slider";
import { GrDeliver } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";

export default function Delevries() {
    const { setSelectedNavItem } = useContext(Context);
    setSelectedNavItem("deliveries");

    const orderData = [
        {
            profileSrc: "https://bit.ly/dan-abramov",
            receiver: "Andrew",
            days: "Today",
            status: "Pending",
            date: "01 Apr 2020",
            amount: "75.65"
        },
        {
            profileSrc: "https://bit.ly/dan-abramov",
            receiver: "Andrew",
            days: "Today",
            status: "Cancel",
            date: "01 Apr 2020",
            amount: "75"
        },
        {
            profileSrc: "https://bit.ly/dan-abramov",
            receiver: "Andrew",
            days: "Today",
            status: "Pending",
            date: "01 Apr 2020",
            amount: "75.65"
        },
        {
            profileSrc: "https://bit.ly/dan-abramov",
            receiver: "Andrew",
            days: "Today",
            status: "Delivered",
            date: "01 Apr 2020",
            amount: "75"
        },
        {
            profileSrc: "https://bit.ly/dan-abramov",
            receiver: "Andrew",
            days: "Today",
            status: "Delivered",
            date: "01 Apr 2020",
            amount: "75.65"
        },
        {
            profileSrc: "https://bit.ly/dan-abramov",
            receiver: "Andrew",
            days: "Today",
            status: "Delivered",
            date: "01 Apr 2020",
            amount: "75"
        },
        {
            profileSrc: "https://bit.ly/dan-abramov",
            receiver: "Andrew",
            days: "Today",
            status: "Pending",
            date: "01 Apr 2020",
            amount: "75.65"
        },
    ]

    const [isSmallerThan450] = useMediaQuery("(max-width: 450px)")

    return (
        <Box w="90%">
            <Text fontSize="sm">Deliveries</Text>
            <Stack spacing="20px" ml="4" pt="4">

                <Flex alignItems="center">
                    <Flex alignItems="center" justifyContent="center" h="50px" w="50px" borderRadius="5" bgGradient="linear(to-r, #FF7979, #FCAE73)" className="delivery-icon">
                        <GrDeliver />
                    </Flex>
                    <Flex flexDirection="column" justifyContent="center" w="200px" h="48px" ml="4">
                        <Slider aria-label="slider-ex-1" defaultValue={21} isReadOnly={true} mt="2">
                            <SliderTrack height="3" borderRadius="lg">
                                <SliderFilledTrack borderRadius="lg" bgGradient="linear(to-r, #FF7979, #FCAE73)"/>
                            </SliderTrack>                            
                        </Slider>
                        <Text mt="2" fontSize="md" color="#B7B7C2">Deliveries</Text>
                    </Flex>
                    <Text alignSelf="flex-start" ml="2" color="#828194" fontSize="md" mt="1">{21}%</Text>
                </Flex>

                <Flex alignItems="center">
                    <Flex alignItems="center" justifyContent="center" h="50px" w="50px" borderRadius="5" bgGradient="linear(to-r, #24DABE, #45AFEE)" className="shopping-cart-icon">
                        <FaShoppingCart />
                    </Flex>
                    <Flex flexDirection="column" justifyContent="center" w="200px" h="48px" ml="4">
                        <Slider aria-label="slider-ex-1" defaultValue={86} isReadOnly={true} mt="2">
                            <SliderTrack height="3" borderRadius="lg">
                                <SliderFilledTrack borderRadius="lg" bgGradient="linear(to-r, #24DABE, #45AFEE)"/>
                            </SliderTrack>                            
                        </Slider>
                        <Text mt="2" fontSize="md" color="#B7B7C2">Pending</Text>
                    </Flex>
                    <Text alignSelf="flex-start" ml="2" color="#828194" fontSize="md" mt="1">{86}%</Text>
                </Flex>


            </Stack>

            <Flex mt="4" mr="4">
                <Text fontSize="large" fontWeight="semibold" color="#4C4C66">TODAY'S ORDER</Text>
                <Spacer />
                <Center mr="4"><img src={Vector} width="30px" /></Center>
                <Menu>
                    <MenuButton as={Button} rightIcon={<BsChevronDown />} borderColor="#E2E2E8" p="2">
                        Year
                    </MenuButton>
                    <MenuList fontSize="sm">
                        <MenuItem >Days</MenuItem>
                        <MenuItem>Week</MenuItem>
                        <MenuItem>Month</MenuItem>
                        <MenuItem>Year</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            <Box overflowX="auto">
                <Table variant="simple" size={isSmallerThan450 ? "sm" : "md"}>
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
                            const orderStatusColour = order.status === "Delivered" ? "#53C3AA" : (order.status === "Pending" ? "#EEA662" : "#FC6984");
                            return (
                                <Tr fontSize="sm" className="order-table-row">
                                    <Td>
                                        <Flex>
                                            <Avatar size="xs" borderRadius="5" name="Andrew" src={order.profileSrc} />
                                            <Text ml="3" color="#828194" fontSize="large">{order.receiver}</Text>
                                        </Flex>
                                    </Td>
                                    <Td color="#B7B7C2" fontSize="large">{order.days}</Td>
                                    <Td color={orderStatusColour} fontSize="large">{order.status}</Td>
                                    <Td color="#828194" fontSize="large" whiteSpace="nowrap">{order.date}</Td>
                                    <Td color="#53C3AA" fontSize="large" whiteSpace="nowrap">$ {order.amount}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Box>


        </Box>
    )

}
