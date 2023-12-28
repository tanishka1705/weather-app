import axios from "axios";

async function ipLookUp(){
    const url = 'http://ip-api.com/json';
    const response = await axios.get(url);
    console.log(response.data.city);
    return response.data.city
}

export default ipLookUp;