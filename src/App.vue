<template>
  <div class="simpleWeather">
    <header>
      <inputCity></inputCity>
      <div class="simpleWeather__units">
        <button :class="{ active: celsius }" v-on:click="changeUnits(true)">
          °C
        </button>
        <button :class="{ active: !celsius }" v-on:click="changeUnits(false)">
          °F
        </button>
      </div>
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
      <div class="container">App created for learning purpose.</div>
    </footer>
  </div>
</template>

<script>
import inputCity from "./components/inputCity.vue";
const axios = require("axios");

export default {
  name: "App",
  components: { inputCity },
  data() {
    return {
      key: "44cc22073a3eaf46a220bb8ddffa8517",
      celsius: true,
      times: [],
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
  },
  methods: {
    changeUnits(flag) {
      this.celsius = flag;
    },

    addCity(city) {
      console.log("run parrent f");
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
        "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
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
      /*this.cities.forEach((city) => {
        let date = new Date();
        city.hours = date.getUTCHours() + city.timezone / 3600;
        city.minutes = date.getUTCMinutes();
      });*/
    },
  },
  mounted: function () {
    if (localStorage.cities) {
      this.cities = JSON.parse(localStorage.getItem("cities") || "[]");
    }
    //this.cities.forEach((city, index) => this.updateCity(city.title, index));
    setInterval(this.updateTime, 10000);
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
    @media all and (min-width: 768px) {
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
      font-size: 1em;
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
    color: white;
    margin-top: 10px;
  }
}
</style>
