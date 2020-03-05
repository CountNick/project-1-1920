import { Data } from "./data.js";
import { API } from "./api.js";

export const Render = {
  user: (userData, data) => {
    console.log("ull", userData);
    Render.updateUI("user");

    const userSection = document.querySelector(".user");
    const bookSection = document.querySelector(".books");
    const userInfoSection = document.querySelector(".userInfo");

    userSection.id = userData[0].lener;

    const info = `
        
        <article>
        <h3>Uw persoonlijke informatie: </h3>
        Uw geboortejaar:
        <p><input type ="text" value="${userData[0].geboorteJaar}"> <button>Verander</button></p>
        <p>U bent lid sinds: <p>${userData[0].inschrijfDat}</p></p>
        Postcode:
        <p> <input type ="text" value="${userData[0].postcode}"><button>Verander</button></p>
        </article>
      `;

    userInfoSection.insertAdjacentHTML("afterbegin", info);
    userInfoSection.insertAdjacentHTML(
      "beforebegin",
      `<h1>Welkom ${userData[0].lener}</h1>`
    );

    const bookData = data
      .map(book => {
        return book.results;
      })
      .reduce((concatenatedArray, originalArray) => {
        // Concatenate each array into one array
        return concatenatedArray.concat(originalArray);
      })
      .filter(book => {
        if (book.isbn[0].charAt(0) === "=")
          book.isbn[0] = book.isbn[0].substring(1);

        return (book.isbn = +book.isbn[0]);
      });

    console.log("renderuser: ", bookData);
    // Router.handle(bookData)
    Data.storeBooks(bookData);

    const pages = [];
    const favoriteGenre = [];

    bookSection.insertAdjacentHTML("beforebegin", "<h3>Uw leenhistorie: </h3>");

    bookData.forEach((item, i) => {
      if (item.genres != undefined) {
        favoriteGenre.push(item.genres);
      }
      pages.push(+item.description[0].substring(0, 3));
      const html = `
                        <a class="book" href = #book/:${item.isbn}>
                        <article>
                          <img src="${
                            item.coverimages
                              ? item.coverimages[1]
                              : "Geen samenvatting"
                          }">
                        </article>
                        </a>
                      `;
      bookSection.insertAdjacentHTML("afterbegin", html);
    });

    const totalPagesRead = pages.reduce((a, b) => a + b, 0);
    // userInfoSection.insertAdjacentHTML('beforeend', readerBehaviour)

    userInfoSection.insertAdjacentHTML(
      "beforeend",
      `<article class="behave">
        <h3>Uw leesgedrag: </h3>
        <p>Totaal aantal gelezen pagina's: <p>${totalPagesRead}</p>
        <p>Uw favoriete genre: </p>
        <p>Aantal gelezen boeken: ${bookData.length}</p>
        </article>`
    );
  },
  removeElements: section => {
    section.querySelectorAll("*").forEach(user => user.remove());
  },
  updateUI: route => {
    // got this piece of code from joost's example at https://github.com/cmda-minor-web/web-app-from-scratch-1920/blob/master/examples/routing-fetching-templating/static/js/app.js#L24
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
      section.classList.remove("active");
    });
    const activeSection = document.querySelector(`[data-route=${route}]`);
    console.log(activeSection);
    activeSection.classList.add("active");
  },
  bookDetail: async (data, num) => {
    console.log("bookdetail param: ", data);
    const detailSection = document.querySelector(".detail");
    // const relatedSection = document.querySelector('.relatedBooks')
    Render.removeElements(detailSection);

    Render.updateUI("detail");

    num = +num.substring(1);
    console.log("num: ", num);
    const result = data.find(book => book.isbn === num);

    const html = `
        <article>
        <h2>${result.titles[0]}</h2>
        
        <div class="scene scene--card">
        <div class="card">
        <div class="card__face card__face--front">
        <img src="${
          result.coverimages ? result.coverimages[1] : "Geen samenvatting"
        }">
        </div>
        <div class="card__face card__face--back"><p>${
          result.summaries ? result.summaries[0] : "Geen samenvatting"
        }</p></div>
        </div>
        <ul>
    
        <h4>Details: </h4>
        <li>Auteur: ${result.authors[0]}</li>
        <li>Aantal pagina's: ${result.description[0]}</li>
        <li>Uitgever: ${result.publisher[0]}</li>
    
    
        </ul>
        </div>
        <h2 class="other">Andere ${result.genres[0]} boeken</h2>
      </article>`;

    detailSection.insertAdjacentHTML("afterbegin", html);
    // detailSection.insertAdjacentElement("beforeend", relatedBooks)

    const recommendedBooks = await API.getBookData(result.genres[0]);

    Render.relatedBooks(recommendedBooks, detailSection);

    let card = document.querySelector(".card");
    card.addEventListener("click", function() {
      card.classList.toggle("is-flipped");
      // console.log('klikkert')
    });

    console.log("card", card);
  },
  relatedBooks: (data, section) => {
    const div = document.createElement("div");
    // const relatedSection = document.createElement('div')

    Render.removeElements(div);

    data.results.forEach(element => {
      const image = `<a href = "#book/${element.isbn}"><img src="${
        element.coverimages ? element.coverimages[1] : "Geen samenvatting"
      }"></a>`;
      div.insertAdjacentHTML("beforeend", image);
      section.appendChild(div);
    });
  }
};
