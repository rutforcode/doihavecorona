import React, { useEffect } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
import { BrowserView, MobileView } from "react-device-detect";

const trackingId = process.env.REACT_APP_GA;
const browserHistory = createBrowserHistory();
ReactGA.initialize(trackingId);

browserHistory.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
});

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
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
