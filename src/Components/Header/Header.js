import "./header.css"
import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import React from 'react'
import { FiSearch } from "react-icons/fi";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";
import { useMediaQuery } from "@chakra-ui/media-query";
import NavForMobile from "../Sidenav/NavForMobile";

export default function Header() {
  const [isSmallerThan1208] = useMediaQuery("(max-width: 1208px)")

  return (
    <header>
      <Flex mr={isSmallerThan1208 ? "0" : "4"}>
        {isSmallerThan1208 ?
          <Box p="4">
            <NavForMobile />
          </Box>
          :
          ""
        }
        <Spacer />
        <Flex direction="column" mr={isSmallerThan1208 ? "0" : "2"} p="4" > <Spacer /> <FiSearch size="30px" className="nav-icon" /> </Flex>
        <Flex direction="column" mr={isSmallerThan1208 ? "0" : "2"} p="4" > <Spacer /> <MdEmail size="30px" className="nav-icon" /> </Flex>
        <Flex direction="column" mr={isSmallerThan1208 ? "0" : "2"} p="4" > <Spacer /> <VscBellDot size="30px" className="nav-icon" /> </Flex>
        <Box mr="-2" mt={isSmallerThan1208 ? "0" : "4"} p="4">
          <Avatar size="md" name="Andrew" src="https://bit.ly/dan-abramov" />
        </Box>
        {
          isSmallerThan1208 ?
            ""
            :
            <Flex flexDirection="column" p="4" mr="4">
              <Spacer />
              <Text fontSize="md" fontWeight="bold" mb="-1">Andrew</Text>
              <Text fontSize="md">Admin account</Text>
            </Flex>
        }
      </Flex>
    </header >
  )
}
