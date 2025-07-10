// Group Project : NewsAPI
//    - Get headlines and articles
//    - Docs: https://newsapi.org/'

//---------------------------------------------------------------------------------------
//Rucha
// - Read your API’s documentation.
// - Write two functions (you are welcome to write more than 2 functions if you are adding more code):
//    1. One function that makes the API call with two parameters.
// - Use fetch with .then and .catch for error handling.
// - Your URL should be dynamic so you can test with different parameter values.

let form = document.querySelector('#news-form');
form.addEventListener('submit', onFormSubmit);

//This is the function definition of onFormSubmit()
function onFormSubmit(event) {
  //prevent the page from refreshing, allowing you to handle and process the form without causing the entire page to reload
  event.preventDefault();
  //construct a FormData object, which fires the formdata event and save it in a variable named 'data'
  const data = new FormData(event.target);
  //Use the boilerplate code to create your data object
  const dataObject = Object.fromEntries(data.entries());
  //print dataObject on console
  console.log('data object: ', dataObject);
  let baseUrl = `https://newsapi.org`;
  let endPoint = `/v2/everything?`;
  let url = baseUrl + endPoint;
  let title = dataObject.title;
  let parameter1 = title;
  let country = dataObject.country;
  let parameter2 = country;
  makeAPICallWithTwoParameters(url, parameter1, parameter2);
  //Additonal code
  form.reset(); //reset form
}

// This function  makes the API call with two parameters
function makeAPICallWithTwoParameters(url, parameter1, parameter2) {
  //https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY
  //https://newsapi.org/v2/everything?q=Apple&from=2025-07-09&sortBy=popularity&apiKey=API_KEY

  //Create the dynamic url using template literal syntax and the two parameters
  let apiKey =``;
  let dynamicUrl = `${url}q=${parameter1}&%20country=${parameter2}&apiKey=${apiKey}`;
  console.log('dynamic url :', dynamicUrl);
  //Make the API call with the dynamic url
  fetch(dynamicUrl)
    .then(response => response.json())
    .then(data => {
      //console.log('This is the new API using the dynamic URL');
      console.log(data);
      //Additional Code
      let dataFromAPI = data;
      console.log('data : ', dataFromAPI);
      renderOnPage(dataFromAPI);
    })
    .catch(error => console.error('Error:', error));
}

//---------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------
//Deja
//  2. One function that handles showing the data on the page.
// - Display at least one piece of information (text or an image).
//---------------------------------------------------------------------------------------
//This function handles showing the data on the page.
function renderOnPage(data) {
  let result = document.querySelector('.output');
  //remove display-none class from result element
  result.classList.remove("display-none");
  //clear previous results
  result.textContent = "";
  //Check if data is not empty
  
  if (data.articles && data.articles.length > 0) {
    //Loop through the articles array
    data.articles.forEach(article => {
      //Create a new div element for each article
      let articleDiv = document.createElement('div');
      articleDiv.className = "card";
      //Set the inner HTML of the articleDiv with the article's title and description
      articleDiv.innerHTML = `
        <h2>${article.title}</h2>
        <h3> by ${article.author}</h3>
        <p>${article.description}</p>
        <img src="${article.urlToImage}" alt="Article Image" />
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      //Append the articleDiv to the result element
      result.appendChild(articleDiv);
    });
  } else {
    let p = document.createElement('p');
    p.textContent = "No articles found. Try alternate search.";
    result.appendChild(p);
  }

}

//---------------------------------------------------------------------------------------
//Tiamoa
// - Test different parameter combinations to see how the API responds.
//---------------------------------------------------------------------------------------
