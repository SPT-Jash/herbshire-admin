import "./overviewBox.css";
import React from "react";
import { Center, Flex, Grid, GridItem, Spacer, Text } from "@chakra-ui/react";
import { GrCube } from "react-icons/gr";
import ReactCharts from "./ReactCharts";

export default function OverviewBox({ selected, lineColor }) {
  return (
    <Grid
      h="100px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={2}
      p="1"
    >
      <GridItem rowSpan={2} colSpan={1}>
        <Center h="100px">
          <GrCube
            className={
              selected ? "order-icon-selected-colour" : "order-icon-colour"
            }
          />
        </Center>
      </GridItem>
      <GridItem colSpan={4}>
        <Flex direction="column" h="45px" ml="6">
          <Spacer />
          <Flex>
            <Text
              color={selected ? "white" : "grey"}
              mr="4"
              fontSize="large"
              fontWeight="semibold"
            >
              19678
            </Text>
            <Text
              color={selected ? "white" : "grey"}
              fontSize="sm"
              alignSelf="flex-end"
            >
              Order
            </Text>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex direction="row" h="30px" w="60px" pb="5" pl="4" pr="4">
          <Spacer />
          <ReactCharts type={"small"} lineColor={lineColor} />
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex direction="row">
          <Text
            mr="2"
            fontSize="sm"
            fontWeight="semibold"
            color={selected ? "white" : "grey"}
          >
            ^
          </Text>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color={selected ? "white" : "grey"}
          >
            +12.5%
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
}
