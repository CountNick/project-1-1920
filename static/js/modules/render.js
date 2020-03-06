import { Data } from "./data.js";
import { API } from "./api.js";

export const Render = {
  user: (userData, data) => {
    console.log("ull", userData);
    Render.updateUI("user");

    const loader =  document.querySelector('.loader')

    Render.removeElements(loader)

    const userSection = document.querySelector(".user");
    const bookSection = document.querySelector(".books");
    const userInfoSection = document.querySelector(".userInfo");

    userSection.id = userData[0].lener;

    const info = `
        
        <article>
        <h3>Uw persoonlijke informatie: </h3>
        Uw geboortejaar:
        
        <p>
        <input type ="text" value="${userData[0].geboorteJaar}">
        <button class="change">Verander</button>
        <button class="eraseInfo">X</button>
        </p>
        
        <p>U bent lid sinds: <p>${userData[0].inschrijfDat}</p>
        U komt uit:
        <p> <input type ="text" value="${userData[0].woonplaats}"><button class= "change">Verander</button></p>
        Uw geslacht:
        <p> <input type ="text" value="${userData[0].geslacht}"><button class= "change">Verander</button> <button class="eraseInfo">X</button> </p>
        Postcode:
        <p> <input type ="text" value="${userData[0].postcode}"><button class= "change">Verander</button></p>
        
        </article>
      `;



    userInfoSection.insertAdjacentHTML("afterbegin", info);
    userInfoSection.insertAdjacentHTML(
      "beforebegin",
      `<h1>Welkom ${userData[0].lener}</h1>`
    );

    const eraseInfoButtons = document.querySelectorAll('.eraseInfo')

    eraseInfoButtons.forEach(btn => {
      
      btn.addEventListener('click', function(event){
        let info = event.target
        console.log('olaa', info.parentNode)
        // Render.removeElements(btn.nextSibling.nextElementSibling)
        Render.removeElements(info.parentNode)
      })

    })


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
      const html = `    <div>
                        <button class = "erase"> X </button>
                        <a class="book" href = #book/:${item.isbn}>
                        <article class="historyRent">
                          <img src="${
                            item.coverimages
                              ? item.coverimages[1]
                              : "Geen samenvatting"
                          }">
                        </article>
                        </a>
                        </div>
                      `;
      bookSection.insertAdjacentHTML("afterbegin", html);

      const eraseButton = document.querySelector('.erase')

      console.log(eraseButton)

      eraseButton.addEventListener('click', function(event){
        const btn = event.target
        Render.removeElements(btn.nextSibling.nextElementSibling)
        btn.parentNode.removeChild(btn)
      })

    });

    const totalPagesRead = pages.reduce((a, b) => a + b, 0);

    userInfoSection.insertAdjacentHTML(
      "beforeend",
      `<article class="behave">
        <h3>Uw leesgedrag: </h3>
        <p>Totaal aantal gelezen pagina's: ${totalPagesRead}</p>
        <p>Uw favoriete genre: ${bookData[0].genres[0]}</p>
        <p>Aantal gelezen boeken: ${bookData.length}</p>
        <p>U leende uw laatste boek op ${userData[3].leenDatum}: </p>
        <p><b>${bookData[3].titles[0]} van ${bookData[0].authors[0]}: </b></p>
        <div class= "lastBorrow">
        <img src= "${bookData[3].coverimages[1]}">
        <p>${bookData[3].summaries[0]}</p>
        </div>
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
      section.classList.remove("active")
    });
    const activeSection = document.querySelector(`[data-route=${route}]`);
    console.log(activeSection);
    activeSection.classList.add("active")
  },
  bookDetail: async (data, num) => {
    console.log("bookdetail param: ", data);
    const detailSection = document.querySelector(".detail");
    // const relatedSection = document.querySelector('.relatedBooks')
    Render.removeElements(detailSection);

    Render.updateUI("detail")

    num = +num.substring(1);
    console.log("num: ", num)
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

    let card = document.querySelector(".card")
    card.addEventListener("click", function() {
      card.classList.toggle("is-flipped");
      // console.log('klikkert')
    });

    console.log("card", card)
  },
  relatedBooks: (data, section) => {
    const div = document.createElement("div")

    Render.removeElements(div)

    data.results.forEach(element => {
      const image = `<a href = "#book/${element.isbn}"><img src="${
        element.coverimages ? element.coverimages[1] : "Geen samenvatting"
      }"></a>`;
      div.insertAdjacentHTML("beforeend", image);
      section.appendChild(div)
    });
  },
  userNotFound: (input) => {
    const main = document.querySelector('main')
    Render.removeElements(main)
    const html = `
    <article>
      <h2>No users found with the following criteria: ${input}</h2>
    </article>
  `;
    main.insertAdjacentHTML("beforeend", html);
  },
  loading: () => {
      const main = document.querySelector('main')

      main.insertAdjacentHTML('afterbegin', '<div class="loader"><h1>Loading</h1><img src="./static/img/load.gif"></div>')
  }
};
