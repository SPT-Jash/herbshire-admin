import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { TagLabel, Tag, TagCloseButton } from "@chakra-ui/tag";

const UpdateRecipe = () => {
  const history = useHistory();
  const { id } = useParams();
  const { auth } = useContext(Context);
  const toast = useToast();
  const [productId, setProductId] = useState([]);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState([]);
  const [recipeDetail, setrecipeDetail] = useState({});
  const [recipeDetailProduct, setrecipeDetailProduct] = useState([]);

  const productList = [];
  {
    productId.map((id) => {
      productList.push({
        product: { id: id },
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
    console.log([...tempImages], "tempimg");
  };

  const fetchRecipeList = useCallback(async () => {
    // recipe List
    const url = SERVER_URL + "recipe/get";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: id,
      },
    };
    axios
      .get(url, config)
      .then(function (response) {
        console.log(response, "response");
        setrecipeDetail(response.data.body);
        setrecipeDetailProduct(response.data.body.ingredientsList);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  // const removeImage = (item) => {
  //     debugger
  //     const tempImage = recipeDetail.imageUrl;
  //     const deletedImage = tempImage.splice(item, 1);
  //     toastMessage("success", 'Image deteled')
  //     setrecipeDetail({
  //         ...recipeDetail,
  //         imageUrl: [...tempImage]
  //     })
  // };

  const SelectedImages = (
    <Flex display="block" height="200px">
      <Tag
        size="lg"
        p="3"
        borderRadius="10px"
        variant="solid"
        colorScheme="green"
        m="2"
      >
        <Box>
          <img
            height="180px"
            width="180px"
            src={recipeDetail.imageUrl}
            alt="product"
          />
        </Box>
      </Tag>
    </Flex>
  );

  const removeProduct = (index) => {
    const tempProduct = recipeDetail.ingredientsList;
    const deletedProduct = tempProduct.splice(index, 1);
    toastMessage("success", "product deteled");
    setrecipeDetail({
      ...recipeDetail,
      ingredientsList: [...tempProduct],
    });
    setrecipeDetailProduct([...tempProduct]);
  };

  const SelectedProduct = (
    <Flex display="block" marginLeft="18rem">
      {recipeDetailProduct.map((item, index) => (
        <Tag
          size="lg"
          h="50px"
          key={index}
          borderRadius="10px"
          variant="solid"
          colorScheme="green"
          m="2"
        >
          <TagLabel>{item.product.productName}</TagLabel>
          <TagCloseButton onClick={() => removeProduct(index)} />
        </Tag>
      ))}
    </Flex>
  );

  //upload image
  const uploadedImages = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
        Accept: "*/*",
        "content-type": "multipart/form-data",
      },
    };
    
    const formData = new FormData();
    image.forEach((file) => {
      formData.append("file", file);
    });

    axios
      .post(UPLOAD_FILE_URL, formData, config)
      .then((res) => {
          console.log("imgres",res);
        if (res.status === 200) {
          toastMessage("success", "Images Uploaded !");
          const imgurl = res.data[0];
          setrecipeDetail({...recipeDetail, imageUrl: imgurl});
          console.log(recipeDetail, "recipeDetailinupload");
         
        }
      })
      .catch((reason) => {
        console.log(reason);
        toastMessage("error", "Images not Uploaded !");
      });
  };

  const onUpdateRecipe = () => {
    // EDIT recpie
    console.log(recipeDetail, "recipeDetailinsubmit");
    let url3 = SERVER_URL + "admin/recipe/update";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    };
    axios
      .patch(url3, recipeDetail, config)
      .then(function (response) {
        console.log(response, "response");
        if (response.status === 200) {
          history.push("/recipe");
          toastMessage("success", "Recipe Edit Successful.");
        } else {
          toastMessage("error", "Error while Editing recipe.!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchRecipeList();
    // display product
    const url = PRODUCT_URL;
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
  }, [auth, fetchRecipeList]);
  console.log(recipeDetail, "recipeDetail");

  return (
    <>
      <Box>
        <Text m="2" fontSize="lg" fontWeight="semibold">
          Update Recipe
        </Text>
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
              value={recipeDetail.name}
              onChange={(e) => {
                setrecipeDetail({
                  ...recipeDetail,
                  name: e.target.value,
                });
              }}
            />
            <FormInput
              label="time to cook"
              type="number"
              value={recipeDetail.timeToCook}
              onChange={(e) => {
                setrecipeDetail({
                  ...recipeDetail,
                  timeToCook: e.target.value,
                });
              }}
            />
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
            <Button marginTop="3.2rem" onClick={() => uploadedImages()}>ADD</Button>
            <Box m="3" marginLeft="10rem">
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
          <Flex>
            {SelectedImages}
            {SelectedProduct}
          </Flex>
          <Divider mt="4" mb="4" />

          <Flex width="100%">
            <TextAreaInput
              label="DESCRIPTION"
              value={recipeDetail.description}
              onChange={(e) => {
                setrecipeDetail({
                  ...recipeDetail,
                  description: e.target.value,
                });
              }}
            />
            <TextAreaInput
              label="SHORT DESCRIPTION"
              value={recipeDetail.shortDescription}
              onChange={(e) => {
                setrecipeDetail({
                  ...recipeDetail,
                  shortDescription: e.target.value,
                });
              }}
            />
          </Flex>
          <Flex width="100%">
            <TextAreaInput
              label="DRESSINGS"
              value={recipeDetail.dressings}
              onChange={(e) => {
                setrecipeDetail({
                  ...recipeDetail,
                  dressings: e.target.value,
                });
              }}
            />
            <TextAreaInput
              label="PREPARATION"
              value={recipeDetail.preparation}
              onChange={(e) => {
                setrecipeDetail({
                  ...recipeDetail,
                  preparation: e.target.value,
                });
              }}
            />
          </Flex>
          <Divider mt="4" mb="4" />
          <Button type="submit" onClick={() => onUpdateRecipe()}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UpdateRecipe;
