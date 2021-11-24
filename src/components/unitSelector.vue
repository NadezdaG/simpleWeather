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
    border: none;
    button {
      height: 100%;
      background-color: variables.$color-white;
      border: none;
      cursor: pointer;
      min-width:55px;
      color: variables.$color-black;
      &:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      &.active {
        background-color: variables.$color-blue;
        color:variables.$color-white;
      }
    }
  }
</style>
