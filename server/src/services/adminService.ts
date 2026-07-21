import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";

export const getDashboardStats = async () => {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const [
    totalUsers,
    totalAdmins,
    totalCategories,
    totalProducts,
    totalOrders,
    activeUsers,
    suspendedUsers,
    newUsersThisMonth,
    pendingOrders,
    completedOrders,
    revenue,
    monthlyRevenue,
    recentOrders,
    recentUsers,
  ] = await Promise.all([
    User.countDocuments({ role: "customer" }),

    User.countDocuments({ role: "admin" }),

    Category.countDocuments(),

    Product.countDocuments(),

    Order.countDocuments(),

    User.countDocuments({
      isActive: true,
    }),

    User.countDocuments({
      isActive: false,
    }),

    User.countDocuments({
      createdAt: {
        $gte: startOfMonth,
      },
    }),

    Order.countDocuments({
      status: "Pending",
    }),

    Order.countDocuments({
      status: "Completed",
    }),

    Order.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$paidAmount",
          },
        },
      },
    ]),

    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$paidAmount",
          },
        },
      },
    ]),

    Order.find().populate("user").sort({ createdAt: -1 }).limit(5),

    User.find().select("-password").sort({ createdAt: -1 }).limit(5),
  ]);

  return {
    totalUsers,
    totalAdmins,
    totalCategories,
    totalProducts,
    totalOrders,

    activeUsers,
    suspendedUsers,
    newUsersThisMonth,

    pendingOrders,
    completedOrders,

    totalRevenue: revenue[0]?.total || 0,
    monthlyRevenue: monthlyRevenue[0]?.total || 0,

    recentOrders,
    recentUsers,
  };
};
