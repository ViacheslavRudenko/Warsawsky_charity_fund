//import Donations from "./main/donations/donations.js";
import ProductList from "./main/we-need/ProductList";

const renderProductList = new ProductList();
window.location.pathname == "/" && renderProductList.render();

// if (window.location.pathname == "/donations.html") {
//   const donations = new Donations();
//   donations.render();
// }
