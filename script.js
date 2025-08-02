const urlAll = "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,borders";
const urlAmerica = "https://restcountries.com/v2/region/americas";
const urlEurope = "https://restcountries.com/v2/region/europe";
const urlAsia = "https://restcountries.com/v2/region/asia";
const urlAfrica = "https://restcountries.com/v2/region/africa";
const urlOceania = "https://restcountries.com/v2/region/oceania";

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

const fetchingAll = async function () {
  try {
    const response = await fetch(urlAll);
    const data = await response.json();
    // console.log(data);
    data.map((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country");
      const flagImg = document.createElement("img");
      flagImg.src = country.flags.svg;
      flagImg.alt = `${country.name} flag`;
      const countryName = document.createElement("span");
      const countryContinent = document.createElement("span");
      const countryLink = document.createElement("a");
      const countryCode = country.alpha2Code;
      countryName.textContent = country.name.common;

      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryLink.appendChild(countryDiv);
      countryList.appendChild(countryLink);

      // Detalle de todos los países al inicio app
      countryLink.addEventListener("click", () => {
        fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
          .then((response) => response.json())
            
          .then((data) => {
            console.log(data)
            countryList.textContent = "";
            const countryContainer = document.createElement("div")
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("countryDetail");
            const countryData = document.createElement("div");
            countryData.classList.add("countryData");
            const backButton = document.createElement('div');
            backButton.classList.add('backbutton');
            backButton.textContent = "Volver"

            const flagImg = document.createElement("img");
            flagImg.src = data[0].flags.svg;
            flagImg.alt = `${data[0].name.common} flag`;

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
            countryName.textContent = data[0].name.common;
            countryContinent.textContent = data[0].region;
            countryPopulation.textContent = `Población: ${data[0].population}`;
            countryCapitalCity.textContent = `Capital: ${data[0].capital}`;
            countryLanguage.textContent = `Lenguaje: ${data[0].languages.name}`;
            countryBorders.textContent = `Fronteras: ${ data[0].borders ? data[0].borders.map((border) => border): "sin fronteras"}`
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
              fetchingAll()
            })
          });
      });
      // Fin detalle de todos los países al inicio app

      // Busqueda por país
      searchButton.addEventListener("click", () => {
        let searchQuery = searchInput.value.toLowerCase();

        data.forEach((element) => {
          let searchCountry = element.name.common.toLowerCase();

          if (searchCountry.includes(searchQuery)) {
            countryList.textContent = "";
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("countryDetail");
            const countryData = document.createElement("div");
            countryData.classList.add("countryData");
            const backButton = document.createElement('div');
            backButton.classList.add('backbutton');
            backButton.textContent = "Volver"

            const flagImg = document.createElement("img");
            flagImg.src = element.flags.svg;
            flagImg.alt = `${element.name} flag`;

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

            countryName.textContent = element.name.common;
            countryContinent.textContent = element.region;
            countryPopulation.textContent = `Población: ${element.population}`;
            countryCapitalCity.textContent = `Capital: ${element.capital}`;
            countryLanguage.textContent = `Lenguaje: ${element.languages[0].name}`;
            countryBorders.textContent = `Fronteras: ${ element.borders ? element.borders.map((border) => border): "sin fronteras"}`

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
              fetchingAll()
            })

          }
        });
      });
      // Fin de busqueda por país
    });
  } catch (error) {
    console.log(error);
  }
};

fetchingAll();

