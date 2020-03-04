import { API } from './modules/api.js'
import { Data } from './modules/data.js'
/*** Fetching data -> refactor into module later ***/
const main = document.querySelector("main");

API.getUserData()
  .then(data => Data.filterUsers(data))
  .then(filterUsers => Data.groupBy(filterUsers))
  .then(groupBy => login(groupBy))
  // .then(login => renderUser(login));

function login(data){
  let loginSection = document.querySelector('.loginSection')
  console.log('login: ', data)

  document.querySelector("form").addEventListener("submit", function(event){

    event.preventDefault()

    const loginCode = document.querySelectorAll("input[type=number]")[0].value;

    let user = data[loginCode]

    
    if(user != undefined){
    
      removeUser(loginSection)
      
      renderUser(user)
    }

    if(user === undefined){
      renderUserNotFound(loginCode)
    }
  });

}

function removeUser(section){
  section.querySelectorAll("*").forEach(user => user.remove());
}


async function renderUser(data) {

  console.log('render: ', data)
  
  let dataStore = data.map(book => API.getBookData(book.ISBN))

  console.log(dataStore)

  const resolvedBookData = await Promise.all(dataStore)

  console.log('normie: ', resolvedBookData)


  render(data, resolvedBookData)

}

function renderUserNotFound(input) {
  removeUser()
  html = `
  <article>
    <h2>No users found with the following criteria: ${input}</h2>
  </article>
`;
  main.insertAdjacentHTML("beforeend", html);
}

// render data
function render(userData, data) {
  
  console.log('ull', userData)
  updateUI('user')

  const userSection = document.querySelector(".user");
  const bookSection = document.querySelector(".books");
  const userInfoSection = document.querySelector(".userInfo");

  const info =  `
  
  <article>
    Uw geboortejaar:
    <p>${userData[0].geboorteJaar}</p>
    <p>Ingeschreven op: ${userData[0].inschrijfDat}</p>
    <p>Postcode: ${userData[0].postcode}</p>

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

  console.log(bookData)
  router(userData, bookData)
  

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



}

async function renderBookDetail(data, num){
  const detailSection = document.querySelector(".detail");
  // const relatedSection = document.querySelector('.relatedBooks')
  removeUser(detailSection)

  updateUI('detail')

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
    
  RenderRelatedBooks(recommendedBooks, detailSection)

  let card = document.querySelector('.card');
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
    // console.log('klikkert')
  });

  console.log('card', card)
}

function RenderRelatedBooks(array, section){
  
  const div = document.createElement('div')
  // const relatedSection = document.createElement('div')

  removeUser(div)

  array.results.forEach(element => {
    const image = `<img src="${element.coverimages ? element.coverimages[1] : "Geen samenvatting"}">`
    console.log(image)
    div.insertAdjacentHTML('beforeend', image)
    section.appendChild(div)
  });

}

function updateUI(route){
      
      // got this piece of code from joost's example at https://github.com/cmda-minor-web/web-app-from-scratch-1920/blob/master/examples/routing-fetching-templating/static/js/app.js#L24
      const sections = document.querySelectorAll("main section");
      sections.forEach(section => {
        section.classList.remove("active");
      });
      const activeSection = document.querySelector(`[data-route=${route}]`);
      console.log(activeSection);
      activeSection.classList.add("active");

}

function router(userData, data){
  routie({
    "": () => {
      console.log('home', userData[0].lener)
    },
    "user:/lener": (lener) => {
      console.log('user')
    },
    "book/:isbn": (isbn) => {
      console.log('data', isbn)
      renderBookDetail(data, isbn)
    }
  });
}
