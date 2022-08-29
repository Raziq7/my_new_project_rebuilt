import {
  Box,
  Flex,
  Stack,
  Text,
  VStack,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  HStack,
  Spacer,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//chart
import ChartLine from "../components/charts/ChartLine";
import DashTable from "../components/DashTable/DashTable";
import ChartCard from "../components/charts/ChartCard";
import BarChart from "../components/charts/BarChart";

function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const [color, setColor] = useState("");

  useEffect(() => {
    let staffExit = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (!staffExit) {
      navigate("/login");
    } else {
      let staffFind = JSON.parse(localStorage.getItem("staffInfo"));
      console.log(
        "staffExitstaffExitstaffExitstaffExit",
        staffFind.findStaff.name
      );
      toast({
        title: `Welcome ${staffFind.findStaff.name}.`,
        description: "Have a Nice Day.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, []);

  //dark Mode
  let DarkMode = localStorage.getItem("chakra-ui-color-mode")
    ? localStorage.getItem("chakra-ui-color-mode")
    : null;

  useEffect(() => {
    if (DarkMode == "dark") {
      setColor("#6F6AF8");
    }
  }, [DarkMode]);
  //charts
  const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  return (
    <VStack w="100%" mb="200px">
      <Center fontSize="40px" color="teal">
        Business Overview
      </Center>
      <Box w="90%">
        <Box
          display={["block", "block", "block", "flex", "flex"]}
          justifyContent="space-around"
        >
          <Box
            backgroundColor={DarkMode == "light" ? "white !important" : color}
            borderRadius="25px"
            border="1px solid #8792a3"
            w="300px"
            h="150px"
            boxShadow="xl"
            textAlign="center"
            mt="30px"
          >
            <HStack mt="20px">
              <StatGroup ml="45px">
                <Stat>
                  <StatLabel>Today</StatLabel>
                  <StatNumber>345,670</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </StatGroup>
              <Spacer />
              <StatGroup mr="10px">
                <Stat>
                  <StatLabel>Yestarday</StatLabel>
                  <StatNumber>45</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
              <Spacer />
            </HStack>
            <Text colorScheme="facebook">TOTAL USERS</Text>
          </Box>

          <Box
            backgroundColor={DarkMode == "light" ? "white" : color}
            borderRadius="25px"
            border="1px solid #8792a3"
            w="300px"
            h="150px"
            boxShadow="xl"
            textAlign="center"
            mt="30px"
          >
            <HStack mt="20px">
              <StatGroup ml="45px">
                <Stat>
                  <StatLabel>Today</StatLabel>
                  <StatNumber>345,670</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </StatGroup>
              <Spacer />
              <StatGroup mr="10px">
                <Stat>
                  <StatLabel>Yestarday</StatLabel>
                  <StatNumber>45</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
              <Spacer />
            </HStack>
            <Text colorScheme="facebook">INCOME REPORT</Text>
          </Box>

          <Box
            backgroundColor={DarkMode == "light" ? "white" : color}
            borderRadius="25px"
            border="1px solid #8792a3"
            w="300px"
            h="150px"
            boxShadow="xl"
            textAlign="center"
            mt="30px"
          >
            <HStack mt="20px">
              <StatGroup ml="45px">
                <Stat>
                  <StatLabel>Today</StatLabel>
                  <StatNumber>345,670</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </StatGroup>
              <Spacer />
              <StatGroup mr="30px">
                <Stat>
                  <StatLabel>Yestarday</StatLabel>
                  <StatNumber>45</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
              <Spacer />
            </HStack>
            <Text colorScheme="facebook">SALES COUNT</Text>
          </Box>
        </Box>
        <Box
          w="100%"
          display={["block", "block", "block", "flex", "flex"]}
          ml="50px"
          mt="100px"
        >
          <Box w="45%" ml="30px">
            {/* <ChartLine /> */}
            <BarChart />
          </Box>
          <Box w="45%" ml="50px">
            <DashTable />
          </Box>
        </Box>
      </Box>

      {/* <Box w="45%" ml="50px" mb="auto" mt="auto">
        <ChartLine />
      </Box> */}
    </VStack>
  );
}

export default Dashboard;
