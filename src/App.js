import React, { useEffect } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import ReactGA from "react-ga";

const trackingId = process.env.REACT_APP_GA;

function App() {
  useEffect(() => {
    ReactGA.initialize(trackingId);
  }, []);
  return <MapComponent />;
}

export default App;
