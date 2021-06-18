import React, { useContext } from "react";
import { Context } from "../Data/Context";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
} from "@chakra-ui/react";

const ViewOrder = (props) => {
  const { viewOrder, setviewOrder } = useContext(Context);
  const handleClose = () => setviewOrder(false);

  console.log(props.add, "view order");

  return (
    <>
      <Modal isOpen={viewOrder} onClose={handleClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="#2A9F85" color="#fff">
            View order
          </ModalHeader>
          <ModalCloseButton bgColor="#fff" borderRadius="50%" color="#2A9F85" />
          <ModalBody textAlign="center">
            {props.add < 1
              ? "No Data found :("
              : props.add.map((order, index) => {
                  return (
                    <>
                      <Table border="1px solid #e2e8f0">
                        <Thead>
                          <Tr>
                            <Th>Product Name</Th>
                            <Th>Description</Th>
                            <Th>Quantity</Th>
                            <Th>Price</Th>
                            {/* <Th>Mode Of Payment</Th>
                  <Th>Payment Status</Th>
                  <Th>Delivery Date</Th> */}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {order.ordersDetailsList.map((orderDetail, index) => {
                            return (
                              <Tr key={index}>
                                <Td>{orderDetail.product.productName}</Td>
                                <Td>{orderDetail.product.description}</Td>
                                <Td>
                                  {orderDetail.quantity}
                                  <span
                                    style={{
                                      color: "#00b6a1",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Pieces
                                  </span>
                                </Td>
                                <Td>
                                  <span
                                    style={{
                                      color: "#00b6a1",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    ₹
                                  </span>
                                  {orderDetail.amount}
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                      <Table display="flex" justifyContent="flex-end" variant="unstyled">
                        <Tbody>
                        <Tr>
                          <Td fontWeight="bold">Total Amount</Td>
                          <Td>
                            <span
                              style={{ color: "#00b6a1", fontWeight: "bold" }}
                            >
                              ₹
                            </span>{" "}
                            {order.amount}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight="bold">Mode of payment</Td>
                          <Td>{order.paymentMethod}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight="bold">Payment Status</Td>
                          <Td>{order.paymentStatus}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight="bold">Delivery Date</Td>
                          <Td>{order.deliveryDate}</Td>
                        </Tr>
                        </Tbody>
                      </Table>

                      {/* <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            ₹
                          </span>{" "}
                          {order.amount} */}

                      {/* // <Td>{order.paymentMethod}</Td>
                      // <Td>{order.paymentStatus}</Td>
                      // <Td>{order.deliveryDate}</Td> */}
                    </>
                  );
                })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewOrder;
