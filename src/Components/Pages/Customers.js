import { Button } from '@chakra-ui/button';
import { Box, Center, Divider, Flex, HStack, Spacer, Text } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useState } from 'react'
import ReactCharts from '../Views/ReactCharts';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Avatar } from '@chakra-ui/avatar';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import avater from '../images/tt_avatar_small.jpg'

const Customers = () => {
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const pageArray = [];
    for (let index = 0; index < totalPages; index++) {
        pageArray.push(index + 1);
    }

    console.log(totalPages, pageArray);


    return (
        <>
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
            <Box overflow="auto" className="hide-scroll">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th color="blackAlpha.500">Customer Id</Th>
                            <Th color="blackAlpha.500">Customer Name</Th>
                            <Th color="blackAlpha.500">phone</Th>
                            <Th color="blackAlpha.500">email</Th>
                            <Th color="blackAlpha.500">addressList</Th>
                            <Th color="blackAlpha.500">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr fontSize="sm" className="order-table-row">
                            <Td>
                                <Flex>
                                    <Avatar
                                        size="xs"
                                        borderRadius="5"
                                        name="Andrew"
                                        src={avater}
                                    />
                                    <Text ml="3" color="#828194" whiteSpace="nowrap">
                                        1234567
                                    </Text>
                                </Flex>
                            </Td>
                            <Td color="blackAlpha.700">Customer Name</Td>
                            <Td color="blackAlpha.700">1234567890</Td>
                            <Td color="blackAlpha.700">@gmail.com</Td>
                            <Td color="blackAlpha.700">Address</Td>
                            <Td as={HStack}>
                                <Button bg="transparent" color="green.400">
                                    <MdEdit size="20px" />
                                </Button>
                                <Button
                                    bg="transparent"
                                    color="red.400"
                                // onClick={() => HandleProductDelete(key)}
                                >
                                    <MdDeleteForever size="25px" color="red" />
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </>
    )
}

export default Customers;