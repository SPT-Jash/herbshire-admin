import { Button } from "@chakra-ui/button";
import { Divider, Grid } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { ORDER_ADD_URL, PRODUCT_URL, USER_URL } from "../Config/Apis";
import { Context } from "../Data/Context";
import FormInput from "../Views/FormInput";

const AddOrder = () => {
  const { auth } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [note, setNote] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [orders, setOrders] = useState([{ product: "", quantity: "" }]);
  const [products, setProducts] = useState([]);
  const toast = useToast();
  const history = useHistory();

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
    { value: 2, label: "Online" },
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

  const toastMessage = (status,title, msg) => {
    toast({
      title: title,
      description: msg !== "null" ? msg : "",
      status: status,
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  useEffect(() => {
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
      .get(USER_URL, config)
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
      .get(PRODUCT_URL, config1)
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
    const temp = [...orders];
    temp[index]["product"] = { id: e.value };
    setOrders(temp);
  };

  const changeHandler = (e, index) => {
    const temp = [...orders];
    temp[index]["quantity"] = +e.target.value;
    setOrders(temp);
  };

  const addHandler = () => {
    setOrders([...orders, { product: "", quantity: "" }]);
  };

  const removeHandler = (index) => {
    const temp = [...orders];
    temp.splice(index, 1);
    setOrders(temp);
  };

  const createOrderHandler = () => {

    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    };

    const user = users.filter((user) => user.id === userId);

    const body = {
      userId: userId,
      paymentMethod: paymentMethod,
      deliveryDate: deliveryDate,
      deliveryStatus: deliveryStatus,
      note: note,
      address: {
        id: user[0].addressList[0].id,
      },
      ordersDetailsList: orders,
    };
    console.log(body, "body");

    axios
      .post(ORDER_ADD_URL, body, config)
      .then((response) => {
      console.log("response", response);
      if(response.status === 200){
        toastMessage("success","Order create successfully");
        history.push("/orders");
      }
    })
    .catch((error) => {
      toastMessage("error", "Order not created", `${error.response.data.message}`);
    })
    .then(() => {
      //always executed
    })
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
        {orders.map((order, key) => (
          <Flex key={key}>
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
              marginTop="3.5rem"
              onClick={() => addHandler()}
            >
              <BsPlusSquare />
            </Button>
            {key > 0 && (
              <Button
                color="#2A9F85"
                backgroundColor="transparent"
                fontSize="1.5rem"
                marginTop="3.5rem"
                onClick={() => removeHandler(key)}
              >
                <BsDashSquare />
              </Button>
            )}
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
          <FormInput
            label="Delivery Date"
            type="date"
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
