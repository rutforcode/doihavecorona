import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./download.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default function Loader(props) {
  return (
    <div
      style={{
        position: "absolute",
        left: "calc(50% - 100px)",
        top: "calc(50%  - 100px)",
        backgroundColor: "white",
        padding: "20px"
      }}
    >
      <Lottie options={defaultOptions} height={200} width={200} />
      <h3 style={{ margin: 0, padding: 0 }}>
        {props.error ? (
          <div>
            ERROR - <a href="https://doihavecorona.netlify.com">CLICK HERE</a>{" "}
            TO FIX THIS ISSUE
          </div>
        ) : (
          "Fetching data from the Ministry of Health"
        )}
      </h3>
    </div>
  );
}
