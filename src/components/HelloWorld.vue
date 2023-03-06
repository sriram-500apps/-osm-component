<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <AppButton>Hello</AppButton>
  </div>
</template>

<script lang="ts">
import AppButton from "./AppButton.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "hello-world",
  props: {
    /**
     * Sets the button font color
     */
    msg: String,
  },
  components: {
    AppButton,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
