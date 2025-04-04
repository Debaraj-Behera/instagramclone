import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://instagramclone-2-jfjk.onrender.com/api/v1/user/${userId}/profile`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setUserProfile(res.data.user)); 
        }
      } catch (error) {
        console.error("Error fetching suggested users:", error?.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, [userId]);
};

export default useGetUserProfile;
