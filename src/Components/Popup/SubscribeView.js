import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Data/Context";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Flex,
    Tr,
    Th,
    Table,
    Td,
    Tbody,
    Thead,
} from "@chakra-ui/react";
import axios from "axios";
import { SERVER_URL } from "../Config/Apis";
import { Avatar } from "@chakra-ui/avatar";


const SubscribeView = (props) => {
    const { auth, subscribeView, setsubscribeView } = useContext(Context);
    const handleClose = () => setsubscribeView(false);
    const [subscriptionDetails, setSubscriptionDetails] = useState([]);


    console.log(props.id, "view address");

    useEffect(() => {
        const url = SERVER_URL + "subscribe/admin/subscription/customers";
        const config = {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
            params: {
                subscriptionId: props.id
            },
        };
        axios
            .get(url, config)
            .then(function (response) {
                console.log(response.data.body, "response");
                setSubscriptionDetails(response.data.body)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [auth]);

    return (
        <>
            <Modal isOpen={subscribeView} onClose={handleClose} size="4xl">
                <ModalOverlay />
                <ModalContent w="fit-content">
                    <ModalHeader bgColor="#2A9F85" color="#fff" borderTopRadius="5px">
                        View subscribe
                    </ModalHeader>
                    <ModalCloseButton bgColor="#fff" borderRadius="50%" color="#2A9F85" />
                    <ModalBody width="4.5">
                        <Table border="1px solid #e2e8f0">
                            <Thead>
                                <Tr>
                                    <Th>User Image</Th>
                                    <Th>User Name</Th>
                                    <Th>Phone No.</Th>
                                    <Th>Email</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {subscriptionDetails < 1
                                    ? "No Data found :("
                                    : subscriptionDetails.map((subscribe, index) => {
                                        return (
                                            <Tr color="gray" key={index}>
                                                <Td>
                                                    <Avatar
                                                        size="xs"
                                                        borderRadius="5"
                                                        name="Andrew"
                                                        src={subscribe.imageUrl}
                                                    />
                                                </Td>
                                                <Td>{subscribe.fullName}</Td>
                                                <Td>{subscribe.phone}</Td>
                                                <Td>{subscribe.email}</Td>
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

export default SubscribeView;
