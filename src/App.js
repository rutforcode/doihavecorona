import React from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import ReactGA from "react-ga";

const trackingId = "UA-147414018-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

function App() {
  return <MapComponent />;
}

export default App;
