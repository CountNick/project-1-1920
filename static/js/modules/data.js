import { API } from "./api.js";
import { Render } from "./render.js";

export const Data = {
  filterUsers: data => {
    let noISBN = data.filter(book => {
      return book.ISBN.toString().length === 13;
    });

    const userIdArray = noISBN
      .map(book => {
        return {
          lener: book.Lener,
          inboekDatum: book.inboekdatum,
          genre: book.genre,
          pubJaar: book["jaar publ."],
          PPN: +book.PPN,
          ISBN: +book.ISBN,
          titel: book.titel,
          woonplaats: book.woonplaats,
          inschrijfDat: book["inschr. datum"],
          leenDatum: book.transdat,
          geboorteJaar: book.geboortejaar,
          postcode: book.postcode
        };
      })
      .filter(book => !isNaN(book.ISBN));

    return userIdArray;
  },
  groupBy: data => {
    console.log("length: ", data.length);
    const group = data.reduce((objectsByKeyValue, object) => {
      objectsByKeyValue[object.lener] = [
        ...(objectsByKeyValue[object.lener] || []),
        object
      ];
      return objectsByKeyValue;
    }, []);

    return group;
  },
  login: data => {
    let loginSection = document.querySelector(".loginSection");
    console.log("login: ", data);
    // let form = document.querySelector('form')
    // console.log(form)
    document.querySelector("form").addEventListener("submit", function(event) {
      event.preventDefault();

      const loginCode = document.querySelectorAll("input[type=number]")[0]
        .value;

      let user = data[loginCode];

      if (user != undefined) {
        Render.removeElements(loginSection);

        Data.getUserBooks(user);
      }

      if (user === undefined) {
        renderUserNotFound(loginCode);
      }
    });
  },
  getUserBooks: async data => {
    console.log("render: ", data);

    let dataStore = data.map(book => API.getBookData(book.ISBN));

    console.log(dataStore);

    const resolvedBookData = await Promise.all(dataStore);

    console.log("normie: ", resolvedBookData);

    Render.user(data, resolvedBookData);

    return resolvedBookData;
  },
  storeBooks: async data => {
    localStorage.clear();

    localStorage.setItem("storeBooks", JSON.stringify(data));
  }
};