<template>
  <div class="due-container" v-if="!editing">
    <div class="due-container__circle"></div>
    <div class="due-container__info">
      <span class="title">{{ mutableDue.title }}</span>
      <span class="amount">
        <span>{{ mutableDue.amount }} UF</span> ({{
          mutableDue.percentage
        }}
        %)</span
      >
      <span class="date">{{ mutableDue.date }}</span>
    </div>
  </div>

  <div class="due-container" v-else>
    <div :class="`due-container__circle ${editing && 'highlight'}`"></div>
    <div class="due-container__editable-info">
      <input class="editable-title" v-model="mutableDue.title" />
      <div class="editable-amount">
        <input type="text" v-model="mutableDue.amount" />
        <span class="amount__currency">UF</span>
      </div>
      <div class="editable-percentage">
        <button type="button" @click="updatePercentage(-1)">-</button>
        <span>{{ mutableDue.percentage }} %</span>
        <button type="button" @click="updatePercentage(1)">+</button>
      </div>

      <div class="editable-date">
        <DatePicker
          class="datepicker"
          v-model="mutableDue.date"
          placeholder
          format="DD/MM/YYYY"
          value-type="format"
        ></DatePicker>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "DueComponent",
  components: {
    DatePicker,
  },
  props: {
    due: {
      type: Object,
    },
    editing: {
      type: Boolean,
    },
  },
  data() {
    return {
      mutableDue: { ...this.due },
    };
  },
  methods: {
    updatePercentage(value) {
      this.mutableDue.percentage += value;
      if (this.mutableDue.percentage < 0) {
        this.mutableDue.percentage = 0;
      } else if (this.mutableDue.percentage > 100) {
        this.mutableDue.percentage = 100;
      }
    },
  },
  watch: {
    mutableDue: {
      handler(newValue) {
        console.log(newValue);
        this.$emit("updateDue", { id: this.due.id, value: newValue });
      },
      deep: true,
    },
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

.due-container .highlight {
  border: solid 2px rgba(52, 96, 220, 1);
  background-color: white;
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

.due-container .due-container__editable-info {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.due-container .due-container__editable-info div {
  margin: 5px 0px;
}

.due-container .due-container__editable-info input {
  width: 120px;
  margin: 0px 5px;
  border-radius: 5px;
  border: solid 0.5px rgba(148, 163, 184, 1);
  padding: 3px;
  text-align: center;
}

.due-container .due-container__editable-info .editable-title {
  font-weight: 600;
  font-size: 20px;
}

.due-container .due-container__editable-info .editable-amount {
  position: relative;
  display: flex;
  align-items: center;
}

.due-container
  .due-container__editable-info
  .editable-amount
  .amount__currency {
  position: absolute;
  left: 72%;
  font-size: 14px;
  color: rgba(148, 163, 184, 1);
}

.due-container .due-container__editable-info .editable-percentage button {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid rgba(52, 96, 220, 1);
  margin: 0px 5px;
  color: rgba(52, 96, 220, 1);
  background: white;
  font-size: 20px;
}

.due-container .due-container__editable-info .editable-date .mx-datepicker {
  width: 150px;
}
</style>
