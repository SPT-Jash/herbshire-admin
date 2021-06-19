import { useContext } from "react";
import { Context } from "../Data/Context";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";

const RecipeIngredient = (props) => {
  const { recipeView, setRecipeView } = useContext(Context);

  const handleClose = () => {
    setRecipeView(false);
  };

  return (
    <>
      <Modal isOpen={recipeView} onClose={handleClose} size="3xl">
        <ModalOverlay />
        <ModalContent w="fit-content">
          <ModalHeader bgColor="#2A9F85" color="#fff" borderTopRadius="5px">
            View Recipe Ingredient Details
          </ModalHeader>
          <ModalCloseButton bgColor="#fff" borderRadius="50%" color="#2A9F85" />
          <ModalBody width="4.5">
            {console.log("details", props.detail)}
            {props.detail < 1
              ? "No Data found :("
              : props.detail.map((recipe, index) => {
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
                        lineHeight: "40px",
                      }}
                    >
                      <Grid templateColumns="repeat(3, 1fr)">
                        <Text w="20rem">
                          <b>ProductName:</b> {recipe.product.productName}
                        </Text>
                        <Text>
                          <b>Quantity:</b>
                          {recipe.product.quantity}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            Pieces
                          </span>
                        </Text>
                        <Text>
                          <b>Discount:</b> {recipe.product.discount}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            %
                          </span>
                        </Text>
                      </Grid>

                      <Grid templateColumns="repeat(3, 1fr)">
                        <Text w="20rem">
                          <b>Price : </b>
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            ₹
                          </span>{" "}
                          {recipe.product.price}
                        </Text>
                        <Text>
                          <b>Weight:</b> {recipe.product.weight}{" "}
                          {recipe.product.weightUnit ? (
                            recipe.product.weightUnit
                          ) : (
                            <span
                              style={{ color: "#00b6a1", fontWeight: "bold" }}
                            >
                              g
                            </span>
                          )}
                        </Text>
                        <Text>
                          <b>Fresh Till :</b> {recipe.product.freshTill}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            Days
                          </span>
                        </Text>
                      </Grid>

                      <Grid templateColumns="repeat(3, 1fr)">
                        <Text w="20rem">
                          <b>Proteins:</b> {recipe.product.proteins}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            g
                          </span>
                        </Text>
                        <Text>
                          <b>Curbs:</b> {recipe.product.curbs}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            g
                          </span>
                        </Text>
                        <Text>
                          <b>Calories:</b> {recipe.product.calories}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            g
                          </span>
                        </Text>
                      </Grid>

                      <Grid templateColumns="repeat(3,1fr)">
                        <Text w="20rem">
                          <b>Fats: </b>
                          {recipe.product.fats}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            g
                          </span>
                        </Text>
                        <Text w="20rem">
                          <b>Description:</b> {recipe.product.description}
                        </Text>
                      </Grid>

                      <HStack spacing="25px">
                        <Text fontWeight="bold">GST Details:</Text>
                        <Text fontWeight="bold">IGST</Text>
                        <br />
                        <Text fontWeight="bold">SGST</Text>
                        <Text fontWeight="bold">CGST</Text>
                      </HStack>
                      <HStack spacing="30px">
                        <Text marginLeft="7.5rem">
                          {recipe.product.gst.igst}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            %
                          </span>
                        </Text>
                        <Text style={{ marginLeft: "2.5rem" }}>
                          {recipe.product.gst.sgst}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            %
                          </span>
                        </Text>
                        <Text style={{ marginLeft: "2.5rem" }}>
                          {recipe.product.gst.cgst}{" "}
                          <span
                            style={{ color: "#00b6a1", fontWeight: "bold" }}
                          >
                            %
                          </span>
                        </Text>
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

export default RecipeIngredient;
