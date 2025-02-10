import axios from "axios";
import React, { useEffect, useState } from "react";



const States = () => {

    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity ,setSelectedCity] = useState("");

    const fetchCountry = async () => {
        try {
            const response = await axios.get("https://crio-location-selector.onrender.com/countries");
            setCountry(response.data);
        }catch(error){
            console.error(error.response);
        }
    }

    const fetchState = async(e) => {
        setSelectedCity("");
        setSelectedCountry(e.target.value);
        if(e.target.value === ""){
            return;
        }

        // console.log("fetchState Called");
        
        try{
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${e.target.value}/states`)
            setState(response.data);
        }catch(error){
            console.error(error.response);
        }
    }

    const fetchCity = async(e) => {
        setSelectedCity("");
        setCity([]);
        setSelectedState(e.target.value);
        if(e.target.value === ""){
            setCity([]);
            return;
        }

        setSelectedState(e.target.value);

        // console.log(e.target.value);
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${e.target.value}/cities`)
            setCity(response.data);
        }catch(error){
            console.error(error.response);
        }
    }


    useEffect(async() => {
        const apiCall = await fetchCountry();
    }, []);



    return (
        <div>
            <h2>Select Location</h2>
            <select onChange={(e) => fetchState(e)}>
                <option value={""}>Choose a country</option>
            {country.map((index) => {
                return(
                
                    <option value={index} >{index}</option>
                
                )
            })}
            </select>
            <select onChange={(e) => fetchCity(e)} style={{margin:"10px"}} disabled={!selectedCountry}>
                <option value={""}>Choose a state</option>
            {state.map((index) => {
                return(
                    <option value={index} >{index}</option>
                )
            })}
            </select>

            <select onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
                <option value={""}>Choose a city</option>
                {city.map((index) => {
                    return(
                        <option value={index}>{index}</option>
                    );

                })}
            </select>
            {selectedCity ? <h3>You selected {selectedCity}, {selectedState}, {selectedCountry}</h3> : <></>}
        </div>
    );
}

export default States;
