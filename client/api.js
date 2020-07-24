const API_ENDPOINT = "http://localhost:3000";

export const api = {
  create: {
    user(userData) {
      return fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    board(boardData) {
      return fetch(`${API_ENDPOINT}/boards`, {
        method: "POST",
        body: JSON.stringify(boardData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    list(listData) {
      return fetch(`${API_ENDPOINT}/lists`, {
        method: "POST",
        body: JSON.stringify(listData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    item(itemData) {
      return fetch(`${API_ENDPOINT}/items`, {
        method: "POST",
        body: JSON.stringify(itemData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
  },
  get: {
    users() {
      return fetch(`${API_ENDPOINT}/users`).then((res) => res.json());
    },
    boards(userId) {
      return fetch(`${API_ENDPOINT}/users/${userId}`).then((res) => res.json());
    },
    board(boardId) {
      return fetch(`${API_ENDPOINT}/boards/${boardId}`).then((res) =>
        res.json()
      );
    },
    list(listId) {
      return fetch(`${API_ENDPOINT}/lists/${boardId}`).then((res) =>
        res.json()
      );
    },
    log(boardId) {
      return fetch(`${API_ENDPOINT}/logs/${boardId}`).then((res) => res.json());
    },
  },
  update: {
    user() {},
    board() {},
    list() {},
    itemContent(itemId, itemData) {
      return fetch(`${API_ENDPOINT}/items/${itemId}/content`, {
        method: "PUT",
        body: JSON.stringify(itemData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    itemPosition(itemData) {
      return fetch(`${API_ENDPOINT}/items/${itemData.itemId}/position`, {
        method: "PATCH",
        body: JSON.stringify(itemData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
  },
  delete: {
    user(userId) {
      return fetch(`${API_ENDPOINT}/users/${userId}`, {
        method: "DELETE",
      }).then((res) => res.json());
    },
    board(boardId) {
      return fetch(`${API_ENDPOINT}/boards/${boardId}`, {
        method: "DELETE",
      }).then((res) => res.json());
    },
    list(listId) {
      return fetch(`${API_ENDPOINT}/lists/${listId}`, {
        method: "DELETE",
      }).then((res) => res.json());
    },
    item(itemId) {
      return fetch(`${API_ENDPOINT}/items/${itemId}`, {
        method: "DELETE",
      }).then((res) => res.json());
    },
  },
};
