import React, { useContext, useState } from 'react';
// import { Button, Modal } from 'react-bootstrap';
import { Context } from "../Data/Context";
import {FaMapMarkerAlt, FaPhoneAlt} from 'react-icons/fa'
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
} from "@chakra-ui/react"


const ViewAddress = (props) => {


    const { viewAddress, setviewAddress } = useContext(Context);
    const handleClose = () => setviewAddress(false);

    console.log(props.add, 'view address');

    return (
        <>
            <Modal isOpen={viewAddress} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>View Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="4.5">
                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                            {props.add < 1
                                ? "No Data found :("
                                : props.add.map((address, index) => {
                                    return (
                                        <Box w="100%" h="200" key={index} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginRight: "5px", marginBottom: "5px" }}>
                                            <Text>{address.title}</Text>
                                            <Text>{address.fullName}</Text>
                                            <Text><Flex><FaMapMarkerAlt />{address.addressLine1}</Flex></Text>
                                            <Text>{address.addressLine2}</Text>
                                            <Text>{address.city}, {address.state}</Text>
                                            <Text>{address.country}-{address.pincode}</Text>
                                            <Text><Flex><FaPhoneAlt style={{marginTop: "5px"}}/>  {address.deliveryPhoneNumber}</Flex></Text>
                                        </Box>
                                    );
                                })}
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewAddress;