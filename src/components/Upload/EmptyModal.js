import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function Modal(props) {
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
      <div style={{ fontWeight: "bold", fontSize: "32px" }}>
        {props.empty
          ? "You have no location data. Have you given Google permission to track your location?"
          : null}
      </div>
    </ReactModal>
  );
}
