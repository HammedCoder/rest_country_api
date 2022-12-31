"use strict";

const col = document.querySelector(".col-md");
const row = document.querySelector(".cap");

let message;
const countryApi = async () => {
  const resApi = await fetch("https://restcountries.com/v3.1/all");
  const resData = await resApi.json();
  // console.log(resData);
  try {
    resData.forEach((el) => {
      message = `
        <div class="col lists">
          <div class="card shadow-sm" id="paginated-list">
            <img src="${el.flags.png}" alt="${el.name.common}" class="img-fluid" title="${el.name.common} flag" style="height: 200px" />

            <div class="card-body">

              <p class="card-title" style="font-weight:700">Country: ${el.name.official}</p>
              <p class="card-text">Capital City: ${el.capital}</p>
              <p class="card-text">Continent: ${el.region}</p>
              <p class="card-text"> Population: ${el.population}</p>
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

      row.insertAdjacentHTML("beforeend", message);
    });
  } catch (error) {
    console.log(error);
  }
};
countryApi();



const btnSearch = document.querySelector("#button-search");
let input = document.querySelector("#inputsearch");
// const searchCountry = () => {
//   // console.log(e);
//   input = input.toLowerCase();
//   let list = document.querySelector(".lists");
//   for (let i = 0; i < list.length; i++) {
//     const el = list[i];
//     if (!el.toLowerCase().includes(input)) {
//       el.style.display = "none";
//     } else {
//       el.style.display = list;
//     }
//   }
// };
// btnSearch.addEventListener("click", searchCountry);

const setResult = (result) => {
  for (const country of result) {
    // const item = country;
  }
};

input.addEventListener("input", (e) => {
  let value = e.target.value;
  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    console.log(value);
    // create a function to search the country objects
    setResult(
      message.filter((country) => {
        return country.name.common.includes(value);
      })
    );
  } else {
    // return not found
  }
});
