import { Button } from "@chakra-ui/button";
import { Divider, Grid } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import Select from "react-select";
import { PRODUCT_URL, SERVER_URL } from "../Config/Apis";
import { Context } from "../Data/Context";
import FormInput from "../Views/FormInput";
import { CalendarIcon } from '@chakra-ui/icons'

const AddOrder = () => {
  const { auth } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [note, setNote] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [order, setOrder] = useState([{ product: "", quantity: "" }]);
  const [products, setProducts] = useState([]);

  const userList = [];
  {
    users.map(
      (user) =>
        user.addressList.length > 0 &&
        userList.push({ value: user.id, label: user.fullName })
    );
  }

  const paymentMethodList = [
    { value: 1, label: "Cash" },
    { value: 2, label: "Wallet" },
    { value: 3, label: "Net Banking" },
  ];

  const paymentStatusList = [
    { value: 1, label: "Complete" },
    { value: 2, label: "Incomplete" },
    { value: 3, label: "Paid" },
  ];

  const deliveryStatusList = [
    { value: 1, label: "Pending" },
    { value: 2, label: "Inprocess" },
    { value: 3, label: "Delivered" },
  ];

  const productList = [];

  {
    products.map((pro, key) => {
      productList.push({ value: pro.id, label: pro.productName });
    });
  }

  useEffect(() => {
    const url = SERVER_URL + "user/search";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        filter: {},
        ascSort: true,
        pageSize: 1000,
        pageNumber: 1,
      },
    };
    axios
      .get(url, config)
      .then(function (response) {
        const data = response.data.body.content;
        console.log(data, "data");
        setUsers(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    const url1 = PRODUCT_URL + "/search";
    const config1 = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        filter: {},
        ascSort: true,
        pageSize: 100000,
        pageNumber: 1,
      },
    };
    axios
      .get(url1, config1)
      .then(function (response) {
        const data = response.data.body.content;
        setProducts(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [auth]);

  const changeSelectHandler = (e, index) => {
    const temp = [...order];
    temp[index]["product"] = { id: e.value };
    setOrder(temp);
  };

  const changeHandler = (e, index) => {
    const temp = [...order];
    temp[index]["quantity"] = +e.target.value;
    setOrder(temp);
  };

  const addHandler = () => {
    setOrder([...order, { product: "", quantity: "" }]);
  };

  const createOrderHandler = () => {
    const user = users.filter((user) => user.id === userId);

    const body = {
      userId: userId,
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
      deliveryDate: deliveryDate,
      deliveryStatus: deliveryStatus,
      note: note,
      address: {
        id: user[0].addressList[0].id,
      },
      ordersDetailsList: order,
    };
    console.log(body, "body", order);
  };

  return (
    <Box>
      <Text m="2" fontSize="lg" fontWeight="semibold">
        ADD ORDER
      </Text>
      {/* {console.log(users, "user")} */}
      <Box
        w="100%"
        p="4"
        borderWidth="thin"
        borderRadius="5"
        borderColor="blackAlpha.300"
      >
        <Box m="3">
          <Text
            m="2"
            fontSize="md"
            fontWeight="semibold"
            color="blackAlpha.800"
          >
            User Name
          </Text>
          <div style={{ fontSize: "1.2rem", width: "14rem" }}>
            <Select
              name="user"
              options={userList}
              onChange={(e) => setUserId(e.value)}
            />
          </div>
        </Box>
        <Divider mt="4" mb="4" />
        <Grid m="2">
          <Text
            m="2"
            fontSize="md"
            fontWeight="semibold"
            color="blackAlpha.800"
          >
            Note
          </Text>
          <Textarea
            mb="3"
            placeholder=""
            onChange={(e) => setNote(e.target.value)}
          />
        </Grid>
        <Divider mt="4" mb="4" />
        {order.map((or, key) => (
          <Flex>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Product
              </Text>
              <div style={{ fontSize: "1.3rem", width: "16rem" }}>
                <Select
                  options={productList}
                  name="product"
                  onChange={(e) => changeSelectHandler(e, key)}
                />
              </div>
            </Box>
            <FormInput
              label="quantity"
              type="number"
              onChange={(e) => changeHandler(e, key)}
            />
            <Button
              color="#2A9F85"
              backgroundColor="transparent"
              fontSize="1.5rem"
              marginTop="3rem"
              onClick={() => addHandler()}
            >
              <BsPlusSquare />
            </Button>
          </Flex>
        ))}
        <Divider mt="4" mb="4" />
        <Flex>
          <Box m="3">
            <Text
              m="2"
              fontSize="md"
              fontWeight="semibold"
              color="blackAlpha.800"
            >
              Payment Method
            </Text>
            <div style={{ fontSize: "1.1rem", width: "10rem" }}>
              <Select
                options={paymentMethodList}
                onChange={(e) => setPaymentMethod(e.label)}
              />
            </div>
          </Box>
          <Box m="3">
            <Text
              m="2"
              fontSize="md"
              fontWeight="semibold"
              color="blackAlpha.800"
            >
              Payment Status
            </Text>
            <div style={{ fontSize: "1.1rem", width: "10rem" }}>
              <Select
                options={paymentStatusList}
                onChange={(e) => setPaymentStatus(e.label)}
              />
            </div>
          </Box>
        </Flex>
        <Divider mt="4" mb="4" />
        <Flex>
          <FormInput
            label="Delivery Date"
            type="date"
            symbol={<CalendarIcon w={5} h={5} />}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
          <Box m="3">
            <Text
              m="2"
              fontSize="md"
              fontWeight="semibold"
              color="blackAlpha.800"
            >
              Delivery Status
            </Text>
            <div style={{ fontSize: "1.1rem", width: "10rem" }}>
              <Select
                options={deliveryStatusList}
                onChange={(e) => setDeliveryStatus(e.label)}
              />
            </div>
          </Box>
        </Flex>
        <Button onClick={createOrderHandler}>Add Order</Button>
      </Box>
    </Box>
  );
};

export default AddOrder;
