import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Modal from "./Modal";

const sleep = m => new Promise(r => setTimeout(r, m));

export default function Upload(props) {
  const [modalState, setModalState] = useState(false);
  const [blinking, setBlinking] = useState(true);
  useEffect(() => {
    (async function() {
      await sleep(2000);
      setBlinking(false);
    })();
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px"
      }}
    >
      <Modal
        setUserData={props.setUserData}
        open={modalState}
        onClose={() => setModalState(false)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ fontWeight: "bold", fontSize: "24px" }}
        onClick={() => setModalState(true)}
      >
        Do I Have Corona?
      </Button>
      {blinking && (
        <div
          style={{
            color: "white",
            opacity: "0.7",
            textAlign: "center",
            marginTop: "16px",
            fontWeight: "bold"
          }}
          className="blinking"
        >
          CLICK ME{" "}
          <span aria-label="pointing" role="img">
            👆
          </span>
        </div>
      )}
    </div>
  );
}
