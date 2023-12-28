import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../services/axiosConfig";

const initialState = {
    weatherData : {},
    loading : false,
    error : null,
}


export const fetchLocation  = createAsyncThunk('weather/fetchLocation', async(location, {rejectWithValue})=>{
    try{
        console.log(location);
        const response = await client({
             url: `/${location}`,
             params : {
                unitGroup : 'us',
                key : process.env.REACT_APP_WEATHER_API_KEY,
             }

        })
        console.log(response.data)
        return response.data
    }
    catch(error){
        return rejectWithValue({error : error.message})
    }
})




const weatherSlice = createSlice({
    name : 'weather',
    initialState,
    reducers : {},
    extraReducers :{
        [fetchLocation.pending] : (state,action)=>{
            state.loading = true
        },

        [fetchLocation.fulfilled] : (state,action) =>{
            state.weatherData = action.payload
            
            state.loading = false
            state.error =  null
        },

        [fetchLocation.rejected] : (state,action) => {
            state.error = action.payload.error
            state.loading = false;
        }
    }
})



const reducer =  weatherSlice.reducer;
export default reducer