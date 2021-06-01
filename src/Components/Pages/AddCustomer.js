import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useEffect, useState } from "react";
import FormInput from "../Views/FormInput";
import axios from "axios";
import { SERVER_URL } from "../Config/Apis";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router";


const AddCustomer = () => {

  const history = useHistory();
  const [fullName, setfullName] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [title, settitle] = useState('');
  const [address1, setaddress1] = useState('');
  const [address2, setaddress2] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [country, setcountry] = useState('');
  const [pincode, setpincode] = useState('');
  const [deliveryPhoneNumber, setdeliveryPhoneNumber] = useState('');
  const toast = useToast();


  const toastMessage = (status, msg) => {
    toast({
      description: msg,
      status: status,
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const onCreateCustomer = () => {

    const url = SERVER_URL + 'user';

    const body = {
      "fullName": fullName,
      "countryCode": "+91",
      "phone": phone,
      "email": email,
      "addressList": [
        {
          "title": title,
          "fullName": fullName,
          "addressLine1": address1,
          "addressLine2": address2,
          "city": city,
          "state": state,
          "country": country,
          "pincode": pincode,
          "latitude": 0,
          "longitude": 0,
          "deliveryPhoneNumber": deliveryPhoneNumber
        }
      ]
    }

    console.log(body, 'body');
    axios
      .post(url, body)
      .then(function (response) {
        const data = response;
        console.log(data, 'response');
        if (response.status === 200) {
          toastMessage("success", "Customer Added successful.");
          history.push('/customers')
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }


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
          <Flex>
            <FormInput
              label="Customer Name"
              type="text"
              // value={fullName}
              onChange={e => setfullName(e.target.value)}
            />
            <FormInput
              label="Email"
              type="emial"
              value={email}
              onChange={e => setemail(e.target.value)}
            />

            <FormInput
              label="Phone number"
              type="number"
              value={phone}
              onChange={e => setphone(e.target.value)}
            />
          </Flex>

          <Divider mt="4" mb="4" />
          <Text mb="4">Address</Text>
          <Flex>
            <FormInput
              label="Title"
              type="text"
              value={title}
              onChange={e => settitle(e.target.value)}
            />
            <FormInput
              label="City"
              type="text"
              value={city}
              onChange={e => setcity(e.target.value)}
            />
            <FormInput
              label="State"
              type="text"
              value={state}
              onChange={e => setstate(e.target.value)}
            />
            <FormInput
              label="Country"
              type="text"
              value={country}
              onChange={e => setcountry(e.target.value)}
            />
            <FormInput
              name="pincode"
              label="Pincode"
              value={pincode}
              onChange={e => setpincode(e.target.value)}
            />
          </Flex>
          <Grid>
            <Textarea mb="3" ml="4"
              placeholder="Address line 1"
              value={address1}
              onChange={e => setaddress1(e.target.value)}
            />

            <Textarea ml="4"
              placeholder="Address line 2"
              value={address2}
              onChange={e => setaddress2(e.target.value)}
            />
          </Grid>

          <Divider mt="4" mb="4" />
          <Text mb="4">Delivery</Text>
          <Flex>
            <FormInput
              name="deliveryPhoneNumber"
              label="Phone Number"
              value={deliveryPhoneNumber}
              onChange={e => setdeliveryPhoneNumber(e.target.value)}
            />
            {/* <Textarea mt="4" ml="4" placeholder="Delivery Notice" /> */}
          </Flex>
          <Divider mt="4" mb="4" />
          <Button type="submit" onClick={onCreateCustomer}>Submit</Button>
        </Box>
      </Box>
    </>
  );
};

export default AddCustomer;
