import React, { useState } from "react";
import ReactModal from "react-modal";
import Steps from "./Steps";
import close from "./close.svg";

ReactModal.setAppElement("#root");

export default function Modal(props) {
  const [phase, setPhase] = useState(0);
  return (
    <ReactModal
      isOpen={props.open}
      onRequestClose={props.onClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          maxHeight: "95vh",
          maxWidth: "90vw",
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "24px",
          paddingRight: "24px",
          borderRadius: "16px",
          zIndex: 1000000000,
          position: "absolute"
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.6)"
        }
      }}
      contentLabel="modal"
    >
      <img
        src={close}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "20px",
          cursor: "pointer"
        }}
        alt="close"
        onClick={() => props.onClose()}
      />
      <div>
        <h1 style={{ padding: 0, margin: 0 }}>
          Do I Have Corona?{" "}
          <span role="img" aria-label="detective">
            🕵️‍♂️
          </span>
        </h1>
        <h3 style={{ padding: 0, margin: 0, marginTop: "16px" }}>
          If you have allowed Google Location History permissions on your Google
          account, you can export the data to compare where and when you came
          within a certain radius of an infected Corona patient.
        </h3>
        <p
          style={{
            margin: 0,
            padding: 0,
            marginTop: "16px",
            marginBottom: "16px"
          }}
        >
          No data is uploaded or stored to the website, it runs locally on your
          machine. If you decide to proceed, please be responsible with your
          exported data.
        </p>
        <hr />
        <Steps
          phase={phase}
          setPhase={setPhase}
          onClose={props.onClose}
          setUserData={props.setUserData}
        />
        <div style={{ marginTop: "16px" }}>
          For more information contact{" "}
          <span style={{ fontWeight: "bold" }}>dee.aye.en@gmail.com</span>
        </div>
      </div>
    </ReactModal>
  );
}
