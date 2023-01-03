"use strict";

let searchInput = document.querySelector(".search__country--input");
const filterByRegion = document.querySelectorAll("#filter");
// console.log(filterByRegion);
const col = document.querySelector(".col-md");
const row = document.querySelector(".cap");

let message;
let resData = [];

if ("speechSynthesis" in window) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = `Welcome to my Rest Country API application`;
  // window.speechSynthesis.speak(msg);
} else {
  alert("Your browser did not support speech to text");
}

const displayCountry = (characters) => {
  const htmlString = characters
    .map((el) => {
      return `
      
      <div class="col lists">
        <div class="card shadow-sm overflow-hidden" id="paginated-list"  data-country-name='${
          el.cca2
        }'>
        
  
          <img src="${el.flags.png}" alt="${
        el.name.common
      }" class="img-fluid" title="${
        el.name.common
      } flag" style="height: 200px" />

          <div class="card-body">

            <p class="card-title" style="font-weight:700">Country: ${
              el.name.official
            }</p>
            <p class="card-text">Capital City: ${el.capital}</p>
            <p class="card-text">Continent: ${el.region}</p>
            <p class="card-text"> Population: ${el.population.toLocaleString()}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join("");
  row.innerHTML = htmlString;
};

const countryApi = async () => {
  try {
    const resApi = await fetch("https://restcountries.com/v3.1/all");
    resData = await resApi.json();
    // console.log(resData);
    displayCountry(resData);
  } catch (error) {
    console.error(error, "No connection");
  }
};

searchInput.addEventListener("keyup", (e) => {
  let value = e.target.value.toLowerCase();
  // console.log(value);
  const filteredCountry = resData.filter((country) => {
    // console.log(country.name.official.includes(value));
    if (country) {
      return country.name.official.toLowerCase().includes(value);
    } else {
      return "No data return";
    }
  });
  // create a function to search the country object
  displayCountry(filteredCountry);
});

for (let i = 0; i < filterByRegion.length; i++) {
  filterByRegion[i].addEventListener("click", function () {
    const value = filterByRegion[i].textContent;
    const filterCountryByRegion = resData.filter((country) => {
      return country.region.includes(value);
    });
    displayCountry(filterCountryByRegion);
  });
}

countryApi();

// const displayCountry = (country) => {
//   country.forEach((el) => {
//     message = `
//       <div class="col lists">
//         <div class="card shadow-sm overflow-hidden" id="paginated-list"  data-country-name='${
//           el.cca2
//         }'>

//           <img src="${el.flags.png}" alt="${
//       el.name.common
//     }" class="img-fluid" title="${el.name.common} flag" style="height: 200px" />

//           <div class="card-body">

//             <p class="card-title" style="font-weight:700">Country: ${
//               el.name.official
//             }</p>
//             <p class="card-text">Capital City: ${el.capital}</p>
//             <p class="card-text">Continent: ${el.region}</p>
//             <p class="card-text"> Population: ${el.population.toLocaleString()}</p>
//             <div class="d-flex justify-content-between align-items-center">
//               <div class="btn-group">
//                 <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
//                 <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
//               </div>
//               <small class="text-muted">9 mins</small>
//             </div>
//           </div>
//         </div>
//       </div>`;

//     row.insertAdjacentHTML("beforeend", message);
//   });
// };
