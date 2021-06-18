import React, { useContext } from "react";
import { Context } from "../Data/Context";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tr,
  Th,
  Table,
  Td,
  Center,
  Tbody,
  Thead,
} from "@chakra-ui/react";

const ViewSubscription = (props) => {
  const { viewSubscription, setViewSubscription } = useContext(Context);
  const handleClose = () => setViewSubscription(false);

  console.log(props.add, "view subscription");

  const subDay = (day) => {
    return (
      <>
        <div
          style={{
            backgroundColor: "#99edbd",
            width: "100px",
            marginBottom: "3px",
            padding: "4px",
            borderRadius: "5px",
          }}
        >
          <Center>{day}</Center>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal isOpen={viewSubscription} onClose={handleClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="#2A9F85" color="#fff">View Subscription</ModalHeader>
          <ModalCloseButton bgColor="#fff" borderRadius="50%" color="#2A9F85" />
          <ModalBody width="3xl">
            <Table border="1px solid #e2e8f0">
              <Thead>
                <Tr>
                  <Th>Price</Th>
                  <Th>Upto</Th>
                  <Th>Frequency</Th>
                  <Th>Delivery Days</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.add < 1
                  ? "No Data found :("
                  : props.add.map((sub, index) => {
                    return (
                      // <Box w="100%" h="100%" key={index} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginRight: "5px", marginBottom: "5px" }}>
                      <Tr color="gray" key={index}>
                        <Td><span style={{ color: "#00b6a1", fontWeight: "bold" }}>₹</span> {sub.price}</Td>
                        <Td>{sub.upto}</Td>
                        <Td>{sub.frequency}</Td>
                        <Td>
                          {sub.deliveryDays
                            .split("-")
                            .map((day) => subDay(day))}
                        </Td>
                      </Tr>
                      // </Box>
                    );
                  })}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewSubscription;
