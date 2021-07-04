import { BASE_URL } from "../../../../API//urls";
import { useEffect, useState } from "react";
import "./Conversations.css";
import { mySessionStorage } from "../../../../helper/LocalStorge";

import { ApiServices } from "../../../../API/ApiServices";

export default function Conversations({
  setCurrentConversation,
  conversations,
  setConversations,
  refresh,
}) {
  // const [currentChat, setCurrentChat] = useState({});
  useEffect(() => {
    const getConversations = async () => {
      const { data: data } = await ApiServices.getConversations(
        mySessionStorage.getCurrentUser()._id
      );
      setConversations(data);

      data.length > 0 ? setCurrentConversation(data[0]) : console.log("aa");
    };
    getConversations();
  }, [refresh]);

  return (
    <>
      <h2 className="text-bold">
        <span>
          <img
            src={BASE_URL + "/" + mySessionStorage.getCurrentUser().avatar}
            alt=""
            className={"conversation-img"}
            height="40"
            width="40"
            style={{ borderRadius: "2rem", marginLeft: "5px" }}
          />
        </span>
        Chats
      </h2>
      <div className="conversations mt-3">
        {conversations.length > 0 &&
          conversations.map((conversation) => {
            console.log(conversation.users);

            const user = conversation.users.filter(
              (user) => user._id !== mySessionStorage.getCurrentUser()._id
            )[0];

            return (
              <>
                <div
                  className={"conversation"}
                  onClick={() => setCurrentConversation(conversation)}
                >
                  <img
                    className={"conversation-img"}
                    style={{ borderRadius: "2rem" }}
                    src={BASE_URL + "/" + user.avatar}
                    height="40"
                    width="40"
                    alt=""
                  />{" "}
                  <span className={"name"}>
                    {user.firstname + " " + user.lastname}{" "}
                  </span>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
