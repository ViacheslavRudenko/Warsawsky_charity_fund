import ProductList from "./main/we-need/ProductList.js";

if (window.location.pathname == "/") {
  const renderProductList = new ProductList();
  renderProductList.render();
}

const btn = document.getElementById("pay-submit");
console.log(btn.value);
