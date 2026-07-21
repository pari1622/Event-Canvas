import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

const Profile = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const loadProfile = async () => {
    try {
      const { data } = await axios.get(`${API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.user);
      setName(data.user.name || "");
      setPhone(data.user.phone || "");
      setProfileImage(data.user.profileImage || "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateProfile = async () => {
    try {
      await axios.put(
        `${API}/profile`,
        {
          name,
          phone,
          profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Profile Updated");

      loadProfile();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="max-w-2xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <input
        className="w-full border p-3 rounded-lg mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        className="w-full border p-3 rounded-lg mb-4"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />

      <input
        className="w-full border p-3 rounded-lg mb-4"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        placeholder="Profile Image URL"
      />

      <button
        onClick={updateProfile}
        className="px-6 py-3 rounded-lg bg-[#B89D82] text-black font-semibold"
      >
        Save Changes
      </button>

      <div className="mt-10">
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Role:</b> {user.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
