import { Data } from "./data.js";
import { API } from './api.js'

export const Render = {
    user: (userData, data) => {
        console.log('ull', userData)
        Render.updateUI('user')
      
        const userSection = document.querySelector(".user");
        const bookSection = document.querySelector(".books");
        const userInfoSection = document.querySelector(".userInfo");

      
        userSection.id = userData[0].lener
      
        const info =  `
        
        <article>
          Uw geboortejaar:
          <p>${userData[0].geboorteJaar}</p>
          <p>Ingeschreven op: ${userData[0].inschrijfDat}</p>
          <p>Postcode: ${userData[0].postcode}</p>
          <h3>Uw leenhistorie: </h3>
      
        </article>
      `;
      
      
      userInfoSection.insertAdjacentHTML("afterbegin", info);
      
        const bookData = data.map(book => {
          
          return book.results
        }).reduce((concatenatedArray, originalArray) => {
          // Concatenate each array into one array
          return concatenatedArray.concat(originalArray);
        }).filter(book => {
      
          if(book.isbn[0].charAt(0) === '=') book.isbn[0] = book.isbn[0].substring(1)
      
          return book.isbn = +book.isbn[0]
          
        });
      
        console.log('renderuser: ', bookData)
        // Router.handle(bookData)
        Data.storeBooks(bookData)
        
      
        // const results = bookData.results;
        // console.dir(results);
        bookData.forEach((item, i) => {
          const html = `
                  <a class="book" href = #book/:${item.isbn}>
                  <article>
                    <img src="${
                      item.coverimages ? item.coverimages[1] : "Geen samenvatting"
                    }">
                  </article>
                  </a>
                `;
          bookSection.insertAdjacentHTML("afterbegin", html);
          // userSection.insertAdjacentHTML("afterbegin", html);
        });
        
        // return bookData
    },
    removeElements: (section) => {
        section.querySelectorAll("*").forEach(user => user.remove());
    },
    updateUI: (route) => {

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
        console.log('bookdetail param: ', data)
        const detailSection = document.querySelector(".detail");
        // const relatedSection = document.querySelector('.relatedBooks')
        Render.removeElements(detailSection)
      
        Render.updateUI('detail')
      
        num = +num.substring(1);
        console.log('num: ', num)
        const result = data.find(book => book.isbn === num);
      
        // const recommended = API.getBookData(result.genre[0])
      
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
          <div class="card__face card__face--back"><p>${result.summaries ? result.summaries[0] : "Geen samenvatting"}</p></div>
          </div>
          </div>
          <h2>Andere ${result.genres[0]} boeken</h2>
        </article>`;
      
        detailSection.insertAdjacentHTML("afterbegin",html)
        // detailSection.insertAdjacentElement("beforeend", relatedBooks)
      
        const recommendedBooks = await API.getBookData(result.genres[0])
      
        // console.log(recommendedBooks.results)
          
        Render.relatedBooks(recommendedBooks, detailSection)
      
        let card = document.querySelector('.card');
        card.addEventListener( 'click', function() {
          card.classList.toggle('is-flipped');
          // console.log('klikkert')
        });
      
        console.log('card', card)
    },
    relatedBooks: (data, section) => {

        const div = document.createElement('div')
        // const relatedSection = document.createElement('div')
      
        Render.removeElements(div)
      
        data.results.forEach(element => {
          const image = `<a href = "#book/${element.isbn}"><img src="${element.coverimages ? element.coverimages[1] : "Geen samenvatting"}"></a>`
          div.insertAdjacentHTML('beforeend', image)
          section.appendChild(div)
        });

    }
}