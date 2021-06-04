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


const ViewProduct = (props) => {


    const { viewProduct, setViewProduct } = useContext(Context);
    const handleClose = () => setViewProduct(false);

    console.log(props.add, 'view product');

    return (
        <>
            <Modal isOpen={viewProduct} onClose={handleClose} size="3xl">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>View Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="3xl">
                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                            {props.add < 1
                                ? "No Data found :("
                                : props.add.map((product, index) => {
                                    return (
                                        <Box w="100%" h="100%" key={index} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginRight: "5px", marginBottom: "5px" }}>
                                            <Text>ProductName: {product.productName}</Text>
                                            <Text>Description: {product.description}</Text>
                                            <Text>Quantity: {product.quantity}</Text>
                                            <Text>Discount: {product.discount}</Text>
                                            <Text>Price : {product.price}</Text>
                                            <Text>Weight: {product.weight}</Text>
                                            <Text>Fresh Till : {product.freshTill}</Text>
                                            <Text>Proteins: {product.proteins}</Text>
                                            <Text>Curbs: {product.curbs}</Text>
                                            <Text>Calories: {product.calories}</Text>
                                            <Text>Fats: {product.fats}</Text>
                                            <Text>GST Details:</Text>
                                            <div style={{marginLeft: "30px"}}>
                                            <Text>Tax Name: {product.gst.taxName}</Text>
                                            <Text>IGST: {product.gst.igst}</Text>
                                            <Text>CGST: {product.gst.cgst}</Text>
                                            <Text>SGST: {product.gst.sgst}</Text>
                                            </div>
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

export default ViewProduct;