const fetchingAmerica = async function () {
  try {
    const response = await fetch(urlAmerica);
    const dataAmerica = await response.json();
    console.log(dataAmerica);
    // Mapeo de los países de América
    countryList.textContent = "";

    dataAmerica.map((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country");

      const flagImg = document.createElement("img");
      flagImg.src = country.flags.svg;
      flagImg.alt = `${country.name} flag`;

      const countryName = document.createElement("span");
      const countryContinent = document.createElement("span");
      const countryPopulation = document.createElement("span");
      const countryCapitalCity = document.createElement("span");
      const countryLink = document.createElement("a");
      const countryCode = country.alpha2Code;

      countryContinent.classList.add("datos");
      countryPopulation.classList.add("datos");
      countryCapitalCity.classList.add("datos");
      

      countryName.textContent = country.name;
      countryContinent.textContent = `Región: ${country.subregion}`;
      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryDiv.appendChild(countryContinent);
      countryLink.appendChild(countryDiv);
      countryList.appendChild(countryLink);

      // Detalle de países de América
      countryLink.addEventListener("click", () => {
        fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
          .then((response) => response.json())
          .then((data) => {
            countryList.textContent = "";
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("countryDetail");
            const countryData = document.createElement("div");
            countryData.classList.add("countryData");
            const backButton = document.createElement('div');
            backButton.classList.add('backbutton');
            backButton.textContent = "Volver"

            const flagImg = document.createElement("img");
            flagImg.src = data.flags.svg;
            flagImg.alt = `${data.name} flag`;

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

            countryName.textContent = data.name;
            countryContinent.textContent = data.region;
            countryPopulation.textContent = `Población: ${data.population}`;
            countryCapitalCity.textContent = `Capital: ${data.capital}`;
            countryLanguage.textContent = `Lenguaje: ${data.languages[0].name}`;
            countryBorders.textContent = `Fronteras: ${ data.borders ? data.borders.map((border) => border): "sin fronteras"}`

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
              fetchingAmerica()
            })
          });
      });
      // Fin detalle de países de América

    });
  } catch (error) {
    console.log(error);
  }
};

const fetchingEurope = async function () {
  try {
    const response = await fetch(urlEurope);
    const dataEurope = await response.json();
    console.log(dataEurope);
    // Mapeo de los países de Europa
    countryList.textContent = "";

    dataEurope.map((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country");

      const flagImg = document.createElement("img");
      flagImg.src = country.flags.svg;
      flagImg.alt = `${country.name} flag`;

      const countryName = document.createElement("span");
      const countryContinent = document.createElement("span");
      const countryPopulation = document.createElement("span");
      const countryCapitalCity = document.createElement("span");
      const countryLink = document.createElement("a");
      const countryCode = country.alpha2Code;
      countryContinent.classList.add("datos");
      countryPopulation.classList.add("datos");
      countryCapitalCity.classList.add("datos");

      countryName.textContent = country.name;
      countryContinent.textContent = `Región: ${country.subregion}`;

      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryDiv.appendChild(countryContinent);
      countryLink.appendChild(countryDiv);
      countryList.appendChild(countryLink);

      // Detalle de países de Europa
      countryLink.addEventListener("click", () => {
        fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
          .then((response) => response.json())
          .then((data) => {
            countryList.textContent = "";
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("countryDetail");
            const countryData = document.createElement("div");
            countryData.classList.add("countryData");
            const backButton = document.createElement('div');
            backButton.classList.add('backbutton');
            backButton.textContent = "Volver"

            const flagImg = document.createElement("img");
            flagImg.src = data.flags.svg;
            flagImg.alt = `${data.name} flag`;

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

            countryName.textContent = data.name;
            countryContinent.textContent = data.region;
            countryPopulation.textContent = `Población: ${data.population}`;
            countryCapitalCity.textContent = `Capital: ${data.capital}`;
            countryLanguage.textContent = `Lenguaje: ${data.languages[0].name}`;
            countryBorders.textContent = `Fronteras: ${ data.borders ? data.borders.map((border) => border): "sin fronteras"}`


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
              fetchingEurope()
            })

          });
      });
      // Fin detalle de países de Europa

    });
  } catch (error) {
    console.log(error);
  }
};

