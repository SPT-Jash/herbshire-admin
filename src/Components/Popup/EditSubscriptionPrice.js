import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Data/Context";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Button,
  Select as Cselect,
} from "@chakra-ui/react";
import FormInput from "../Views/FormInput";
import { SUB_PRICE_UPDATE_URL, SUB_PRICE_ID_URL } from "../Config/Apis";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import Select from "react-select";

const EditSubscription = (props) => {
  const { auth, editSubscription, seteditSubscription } = useContext(Context);
  const toast = useToast();
  const handleClose = () => seteditSubscription(false);
  const [subscriptionPriceList, setsubscriptionPriceList] = useState({});

  const toastMessage = (status, msg) => {
    toast({
      description: msg,
      status: status,
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const frequencyList = [
    { value: 1, label: "ONCE_A_WEEK" },
    { value: 2, label: "TWICE_A_WEEK" },
  ];
  const uptoList = [{ value: 1, label: "ONE_MONTH" }];
  const delivery_days = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ];

  const onUpdateSubscriptionPrice = () => {
    // edit subscription price list
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    };
    axios
      .patch(SUB_PRICE_UPDATE_URL, subscriptionPriceList, config)
      .then(function (response) {
        console.log(response, "response");
        if (response.status === 200) {
          props.setState(response.data.body);
          seteditSubscription(false);
          toastMessage("success", "Subscription Price List Edit Successful.");
        } else {
          toastMessage("error", "Error while Editing Subscription Price List!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    // GET SUBSCRIPTION BY ID
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: props.id,
      },
    };
    axios
      .get(SUB_PRICE_ID_URL, config)
      .then(function (response) {
        setsubscriptionPriceList(response.data.body);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [auth.user.token, props.id]);

  const deliveryDaysChangeHandler = (e) => {
    const days = e.map((x) => x.label);
    const daystr =
      days.length > 0 && days.reduce((str, day) => str + "-" + day);
    setsubscriptionPriceList({
      ...subscriptionPriceList,
      deliveryDays: daystr,
    });
  };

  console.log(subscriptionPriceList, "editsub id");
  return (
    <>
      <Modal isOpen={editSubscription} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent w="fit-content">
          <ModalHeader bgColor="#2A9F85" borderTopRadius="5px">
            Edit Subscription Price List
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody width="4.5">
            <FormInput
              label="Price"
              type="number"
              name="price"
              symbol="₹"
              value={subscriptionPriceList.price}
              onChange={(e) => {
                setsubscriptionPriceList({
                  ...subscriptionPriceList,
                  price: e.target.value,
                });
              }}
            />
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Frequency
              </Text>
              <div style={{ fontSize: "1.3rem", width: "16rem" }}>
                <Cselect
                  name="frequency"
                  value={subscriptionPriceList.frequency}
                  onChange={(e) => {
                    setsubscriptionPriceList({
                      ...subscriptionPriceList,
                      frequency: e.target.value,
                    });
                  }}
                >
                  {frequencyList.map((dep) => (
                    <option key={dep.value} value={dep.lable}>
                      {dep.label}
                    </option>
                  ))}
                </Cselect>
              </div>
            </Box>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Up To
              </Text>
              <div style={{ fontSize: "1.3rem", width: "15rem" }}>
                <Cselect
                  placeholder="Select Option"
                  value={subscriptionPriceList.upto}
                  onChange={(e) => {
                    setsubscriptionPriceList({
                      ...subscriptionPriceList,
                      upto: e.target.value,
                    });
                  }}
                >
                  {uptoList.map((dep) => (
                    <option key={dep.value} value={dep.lable}>
                      {dep.label}
                    </option>
                  ))}
                </Cselect>
              </div>
            </Box>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Delivery Days
              </Text>
              <div style={{ fontSize: "1.3rem", width: "13rem" }}>
                <Select
                  isMulti
                  options={delivery_days}
                  name="deliveryDays"
                  onChange={(e) => deliveryDaysChangeHandler(e)}
                />
              </div>
            </Box>
            <Button onClick={() => onUpdateSubscriptionPrice()}>Update</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSubscription;
