import { UserOrders1Endpoints } from "./__db__/orders";
import { Grocery2Endpoints } from "./__db__/grocery-2";

import { AdminDashboardEndpoints } from "./__db__/dashboard";
export const MockEndPoints = Mock => {
  UserOrders1Endpoints(Mock);
  AdminDashboardEndpoints(Mock);
  Grocery2Endpoints(Mock);
  Mock.onAny().passThrough();
};