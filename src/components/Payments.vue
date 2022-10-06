<template>
  <main>
    <div class="payment-container">
      <div class="payment-container__head">
        <div class="head__nav">
          <span>Pagos</span>
          <img src="../assets/arrow-down.svg" alt="open nav" />
        </div>
        <div class="head__options">
          <div class="options__edit">
            <span>Editar</span>
            <img src="../assets/edit-pencil.svg" alt="edit" />
          </div>
          <div class="options__amount">
            <span class="options__amount--light">Por cobrar:</span>
            <span class="options__amount--strong">182 UF</span>
          </div>
        </div>
      </div>
      <div class="payment-container__dues">
        <div class="payment-container__new-payment">
          <div class="circle">
            <img src="../assets/add-plus.svg" alt="" />
          </div>
        </div>
        <DueComponent
          title="Anticipo 1"
          :amount="182"
          date="22 Ene, 2022"
        ></DueComponent>
        <DueComponent
          title="Anticipo 2"
          :amount="182"
          date="22 Ene, 2022"
        ></DueComponent>
        <DueComponent
          title="Anticipo 3"
          :amount="182"
          date="22 Ene, 2022"
        ></DueComponent>
        <DueComponent
          title="Anticipo 4"
          :amount="182"
          date="22 Ene, 2022"
        ></DueComponent>
      </div>
    </div>
  </main>
</template>

<script>
import DueComponent from "./Due.vue";
export default {
  name: "PaymentsComponent",
  components: {
    DueComponent,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
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
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  margin-top: 50px;
  overflow-x: auto;
  white-space: nowrap;
}

.payment-container__new-payment {
  align-self: flex-start;
  width: 50px;
  height: 50px;
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
