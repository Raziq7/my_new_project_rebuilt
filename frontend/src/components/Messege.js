import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

function Messege({ status, children }) {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle mr={2}>failed!</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
}

export default Messege;
