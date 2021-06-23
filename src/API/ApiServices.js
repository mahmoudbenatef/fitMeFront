import axios from "axios";
import { API, booksURL } from "./urls";

export const ApiServices = {
  register(user) {
    return axios.post(API.register(), JSON.stringify(user), {
      headers: {
        "Content-Type":
          "multipart/form-data; charset=utf-8; boundary=" +
          Math.random().toString().substr(2),
      },
      // headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
  },
  signin(user) {
    return axios.post(API.signin(), JSON.stringify(user), {
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },
  saveQuestioner(questioner) {
    return axios.post(API.questioner(), questioner, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },

  updateQuestioner(_id, questioner) {
    return axios.put(API.questioner() + _id, questioner, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },

  getQuestioner(userID) {
    return axios.get(API.questioner() + "user/" + userID, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },
  addCategory(category) {
    return axios.post(API.category(), category, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },

  addCamp(camp) {
    return axios.post(API.camp(), camp, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },

  addUsersTocamp(campID, userID) {
    return axios.get(API.camp() + campID + "/" + userID, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },
  listCategories(queryParams) {
    if (queryParams) return axios.get(`${API.category()}${queryParams}`, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      }
    });
    return axios.get(API.category(), {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },

  listCamps(queryParams) {
    if (queryParams) return axios.get(`${API.camp()}${queryParams}`, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      }
    });
    return axios.get(API.camp(), {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },
  getAvailCamps() {
    return axios.get(API.camp() + 'availCamps', {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },
  deleteCategory(id) {
    return axios.delete(API.category() + id, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },

  deleteCamp(id) {
    return axios.delete(API.camp() + id, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },
  editCategory(id, name) {
    return axios.put(
      API.category() + id,
      { label: name },

      {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      }
    );
  },

  editCamp(id, date) {
    return axios.put(
      API.camp() + id,
      { date: date },
      {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      }
    );
  },
  getCamp(id) {
    return axios.get(
      API.camp() + id,
      {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      }
    );

  },

  getBreakfast() {
    return axios.get(
      API.meal() + 'breakfast',
      {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      }
    );
  },

  getLaunch() {
    return axios.get(
      API.meal() + 'launch',
      {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      }
    );
  },

  getDinner() {
    return axios.get(
      API.meal() + 'dinner',
      {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      }
    );
  },

};
