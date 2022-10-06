<template>
  <div class="due-container">
    <div class="due-container__circle"></div>
    <div class="due-container__info">
      <span class="title">{{ title }}</span>
      <span class="amount">
        <span>{{ amount }} UF</span> (100%)</span
      >
      <span class="date">{{ date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DueComponent",
  props: {
    title: {
      type: String,
    },
    amount: {
      type: Number,
    },

    date: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.due-container {
  padding: 0px 10px;
}

.due-container .due-container__circle {
  margin: 0 auto 15px auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e2e8f0;
}

.due-container .due-container__info {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.due-container .due-container__info span {
  margin: 5px 0px;
}

.due-container .due-container__info .title {
  font-weight: 600;
  font-size: 20px;
}

.due-container .due-container__info .date {
  font-size: 14px;
  font-weight: 400;
}

.due-container .due-container__info .amount span {
  font-weight: 600;
  font-size: 14px;
}
</style>
