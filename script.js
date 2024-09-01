console.log("DOM array method");

const main = document.getElementById("main");
const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");
let data = []; //This array will be used to store the user objects that are fetched and created throughout the program

async function getRandomUser() {
  let res = await fetch("https://randomuser.me/api"); //fetching data from api
  let data = await res.json(); //reading data using .json
  let user = data.results[0]; //extracting results
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function addData(user) {
  //default paarameter
  data.push(user);
  updateDOM();
}
function updateDOM(providedData = data) {
  //if we do not give this parameter then this function will take data as a deafult parameter
  main.innerHTML = "<h2><strong>person</strong> Wealth</h2>";
  providedData.forEach(
    (
      person //person is the placeholder
    ) => {
      let element = document.createElement("div");
      element.classList.add("person");
      element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
        person.money
      )}`;
      main.appendChild(element);
    }
  );
}
// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace("/d(?=(d{3})+.)/g", "$&,");
}
function doubleMoney() {
  data = data.map((person) => {
    return { ...person, money: person.money * 2 };
  });
  updateDOM();
}

function sortByRichest(){
  data.sort((a,b)=>b.money-a.money);
    updateDOM();
}



function showMillionaires(){
   data=data.filter((user) => user.money>1000000);
   updateDOM();
}
//calculate wealth
function calculateWealth() {
  const wealth = data.reduce(
    (accumulator, user) => (accumulator += user.money),
    0
  );
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthElement);
}

addUserButton.addEventListener("click",getRandomUser);
doubleButton.addEventListener("click",doubleMoney);
showMillionairesButton.addEventListener("click" ,showMillionaires);
sortButton.addEventListener("click" ,sortByRichest);
calculateWealthButton.addEventListener("click" ,calculateWealth);

//Init
getRandomUser();
getRandomUser();
getRandomUser();