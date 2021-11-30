import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import Weather from "./Weather";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 15px;
  margin: auto;
  font-family: Sans-serif;
`;

const AppLabel = styled.span`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

function App() {
  
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (x) => {
    x.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b6ffc8158638748c01df9653d2198e50`,
    );
    updateWeather(response.data);
  };
  return (
    <Container>
      <AppLabel>Weather Forecast</AppLabel>
      <AppLabel>For {`${weather?.name}, ${weather?.sys?.country}`}</AppLabel>
        <Weather 
          updateCity={updateCity} 
          fetchWeather={fetchWeather} 
          weather={weather} 
          city={city} 
        />
    </Container>
  );
}

export default App;
