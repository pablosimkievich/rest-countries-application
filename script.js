const DATA_URL = "./countries.json";

const getCountryName = (country) =>
  country?.name?.common || country?.name || "País desconocido";

const getCountryCode = (country) =>
  country?.cca2?.toUpperCase() || country?.cca3 || "";

const getFlagUrl = (country) => {
  const code = getCountryCode(country);
  if (!code) return "";
  return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
};

const getCapitalName = (country) => {
  if (Array.isArray(country?.capital) && country.capital.length > 0) {
    return country.capital[0];
  }

  return country?.capital || "Desconocida";
};

const getLanguagesText = (country) => {
  const languages = country?.languages;
  if (!languages) return "Desconocido";

  return Object.values(languages).join(", ") || "Desconocido";
};

const normalizeCountry = (country = {}) => ({
  ...country,
  name: { common: getCountryName(country) },
  flags: { svg: getFlagUrl(country) },
  cca2: getCountryCode(country),
  capital: getCapitalName(country),
  population: country.population ?? 0,
  region: country.region || "Desconocida",
  subregion: country.subregion || "",
  borders: country.borders || [],
  languages: country.languages || {},
});

// Light mode Dark Mode
const light = document.querySelector(".fa-sun");
const dark = document.querySelector(".fa-moon");

const setTheme = (isDark) => {
  const themeBody = isDark ? "var(--dark-body)" : "var(--light-body)";
  const themeContainer = isDark ? "var(--dark-container)" : "var(--light-container)";
  const themeCountry = isDark ? "var(--dark-country)" : "var(--light-country)";
  const themeInput = isDark ? "var(--dark-input)" : "var(--light-input)";
  const themeButton = isDark ? "var(--dark-button)" : "var(--light-button)";
  const themeText = isDark ? "var(--dark-text)" : "var(--light-text)";

  document.documentElement.style.setProperty("--light-body", isDark ? "rgb(54, 60, 65)" : "rgb(210, 215, 224)");
  document.documentElement.style.setProperty("--light-container", isDark ? "rgb(129, 134, 145)" : "rgb(178, 185, 198)");
  document.documentElement.style.setProperty("--light-country", isDark ? "rgb(110, 115, 126)" : "rgb(167, 172, 184)");
  document.documentElement.style.setProperty("--light-input", isDark ? "rgb(92, 98, 107)" : "rgb(160, 167, 180)");
  document.documentElement.style.setProperty("--light-button", isDark ? "rgb(80, 86, 93)" : "rgb(149, 156, 170)");
  document.documentElement.style.setProperty("--light-text", isDark ? "rgb(236, 240, 246)" : "rgba(32, 35, 59, 0.8)");

  body.style.background = "linear-gradient(180deg, " + themeBody + ", rgba(0,0,0,0.06) 100%)";
  container.style.backgroundColor = themeContainer;
  header.style.backgroundColor = themeContainer;
  countryList.style.backgroundColor = themeContainer;
  document.querySelectorAll("select, input, button, .country, .countryDetail, .backbutton").forEach((element) => {
    if (element.tagName === "SELECT" || element.tagName === "INPUT") {
      element.style.backgroundColor = themeInput;
      element.style.color = themeText;
    }

    if (element.tagName === "BUTTON" || element.classList.contains("backbutton")) {
      element.style.backgroundColor = themeButton;
      element.style.color = themeText;
    }

    if (element.classList.contains("country") || element.classList.contains("countryDetail")) {
      element.style.background = "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.03)), " + themeCountry;
      element.style.color = themeText;
    }
  });
};

light.addEventListener("click", () => {
  setTheme(false);
});

dark.addEventListener("click", () => {
  setTheme(true);
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
let currentViewFunction = () => loadAllCountries();

const showCountryDetails = (countryCode) => {
  const country = allCountriesData.find((item) => item.cca2 === countryCode);

  if (!country) return;

  countryList.textContent = "";
  const countryDiv = document.createElement("div");
  countryDiv.classList.add("countryDetail");
  const countryData = document.createElement("div");
  countryData.classList.add("countryData");
  const backButton = document.createElement("div");
  backButton.classList.add("backbutton");
  backButton.textContent = "Volver";

  const flagImg = document.createElement("img");
  flagImg.src = getFlagUrl(country);
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
  countryCapitalCity.textContent = `Capital: ${country.capital}`;
  countryLanguage.textContent = `Lenguaje: ${getLanguagesText(country)}`;
  countryBorders.textContent = `Fronteras: ${
    country.borders.length > 0 ? country.borders.join(", ") : "Sin fronteras"
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
};

const displayCountries = (countries) => {
  countryList.textContent = "";
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country");
    const flagImg = document.createElement("img");
    flagImg.src = getFlagUrl(country);
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

const loadAllCountries = async () => {
  currentViewFunction = loadAllCountries;

  try {
    const response = await fetch(DATA_URL);
    const data = await response.json();
    allCountriesData = data.map(normalizeCountry);
    displayCountries(allCountriesData);
  } catch (error) {
    console.log(error);
    countryList.innerHTML = `
      <div class="countryDetail">
        <h2>No se pudo cargar el listado</h2>
        <p>Comprueba que el archivo <strong>countries.json</strong> esté en la raíz del proyecto.</p>
      </div>
    `;
  }
};

const filterByRegion = (regionName) => {
  const filtered = allCountriesData.filter((country) => country.region === regionName);
  displayCountries(filtered);
};

const fetchingAll = () => {
  currentViewFunction = loadAllCountries;
  displayCountries(allCountriesData);
};

const fetchingAmerica = () => {
  currentViewFunction = () => fetchingAmerica();
  filterByRegion("Americas");
};

const fetchingEurope = () => {
  currentViewFunction = () => fetchingEurope();
  filterByRegion("Europe");
};

const fetchingAsia = () => {
  currentViewFunction = () => fetchingAsia();
  filterByRegion("Asia");
};

const fetchingAfrica = () => {
  currentViewFunction = () => fetchingAfrica();
  filterByRegion("Africa");
};

const fetchingOceania = () => {
  currentViewFunction = () => fetchingOceania();
  filterByRegion("Oceania");
};

const runSearch = () => {
  const searchQuery = searchInput.value.toLowerCase().trim();
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery)
  );
  displayCountries(filteredCountries);
  currentViewFunction = () => displayCountries(filteredCountries);
};

searchInput.addEventListener("input", runSearch);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    runSearch();
  }
});

searchButton.addEventListener("click", runSearch);

loadAllCountries();

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
