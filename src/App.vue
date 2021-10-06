<template>
<link
  rel="stylesheet"
  href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
/>

  <div class="simpleWeather">
    <header>
      <input
        type="text"
        class="simpleWeather__input"
        v-model="typedText"
        placeholder="Type the city"
      />
      <div class="simpleWeather__units">
        <button :class="{ active: celsius }" v-on:click="changeUnits(true)">
          °C
        </button>
        <button :class="{ active: !celsius }" v-on:click="changeUnits(false)">
          °F
        </button>
      </div>
      <ul class="dropdown simpleWeather__dropdown">
        <li
          v-for="city in filteredCities"
          v-on:click="addCity(city)"
          v-bind:key="city"
        >
          {{ city.name }}
          <span> {{ city.country }}</span>
        </li>
      </ul>
    </header>
    <section>
      <div class="container">
          <!-- Additional required wrapper -->
          <div class="simpleWeather__cards">
            <div
              class="simpleWeather__card"
              v-for="(city, index) in cities"
              v-bind:key="index"
            >
              <button v-on:click="removeCity(index)">x</button>
              <h2>
                {{ city.title }}<span>({{ city.country }})</span>
              </h2>
              <div class="temp">{{ city.temp }}°</div>
              <div class="weather">{{ city.weather }}</div>
              <span class="clock"> {{ city.hours }}:{{ city.minutes }} </span>
            </div>
          </div>
      </div>
    </section>
    <footer>
      <div class="container">
        App created for learning purpose. 
      </div>
    </footer>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "App",
  data() {
    return {
      key: "44cc22073a3eaf46a220bb8ddffa8517",
      celsius: true,
      times: [],
      allCities: [],
      typedText: "",
      cities: [],
    };
  },
  watch: {
    celsius(newUnit) {
      if (newUnit === true) {
        this.cities.forEach((city) => {
          city.temp = Math.round(((city.temp - 32) * 5) / 9);
        });
      } else {
        this.cities.forEach((city) => {
          city.temp = Math.round((city.temp * 9) / 5 + 32);
        });
      }
    },
    cities: {
      handler: function(newCities) {
        localStorage.cities = JSON.stringify(newCities);
      },
      deep: true,
    },
  },
  methods: {
    changeUnits(flag) {
      this.celsius = flag;
    },

    loadCities() {
      this.allCities = require("./assets/cities.json");
    },

    addCity(city) {
      this.cities.push({
        title: city.name,
        country: city.country,
        lat: city.lat,
        lng: city.lng,
        time: "",
        temp: "",
        hours: 0,
        minutes: 0,
        weather: "",
        timezone: 0,
      });
      this.updateCity(city, this.cities.length - 1);
      this.typedText = "";
    },

    removeCity(remove) {
      this.cities.splice(remove, 1);
    },

    updateCity(city, index) {
      console.log(city);
      const url =
        "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
        city.lat +
        "&lon=" +
        city.lng +
        "&appid=" +
        this.key;

      axios
        .get(url)
        .then((response) => {
          console.log(response);
          let date = new Date();
          this.cities[index].temp =
            this.celsius === true
              ? Math.round(((response.data.main.temp - 32) * 5) / 9)
              : response.data.main.temp;
          this.cities[index].weather = response.data.weather[0].main;
          this.cities[index].timezone = response.data.timezone;
          this.cities[index].hours =
            date.getUTCHours() + response.data.timezone / 3600;
          this.cities[index].minutes = date.getUTCMinutes();
        })
        .catch((error) => {
          console.error("There was an error!", error.message);
        });
    },

    updateTime() {
      this.cities.forEach((city) => {
        let date = new Date();
        city.hours = date.getUTCHours() + city.timezone / 3600;
        city.minutes = date.getUTCMinutes();
      });
    },
  },
  mounted: function() {
    this.loadCities();
    if (localStorage.cities) {
      this.cities = JSON.parse(localStorage.getItem("cities") || "[]");
    }
    this.cities.forEach((city, index) => this.updateCity(city.title, index));
    setInterval(this.updateTime, 10000);
  },
  computed: {
    filteredCities() {
      if (this.typedText.length > 1) {
        let regex = new RegExp(this.typedText, "i");
        return this.allCities.filter((city) => city.name.match(regex));
      } else {
        return [];
      }
    },
  },
};
</script>

<style lang="scss">
@use "./assets/scss/reset.scss";
@use "./assets/scss/_variables.scss";
@use "./assets/scss/_typography.scss";
@use "./assets/scss/_global.scss";
.simpleWeather {
  padding: 2em;
  header {
    width: 100%;
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr;
    gap: 0 0;
    grid-template-areas: "input units";
    margin-bottom: 2em;
  }
  &__input {
    grid-area: input;
    padding: 6px 15px;
    border: none;
    &:focus {
      outline: 0;
    }
  }
  &__units {
    grid-area: units;
    background-color: variables.$color-melon;
    border: 3px solid white;
    button {
      height: 100%;
      background-color: variables.$color-melon;
      border: none;
      cursor: pointer;
      &.active {
        background-color: variables.$color-bittersweet;
      }
    }
  }
  &__dropdown {
    display: block;
    position: absolute;
    z-index: 3;
    background-color: variables.$color-bone;
    list-style: none;
    padding: 0.5em 0;
    margin: 0;
    max-height: 50%;
    overflow-y: scroll;
    li {
      padding: 0.5em 1em;
      cursor: pointer;
      &:hover {
        background-color: variables.$color-melon;
      }
    }
  }
  &__cards {
    display: flex;
    width: 100%;
    height: 100%;
display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 1em 1em;
    grid-template-areas: ". ";
    @media all and (min-width:768px) {
      grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1em 1em;
    grid-template-areas: ". . . .";
    }
    
  }
  &__card {
    background-color: variables.$color-white;
    padding: 2em;
    position: relative;
    text-align: center;
    button {
      position: absolute;
      right: 0;
      top: 0;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2em;
    }
    h2 {
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1em;
      font-size:1em;
    }
    .temp {
      font-size: 2em;
    }

    .clock {
      display: inline-block;
      padding: 5px;
      background-color: variables.$color-bone;
      margin-top: 1em;
          letter-spacing: 5px;
    }
  }
  footer {
    color:white;
    margin-top:10px;
  }
}
</style>
