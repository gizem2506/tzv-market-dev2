
// import Mock from "../../mock";
import { orders } from "./orders";
import { payouts } from "./payouts";
import { statistics } from "./statistics";


import { cardList, recentPurchase, stockOutProducts } from "./data";
export const AdminDashboardEndpoints = Mock => {
  
// dashboard
  Mock.onGet("/api/admin/dashboard-cards").reply(() => {
    try {
      return [200, cardList];
    } catch (err) {
      console.error(err);
      return [500, {
        message: "Internal server error"
      }];
    }
  });
 
  Mock.onGet("/api/admin/statistics").reply(() => {
    try {
      return [200, statistics];
    } catch (err) {
      console.error(err);
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/admin/payouts").reply(() => {
    try {
      return [200, payouts];
    } catch (err) {
      console.error(err);
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/admin/recent-purchase").reply(() => {
    try {
      return [200, recentPurchase];
    } catch (err) {
      console.error(err);
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/admin/stock-out-products").reply(() => {
    try {
      return [200, stockOutProducts];
    } catch (err) {
      console.error(err);
      return [500, {
        message: "Internal server error"
      }];
    }
  }); 

 
// orders

  Mock.onGet("/api/admin/orders").reply(() => {
    try {
      return [200, orders];
    } catch (err) {
      console.error(err);
      return [500, {
        message: "Internal server error"
      }];
    }
  });
  Mock.onGet("/api/admin/orders/1").reply(config => {
    try {
      if (config?.params?.id) {
        const order = orders.find(item => item.id === config.params.id);
        return [200, order];
      }

      return [200, orders[0]];
    } catch (err) {
      console.error(err);
      return [500, {
        message: "Internal server error"
      }];
    }
  });






};