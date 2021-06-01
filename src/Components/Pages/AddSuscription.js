import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Center } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/layout";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Tag, TagLabel } from "@chakra-ui/tag";
import React, { useRef, useState } from "react";
import FormInput from "../Views/FormInput";
import { Table, Tbody, Td, Thead, Tr, Th } from '@chakra-ui/table';

const AddSubscription = () => {
  const form = useRef();
  const [periodList, setPeriodList] = useState([]);
  const [frequencyList, setFrequencyList] = useState([]);

  return (
    <>
      <Box>
        <Text m="2" fontSize="lg" fontWeight="semibold">
          ADD New Subscription
        </Text>
        <Box
          w="100%"
          p="4"
          borderWidth="thin"
          borderRadius="5"
          borderColor="blackAlpha.300"
        >
          <form ref={form} encType="multipart/form-data">
            <Flex>
              <FormInput
                name="Dinne Russell"
                label="Receiver Name"
                type="text"
              />
              <Box m="2">
                <Text
                  m="2"
                  fontSize="md"
                  fontWeight="semibold"
                  color="blackAlpha.800"
                >
                  Subscription Period
                </Text>
                <Select name="sp_dto" placeholder="Select Subscription Period">
                  {periodList.map((period, key) => {
                    return (
                      <option key={key} value={key}>
                        {period.description}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Flex>

            <Flex>
              <FormInput
                name="date"
                label="Subscription Date (dd/mm/yyyy)"
                type="date"
              />
              <Box m="2">
                <Text
                  m="2"
                  fontSize="md"
                  fontWeight="semibold"
                  color="blackAlpha.800"
                >
                  Frequency
                </Text>
                <Select name="frequency_dto" placeholder="Select frequency">
                  {frequencyList.map((frequency, key) => {
                    return (
                      <option key={key} value={key}>
                        {frequency.description}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Flex>

            <Flex>
              <Box m="2">
                <FormInput name="amount" label="Paid Amount" type="text" />
              </Box>
            </Flex>

            <Button type="submit">Add New Subscription</Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddSubscription;
