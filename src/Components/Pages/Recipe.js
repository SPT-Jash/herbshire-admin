import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import {
    Box,
    Center,
    Divider,
    Flex,
    HStack,
    Spacer,
    Text,
} from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { BsChevronDown } from "react-icons/bs";
import ReactCharts from "../Views/ReactCharts";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Avatar } from "@chakra-ui/avatar";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import axios from "axios";
import { SERVER_URL } from "../Config/Apis";
import { Context } from "../Data/Context";
import { useToast } from "@chakra-ui/toast";
import ShowMoreText from "react-show-more-text";
import RecipeIngredient from '../Popup/RecipeIngredient';

const Recipe = () => {
    const toast = useToast();
    const history = useHistory();
    const { auth,recipeView, setRecipeView } = useContext(Context);
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [RecipeData, setRecipeData] = useState([]);
    const [recipeIngredientDetails, setRecipeIngredientDetails] = useState();

    const pageArray = [];
    for (let index = 0; index < totalPages; index++) {
        pageArray.push(index + 1);
    }

    const toastMessage = (status, title, description) => {
        toast({
            title: title,
            description: description ? description : "",
            status: status,
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
        });
    };

    const fetchRecipeList = useCallback(async () => {
        // recipe List
        const url = SERVER_URL + "recipe/search";
        const config = {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
            params: {
                filter: {},
                ascSort: true,
                pageSize: 10,
                pageNumber: currentPage,
            },
        };
        axios
            .get(url, config)
            .then(function (response) {
                const data = response.data.body.content;
                setTotalPages(response.data.body.totalPages);
                console.log(data, "data");
                setRecipeData(data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [currentPage]);


    const onDeleteRecipe = (dId) => {
        const url = SERVER_URL + "admin/recipe/delete";

        const config = {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
            params: {
                id: dId
            },
        };
        console.log(dId, 'delete id');
        axios
            .delete(url, config)
            .then((res) => {
                console.log("response", res);
                if (res.data.code === 200) {
                    toastMessage("success", "Recipe detele!");
                    fetchRecipeList()
                } else {
                    toastMessage("error", "recipe not delete!");
                }
            })
            .catch((error) => {
                console.log(error.response);
                toastMessage("error", "Recipe not deleted");
            });
    }

    const onEditRecipe = (eId) => {
        history.push(`/updaterecipe/${eId}`)
    }

    useEffect(() => {
        fetchRecipeList()
    }, [fetchRecipeList]);

    const onViewRecipeIngredient = (list) => {
        setRecipeView(true);
        setRecipeIngredientDetails(list);
      };
    
    return (
        <>
        {recipeView && <RecipeIngredient detail={recipeIngredientDetails} view="true"/>}
            <Box w="100%" p="4">
                <Box flex="1" flexDirection="row" mt="8">
                    <Flex>
                        <Text mb="2" fontSize="sm" fontWeight="semibold">
                            ALL Recipe
                        </Text>
                        <Spacer />
                        <Button backgroundColor="blue.200" as={Link} to="/addrecipe">
                            Add Recipe
                        </Button>
                    </Flex>
                    <Flex pt="2" pb="1">
                        <Flex ml="5">
                            <Center>
                                <Box
                                    width="2"
                                    height="2"
                                    borderColor={"red"}
                                    borderWidth="thick"
                                    borderRadius="20px"
                                />
                                <Text fontSize="md" ml="2">
                                    Tomato
                                </Text>
                            </Center>
                        </Flex>

                        <Spacer />

                        {isSmallerThan600 ? (
                            <Box mr="2">
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={<BsChevronDown />}
                                        borderColor="#E2E2E8"
                                        p="2"
                                    >
                                        Year
                                    </MenuButton>
                                    <MenuList fontSize="sm">
                                        <MenuItem>Days</MenuItem>
                                        <MenuItem>Week</MenuItem>
                                        <MenuItem>Month</MenuItem>
                                        <MenuItem>Year</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        ) : (
                            <Flex
                                borderWidth="thin"
                                borderRadius="md"
                                borderColor="#E2E2E8"
                                mr="4"
                            >
                                <Text fontSize="sm" p="2.5" pr="2.5" borderLeftRadius="md">
                                    Days
                                </Text>{" "}
                                <Divider orientation="vertical" />
                                <Text fontSize="sm" p="2.5" pr="2.5">
                                    Week
                                </Text>{" "}
                                <Divider orientation="vertical" />
                                <Text fontSize="sm" p="2.5" pr="2.5">
                                    Month
                                </Text>{" "}
                                <Divider orientation="vertical" />
                                <Text
                                    fontSize="sm"
                                    p="2.5"
                                    bg="green.500"
                                    borderRightRadius="md"
                                >
                                    Year
                                </Text>
                            </Flex>
                        )}

                        <Box>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<BsChevronDown />}
                                    borderColor="#E2E2E8"
                                    p="2"
                                >
                                    2020-2021
                                </MenuButton>
                                <MenuList fontSize="sm">
                                    <MenuItem>Download</MenuItem>
                                    <MenuItem>Create a Copy</MenuItem>
                                    <MenuItem>Mark as Draft</MenuItem>
                                    <MenuItem>Delete</MenuItem>
                                    <MenuItem>Attend a Workshop</MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Flex>
                    <Box h={isSmallerThan600 ? "300px" : "300px"}>
                        <ReactCharts type={"normal"} />
                    </Box>
                    {/* <Chart/> */}
                </Box>
            </Box>

            <Flex mt="4" mr="4">
                <Text fontSize="large" fontWeight="semibold" color="#4C4C66">
                    Recipe
                </Text>
                <Spacer />
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<BsChevronDown />}
                        borderColor="#E2E2E8"
                        p="2"
                    >
                        {currentPage}
                    </MenuButton>
                    <MenuList fontSize="sm" onSelect={(e) => console.log(e.target.value)}>
                        {pageArray.map((page) => {
                            console.log(page);
                            return (
                                <MenuItem onClick={() => setCurrentPage(page)}>{page}</MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
            </Flex>

            <Box overflow="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th color="blackAlpha.500">Recipe Image</Th>
                            <Th color="blackAlpha.500">Recipe Name</Th>
                            <Th color="blackAlpha.500">time To Cook</Th>
                            <Th color="blackAlpha.500">rating</Th>
                            <Th color="blackAlpha.500">description</Th>
                            <Th color="blackAlpha.500">short Description</Th>
                            <Th color="blackAlpha.500">dressings</Th>
                            <Th color="blackAlpha.500">Preparation</Th>
                            <Th color="blackAlpha.500">Recipe Ingredient List</Th>
                            <Th color="blackAlpha.500">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {RecipeData.length < 1
                            ? "No Data found :("
                            : RecipeData.map((recipe, key) => {
                                return (
                                    <Tr fontSize="sm" className="order-table-row" key={key}>
                                        <Td>
                                            <Flex>
                                                <Avatar
                                                    size="xs"
                                                    borderRadius="5"
                                                    name="Andrew"
                                                    src={recipe.imageUrl}
                                                />
                                            </Flex>
                                        </Td>
                                        <Td color="blackAlpha.700">{recipe.name}</Td>
                                        <Td color="blackAlpha.700">{recipe.timeToCook}</Td>
                                        <Td color="blackAlpha.700">{recipe.rating}</Td>
                                        <Td color="blackAlpha.700">
                                            <ShowMoreText
                                                lines={1}
                                                more="Show more"
                                                less="Show less"
                                                expanded={false}
                                                width={190}
                                                anchorClass="more-anchor"
                                            >
                                                {recipe.description}
                                            </ShowMoreText>
                                        </Td>
                                        <Td color="blackAlpha.700">
                                            <ShowMoreText
                                                lines={1}
                                                more="Show more"
                                                less="Show less"
                                                expanded={false}
                                                width={190}
                                                anchorClass="more-anchor"
                                            >
                                                {recipe.shortDescription}
                                            </ShowMoreText>
                                        </Td>
                                        <Td color="blackAlpha.700">
                                            <ShowMoreText
                                                lines={1}
                                                more="Show more"
                                                less="Show less"
                                                expanded={false}
                                                width={190}
                                                anchorClass="more-anchor"
                                            >
                                                {recipe.dressings}
                                            </ShowMoreText>
                                        </Td>
                                        <Td color="blackAlpha.700">
                                            <ShowMoreText
                                                lines={1}
                                                more="Show more"
                                                less="Show less"
                                                expanded={false}
                                                width={190}
                                                anchorClass="more-anchor"
                                            >
                                                {recipe.preparation}
                                            </ShowMoreText>
                                        </Td>
                                        <Td color="blackAlpha.700">
                                            <Button onClick={() => onViewRecipeIngredient(recipe.recipeIngredientList)}>
                                                Recipe Ingredient List
                                            </Button>
                                        </Td>
                                        <Td as={HStack}>
                                            <Button
                                                bg="transparent"
                                                color="green.400"
                                                onClick={(eId) => onEditRecipe(recipe.id)}
                                            >
                                                <MdEdit size="20px" />
                                            </Button>
                                            <Button
                                                bg="transparent"
                                                color="red.400"
                                                onClick={(dId) => onDeleteRecipe(recipe.id)}
                                            >
                                                <MdDeleteForever size="25px" color="red" />
                                            </Button>
                                        </Td>
                                    </Tr>
                                );
                            })}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};

export default Recipe;
