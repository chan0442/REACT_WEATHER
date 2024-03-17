import React from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});
  const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${REACT_APP_API_KEY}`;

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: "post",
          url: url,
        });
        setResult(data);
        console.log(data);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <AppWrap>
      <div className="ap">World Cities Temperatures </div>
      <div className="appContentWrap">
        <input
          placeholder="City Name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="temperature">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
            </div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .ap {
    width: 98vw;
    height: 100vh;
    text-align: center;
    padding-top: 50px;
    font-size: 30px;
  }

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  border: 1px black solid;
  padding: 10px;
  border-radius: 8px;

  .city {
    font-size: 24px;
  }
  .temperature {
    font-size: 60px;
    margin-top: 8px;
  }
  .sky {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;
