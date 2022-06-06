import { Box, Flex, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//chart
import Chart from "react-apexcharts";

function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();

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

  //charts
  const chart = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <VStack w="100%">
      <Box
        w="90%"
        display={["block", "block", "block", "flex", "flex"]}
        mb="200px"
        justifyContent="space-evenly"
      >
        <Box
          borderRadius="25px"
          ml="100px"
          w="100%"
          h="190px"
          bgGradient="linear(to-t,#857295,#29259A)"
        >
          <Text fontSize="3xl" ml="25px" color="white">
            Total Sales
          </Text>
          <Flex justifyContent="space-around">
            <Text fontSize="xl" ml="25px" color="yellow">
              Today <br />
              52
            </Text>
            <Text fontSize="xl" ml="25px" color="yellow">
              weekly
              <br />
              52
            </Text>
            <Text fontSize="xl" ml="25px" color="yellow">
              Monthly
              <br />
              52
            </Text>
          </Flex>
          <Flex justifyContent="space-around">
            <Text fontSize="xl" ml="25px" color="pink">
              Avg <br />
              52
            </Text>
            <Text fontSize="xl" ml="25px" color="pink">
              Avg <br />
              52
            </Text>
            <Text fontSize="xl" ml="25px" color="pink">
              Avg <br />
              52
            </Text>
          </Flex>
        </Box>
        <Box
          borderRadius="25px"
          ml="100px"
          w="100%"
          h="190px"
          bgGradient="linear(to-t,#857295,#29259A)"
        >
          <Text fontSize="3xl" ml="25px" color="white">
            Total Sales
          </Text>
          <Flex justifyContent="space-around">
            <Text fontSize="xl" ml="25px" color="yellow">
              Today <br />
              52
            </Text>
            <Text fontSize="xl" ml="25px" color="yellow">
              weekly
              <br />
              52
            </Text>
            <Text fontSize="xl" ml="25px" color="yellow">
              Monthly
              <br />
              52
            </Text>
          </Flex>
          <Flex justifyContent="space-around">
            <Text fontSize="xl" ml="25px" color="pink">
              Avg <br />
              52
            </Text>
            <Text fontSize="xl" ml="25px" color="pink">
              Avg <br />
              52
            </Text>
            <Text fontSize="xl" ml="25px" color="pink">
              Avg <br />
              52
            </Text>
          </Flex>
        </Box>
      </Box>
      <div className="mixed-chart">
        <Chart
          options={chart.options}
          series={chart.series}
          type="bar"
          mr="350px"
          width="66%"
        />
        <Chart
          options={chart.options}
          series={chart.series}
          type="line"
          width="500"
        />
      </div>
    </VStack>
  );
}

export default Dashboard;
