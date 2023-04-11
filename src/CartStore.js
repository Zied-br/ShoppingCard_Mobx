import { observable, action } from "mobx";

const cartStore = observable({
  items: [],

  addItem: action(function Add(item) {
    this.items.push(item);
  }),
  deleteItem: action(function Delete(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }),

  inverseItem: action(function Like(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index].like = !this.items[index].like;
    }
  }),
  modifyItem: action(function Update(id, name, price) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index].name = name;
      this.items[index].price = price;
    }
  }),
});

export default cartStore;
