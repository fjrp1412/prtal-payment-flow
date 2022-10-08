<template>
  <div class="due-container" v-if="!editing">
    <div
      :class="`due-container__circle ${mutableDue.status}`"
      @click="toggleModal"
    ></div>
    <div class="due-container__info">
      <span class="title">{{ mutableDue.title }}</span>
      <span class="amount">
        <span
          >{{
            Number.isInteger(parseFloat(mutableDue.amount))
              ? parseInt(parseFloat(mutableDue.amount))
              : mutableDue.amount
          }}
          UF</span
        >
        ({{
          Number.isInteger(parseFloat(mutableDue.percentage))
            ? parseInt(parseFloat(mutableDue.percentage))
            : mutableDue.percentage
        }}
        %)</span
      >
      <span class="date" v-if="!mutableDue.paidDate">{{
        mutableDue.expiredDate
      }}</span>
      <span class="date date--paid" v-else
        >Pagado {{ mutableDue.paidDate }}</span
      >
    </div>
    <ModalComponent :show="openModal" @closeModal="toggleModal">
      <div class="form-wrapper">
        <div class="form__information">
          <h1 class="form-title">Modificar Estados</h1>
          <span class="form-subtitle"
            >Selecciona el estado en que se encuentra el pago</span
          >
        </div>

        <div class="form__multiselect">
          <label for="status">Estado</label>
          <Multiselect
            name="status"
            :options="['pending', 'paid']"
            v-model="mutableDue.status"
          ></Multiselect>
        </div>

        <div class="form__datepicker" v-if="mutableDue.status === 'paid'">
          <label for="paidDate">Fecha de pago</label>
          <DatePicker
            class="datepicker"
            v-model="mutableDue.paidDate"
            placeholder
            format="DD/MM/YYYY"
            value-type="format"
          ></DatePicker>
        </div>

        <div class="form-buttons">
          <button
            type="button"
            class="form__button--delete"
            @click="deleteDue"
          ></button>
          <button type="button" class="form__button--save" @click="toggleModal">
            Guardar
          </button>
        </div>
      </div>
    </ModalComponent>
  </div>

  <div class="due-container" v-else>
    <div
      :class="`due-container__circle
      ${editing && 'highlight'}
      ${mutableDue.status}`"
    ></div>
    <div class="due-container__editable-info">
      <input
        class="editable-title"
        v-model="mutableDue.title"
        :disabled="mutableDue.status === 'paid'"
      />
      <div class="editable-amount">
        <input type="text" v-model="mutableDue.amount" disabled />
        <span class="amount__currency">UF</span>
      </div>
      <div class="editable-percentage">
        <button
          type="button"
          :disabled="mutableDue.status === 'paid'"
          @click="updatePercentage(-1)"
        >
          -
        </button>
        <span>{{ mutableDue.percentage }} %</span>
        <button
          type="button"
          :disabled="mutableDue.status === 'paid'"
          @click="updatePercentage(1)"
        >
          +
        </button>
      </div>

      <div class="editable-date">
        <DatePicker
          class="datepicker"
          v-model="mutableDue.expiredDate"
          placeholder
          format="DD/MM/YYYY"
          value-type="format"
          :disabled="mutableDue.status === 'paid'"
        ></DatePicker>
      </div>
    </div>
  </div>
</template>

<script>
import "vue2-datepicker/index.css";
import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";
import ModalComponent from "./Modal.vue";

export default {
  name: "DueComponent",
  components: {
    DatePicker,
    ModalComponent,
    Multiselect,
  },
  props: {
    due: {
      type: Object,
    },
    editing: {
      type: Boolean,
    },
    totalDue: {
      type: Number,
    },
  },
  data() {
    return {
      mutableDue: { ...this.due },
      openModal: false,
    };
  },
  methods: {
    updatePercentage(value) {
      /*
      update in frontend and also emit event to it parents for changePercent
      */
      this.mutableDue.percentage =
        parseFloat(this.mutableDue.percentage) + value;
      if (this.mutableDue.percentage < 0) {
        this.mutableDue.percentage = 0;
      } else if (this.mutableDue.percentage > 100) {
        this.mutableDue.percentage = 100;
      }
      this.mutableDue.amount = (
        (parseFloat(this.mutableDue.percentage) * parseFloat(this.totalDue)) /
        100
      ).toFixed(1);

      this.$emit("changePercentage", value, this.mutableDue.id);
    },
    deleteDue() {
      /*
      This emit event to it parent for deleteDue
      */
      this.$emit("deleteDue", this.mutableDue.id);
    },

    toggleModal() {
      /*
      Method for show or hide form modal
      */
      if (this.mutableDue.status === "paid" && !this.openModal) {
        return;
      }
      this.openModal = !this.openModal;
    },
  },
  watch: {
    mutableDue: {
      handler(newValue) {
        this.$emit("updateDue", { id: this.due.id, value: newValue });
      },
      deep: true,
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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

.due-container .due-container__circle:hover:not(.paid) {
  border: solid 2px rgba(52, 96, 220, 1);
  background-color: white;
  background-image: url("../assets/edit-pencil.svg");
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
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

.due-container .due-container__info .date--paid {
  color: rgba(5, 150, 105, 1);
  font-weight: bolder;
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

.due-container .paid {
  background-color: #10b981;
  background-image: url("../assets/finish-due.svg");
  background-position: center;
  background-repeat: no-repeat;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0px 10px 5px;
  height: 100%;
}

.form-wrapper .form__information {
  margin: 20px 0px;
}

.form-wrapper .form__information .form-title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 15px;
}
.form-wrapper .form__information .form-subtitle {
  font-weight: 400;
  font-size: 16px;
}

.form-wrapper .form__multiselect label,
.form-wrapper .form__datepicker label {
  margin-left: 3px;
  font-weight: 400;
  font-size: 14px;
  color: rgba(71, 85, 105, 1);
}

.form-wrapper .multiselect {
  width: 200px;
  margin-top: 5px;
}

.form-wrapper .form-buttons {
  width: 90%;
  display: flex;
  justify-content: flex-end;
  margin: 10px 0px;
}

.form-wrapper .form-buttons .form__button--save {
  width: 80px;
  height: 35px;
  background-color: rgba(29, 78, 216, 1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.form-wrapper .form-buttons .form__button--delete {
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  background-image: url("../assets/delete-icon.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-color: white;
  background-size: cover;
  margin-right: 35px;
}

.form-wrapper .form__datepicker {
  width: 200px;
  margin-top: 15px;
}
</style>
