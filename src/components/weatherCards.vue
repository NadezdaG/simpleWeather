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
            <span class="clock"> {{ new Date(city.localTime*1000).getHours() }}:{{ new Date(city.localTime*1000).getMinutes() }} </span>
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
}
</style>
