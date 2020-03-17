import React, { useState, useCallback } from "react";
import step1 from "./step1.jpeg";
import step2 from "./step2.jpeg";
import step3 from "./step3.jpeg";
import step4 from "./step4.jpeg";
import googleIcon from "./googleIcon.png";
import { Button } from "@material-ui/core";
import jszip from "jszip";
import info from "./info.svg";
import close from "./close.svg";
import { useDropzone } from "react-dropzone";
import Lottie from "react-lottie";
import * as animationData from "./satellite.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default function Steps(props) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setLoading(true);
    function handleFile(f) {
      jszip.loadAsync(f).then(function(zip) {
        var dateAfter = new Date();
        zip.forEach(function(relativePath, zipEntry) {
          if (
            zipEntry.name ===
              "Takeout/היסטוריית מיקומים/היסטוריית מיקומים.json" ||
            zipEntry.name === "Takeout/Location History/Location History.json"
          ) {
            zipEntry.async("blob").then(a =>
              a.text().then(data => {
                setLoading(false);
                props.onClose();
                props.setUserData(JSON.parse(data));
              })
            );
          }
        });
      });
    }
    acceptedFiles.forEach(file => {
      handleFile(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ padding: "16px" }}>
        <div>
          <div>
            <div style={{ marginTop: "32px", fontWeight: "bold" }}>
              Step 1: Click the button below to export your location history
              data from Google Takeout
            </div>
            <div
              style={{
                cursor: "pointer",
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "16px"
              }}
              onClick={() => setExpanded(!expanded)}
            >
              <img
                src={expanded ? close : info}
                alt="info"
                style={{ width: "16px", marginRight: "8px" }}
              />
              <u>
                {expanded
                  ? "Hide instructions"
                  : "Need help with this process? Click here for instructions"}
              </u>
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                margin: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={googleIcon}
                style={{ width: "30px", marginRight: "16px" }}
                alt="google"
              />
              <Button
                variant="contained"
                color="primary"
                href="https://takeout.google.com/settings/takeout/custom/location_history"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://takeout.google.com/settings/takeout/custom/location_history
              </Button>
            </div>

            {expanded && (
              <div>
                <div style={{ color: "red" }}>
                  Click the link above and select the following options:
                </div>
                <img src={step1} style={{ width: "90%" }} alt="step" />
                <img src={step2} style={{ width: "90%" }} alt="step" />
                <img src={step3} style={{ width: "90%" }} alt="step" />
                <div
                  style={{
                    color: "red",
                    marginTop: "16px",
                    marginBottom: "16px"
                  }}
                >
                  You will receive a download link in your email after several
                  minutes:
                </div>
                <img
                  src={step4}
                  style={{ width: "90%" }}
                  alt="step"
                  style={{ marginBottom: "32px" }}
                />
              </div>
            )}
            {!loading ? (
              <div
                {...getRootProps()}
                style={{
                  cursor: "pointer",
                  border: isDragActive ? "2px solid green" : "2px dotted gray"
                }}
              >
                <input {...getInputProps()} />
                <div
                  style={{
                    color: "gray",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  {isDragActive ? (
                    <p>Drop the .zip here</p>
                  ) : (
                    <p>Once you have downloaded the .zip file, drop it here</p>
                  )}
                </div>
              </div>
            ) : (
              <Lottie options={defaultOptions} height={100} width={100} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
