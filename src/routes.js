import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import AddProduct from "views/examples/AddProduct.js";
import Product from "views/examples/Product.js";
import Orders from "views/examples/Orders.js";
import Reviews from "views/examples/Reviews.js";
import CancelOrder from "views/examples/CancelOrder.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/AddProduct",
    name: "Add Product",
    icon: "ni ni-bag-17 text-blue",
    component: <AddProduct />,
    layout: "/admin",
  },
  {
    path: "/Products",
    name: "Products",
    icon: "ni ni-box-2 text-blue",
    component: <Product />,
    layout: "/admin",
  },
  {
    path: "/Orders",
    name: "Orders",
    icon: "ni ni-basket text-blue",
    component: <Orders />,
    layout: "/admin",
  },
  {
    path: "/Reviews",
    name: "Reviews",
    icon: "ni ni-trophy text-blue",
    component: <Reviews />,
    layout: "/admin",
  },
  {
    path: "/CancelOrder",
    name: "Cancel Order ",
    icon: "ni ni-sound-wave text-blue",
    component: <CancelOrder />,
    layout: "/admin",
  }
  


  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
