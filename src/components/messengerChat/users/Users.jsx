import { useEffect, useState } from "react";
import "./Users";
import { mySessionStorage } from "../../../helper/LocalStorge";
import { BASE_URL } from "../../../API//urls";

import { ApiServices } from "../../../API/ApiServices";
import { ListGroup } from "react-bootstrap";

export default function Users({
  conversations,
  setCurrentConversation,
  setNewConversation,
}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const { data: data } = await ApiServices.getUsers();
      setUsers(data);
    };
    getUsers();
  }, []);
  function handleUserClicked(user) {
    const conversation = conversations.filter(
      (conversation) =>
        conversation.users.filter((currUser) => currUser._id === user._id)
          .length > 0
    )[0];
    if (conversation) {
      setCurrentConversation(conversation);
      setNewConversation(null);
    } else {
      setNewConversation({
        state: true,
        users: [user._id, mySessionStorage.getCurrentUser()._id],
      });
    }
  }
  return (
    <>
      <h1>Users</h1>
      <div
        className={"users"}
        style={{ height: "90%", width: "100%", overflowY: "scroll" }}
      >
        <ListGroup>
          {users &&
            users
              .filter(
                (user) => user._id !== mySessionStorage.getCurrentUser()._id
              )
              .map((user) => (
                <ListGroup.Item
                  onClick={() => {
                    handleUserClicked(user);
                  }}
                >
                  {" "}
                  <span>
                    <img
                      src={
                        BASE_URL +
                        "/" +
                       user.avatar
                      }
                      alt=""
                      className={"conversation-img"}
                      height="40"
                      width="40"
                      style={{ borderRadius: "2rem", marginLeft: "5px" }}
                    />
                  </span>
                  {`${user.firstname}  ${user.lastname} ${
                    user.role === "admin" ? "(admin)" : ""
                  }`}
                </ListGroup.Item>
              ))}
        </ListGroup>
      </div>
    </>
  );
}
