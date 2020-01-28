/* Global Variables */
const data = {};
const form = document.querySelector('.form');
const button = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const newZip = document.getElementById('zip').value;
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=426e2854445b1013aed7407f5e9b641d';


// Create a new date instance dynamically with JS
let d = new Date();
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let m = month[d.getMonth()];
let newDate = d.getDate() + '.' + m + '.' + d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(baseURL, newZip, apiKey) {
  // get user input values
  getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content: content })
    .then(
      // call updateUI to update browser content
      updateUI()
    )
    });
  // reset form
};

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */

const postData = async (url = '/add', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

/*Function to update UI*/
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const data = await request.json()
    // update new entry values
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temp;
    document.getElementById('content').innerHTML = data.content;
  }
  catch (error) {
    console.log("error", error);
  }
};
