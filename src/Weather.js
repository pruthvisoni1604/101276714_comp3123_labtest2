import React from "react";
import styled from "styled-components";

export const WeatherInfoIcons = {
    sunset: "/icons/temp.svg",
    sunrise: "/icons/temp.svg",
    humidity: "/icons/humidity.svg",
    wind: "/icons/wind.svg",
    pressure: "/icons/pressure.svg",
    clouds:"/icons/cloud.svg",
};
const LocationName = styled.span`
  margin: 16px auto;
  text-transform: capitalize;
  font-size: 30px;
  font-weight: bold;
`;
const Condition = styled.span`
  margin: 22px auto;
  text-transform: capitalize;
  font-size: 15px;
  & span {
    font-size: 30px;
  }
`;
const WeatherContainer2_Label = styled.span`
  margin: 22px 27px 12px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  font-size: 16px;
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 6px auto;
`;
const WeatherContainer1 = styled.div`
  display: flex;
  width: 100%;
  margin: 32px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherContainer2 = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 6px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  margin: 16px;
  & span {
    font-size: 14px;
    text-transform: capitalize;
  }
`;
const InputBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 22px;
  border: black solid 1px;
  border-radius: 3px;

  & input {
    padding: 10px;
    font-size: 15px;
    border: none;
    outline: none;
    font-family: Sans-serif;
    font-weight: bold;
    background:transparent
  }
  & button {
    background-color: white;
    font-size: 14px;
    padding: 0 10px;
    color: black;
    border: none;
    border-left:black solid 1px;
    outline: none;
    cursor: pointer;
    font-family: Sans-serif;
    font-weight: bold;
    background:transparent
  }
`;

const WeatherInfoComponent = (props) => {

    const {name, value} = props;

    return (
        <InfoContainer>

            <InfoIcon src={WeatherInfoIcons[name]}/>

            <InfoLabel>

                {value}
                <span>{name}</span>

            </InfoLabel>

        </InfoContainer>

    );
};
const WeatherComponent = (props) => {

    const { updateCity, fetchWeather } = props;
    const {weather} = props;
    const isDay = weather?.weather[0].icon?.includes('d')
    const Time = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }

    return (

        <>
            <InputBox onSubmit={fetchWeather}>

              <input
                onChange={(x) => updateCity(x.target.value)}
                placeholder="Enter City"
              />
              <button type={"submit"}>Search</button>

            </InputBox>

            <WeatherContainer1>
                
                <WeatherIcon 
                  src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                />

                <Condition>
                    <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
                    <p>{weather?.weather[0].description}</p>
                </Condition>

            </WeatherContainer1>

            <LocationName>

              {`${weather?.name}, ${weather?.sys?.country}`}
              <hr></hr>

            </LocationName>

            <WeatherContainer2>

                <WeatherInfoComponent name={"sunrise"} value={`${Time(weather?.sys["sunrise"])}AM`}/>
                <WeatherInfoComponent name={"sunset"} value={`${(Time(weather?.sys["sunset"]))}`}/>
                <WeatherInfoComponent name={"humidity"} value={weather?.main?.humidity}/>
                <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed}/>
                <WeatherInfoComponent name={"pressure"} value={weather?.main?.pressure}/>
                <WeatherInfoComponent name={"clouds"} value={weather?.clouds?.all}/>


            </WeatherContainer2>

        </>

    );

};

export default WeatherComponent;
