<template>
  <portal to="app">
    <div class="container" v-if="show">
      <div class="overlay" id="overlay"></div>
      <div class="modal" id="modal">
        <slot></slot>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    show: {
      type: Boolean,
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}
#modal {
  background: white;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translate(-50%, 0%);
  z-index: 100;
  width: 90%;
  border-radius: 15px;
}
</style>
