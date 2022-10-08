import ProductCard from "./ProductCard.js";
import { productListData } from "./data.js";

const donates = document.querySelector(".need__content");

export default class ProductList extends ProductCard {
  createProductList = () => {
    productListData.map((data) => {
      const { imgUrl, name, collected, purchased, remains } = data;
      donates.innerHTML += this.createProductCard(
        imgUrl,
        name,
        collected,
        purchased,
        remains
      );
    });
  };
  render() {
    this.createProductList();
  }
}
