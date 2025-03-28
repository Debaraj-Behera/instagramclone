import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UseGetAllMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(
          `https://instagramclone-2-jfjk.onrender.com/api/v1/message/all/${selectedUser?._id}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessages();
  }, [selectedUser]);
};

export default UseGetAllMessages;
