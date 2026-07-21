import User from "../models/User.js";

export const getUserProfile = async (id: string) => {
  return await User.findById(id).select("-password");
};

export const updateUserProfile = async (
  id: string,
  name: string,
  phone: string,
  profileImage: string,
) => {
  return await User.findByIdAndUpdate(
    id,
    {
      name,
      phone,
      profileImage,
    },
    {
      new: true,
    },
  ).select("-password");
};
