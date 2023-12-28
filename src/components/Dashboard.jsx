import { Button, Box, FormControl, HStack, Input, SimpleGrid, Card, CardBody, VStack, Text, Icon, Flex, Spinner} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { WiDaySunny, WiHumidity, WiBarometer } from "react-icons/wi";
import { Eye } from "react-feather";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation } from "../store/reducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudShowersHeavy } from "@fortawesome/free-solid-svg-icons";
import ipLookUp from "../store/getLocation";


export default function Dashboard() {

    const [location, setLocation] = useState('')


    const weather = useSelector(state => state.location.weatherData)
    console.log(weather);

    //-------loader-error----
    const loading = useSelector((state) => state.location.loading);


    const dispatch = useDispatch();

    async function searchHandler(e) {
        console.log('kkk');
        e.preventDefault();
        const data = await dispatch(fetchLocation(location));
        console.log(data);
    }

    useEffect(() => {
        async function ftcher() {
            await dispatch(fetchLocation(await ipLookUp()))
        }
        ftcher();
    }, [])

    const inputHandler = (e) => {
        setLocation(e.target.value);
    }

    const getDay = (datetime) => {
        const date = new Date(datetime)
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return daysOfWeek[date.getDay()]
    }


    const getTemp = (fahrenheit) => {
        return ((fahrenheit - 32) * (5 / 9)).toFixed(1);
    };

    // useEffect(()=>{
    //     dispatch(fetchLocation(location))
    // },[])



    return (
        <Box display='flex'
            alignItems='center'
            justifyContent={"center"}
            borderRadius={5}
        >

            <Box p='20px'
                background='linear-gradient(103.2deg, rgb(53, 108, 128) 14.6%, rgb(57, 187, 231) 91.5%)'
                width={400}>

                <form onSubmit={searchHandler}>
                    <FormControl flex={1} mr={14}>
                        <HStack>
                            <Input type="text" value={location} onChange={inputHandler} _focus={{ borderColor: 'white' }}></Input>

                            <Button leftIcon={<Search2Icon />}></Button>
                        </HStack>
                    </FormControl>

                </form>



                    < Box mt={8}>

                <HStack spacing={1} overflow="auto" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>

                    <Box display='flex' flexDirection="row" whiteSpace="nowrap" >

                        {weather && weather.days ? (
                            weather.days.map((day) => (
                                <Card size="sm" bg="transparent" w="95px" h="130px" style={{ marginRight: "10px" }} key={day.datetime}>
                                    <CardBody top={0}>
                                        <VStack spacing={1} align="center">
                                            <Text color="white" fontSize="sm">
                                                {getDay(day.datetime)}
                                            </Text>
                                            <Text color="white" fontSize="lg">
                                                {getTemp(day.temp)}°C
                                            </Text>
                                            <Box color="white">
                                                <FontAwesomeIcon icon={faCloudShowersHeavy} size="x" />
                                            </Box>

                                            {/* {console.log("precipType:", day.preciptype)}    
                                                {day.preciptype === "rain" && (
                                                    <FontAwesomeIcon icon={faCloudRain}  size="lg"/>
                                                )} */}

                                            <Text color="white">{day.preciptype}</Text>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <Text color="white">Loading weather data...</Text>
                        )}
                    </Box>
                </HStack>
            </Box>

            <Box mt={8} textAlign="center">
                <VStack spacing={1}>
                    {/* <WiDaySunny fontSize="4rem" color="yellow" /> */}
                    <Text color={"white"} fontSize='2xl'>{weather?.resolvedAddress}</Text>
                    <FontAwesomeIcon icon={faCloudShowersHeavy} fontSize="4rem" color="white" />
                    <Text fontSize="60px" fontWeight="bold" color="white">
                        {`${weather?.days && getTemp(weather?.days[0]?.temp)}°C`}
                    </Text>
                </VStack>

            </Box>

            <Box mt={10} mb={10}>
                <SimpleGrid spacing={2}>
                    <VStack>
                        <HStack>
                            <Card size={"lg"} bg='#49434399' width='100%' >
                                <CardBody>
                                    <HStack>
                                        <Icon as={WiHumidity} fontSize="2xl" color="#77b3ce" alignItems={'center'} />
                                        <Text color={"white"}>HUMIDITY</Text>
                                    </HStack>
                                    <Text mt={4} fontSize='2xl' fontWeight='bold' align='center' color={'white'}>{`${weather?.days && weather.days[0].humidity}%`}</Text>
                                </CardBody>
                            </Card>

                            <Card size='lg' width='100%' bg='#49434399'>
                                <CardBody>
                                    <HStack>
                                        <Icon as={WiDaySunny} fontSize="2xl" color="yellow" alignItems={'center'} />
                                        <Text color={'white'}>UV INDEX</Text>
                                    </HStack>
                                    <Text mt={4} fontSize='2xl' fontWeight='bold' align='center' color={'white'}>{weather?.days && weather.days[0].uvindex}</Text>
                                </CardBody>
                            </Card>
                        </HStack>

                        <HStack>

                            <Card size='lg' width='100%' bg='#49434399'>
                                <CardBody>
                                    <HStack>
                                        <Icon as={Eye} fontSize="2xl" color="#aeb5c0" w={5} h={5} />
                                        <Text color={'white'}>VISIBILITY</Text>
                                    </HStack>
                                    <Text mt={4} fontSize='xl' fontWeight='bold' align='center' color={'white'}>{`${weather?.days && weather.days[0].visibility}km`}</Text>
                                </CardBody>
                            </Card>

                            <Card size='lg' width='100%' bg='#49434399'>
                                <CardBody>
                                    <HStack spacing={1}>
                                        <Icon as={WiBarometer} fontSize="2xl" color="#aeb5c0" />
                                        <Text color={'white'}>PRESSURE</Text>
                                    </HStack>
                                    <Text mt={4} fontSize='xl' fontWeight='bold' align='center' color={'white'} mr={3}>{`${weather?.days && weather.days[0].pressure}hPa`}</Text>

                                </CardBody>
                            </Card>
                        </HStack>

                    </VStack>
                </SimpleGrid>

            </Box>

        </Box>

        </Box >
    )

    
    


}
