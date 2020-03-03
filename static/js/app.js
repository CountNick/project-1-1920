import { API } from './modules/api.js'
/*** Fetching data -> refactor into module later ***/
const main = document.querySelector("main");


API.getUserData()
  .then(data => filterUsers(data))
  .then(filterUsers => groupBy(filterUsers))
  .then(groupBy => login(groupBy))
  // .then(login => renderUser(login));

function filterUsers(data) {
  // console.log('filter: ', data)
  
  let noISBN = data.filter(book => {
    return book.ISBN.toString().length === 13
  })

  const userIdArray = noISBN.map(book => {
    
    return {
      lener: book.Lener,
      inboekDatum: book.inboekdatum,
      genre: book.genre,
      pubJaar: book["jaar publ."],
      PPN: +book.PPN,
      ISBN: +book.ISBN,
      titel: book.titel
    };
  })
  .filter(book => !isNaN(book.ISBN));


  return userIdArray;
}

function groupBy(data) {
  console.log('length: ', data.length)
  const group = data.reduce((objectsByKeyValue, object) => {
    objectsByKeyValue[object.lener] = [
      ...(objectsByKeyValue[object.lener] || []),
      object
    ];
    return objectsByKeyValue;
  }, []);

  return group;
}

function login(data){
  console.log('login: ', data)

  document.querySelector("form").addEventListener("submit", function(event){

    event.preventDefault()

    const loginCode = document.querySelectorAll("input[type=number]")[0].value;

    let user = data[loginCode]

    
    if(user != undefined){
    
      removeUser()
      
      renderUser(user)
    }

    if(user === undefined){
      renderUserNotFound(loginCode)
    }
  });

}

function removeUser(){
  main.querySelectorAll("*").forEach(user => user.remove());
}


async function renderUser(data) {



  // console.log('render: ', data)
  
  let dataStore = data.map(book => API.getBookData(book.ISBN))

  console.log(dataStore)

  // console.log(dataStore)

  const resolvedBookData = await Promise.all(dataStore)

  console.log('normie: ', resolvedBookData)

  render(resolvedBookData)


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
function render(data) {

  const userSection = document.querySelector(".user");
  
  console.log('section: ', userSection)

  const bookData = data.map(book => {
    return book.results
  }).reduce((concatenatedArray, originalArray) => {
    // Concatenate each array into one array
    return concatenatedArray.concat(originalArray);
  });

  console.log(bookData)

  // const results = bookData.results;
  // console.dir(results);
  bookData.forEach((item, i) => {
    const html = `
            <article id=${item.isbn}>
              <h2>${item.titles[0]}</h2>
              <p>${item.summaries ? item.summaries[0] : "Geen samenvatting"}</p>
              <img src="${
                item.coverimages ? item.coverimages[1] : "Geen samenvatting"
              }">
            </article>
          `;
    main.insertAdjacentHTML("beforeend", html);
  });
}

function router(){
  routie({
    "": () => {
      console.log('home')
    },
    "user/:id": id => {
      
    }
  });
}