<template>
  <StreetMap
    :position="{ latitude: 2.478961, longitude: 14.659453 }"
    :precise="true"
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import StreetMap from "./components/StreetMap.vue";

@Options({
  components: {
    StreetMap,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
