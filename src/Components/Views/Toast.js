import { useToast } from "@chakra-ui/toast";

export const Toast = (status, msg, title) => {
  const toast = useToast();

  toast({
    title: msg,
    description: msg,
    status: status,
    duration: 9000,
    isClosable: true,
  });
};
