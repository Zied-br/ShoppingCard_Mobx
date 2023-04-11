import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import cartStore from "../CartStore";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Modal.css";

const Modals = (props) => {
  const [itemName, setItemName] = useState(props.tomodifys.name);
  const [itemPrice, setItemPrice] = useState(props.tomodifys.price);

  const handleModifyItem = () => {
    cartStore.modifyItem(props.tomodifys.id, itemName, itemPrice);
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modify</Modal.Title>
      </Modal.Header>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type="number"
          value={itemPrice}
          onChange={(e) => setItemPrice(parseFloat(e.target.value))}
        />
      </InputGroup>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button
          onClick={() => {
            handleModifyItem();
            props.onHide();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
