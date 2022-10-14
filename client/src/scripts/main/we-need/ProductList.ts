const ProductCard = require("./ProductCard.js");
import { productListData } from "./data.js";

const donates = <HTMLDivElement>document.querySelector(".need__content");

export default class ProductList extends ProductCard {
  createProductList = (): void => {
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
