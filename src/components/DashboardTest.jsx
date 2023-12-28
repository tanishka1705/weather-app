import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  HStack,
  Input,
  Button,
  Spinner,
  VStack,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudShowersHeavy } from "@fortawesome/free-solid-svg-icons";
import { WiDaySunny, WiHumidity, WiBarometer } from "react-icons/wi";
import { Eye } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation } from "../store/reducer";
import ipLookUp from "../store/getLocation";

export default function DashboardTest() {
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.location.weatherData);
  const loading = useSelector((state) => state.location.loading);

  async function searchHandler(e) {
    e.preventDefault();
    await dispatch(fetchLocation(location));
  }

  useEffect(() => {
    async function fetchWeatherData() {
      await dispatch(fetchLocation(await ipLookUp()));
    }
    fetchWeatherData();
  }, []);

  const inputHandler = (e) => {
    setLocation(e.target.value);
  };

  const getDay = (datetime) => {
    const date = new Date(datetime);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[date.getDay()];
  };

  const getTemp = (fahrenheit) => {
    return ((fahrenheit - 32) * (5 / 9)).toFixed(1);
  };

  return (
    <Center height="100vh">
      <Flex
        direction="column"
        p="20px"
        background="linear-gradient(103.2deg, rgb(53, 108, 128) 14.6%, rgb(57, 187, 231) 91.5%)"
        width={400}
        alignItems="center"
      >
        <form onSubmit={searchHandler}>
          <FormControl flex={1} mr={14}>
            <HStack>
              <Input
                type="text"
                value={location}
                onChange={inputHandler}
                _focus={{ borderColor: "white" }}
              />
              <Button leftIcon={<Search2Icon />} />
            </HStack>
          </FormControl>
        </form>
        <Box
          height={loading ? "700px" : "auto"} // Adjust the height here
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <Spinner size="xl" color="white" thickness="4px" />
          ) : (
            <>
              {weather && weather.days ? (
                <>
                  <Box mt={8} style={{ overflowX: "auto", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {weather.days.map((day) => (
                        <Card
                          size="sm"
                          bg="transparent"
                          w="95px"
                          h="130px"
                          style={{ marginRight: "10px" }}
                          key={day.datetime}
                        >
                          <CardBody top={0}>
                            <VStack spacing={1} align="center">
                              <Text color="white" fontSize="sm">
                                {getDay(day.datetime)}
                              </Text>
                              <Text color="white" fontSize="lg">
                                {getTemp(day.temp)}°C
                              </Text>
                              <Box color="white">
                                <FontAwesomeIcon
                                  icon={faCloudShowersHeavy}
                                  size="x"
                                />
                              </Box>
                              <Text color="white">{day.preciptype}</Text>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </Box>
                  <Box mt={8} textAlign="center">
                    <VStack spacing={1}>
                      <Text color={"white"} fontSize="2xl">
                        {weather?.resolvedAddress}
                      </Text>
                      <FontAwesomeIcon
                        icon={faCloudShowersHeavy}
                        fontSize="4rem"
                        color="white"
                      />
                      <Text fontSize="60px" fontWeight="bold" color="white">
                        {`${weather?.days &&
                          getTemp(weather?.days[0]?.temp)}°C`}
                      </Text>
                    </VStack>
                  </Box>
                  <Box mt={8}>
                    <SimpleGrid columns={2} spacing={4} width="100%">
                      <Box>
                        <Card size="lg" bg="#49434399" width="100%">
                          <CardBody>
                            <HStack>
                              <Icon
                                as={WiHumidity}
                                fontSize="2xl"
                                color="#77b3ce"
                                alignItems="center"
                              />
                              <Text color={"white"}>HUMIDITY</Text>
                            </HStack>
                            <Text
                              mt={4}
                              fontSize="2xl"
                              fontWeight="bold"
                              align="center"
                              color={"white"}
                            >
                              {`${weather?.days &&
                                weather.days[0].humidity}%`}
                            </Text>
                          </CardBody>
                        </Card>
                      </Box>
                      <Box>
                        <Card size="lg" bg="#49434399" width="100%">
                          <CardBody>
                            <HStack>
                              <Icon
                                as={WiDaySunny}
                                fontSize="2xl"
                                color="yellow"
                                alignItems="center"
                              />
                              <Text color={"white"}>UV INDEX</Text>
                            </HStack>
                            <Text
                              mt={4}
                              fontSize="2xl"
                              fontWeight="bold"
                              align="center"
                              color={"white"}
                            >
                              {weather?.days && weather.days[0].uvindex}
                            </Text>
                          </CardBody>
                        </Card>
                      </Box>
                      <Box>
                        <Card size="lg" bg="#49434399" width="100%">
                          <CardBody>
                            <HStack>
                              <Icon
                                as={Eye}
                                fontSize="2xl"
                                color="#aeb5c0"
                                w={5}
                                h={5}
                              />
                              <Text color={"white"}>VISIBILITY</Text>
                            </HStack>
                            <Text
                              mt={4}
                              fontSize="xl"
                              fontWeight="bold"
                              align="center"
                              color={"white"}
                            >
                              {`${weather?.days &&
                                weather.days[0].visibility}km`}
                            </Text>
                          </CardBody>
                        </Card>
                      </Box>
                      <Box>
                        <Card size="lg" bg="#49434399" width="100%">
                          <CardBody>
                            <HStack spacing={1}>
                              <Icon
                                as={WiBarometer}
                                fontSize="2xl"
                                color="#aeb5c0"
                              />
                              <Text color={"white"}>PRESSURE</Text>
                            </HStack>
                            <Text
                              mt={4}
                              fontSize="xl"
                              fontWeight="bold"
                              align="center"
                              color={"white"}
                              mr={3}
                            >
                              {`${weather?.days &&
                                weather.days[0].pressure}hPa`}
                            </Text>
                          </CardBody>
                        </Card>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </>
              ) : null}
            </>
          )}
        </Box>
      </Flex>
    </Center>
  );
}
