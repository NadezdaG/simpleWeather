<template>
  <input
    type="text"
    class="inputCity"
    v-model="typedText"
    placeholder="Type the city"
  />
  <ul class="dropdown inputCity__dropdown">
    <li
      v-for="city in filteredCities"
      v-bind:key="city"
      @click="addCity(city)"
    >
      {{ city.name }}
      <span> {{ city.country }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "inputCity",
  data() {
    return {
      allCities: [],
      typedText: "",
    };
  },

  methods: {
    loadCities() {
      console.log("load CITIES");
      this.allCities = require("../assets/cities.json");
    },
     addCity(city) {
      this.$parent.cities.push({
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
      
      this.$parent.updateCity(city, this.$parent.cities.length - 1);
      this.typedText = "";
    },
  },
  mounted: function() {
    this.loadCities();
  },
  computed: {
    filteredCities() {
      if (this.typedText.length > 1) {
        let regex = new RegExp("^" + this.typedText, "i");
        return this.allCities.filter((city) => city.name.match(regex));
      } else {
        return [];
      }
    },
  },
};
</script>

<style lang="scss">
@use "../assets/scss/reset.scss";
@use "../assets/scss/_variables.scss";
@use "../assets/scss/_global.scss";

.inputCity {
  grid-area: input;
  padding: 10px 0px;
  background-color: variables.$color-bone;
  border: none;
  border-bottom:1px solid rgba(variables.$color-raw,0.2);
  &:focus {
    outline: 0;
  }

  &__dropdown {
    display: block;
    position: absolute;
    z-index: 3;
    background-color: variables.$color-white;
    list-style: none;
    padding: 0.5em 0;
    margin: 36px 0px 0px;
    max-height: 50%;
    overflow-y: scroll;
    li {
      padding: 0.5em 1em;
      cursor: pointer;
      &:hover {
        background-color: variables.$color-bone;
      }
    }
  }
}
</style>
