import Donations from "./main/donations/donations.js";
import ProductList from "./main/we-need/ProductList.js";

if (window.location.pathname == "/") {
  const renderProductList = new ProductList();
  renderProductList.render();
}
if (window.location.pathname == "/donations.html") {
  const donations = new Donations();
  donations.render();
}
