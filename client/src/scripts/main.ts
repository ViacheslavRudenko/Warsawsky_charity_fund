//import Donations from "./main/donations/";
import ProductList from "./main/we-need/ProductList";

const renderProductList = new ProductList();
window.location.pathname == "/" && renderProductList.render();
alert("af");
// const donations = new Donations();
// window.location.pathname == "/donations.html" && donations.render();
