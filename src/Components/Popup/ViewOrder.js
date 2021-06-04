import React, { useContext, useState } from 'react';
import { Context } from "../Data/Context";
import axios from "axios";
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
} from "@chakra-ui/react"


const ViewOrder = (props) => {


    const { viewOrder, setviewOrder } = useContext(Context);
    const handleClose = () => setviewOrder(false);

    console.log(props.add, 'view order');

    return (
        <>
            <Modal isOpen={viewOrder} onClose={handleClose} size="3xl">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>View order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="3xl">
                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                            {props.add < 1
                                ? "No Data found :("
                                : props.add.map((order, index) => {
                                    return (
                                        <Box w="100%" h="180" key={index} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginRight: "5px", marginBottom: "5px" }}>
                                            {order.ordersDetailsList.map((orderDetail, index) => {
                                                return(
                                                    <div key={index}>
                                                        <Text>Product Name: {orderDetail.product.productName}</Text>
                                                        <Text>Description: {orderDetail.product.description}</Text>
                                                        <Text>Quantity: {orderDetail.quantity}</Text>
                                                    </div>
                                                )
                                            })}
                                            <Text>Amount: {order.amount}</Text>
                                            <Text>Payment Method: {order.paymentMethod}</Text>
                                            <Text>Payment Status: {order.paymentStatus}</Text>
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

export default ViewOrder;