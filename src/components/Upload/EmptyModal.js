import React from "react";
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
          maxWidth: "95vw",
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
        {props.empty ? (
          <div>
            <div>You have no location data.</div>{" "}
            <a
              href="https://google.com/maps/timeline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Have you given Google permission to track your location?
            </a>
          </div>
        ) : props.noInfected ? (
          <div>
            According to your location history, you have not been in a 100 meter
            radius of an infected Corona patient.
          </div>
        ) : null}
      </div>
    </ReactModal>
  );
}
