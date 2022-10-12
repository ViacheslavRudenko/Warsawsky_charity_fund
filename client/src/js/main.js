import ProductList from "./main/we-need/ProductList.js";

if (window.location.pathname == "/") {
  let renderProductList = new ProductList();
  renderProductList.render();
}
