import React, { useContext, useState } from 'react';
import { Context } from "../Data/Context";
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
    Spacer,
} from "@chakra-ui/react"


const ViewSubscription = (props) => {


    const { viewSubscription, setViewSubscription } = useContext(Context);
    const handleClose = () => setViewSubscription(false);

    console.log(props.add, 'view subscription');

    return (
        <>
            <Modal isOpen={viewSubscription} onClose={handleClose} size="3xl">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>View Subscription</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="3xl">
                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                            {props.add < 1
                                ? "No Data found :("
                                : props.add.map((sub, index) => {
                                    return (
                                        <Box w="100%" h="100%" key={index} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginRight: "5px", marginBottom: "5px" }}>
                                            <Text>Price: {sub.price}</Text>
                                            <Text>Up To: {sub.upto}</Text>
                                            <Text>Frequency: {sub.frequency}</Text>
                                            <Text>Delivery Days: {sub.deliveryDays}</Text>
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

export default ViewSubscription;