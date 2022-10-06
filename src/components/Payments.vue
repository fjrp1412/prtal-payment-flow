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
        <h1>Dues</h1>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "PaymentsComponent",
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
</style>
