import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseGetAllPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("https://instagramclone-2-jfjk.onrender.com/api/v1/post/all", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPosts();
  }, []);
};

export default UseGetAllPosts;
