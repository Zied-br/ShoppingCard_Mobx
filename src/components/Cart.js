import React, { useState } from "react";
import { observer } from "mobx-react";
import cartStore from "../CartStore";
import { v4 as uuidv4 } from "uuid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "./Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Cart = observer(() => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [appearModal, setAppearModal] = useState(false);
  const [tomodifys, settomodifys] = useState({
    name: "",
    price: 0,
    id: "",
  });

  const handleAddItem = () => {
    if (itemName !== "" && itemPrice !== 0) {
      cartStore.addItem({
        name: itemName,
        price: itemPrice,
        id: uuidv4(),
        like: false,
      });
      setItemName("");
      setItemPrice(0);
    }
  };

  const handleDeleteItem = (item) => {
    cartStore.deleteItem(item.id);
  };

  const handleInverseItem = (item) => {
    cartStore.inverseItem(item.id);
  };

  const handleModifyItem = (item) => {
    settomodifys({ name: item.name, price: item.price, id: item.id });
    setAppearModal(!appearModal);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="inputs">
        <InputGroup className="mb-3">
          <Form.Control
            className="inputform"
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            className="inputform"
            type="number"
            placeholder="Item Price"
            value={itemPrice}
            onChange={(e) => setItemPrice(parseFloat(e.target.value))}
          />
        </InputGroup>
      </div>
      <Button onClick={handleAddItem}>Add Item</Button>
      <ul className="list">
        {cartStore.items.map((item) => (
          <li key={item.id}>
            {item.name} {item.price} Dinar
            <Button onClick={() => handleDeleteItem(item)}>Delete Item</Button>
            <Button onClick={() => handleModifyItem(item)}>Modify Item</Button>
            {item.like ? (
              <FavoriteIcon
                className="icon"
                onClick={() => handleInverseItem(item)}
              />
            ) : (
              <FavoriteBorderIcon
                className="icon"
                onClick={() => handleInverseItem(item)}
              />
            )}
          </li>
        ))}
      </ul>
      {appearModal ? (
        <Modal
          show={appearModal}
          onHide={() => setAppearModal(false)}
          tomodifys={tomodifys}
        />
      ) : null}
    </div>
  );
});

export default Cart;
