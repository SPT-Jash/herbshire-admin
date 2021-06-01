import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { OTP_URL } from "../Config/Apis";
import { Context } from "../Data/Context";

export default function Login() {
  const { setAuth } = useContext(Context);
  const [otpRequested, setOtpRequested] = useState(false);
  const phone = useRef();
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

  const requestOtp = (event) => {
    event.preventDefault();
    const number = event.target.number.value;
    event.target.number.value = "";
    phone.current = number;

    const config = {
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
    };

    axios
      .get(
        OTP_URL,
        {
          params: {
            username: number,
          },
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        setOtpRequested(true);
        toastMessage("success", `Otp sent to ${number}.`);
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const validateOtp = (event) => {
    event.preventDefault();
    const otp = event.target.number.value;
    console.log(phone.current, otp);
    const url = OTP_URL;
    const config = {
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
    };
    axios
      .post(
        url,
        {
          phoneOrEmail: phone.current,
          otp: otp,
        },
        config
      )
      .then((res) => {
        const data = res.data.body;
        console.log(data);
        if (data.userStatus !== "EXISTINGUSER") {
          toastMessage("error", "User does not exist !");
          return;
        }
        if (data.otpStatus === "VALID") {
          toastMessage("success", data.otpStatus + " otp!");
          setAuth(data);
          localStorage.setItem("auth", JSON.stringify(data));
        } else {
          toastMessage("error", data.otpStatus + " otp!");
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  if (!otpRequested) {
    return (
      <Box>
        <form onSubmit={requestOtp}>
          <FormControl id="number">
            <FormLabel>Number</FormLabel>
            <Input type="number" name="number" />
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
      </Box>
    );
  } else {
    return (
      <Box>
        <form onSubmit={validateOtp}>
          <FormControl id="otp">
            <FormLabel>Enter OTO</FormLabel>
            <Input type="number" name="number" />
            <Button type="submit">Submit OTP</Button>
          </FormControl>
        </form>
      </Box>
    );
  }
}
