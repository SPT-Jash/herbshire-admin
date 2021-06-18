import React, { useContext, useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Grid, Text, Center } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import Select from "react-select";
import FormInput from "../Views/FormInput";
import TextAreaInput from "../Views/TextAreaInput";
import axios from "axios";
import { SERVER_URL, PRODUCT_URL, UPLOAD_FILE_URL } from "../Config/Apis";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router";
import { Context } from "../Data/Context";

const AddRecipe = () => {
    const history = useHistory();
    const { auth } = useContext(Context);
    const toast = useToast();
    const [productId, setProductId] = useState([]);
    const [products, setProducts] = useState([]);
    const [name, setname] = useState('');
    const [timeToCook, settimeToCook] = useState('');
    const [shortDescription, setshortDescription] = useState('');
    const [description, setdescription] = useState('');
    const [dressings, setdressings] = useState('');
    const [preparation, setpreparation] = useState('');
    // const [imageUrl, setimageUrl] = useState('');
    const [image, setImage] = useState([]);
    const imageUrl = ''



    console.log(imageUrl, 'cdtyub,l');


    const productList = [];
    {
        productId.map((id) => {
            productList.push({
                "product": { id: id }
            });
        });
    }
    const productsList = [];
    {
        products.map((pro, key) => {
            productsList.push({ value: pro.id, label: pro.productName });
        });
    }

    const toastMessage = (status, title, description) => {
        toast({
            title: title,
            description: description ? description : "",
            status: status,
            duration: 1000,
            isClosable: true,
            position: "bottom-right",
        });
    };

    const add_media = (event) => {
        event.preventDefault();
        const files = event.target.files;
        const tempImages = [...image];

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            let duplicate = false;
            if (!duplicate) tempImages.push(file);
        }
        setImage([...tempImages]);
        console.log([...tempImages]);
    };

    const onAddRecipe = async () => {
        //image upload
        const formData = new FormData();
        image.forEach((file) => {
            console.log(file);
            formData.append("file", file);
        });
        const config = {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
                Accept: "*/*",
                "content-type": "multipart/form-data",
            },
        };
        axios
            .post(UPLOAD_FILE_URL, formData, config)
            .then(async (res) => {
                const tempimageurl = [...res.data]

                // recipe add
                const url = SERVER_URL + "admin/recipe/add";
                const config = {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        Accept: "*/*",
                        "content-type": "application/json",
                        "access-control-allow-origin": "*",
                    },
                };
                const body = {
                    "name": name,
                    "timeToCook": timeToCook,
                    "shortDescription": shortDescription,
                    "description": description,
                    "dressings": dressings,
                    "preparation": preparation,
                    "imageUrl": tempimageurl[0],
                    "ingredientsList": productList,
                };
                console.log(body, "body");
                if (name === '' || timeToCook === '' || shortDescription === '' || description === '' || preparation === "" || tempimageurl === '') {
                    toastMessage("error", "Some data is missing while enterning information!");
                } else {
                    console.log(body, 'api body');
                    await axios
                        .post(url, body, config)
                        .then(function (response) {
                            console.log(response, "response");
                            if (response.status === 200) {
                                toastMessage("success", "Subscription Added successful.");
                                history.push("/recipe");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            toastMessage("error", "Subscription not added", `${error.response.data.message}`);
                            // deleteUploadedImages(image);
                        })
                        .then(function () {
                            // always executed
                        });
                }
            })
            .catch((reason) => {
                console.log(reason);
                toastMessage("error", "Images not Uploaded !");
            });

    }

    useEffect(() => {
        const url = PRODUCT_URL + "/search";
        const config = {
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
            .get(url, config)
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


    return (
        <>
            <Box>
                <Text m="2" fontSize="lg" fontWeight="semibold">Add Recipe</Text>
                <Box
                    w="100%"
                    p="4"
                    borderWidth="thin"
                    borderRadius="5"
                    borderColor="blackAlpha.300"
                >
                    <Flex>
                        <FormInput
                            label="Recipe Name"
                            type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <FormInput
                            label="time to cook"
                            type="number"
                            value={timeToCook}
                            onChange={(e) => settimeToCook(e.target.value)}
                        />
                        {/* <FormInput
                            label="rating"
                            type="number"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                        /> */}
                    </Flex>
                    <Divider mt="4" mb="4" />
                    <Flex flexWrap="wrap">
                        <Box m="2">
                            <Text
                                m="2"
                                fontSize="md"
                                fontWeight="semibold"
                                color="blackAlpha.800"
                            >
                                Select subscription image
                            </Text>
                            <Flex
                                w="300px"
                                borderRadius="5"
                                borderWidth="thin"
                                borderColor="blackAlpha.200"
                            >
                                <Center>
                                    <Input
                                        placeholder="Image"
                                        type="file"
                                        opacity="0"
                                        w="300px"
                                        mt="3"
                                        borderWidth="thin"
                                        borderColor="blackAlpha.200"
                                        accept="images/*"
                                        multiple
                                        onChange={add_media}
                                    />

                                    <Text
                                        position="absolute"
                                        zIndex="-1"
                                        fontSize="lg"
                                        color="blackAlpha.500"
                                    >
                                        Drag &amp; Drop/Click Here
                                    </Text>
                                </Center>
                            </Flex>
                        </Box>
                        <Box m="3">
                            <Text
                                m="2"
                                fontSize="md"
                                fontWeight="semibold"
                                color="blackAlpha.800"
                            >
                                List of Product
                            </Text>
                            <div style={{ fontSize: "1.3rem", width: "15rem" }}>
                                <Select
                                    isMulti
                                    options={productsList}
                                    name="product"
                                    onChange={(e) => setProductId(e.map((x) => x.value))}
                                />
                            </div>
                        </Box>
                    </Flex>
                    <Divider mt="4" mb="4" />

                    <Flex width="100%">
                        <TextAreaInput
                            label="DESCRIPTION"
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                        <TextAreaInput
                            label="SHORT DESCRIPTION"
                            value={shortDescription}
                            onChange={(e) => setshortDescription(e.target.value)}
                        />
                    </Flex>
                    <Flex width="100%">
                        <TextAreaInput
                            label="DRESSINGS"
                            value={dressings}
                            onChange={(e) => setdressings(e.target.value)}
                        />
                        <TextAreaInput
                            label="PREPARATION"
                            value={preparation}
                            onChange={(e) => setpreparation(e.target.value)}
                        />
                    </Flex>
                    <Divider mt="4" mb="4" />
                    <Button type="submit" onClick={() => onAddRecipe()}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default AddRecipe;
