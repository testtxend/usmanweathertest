import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  LocationOn,
  CloudQueue,
  Thermostat,
} from "@mui/icons-material";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import "./WeatherAppTest.css";

const API_KEY = "f8d0459764a8d53ac96ae14ca3993acb";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather();
  };

  return (
    <Container className="weather-app" maxWidth="sm">
      <Typography
        variant="h3"
        textAlign={"center"}
        color="#fff"
        fontWeight={700}
      >
        Weather <span style={{ color: "#DDB130" }}>ForeCasts</span>
      </Typography>
      <Typography
        variant="h5"
        color="#fff"
        fontWeight={400}
        mt={3}
      >
        Enter A City Name Only In <span style={{ color: "#DDB130", fontSize: '32px', fontWeight: 700 }}>Pakistan</span>
      </Typography>
      <form onSubmit={handleSubmit} className="search-bar">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              className="search-input"
              placeholder="Enter A City Name only in Pakistan"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <LocationOn sx={{ color: "#DDB130" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Search sx={{ color: "#000" }} />}
              className="search-btn"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        weather && (
          <Card className="weather-card">
            <CardContent className="card-content">
              <Typography
                variant="h2"
                color="darkblue"
                fontWeight={700}
                gutterBottom
              >
                {weather.main.temp} ℃
              </Typography>
              <Typography variant="h4" gutterBottom className="card-subtitle">
                {weather.weather[0].main}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} display={"flex"} alignItems={"center"}>
                  <IconButton>
                    <CloudQueue sx={{ fontSize: "32px", color: "#f0bd23" }} />
                  </IconButton>
                  <Typography variant="h5" color="darkblue" fontWeight={700}>
                    {weather.clouds.all}%
                  </Typography>
                </Grid>
                <Grid item xs={6} display={"flex"} alignItems={"center"}>
                  <IconButton>
                    <Thermostat sx={{ fontSize: "32px", color: "#f0bd23" }} />
                  </IconButton>
                  <Typography variant="h5" color="darkblue" fontWeight={700}>
                    {weather.main.temp_min} ℃
                  </Typography>
                </Grid>
                <Grid item xs={6} display={"flex"} alignItems={"center"}>
                  <IconButton>
                    <AcUnitIcon sx={{ fontSize: "32px", color: "#f0bd23" }} />
                  </IconButton>
                  <Typography variant="h5" color="darkblue" fontWeight={700}>
                    {weather.main.humidity}%
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )
      )}
    </Container>
  );
}

export default App;
