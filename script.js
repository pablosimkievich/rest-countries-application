const urlAll =
  "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,borders,cca2,languages,subregion";
const urlAmerica =
  "https://restcountries.com/v3.1/region/americas?fields=name,flags,subregion,cca2,region";
const urlEurope =
  "https://restcountries.com/v3.1/region/europe?fields=name,flags,subregion,cca2,region";
const urlAsia =
  "https://restcountries.com/v3.1/region/asia?fields=name,flags,subregion,cca2,region";
const urlAfrica =
  "https://restcountries.com/v3.1/region/africa?fields=name,flags,subregion,cca2,region";
const urlOceania =
  "https://restcountries.com/v3.1/region/oceania?fields=name,flags,subregion,cca2,region";

// Light mode Dark Mode
const light = document.querySelector(".fa-sun");
const dark = document.querySelector(".fa-moon");

light.addEventListener("click", () => {
  // console.log("light");
  body.style.backgroundColor = "var(--light-body)";
  container.style.backgroundColor = "var(--light-container)";
  header.style.backgroundColor = "var(--light-container)";
});

dark.addEventListener("click", () => {
  // console.log("dark");
  body.style.backgroundColor = "var(--dark-body)";
  container.style.backgroundColor = "var(--dark-container)";
  header.style.backgroundColor = "var(--dark-container)";
});

// Light and Dark mode selectors
const body = document.querySelector(".body");
const container = document.querySelector(".container");
const header = document.querySelector(".header");
const countryList = document.getElementById("countryList");
const continentOption = document.getElementById("continent");
const searchInput = document.querySelector(".input");
const searchButton = document.querySelector(".btn");

let allCountriesData = [];
let currentViewFunction = () => fetchingAll();

const showCountryDetails = async (countryCode) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const data = await response.json();
    const country = data[0];

    countryList.textContent = "";
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("countryDetail");
    const countryData = document.createElement("div");
    countryData.classList.add("countryData");
    const backButton = document.createElement("div");
    backButton.classList.add("backbutton");
    backButton.textContent = "Volver";

    const flagImg = document.createElement("img");
    flagImg.src = country.flags.svg;
    flagImg.alt = `${country.name.common} flag`;

    const countryName = document.createElement("span");
    const countryContinent = document.createElement("span");
    const countryPopulation = document.createElement("span");
    const countryCapitalCity = document.createElement("span");
    const countryLanguage = document.createElement("span");
    const countryBorders = document.createElement("span");
    countryContinent.classList.add("datosCountry");
    countryPopulation.classList.add("datosCountry");
    countryCapitalCity.classList.add("datosCountry");
    countryLanguage.classList.add("datosCountry");
    countryBorders.classList.add("datosCountry");
    countryName.textContent = country.name.common;
    countryContinent.textContent = country.region;
    countryPopulation.textContent = `Población: ${country.population}`;
    countryCapitalCity.textContent = `Capital: ${
      country.capital?.[0] || "Desconocida"
    }`;
    countryLanguage.textContent = `Lenguaje: ${
      country.languages
        ? Object.values(country.languages).join(", ")
        : "Desconocido"
    }`;
    countryBorders.textContent = `Fronteras: ${
      country.borders ? country.borders.join(", ") : "Sin fronteras"
    }`;
    countryDiv.appendChild(flagImg);
    countryDiv.appendChild(countryName);
    countryDiv.appendChild(countryContinent);
    countryData.appendChild(countryPopulation);
    countryData.appendChild(countryCapitalCity);
    countryData.appendChild(countryLanguage);
    countryData.appendChild(countryBorders);
    countryData.appendChild(backButton);
    countryList.appendChild(countryData);
    countryList.appendChild(countryDiv);

    backButton.addEventListener("click", () => {
      countryList.textContent = "";
      currentViewFunction();
    });
  } catch (error) {
    console.log(error);
  }
};

const displayCountries = (countries) => {
  countryList.textContent = "";
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country");
    const flagImg = document.createElement("img");
    flagImg.src = country.flags.svg;
    flagImg.alt = `${country.name.common} flag`;
    const countryName = document.createElement("span");
    countryName.textContent = country.name.common;

    const countryLink = document.createElement("a");

    countryDiv.appendChild(flagImg);
    countryDiv.appendChild(countryName);

    if (country.region) {
      const countryRegion = document.createElement("span");
      countryRegion.classList.add("datos");
      countryRegion.textContent = `Región: ${country.region}`;
      countryDiv.appendChild(countryRegion);
    }

    countryLink.appendChild(countryDiv);
    countryList.appendChild(countryLink);

    countryLink.addEventListener("click", (e) => {
      e.preventDefault();
      showCountryDetails(country.cca2);
    });
  });
};

const fetchingAll = async function () {
  currentViewFunction = fetchingAll;
  try {
    const response = await fetch(urlAll);
    const data = await response.json();
    allCountriesData = data;
    displayCountries(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchRegion = async function (url, regionFetchingFunction) {
  currentViewFunction = regionFetchingFunction;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayCountries(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchingAmerica = () => fetchRegion(urlAmerica, fetchingAmerica);
const fetchingEurope = () => fetchRegion(urlEurope, fetchingEurope);
const fetchingAsia = () => fetchRegion(urlAsia, fetchingAsia);
const fetchingAfrica = () => fetchRegion(urlAfrica, fetchingAfrica);
const fetchingOceania = () => fetchRegion(urlOceania, fetchingOceania);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.toLowerCase().trim();
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery)
  );
  displayCountries(filteredCountries);
  currentViewFunction = () => displayCountries(filteredCountries);
});

fetchingAll();

continentOption.addEventListener("change", () => {
  const selectedOption = parseInt(continentOption.value);
  switch (selectedOption) {
    case 0:
      fetchingAll();
      break;
    case 1:
      fetchingAsia();
      break;
    case 2:
      fetchingAmerica();
      break;
    case 3:
      fetchingAfrica();
      break;
    case 4:
      fetchingEurope();
      break;
    case 5:
      fetchingOceania();
      break;
  }
});
