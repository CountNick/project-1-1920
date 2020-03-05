import { API } from "./api.js";
import { Data } from "./data.js";
import { Render } from "./render.js";

export const Router = {
  handle: async () => {
    const getUserData = await API.getUserData();
    const filteredUsers = Data.filterUsers(getUserData);
    const userData = Data.groupBy(filteredUsers);

    routie({
      "": () => {
        Data.login(userData);
      },
      "user/:lener": lener => {
        console.log("user");
      },
      "book/:isbn": isbn => {
        // const data = await Data.storeBooks()
        const data = JSON.parse(localStorage.getItem("storeBooks"));
        console.log(data);
        Render.bookDetail(data, isbn);
      }
    });
  }
};