import React, { useContext, useState } from "react";
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
  HStack,
} from "@chakra-ui/react";

const ViewProduct = (props) => {
  const { viewProduct, setViewProduct } = useContext(Context);
  const handleClose = () => setViewProduct(false);

  console.log(props.add, "view product");

  return (
    <>
      <Modal isOpen={viewProduct} onClose={handleClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#2A9F85" color="#FFF">
            View Product
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody width="3xl">
            {props.add < 1
              ? "No Data found :("
              : props.add.map((product, index) => {
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
                        lineHeight: "40px"
                      }}
                    >
                      <Grid templateColumns="repeat(3, 1fr)">
                        <Text w="20rem">
                          <b>ProductName:</b> {product.productName}
                        </Text>
                        <Text>
                          <b>Quantity:</b>
                          {product.quantity}pieces
                        </Text>
                        <Text>
                          <b>Discount:</b> {product.discount}%
                        </Text>
                      </Grid>

                      <Grid templateColumns="repeat(3, 1fr)">
                        <Text w="20rem">
                          <b>Price : </b>
                          ₹{product.price}
                        </Text>
                        <Text>
                          <b>Weight:</b> {product.weight}
                        </Text>
                        <Text>
                          <b>Fresh Till :</b> {product.freshTill} days
                        </Text>
                      </Grid>

                      <Grid templateColumns="repeat(3, 1fr)">
                        <Text w="20rem">
                          <b>Proteins:</b> {product.proteins}
                        </Text>
                        <Text>
                          <b>Curbs:</b> {product.curbs}
                        </Text>
                        <Text>
                          <b>Calories:</b> {product.calories}
                        </Text>
                      </Grid>

                      <Grid templateColumns="repeat(3,1fr)">
                        <Text w="20rem">
                          <b>Fats: </b>
                          {product.fats}
                        </Text>
                        <Text w="20rem">
                          <b>Description:</b> {product.description}
                        </Text>
                      </Grid>

                      <HStack spacing="25px">
                        <Text fontWeight="bold">GST Details:</Text>
                        <Text fontWeight="bold">IGST</Text><br/>
                        <Text fontWeight="bold">SGST</Text>
                        <Text fontWeight="bold">CGST</Text>
                      </HStack>
                      <HStack spacing="30px">
                        <Text marginLeft="7.5rem">{product.gst.igst}%</Text>
                        <Text style={{marginLeft: "2.5rem"}}>{product.gst.sgst}%</Text>
                        <Text style={{marginLeft: "2.5rem"}}>{product.gst.cgst}%</Text>
                      </HStack>
                    </Box>
                  );
                })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewProduct;
