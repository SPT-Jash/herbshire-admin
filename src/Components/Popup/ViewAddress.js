import React, { useContext, useState } from "react";
// import { Button, Modal } from 'react-bootstrap';
import { Context } from "../Data/Context";
import { BiMap, BiPhoneCall } from "react-icons/bi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";

const ViewAddress = (props) => {
  const { viewAddress, setviewAddress } = useContext(Context);
  const handleClose = () => setviewAddress(false);

  console.log(props.add, "view address");

  return (
    <>
      <Modal isOpen={viewAddress} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent w="fit-content">
          <ModalHeader bgColor="#2A9F85" borderTopRadius="5px">
            View Address
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody width="4.5">
            {props.add < 1
              ? "No Data found :("
              : props.add.map((address, index) => {
                  return (
                    <Box
                      w="100%"
                      h="100%"
                      key={index}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        marginRight: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      <Text>
                        <b>Address Type: </b>
                        {address.title}
                      </Text>
                      <br />
                      <Flex gridColumnGap="2.5">
                        <BiMap style={{margin: "auto" }} />
                          {address.addressLine1} , {address.addressLine2}, {address.city}
                      </Flex>
                      <Text marginLeft="35px">{address.state}, {address.country}-{address.pincode}</Text><br/>
                      <Text>
                        <Flex gridColumnGap="2.5">
                          <BiPhoneCall style={{ marginTop: "5px" }}/>
                          {address.deliveryPhoneNumber}
                        </Flex>
                      </Text>
                    </Box>
                  );
                })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewAddress;
