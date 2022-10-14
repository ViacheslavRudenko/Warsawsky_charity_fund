import ProductCard from "./ProductCard";
import { productListData } from "./data";

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
