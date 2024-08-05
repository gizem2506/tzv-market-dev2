import { cache } from "react";
import axios from "../../utils/axiosInstance";
import { getAllCategories } from "../../services/categories-services";
import { getAllUsers } from "../../services/user-services";
import { getAllProducts } from "../../services/products-services";
import { getAllSlider } from "../../services/slider-services";
import { getAllComments } from "@/src/services/comment-services";

// dashboard
const getAllCard = cache(async () => {
  const response = await axios.get("/api/admin/dashboard-cards");
  return response.data;
});

const recentPurchase = cache(async () => {
  const response = await axios.get("/api/admin/recent-purchase");
  return response.data;
});

const stockOutProducts = cache(async () => {
  const response = await axios.get("/api/admin/stock-out-products");
  return response.data;
});

// products
const payouts = cache(async () => {
  const response = await axios.get("/api/admin/payouts");
  return response.data;
});

//burada yeni serviste yazdığım ÜRÜNLER geliyor direk burdan alıyorum.
const products = cache(async () => {
  const products = await getAllProducts();
  return products;
});

//burada yeni serviste yazdığım sliders geliyor direk burdan alıyorum.
const sliders = cache(async () => {
  const sliders = await getAllSlider();
  return sliders;
});

//burada yeni serviste yazdığım kategoriler geliyor direk burdan alıyorum.
const category = cache(async () => {
  const categories = await getAllCategories();
  return categories;
});

const comments = cache(async () => {
  const comments = await getAllComments();
  return comments;
});
// orders

const orders = cache(async () => {
  const response = await axios.get("/api/admin/orders");
  return response.data;
});
const getOrder = cache(async (id) => {
  const response = await axios.get("/api/admin/orders/1", {
    params: {
      id,
    },
  });
  return response.data;
});
// customers
const statistics = cache(async () => {
  const response = await axios.get("/api/admin/statistics");
  return response.data;
});

// customers
const statistics1 = cache(async () => {
  const response = await axios.get("/api/admin/statistics");
  return response.data;
});
const customers = cache(async () => {
  const customers = await getAllUsers();
  return customers;
});
// refund request

const refundRequests = cache(async () => {
  const response = await axios.get("/api/admin/refund-requests");
  return response.data;
});

const dashboard = {
  orders,
  comments,
  products,
  category,
  getOrder,
  customers,
  getAllCard,
  recentPurchase,
  statistics,
  payouts,
  sliders,
  refundRequests,
  stockOutProducts,
  statistics1,
};
export default dashboard;
