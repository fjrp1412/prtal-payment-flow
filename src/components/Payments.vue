<template>
  <main>
    <div class="payment-container">
      <div class="payment-container__head">
        <div class="head__nav">
          <span>Pagos</span>
          <img src="../assets/arrow-down.svg" alt="open nav" />
        </div>
        <div class="head__options">
          <div
            v-if="!editing"
            class="options__edit"
            @click="
              () => {
                editing = !editing;
              }
            "
          >
            <span>Editar</span>
            <img src="../assets/edit-pencil.svg" alt="edit" />
          </div>
          <div v-else class="options__edit">
            <button
              type="button"
              @click="
                () => {
                  editing = !editing;
                }
              "
            >
              Guardar
            </button>
          </div>
          <div class="options__amount">
            <span class="options__amount--light">Por cobrar:</span>
            <span class="options__amount--strong">{{ TOTALTOPAY }} UF</span>
          </div>
        </div>
      </div>
      <div class="payment-container__dues" :key="dues.length">
        <div class="dues__node" v-for="due in duesInOrder" :key="due.id">
          <DueComponent
            :due="due"
            @updateDue="updateDues"
            @deleteDue="deleteDue"
            :editing="editing"
            :totalDue="TOTALTOPAY"
          ></DueComponent>
          <hr :class="`line ${due.status === 'paid' ? 'green' : 'blue'}`" />
        </div>

        <div class="payment-container__new-payment" @click="createDue">
          <div class="circle">
            <img src="../assets/add-plus.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import DueComponent from "./Due.vue";
import { get, post } from "../utils/api.js";
export default {
  name: "PaymentsComponent",
  components: {
    DueComponent,
  },
  data() {
    return {
      dues: [],
      TOTALTOPAY: 182,
      editing: false,
    };
  },
  beforeMount() {
    const dues = get();
    if (dues) {
      this.dues = dues;
    }
  },
  methods: {
    updateDues(data) {
      this.dues = this.dues.map((item) =>
        item.id === data.id ? { ...data.value } : item
      );
      post([...this.dues]);
    },
    calculateAmount() {
      if (this.dues.length === 0) {
        return { amount: this.TOTALTOPAY, percentage: 100 };
      }
      const amount = (this.dues[this.dues.length - 1].amount / 2).toFixed(1);
      const percentage = (
        this.dues[this.dues.length - 1].percentage / 2
      ).toFixed(1);

      return { amount, percentage };
    },
    createDue() {
      this.editing = true;
      const { amount, percentage } = this.calculateAmount();
      this.dues.push({
        title: "Cuota",
        amount: amount,
        order: this.dues.length + 1,
        id: this.dues.length + 1,
        percentage: percentage,
        date: new Date().toLocaleDateString(),
      });
      if (this.dues.length >= 2) {
        const orderPrevious = this.dues.slice(-1)[0].order - 1;
        this.dues = this.dues.map((item) =>
          item.order === orderPrevious ? { ...item, amount, percentage } : item
        );
        console.log("dues previous modificado", this.dues);
      }

      post([...this.dues]);
    },
    deleteDue(id) {
      const removedDue = this.dues.find((item) => item.id === id);
      this.dues = this.dues
        .map((item) => {
          if (item.id === id - 1) {
            item.amount =
              parseFloat(item.amount) + parseFloat(removedDue.amount);
            item.percentage =
              parseFloat(item.percentage) + parseFloat(removedDue.percentage);
          }

          return item;
        })
        .filter((item) => item.id !== id);
      post([...this.dues]);
    },
  },
  computed: {
    duesInOrder() {
      return [...this.dues].sort((a, b) =>
        parseInt(a.order) < parseInt(b.order) ? -1 : 1
      );
    },
  },
};
</script>

<style scoped>
.payment-container {
  width: 100%;
}
.payment-container__head {
  display: flex;
  width: 100%;
  height: 80px;
  border-bottom: solid rgba(241, 245, 249, 1) 1px;
  justify-content: space-between;
  align-items: center;
}

.payment-container__head .head__nav {
  display: flex;
  margin-left: 20px;
  color: rgba(52, 96, 220, 1);
  font-weight: 600;
  font-size: 24px;
}

.payment-container__head .head__nav img {
  margin-left: 5px;
}

.payment-container__head .head__options {
  display: flex;
  margin-right: 20px;
  text-align: center;
}

.payment-container__head .head__options .options__edit {
  display: flex;
  margin-right: 15px;
  cursor: pointer;
}

.payment-container__head .head__options .options__edit span {
  color: rgba(52, 96, 220, 1);
  font-weight: 600;
  font-size: 16px;
}
.payment-container__head .head__options .options__edit img {
  width: 16px;
  height: 16px;
  margin-left: 5px;
}

.payment-container__head .head__options .options__edit button {
  width: 75px;
  height: 35px;
  background-color: rgba(29, 78, 216, 1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.payment-container__head .head__options .options__amount {
  display: flex;
  align-items: center;
}

.payment-container__head .head__options .options__amount--light {
  font-weight: 400;
  size: 24px;
  margin-right: 5px;
  color: rgba(148, 163, 184, 1);
}

.payment-container__head .head__options .options__amount--strong {
  font-weight: 600;
  size: 24px;
}

.payment-container__dues {
  position: relative;
  display: grid;
  align-items: flex-start;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-columns: minmax(200px, 1fr);
  grid-auto-flow: column;
  justify-items: flex-start;
  height: 100%;
  width: 100%;
  margin: 50px 0px 0px 0px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 20px;
  padding-left: 5px;
}

.payment-container__dues .dues__node {
  width: 100%;
  position: relative;
}

.payment-container__dues .line {
  position: absolute;
  min-width: 100%;
  height: 2px;
  z-index: -1;
  top: 15%;
  left: 50%;
  border: none;
}

.payment-container__dues .green {
  background-color: rgba(5, 150, 105, 1);
}
.payment-container__dues .blue {
  background-color: rgba(29, 78, 216, 1);
}

.payment-container__new-payment {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.payment-container__new-payment .line-new-payment {
  top: 15%;
}

.payment-container__new-payment .circle {
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: grey;
  align-items: center;
  justify-content: center;
  background-color: rgba(226, 232, 240, 1);
  cursor: pointer;
}

.payment-container__new-payment .circle img {
  width: 20px;
  height: 20px;
}
</style>
