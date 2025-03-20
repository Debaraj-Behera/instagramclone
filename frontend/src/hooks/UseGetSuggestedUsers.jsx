import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/suggested",
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSuggestedUsers(res.data.users)); 
        }
      } catch (error) {
        console.error("Error fetching suggested users:", error?.response?.data?.message || error.message);
      }
    };

    fetchSuggestedUsers();
  }, []);
};

export default useGetSuggestedUsers;
