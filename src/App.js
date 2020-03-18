import React from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import ReactGA from "react-ga";

const trackingId = process.env.REACT_APP_GA; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

function App() {
  return <MapComponent />;
}

export default App;
