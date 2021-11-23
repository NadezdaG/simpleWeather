<template>
  <div class="simpleWeather">
    <header>
      <inputCity></inputCity>
      <unitSelector :celsius="celsius"></unitSelector>
    </header>
    <section>
      <div class="container">
        <!-- Additional required wrapper -->
        <weatherCards></weatherCards>
      </div>
    </section>
    <footer>
      <div class="container">App created for learning purpose.</div>
    </footer>
  </div>
</template>

<script>
import inputCity from "./components/inputCity.vue";
import weatherCards from "./components/weatherCards.vue";
import unitSelector from "./components/unitSelector.vue";

const axios = require("axios");

export default {
  name: "App",
  components: { inputCity, weatherCards, unitSelector },
  data() {
    return {
      key: "bb3d6588995044f286e142149212311",
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
    updateCity(city, index) {
      console.log(city);
      const url =
        "http://api.weatherapi.com/v1/current.json?key=" +
        this.key +
        "&q=" +
        city.lat +
        "," +
        city.lng;

      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.cities[index].temp =
            this.celsius === true
              ? response.data.current.temp_c
              : response.data.current.temp_f;
          this.cities[index].weather = response.data.current.condition.text;
          this.cities[index].localTime =
            new Date(response.data.location.localtime).getTime() / 1000;
          console.log(this.cities[index].localTime);
        })
        .catch((error) => {
          console.error("There was an error!", error.message);
        });
    },

    updateTime() {
      this.cities.forEach((city) => {
        city.localTime += 60;
      });
    },
  },
  mounted: function () {
    if (localStorage.cities) {
      this.cities = JSON.parse(localStorage.getItem("cities") || "[]");
    }
    this.cities.forEach((city, index) => this.updateCity(city.title, index));
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

  footer {
    color: white;
    margin-top: 10px;
  }
}
</style>
