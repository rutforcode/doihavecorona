import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "./Modal";

export default function Upload(props) {
  const [modalState, setModalState] = useState(false);
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
    </div>
  );
}
