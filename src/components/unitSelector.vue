<template>
  <div class="unitSelector">
    <button :class="{ active: celsius }" v-on:click="changeUnits(true)">
      °C
    </button>
    <button :class="{ active: !celsius }" v-on:click="changeUnits(false)">
      °F
    </button>
  </div>
</template>

<script>

export default {
  name: "unitSelector",
  props: ['celsius'],
  methods: {
    changeUnits(flag) {
      this.$parent.celsius = flag;
    },

  },
};
</script>

<style lang="scss">
@use "../assets/scss/reset.scss";
@use "../assets/scss/_variables.scss";
@use "../assets/scss/_global.scss";
.unitSelector {
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
</style>