const fetchingAsia = async function () {
  try {
    const response = await fetch(urlAsia);
    const dataAsia = await response.json();
    console.log(dataAsia);
    // Mapeo de los países de Asia
    countryList.textContent = "";

    dataAsia.map((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country");

      const flagImg = document.createElement("img");
      flagImg.src = country.flags.svg;
      flagImg.alt = `${country.name} flag`;

      const countryName = document.createElement("span");
      const countryContinent = document.createElement("span");
      const countryPopulation = document.createElement("span");
      const countryCapitalCity = document.createElement("span");
      const countryLink = document.createElement("a");
      const countryCode = country.alpha2Code;

      

      countryContinent.classList.add("datos");
      countryPopulation.classList.add("datos");
      countryCapitalCity.classList.add("datos");
      countryName.textContent = country.name;
      countryContinent.textContent = `Región: ${country.subregion}`;

      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryDiv.appendChild(countryContinent);

      countryLink.appendChild(countryDiv);
      countryList.appendChild(countryLink);

      // Detalle de países de Asia
      countryLink.addEventListener("click", () => {
        fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
          .then((response) => response.json())
          .then((data) => {
            countryList.textContent = "";
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("countryDetail");
            const countryData = document.createElement("div");
            countryData.classList.add("countryData");
            const backButton = document.createElement('div');
            backButton.classList.add('backbutton');
            backButton.textContent = "Volver"

            const flagImg = document.createElement("img");
            flagImg.src = data.flags.svg;
            flagImg.alt = `${data.name} flag`;

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

            countryName.textContent = data.name;
            countryContinent.textContent = data.region;
            countryPopulation.textContent = `Población: ${data.population}`;
            countryCapitalCity.textContent = `Capital: ${data.capital}`;
            countryLanguage.textContent = `Lenguaje: ${data.languages[0].name}`;
            countryBorders.textContent = `Fronteras: ${ data.borders ? data.borders.map((border) => border): "sin fronteras"}`

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
              fetchingAsia()
            })

          });
      });
      // Fin detalle de países de Asia

    });
  } catch (error) {
    console.log(error);
  }
};

const fetchingAfrica = async function () {
  try {
    const response = await fetch(urlAfrica);
    const dataAfrica = await response.json();
    console.log(dataAfrica);
    // Mapeo de los países de Africa
    countryList.textContent = "";

    dataAfrica.map((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country");

      const flagImg = document.createElement("img");
      flagImg.src = country.flags.svg;
      flagImg.alt = `${country.name} flag`;

      const countryName = document.createElement("span");
      const countryContinent = document.createElement("span");
      const countryPopulation = document.createElement("span");
      const countryCapitalCity = document.createElement("span");
      const countryLink = document.createElement("a");
      const countryCode = country.alpha2Code;



      countryContinent.classList.add("datos");
      countryPopulation.classList.add("datos");
      countryCapitalCity.classList.add("datos");

      countryName.textContent = country.name;
      countryContinent.textContent = `Región: ${country.subregion}`;

      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryDiv.appendChild(countryContinent);
      countryLink.appendChild(countryDiv);
      countryList.appendChild(countryLink);

            // Detalle de países de Africa
            countryLink.addEventListener("click", () => {
              fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
                .then((response) => response.json())
                .then((data) => {
                  countryList.textContent = "";
                  const countryDiv = document.createElement("div");
                  countryDiv.classList.add("countryDetail");
                  const countryData = document.createElement("div");
                  countryData.classList.add("countryData");
                  const backButton = document.createElement('div');
                  backButton.classList.add('backbutton');
                  backButton.textContent = "Volver"
      
                  const flagImg = document.createElement("img");
                  flagImg.src = data.flags.svg;
                  flagImg.alt = `${data.name} flag`;
      
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
      
                  countryName.textContent = data.name;
                  countryContinent.textContent = data.region;
                  countryPopulation.textContent = `Población: ${data.population}`;
                  countryCapitalCity.textContent = `Capital: ${data.capital}`;
                  countryLanguage.textContent = `Lenguaje: ${data.languages[0].name}`;
                  countryBorders.textContent = `Fronteras: ${ data.borders ? data.borders.map((border) => border): "sin fronteras"}`
      
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
                    fetchingAfrica()
                  })

                });
            });
            // Fin detalle de países de Africa

    });
  } catch (error) {
    console.log(error);
  }
};

