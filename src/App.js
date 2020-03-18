import React from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import { BrowserView, MobileView } from "react-device-detect";

function App() {
  return (
    <div>
      <BrowserView>
        <MapComponent />
      </BrowserView>
      <MobileView>
        <div style={{ padding: "20px", fontWeight: "bold" }}>
          <div>
            This site is only available on desktop at the moment{" "}
            <span role="img" aria-label="computer">
              💻
            </span>
          </div>
          <div style={{ marginTop: "24px" }}>
            Please visit from your computer
          </div>
        </div>
      </MobileView>
    </div>
  );
}

export default App;
