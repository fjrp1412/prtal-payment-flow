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
  box-sizing: content-box;
  margin: 0px;
  padding: 0px;
}
</style>
