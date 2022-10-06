<template>
  <div id="app">
    <PaymentsComponent></PaymentsComponent>
  </div>
</template>

<script>
import PaymentsComponent from "./components/Payments.vue";
export default {
  name: "App",
  components: {
    PaymentsComponent,
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>
