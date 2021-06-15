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
          <ModalHeader bgColor="#2A9F85" color="#fff">
            View Product
          </ModalHeader>
          <ModalCloseButton bgColor="#fff" borderRadius="50%" color="#2A9F85" />
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
                        {product.quantity} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>Pieces</span>
                      </Text>
                      <Text>
                        <b>Discount:</b> {product.discount} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>%</span>
                      </Text>
                    </Grid>

                    <Grid templateColumns="repeat(3, 1fr)">
                      <Text w="20rem">
                        <b>Price : </b>
                        <span style={{ color: "#00b6a1", fontWeight: "bold" }}>₹</span> {product.price}
                      </Text>
                      <Text>
                        <b>Weight:</b> {product.weight} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>g</span>
                      </Text>
                      <Text>
                        <b>Fresh Till :</b> {product.freshTill} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>Days</span>
                      </Text>
                    </Grid>

                    <Grid templateColumns="repeat(3, 1fr)">
                      <Text w="20rem">
                        <b>Proteins:</b> {product.proteins} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>g</span>
                      </Text>
                      <Text>
                        <b>Curbs:</b> {product.curbs} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>g</span>
                      </Text>
                      <Text>
                        <b>Calories:</b> {product.calories} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>g</span>
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
                      <Text fontWeight="bold">IGST</Text><br />
                      <Text fontWeight="bold">SGST</Text>
                      <Text fontWeight="bold">CGST</Text>
                    </HStack>
                    <HStack spacing="30px">
                      <Text marginLeft="7.5rem">{product.gst.igst} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>%</span></Text>
                      <Text style={{ marginLeft: "2.5rem" }}>{product.gst.sgst} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>%</span></Text>
                      <Text style={{ marginLeft: "2.5rem" }}>{product.gst.cgst} <span style={{ color: "#00b6a1", fontWeight: "bold" }}>%</span></Text>
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
