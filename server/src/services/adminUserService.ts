import User from "../models/User.js";

export const getUsersForAdmin = async () => {
  return await User.find().select("-password").sort({ createdAt: -1 });
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.deleteOne();

  return true;
};

export const toggleUserStatus = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user) {
    throw new Error("User not found");
  }

  user.set({
    isActive: !user.get("isActive"),
  });

  await user.save();

  return user;
};

export const getUserStats = async () => {
  const total = await User.countDocuments();

  const admins = await User.countDocuments({
    role: "admin",
  });

  const customers = await User.countDocuments({
    role: "customer",
  });

  const active = await User.countDocuments({
    isActive: true,
  });

  const suspended = await User.countDocuments({
    isActive: false,
  });

  const newThisMonth = await User.countDocuments({
    createdAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
  });

  return {
    total,
    admins,
    customers,
    active,
    suspended,
    newThisMonth,
  };
};
