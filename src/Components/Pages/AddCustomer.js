import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import FormInput from "../Views/FormInput";

const AddCustomer = () => {
  return (
    <>
      <Box>
        <Text m="2" fontSize="lg" fontWeight="semibold">
          ADD Customer
        </Text>
        <Box
          w="100%"
          p="4"
          borderWidth="thin"
          borderRadius="5"
          borderColor="blackAlpha.300"
        >
          <form
            // ref={form}
            // onSubmit={handelFormSubmit}
            encType="multipart/form-data"
          >
            <Flex>
              <FormInput
                name="customerName"
                label="Customer Name"
                type="text"
              />
              <FormInput name="email" label="Email" type="emial" />
              <FormInput name="pnumber" label="Phone number" type="number" />
            </Flex>

            <Divider mt="4" mb="4" />
            <Text mb="4">Address</Text>
            <Flex>
              <FormInput name="cite" label="City" type="text" />
              <FormInput name="state" label="State" type="text" />
              <FormInput name="country" label="Country" type="text" />
              <FormInput name="pincode" label="Pincode" type="number" />
            </Flex>
            <Grid>
              <Textarea mb="3" ml="4" placeholder="Address line 1" />

              <Textarea ml="4" placeholder="Address line 2" />
            </Grid>

            <Divider mt="4" mb="4" />
            <Text mb="4">Delivery</Text>
            <Flex>
              <FormInput
                name="deliveryPhoneNumber"
                label="Phone Number"
                type="number"
              />
              <Textarea mt="4" ml="4" placeholder="Delivery Notice" />
            </Flex>
            <Divider mt="4" mb="4" />

            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddCustomer;
