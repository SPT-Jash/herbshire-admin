import React, { useContext, useEffect } from 'react'
import { Box, Button, Center, Divider, Flex, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack, Text, useMediaQuery } from "@chakra-ui/react"
import ReactCharts from "../Views/ReactCharts";
import OverviewBox from "../Views/OverviewBox";
import { BsChevronDown } from "react-icons/bs";
import { Context } from "../Data/Context";

export default function Dashboard() {
    const { setSelectedNavItem } = useContext(Context);

    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)")
    const [isSmallerThan900] = useMediaQuery("(max-width: 900px)")
    // const [isSmallerThan900] = useMediaQuery("(max-width: 1208px)")

    useEffect(() => {
        setSelectedNavItem("dashboard");
        return () => {

        }
    })

    return (
        <Box w="100%" p={4} >

            <Text fontSize="md">OVERVIEWS</Text>

            <Stack direction={isSmallerThan900 ? "column" : "row"} spacing="4">
                <Box w="250px" h="100px" bg="green.500" borderRadius="2xl" borderColor="#E2E2E8" >
                    <OverviewBox selected={true} lineColor={"white"} />
                </Box>
                <Box w="250px" h="100px" bg="white" borderRadius="2xl" border="1px" borderColor="#E2E2E8" >
                    <OverviewBox selected={false} lineColor={"red"} />
                </Box>
                <Box w="250px" h="100px" bg="white" borderRadius="2xl" border="1px" borderColor="#E2E2E8" >
                    <OverviewBox selected={false} lineColor={"blue"} />
                </Box>
                <Box w="250px" h="100px" bg="white" borderRadius="2xl" border="1px" borderColor="#E2E2E8" >
                    <OverviewBox selected={false} lineColor={"green"} />
                </Box>
            </Stack>

            <Box flex="1" flexDirection="row" h="400px" mt="8">
                <Flex pt="2" pb="1">

                    <Flex ml="5">
                        <Center>
                            <Box width="2" height="2" borderColor={"red"} borderWidth="thick" borderRadius="20px" />
                            <Text fontSize="md" ml="2">Tomato</Text>
                        </Center>
                    </Flex>

                    <Spacer />

                    {isSmallerThan600 ?
                        <Box mr="2">
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
                        </Box>

                        :

                        <Flex borderWidth="thin" borderRadius="md" borderColor="#E2E2E8" mr="4">
                            <Text fontSize="sm" p="2.5" pr="2.5" borderLeftRadius="md">Days</Text> <Divider orientation="vertical" />
                            <Text fontSize="sm" p="2.5" pr="2.5">Week</Text>  <Divider orientation="vertical" />
                            <Text fontSize="sm" p="2.5" pr="2.5">Month</Text> <Divider orientation="vertical" />
                            <Text fontSize="sm" p="2.5" bg="green.500" borderRightRadius="md">Year</Text>
                        </Flex>
                    }


                    <Box>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<BsChevronDown />} borderColor="#E2E2E8" p="2">
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

        </Box>
    )
}