const fetchingOceania = async function () {
  try {
    const response = await fetch(urlOceania);
    const dataOceania = await response.json();
    console.log(dataOceania);
    // Mapeo de los países de Oceanía
    countryList.textContent = "";

    dataOceania.map((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country");

      const flagImg = document.createElement("img");
      flagImg.src = country.flags.svg;
      flagImg.alt = `${country.name} flag`;

      const countryName = document.createElement("span");
      const countryContinent = document.createElement("span");
      const countryPopulation = document.createElement("span");
      const countryCapitalCity = document.createElement("span");
      const countryLink = document.createElement("a");
      const countryCode = country.alpha2Code;

      countryContinent.classList.add("datos");
      countryPopulation.classList.add("datos");
      countryCapitalCity.classList.add("datos");

      countryName.textContent = country.name;
      countryContinent.textContent = `Región: ${country.subregion}`;

      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryDiv.appendChild(countryContinent);
      countryLink.appendChild(countryDiv);
      countryList.appendChild(countryLink);

      // Detalle de países de Oceanía
      countryLink.addEventListener("click", () => {
        fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
          .then((response) => response.json())
          .then((data) => {
            countryList.textContent = "";
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("countryDetail");
            const countryData = document.createElement("div");
            countryData.classList.add("countryData");
            const backButton = document.createElement('div');
            backButton.classList.add('backbutton');
            backButton.textContent = "Volver"

            const flagImg = document.createElement("img");
            flagImg.src = data.flags.svg;
            flagImg.alt = `${data.name} flag`;

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

            countryName.textContent = data.name;
            countryContinent.textContent = data.region;
            countryPopulation.textContent = `Población: ${data.population}`;
            countryCapitalCity.textContent = `Capital: ${data.capital}`;
            countryLanguage.textContent = `Lenguaje: ${data.languages[0].name}`;
            countryBorders.textContent = `Fronteras: ${ data.borders ? data.borders.map((border) => border): "sin fronteras"}`

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
              fetchingOceania()
            })

          });
      });
      // Fin detalle de países de Oceanía

    });
  } catch (error) {
    console.log(error);
  }
};

const fetchingAllAgain = async function () {
  try {
    const response = await fetch(urlAll);
    const dataAllAgain = await response.json();

    // Mapeo todos en caso de deseleccionar los continentes
    countryList.textContent = "";

    dataAllAgain.map((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country");

      const flagImg = document.createElement("img");
      flagImg.src = country.flags.svg;
      flagImg.alt = `${country.name} flag`;

      const countryName = document.createElement("span");
      const countryContinent = document.createElement("span");
      const countryPopulation = document.createElement("span");
      const countryCapitalCity = document.createElement("span");
      const countryLink = document.createElement("a");
      const countryCode = country.alpha2Code;

      
      countryContinent.classList.add("datos");
      countryPopulation.classList.add("datos");
      countryCapitalCity.classList.add("datos");

      countryName.textContent = country.name.common;
      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryLink.appendChild(countryDiv);
      countryList.appendChild(countryLink);

      // Detalle de todos los países
      countryLink.addEventListener("click", () => {
        fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
          .then((response) => response.json())
          .then((data) => {
            countryList.textContent = "";
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("countryDetail");
            const countryData = document.createElement("div");
            countryData.classList.add("countryData");
            const backButton = document.createElement('div');
            backButton.classList.add('backbutton');
            backButton.textContent = "Volver"

            const flagImg = document.createElement("img");
            flagImg.src = data.flags.svg;
            flagImg.alt = `${data.name} flag`;

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

            countryName.textContent = data.name;
            countryContinent.textContent = data.region;
            countryPopulation.textContent = `Población: ${data.population}`;
            countryCapitalCity.textContent = `Capital: ${data.capital}`;
            countryLanguage.textContent = `Lenguaje: ${data.languages[0].name}`;
            countryBorders.textContent = `Fronteras: ${ data.borders ? data.borders.map((border) => border): "sin fronteras"}`

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
              fetchingAll()
            })

          });
      });
      // Fin detalle de todos los países

    });
  } catch (error) {
    console.log(error);
  }
};

// selecciÓn de continente
continentOption.addEventListener("change", () => {
  const selectedOption = parseInt(continentOption.value);
  selectedOption === 1 ? fetchingAsia() : "";
  selectedOption === 2 ? fetchingAmerica() : "";
  selectedOption === 3 ? fetchingAfrica() : "";
  selectedOption === 4 ? fetchingEurope() : "";
  selectedOption === 5 ? fetchingOceania() : "";
  selectedOption === 0 ? fetchingAllAgain() : "";
});
