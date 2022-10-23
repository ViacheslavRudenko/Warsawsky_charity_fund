import Donations from "./main/donations/donations.js";
import { ProductList } from "./main/we-need/ProductList.js";

const renderProductList = new ProductList();
window.location.pathname == "/" && renderProductList.render();

const donations = new Donations();
window.location.pathname == "/donations.html" && donations.render();
