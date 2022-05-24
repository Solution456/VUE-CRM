<template>
  <v-card>
    <v-container>
      <section class="pdf-header">
        <section class="header-left">
          <div class="header-logo">
            <img :src="require('@/assets/logo.svg')" alt="logo" class="img" />
          </div>
          <div class="title">
            <p>Отдел сбыта: тел. (34141) 3-72-32, 3-72-40</p>
            <p>Email:remmash_sbyt1@mail.ru</p>
          </div>
        </section>
        <section class="header-right">
          <div class="header-right-text">
            <p>УР г.Глазов 427627, УР, г.Глазов, ул. Драгунова, 13.</p>
            <p>
              ИНН 1805001016, КПП 183701001 ОКПО 00863037, ОГРН 1021801091861
            </p>
            <p>Р/счет 40702810368090100189 Удмуртское ОСБ № 8618 г. Ижевск</p>
            <p>к/счет 30101810400000000601 БИК 049401601</p>
          </div>
        </section>
      </section>
      <section class="pdf-subheader">
        <section class="subheader-left">
          <h3 class="subheader-text">ЗАКАЗ-НАРЯД</h3>
          <p>на оказание услуги</p>
        </section>
        <section class="subheader-right">
          <div class="subheader-text">
            <p>
              Шифр и номер заказ: <span>{{ orderInfo[0].order_serial }}</span>
            </p>
            <p>
              Дата открытия заказа:
              <span>{{ $filters.formatedDate(orderInfo[0].createdAt) }}</span>
            </p>
            <p>Подразделение: <span>отдел сбыта</span></p>
            <p>дата выполнения заказа: "___"____ 2022 г.</p>
          </div>
        </section>
      </section>
      <section class="pdf-customer-info">
        <section class="customer-info-left">
          <p>Заказчик и его адресс:</p>
          <p>Наименование заказа:</p>
        </section>
        <section class="customer-info-right">
          <div class="customer-info">
            <span
              >{{ customerInfo.customer_name }}
              {{ customerInfo.customer_address }}</span
            >
          </div>
        </section>
      </section>

      <section class="customer-product d-flex justify-center">
        <div class="customer-info-order table-responsive">
          <table class="table align-middle">
            <thead>
              <tr class="font-semibold">
                <th>№</th>
                <th class="pl-4 min-width-325 text-center">
                  Наименование продукта
                </th>
                <th class="min-w-200px text-center">кол-во</th>
                <th class="min-w-125px text-center">цена</th>
                <th class="min-w-125px text-center pr-4">сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in orderInfo[0].products" :key="index">
                <td>{{index+1}}</td>
                <td class="text-center">{{item.product_name}}</td>
                <td class="text-center">{{item.product_id}}</td>
                <td class="text-center">225</td>
                <td class="text-center">{{item.product_id * 225}}Р</td>
              </tr>
              <tr class="bg-gray bold">
                <td colspan="4">ИТОГО</td>
                <td>TOTAL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="footer">
        <div class="sign-prod d-flex align-center">
          <div class="footer-left">
            <p class="bold">Исполнитель __________/___________</p>
          </div>
          <div class="footer-right">
            <p class="bold">Экономист __________/___________</p>
          </div>
        </div>
        <p class="mt-2">
          Претензий по качеству выполенных работ и сроках их выполнения Заказчик
          к Исполнителю не имеет
        </p>
        <div class="customer-sign mt-2">
          <p class="bold">Заказчик {{customerInfo.customer_name}}/___________</p>
        </div>
      </section>
    </v-container>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";

const store = useStore();

const props = defineProps({
  ids: {
    type: Object,
    require: true,
  },
});

const customerInfo = computed(() => {
  return store.getters.getCustomer;
});

const orderInfo = computed(() => {
  return store.getters.orders.filter((item) => item.order_id === props.ids.id);
});

onMounted(() => {
  console.log("Mounted");
  store.dispatch("fetchCustomerById", props.ids.cusId);
  customerInfo;
});
</script>

<style scoped>
.pdf-header {
  display: flex;

  justify-content: space-between;
}

.header-right {
}

.title {
  font-size: 14px;
}

.header-right-text {
  font-size: 14px;
}

.pdf-subheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bold {
  font-weight: 600;
}
.pdf-customer-info {
  display: flex;
  align-items: center;
  padding: 50px;
}
.customer-info-left {
  font-weight: 600;
  width: 500px;
}
.customer-info-right {
  width: auto;
}

.bg-gray {
  background-color: rgb(174, 174, 175);
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.list-item {
  list-style: none;
}

tr {
  border-bottom-width: 1px;
  border-bottom: solid #a1a5b7 !important;
}

.table-responsive {
  overflow-x: auto;
}

.text-muted {
  font-weight: 500 !important;
  color: #a1a5b7;
  font-size: 0.95rem !important;
}

.min-width-325 {
  min-width: 325px !important;
}
.min-w-125px {
  min-width: 125px !important;
}
.min-w-200px {
  min-width: 200px !important;
}

.footer {
  margin-top: 30px;
}
.sign-prod {
  justify-content: space-between;
}
</style>