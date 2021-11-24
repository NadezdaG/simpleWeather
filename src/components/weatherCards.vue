<template>
    <div class="weatherCards">
          <div
            class="weatherCards__card"
            v-for="(city, index) in this.$parent.cities"
            v-bind:key="index"
          >
            <button v-on:click="removeCity(index)">x</button>
            <h2>
              {{ city.title }}<span>({{ city.country }})</span>
            </h2>
            <div class="temp">{{ city.temp }}°</div>
            <div class="weather">{{ city.weather }}</div>
            <span class="clock"> Local time: {{ new Date(city.localTime*1000).getHours() }}:{{ new Date(city.localTime*1000).getMinutes() }}</span>
          </div>
        </div>
</template>
<script>

export default {
  name: "weatherCards",
  data() {
    return {
    };
  },
  methods: {
    removeCity(remove) {
      this.$parent.cities.splice(remove, 1);
    
    },
  },
};
</script>

<style lang="scss">
@use "../assets/scss/reset.scss";
@use "../assets/scss/_variables.scss";
@use "../assets/scss/_global.scss";

.weatherCards {
    display: flex;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
    
    @media all and (min-width: 768px) {
    }
  
  &__card {
    background-color: variables.$color-white;
    padding: 2em 2em 1em;
    position: relative;
    text-align: center;
    border-radius: 10px;
    flex: 1;
    button {
      position: absolute;
      right: 5px;
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
      font-size: 1.2em;

    }

    .temp {
      font-size: 2em;
    }

    .weather {
      text-transform: uppercase;
    }

    .clock {
      display: inline-block;
      padding: 5px;
      margin-top: 1em;
      font-size: 0.8em;
      opacity:0.8;
    }

    &:hover {
      background-color: variables.$color-blue;
      color: variables.$color-white;
      button {
        color: variables.$color-white;
      }
    }
  }
}
</style>
