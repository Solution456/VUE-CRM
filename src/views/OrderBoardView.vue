<template>
  <div class="order_board">
    <v-container>
      <div class="order_title text-center">
        <h1>Доска заказов</h1>
      </div>
      <div class="order_title text-end mb-10">
        <searchInput v-model="searchQuery" />
      </div>
      <div class="order-content" v-if="searchQuery === ''">
        <v-row v-if="department === 'Отдел сбыта'">
          <v-col cols="6">
            <div class="order_header">
              <div class="text-subtitle-1">Заказы</div>
            </div>
            <v-row class="flex-column">
              <v-col v-for="order in acceptedOrders" :key="order.order_id">
                <OrderCardVue @openModal="openModal" :order="order" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <div class="order_header">
              <div class="text-subtitle-1">Заказы в процессе</div>
            </div>
            <v-row class="flex-column">
              <v-col v-for="order in anotherOrders" :key="order.order_id">
                <OrderCardVue @openModal="openModal" :order="order" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-if="department === 'Склад'">
          <v-col cols="12">
            <div class="order_header">
              <div class="text-subtitle-1">Заказы</div>
            </div>
            <v-row>
              <v-col v-for="order in ongoingOrders" :key="order.order_id">
                <OrderCardVue @openModal="openModal" :order="order" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-if="department === 'Производство'">
          <v-col cols="12">
            <div class="order_header">
              <div class="text-subtitle-1">Заказы</div>
            </div>
            <v-row>
              <v-col v-for="order in productionOrders" :key="order.order_id">
                <OrderCardVue @openModal="openModal" :order="order" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div class="order-search" v-else>
         <v-row>
          <v-col cols="12">
            <div class="order_header">
              <div class="text-subtitle-1">Найденые заказы</div>
            </div>
            <v-row v-if="SearchOrders.length > 0">
              <v-col v-for="order in SearchOrders" :key="order.order_id">
                <OrderCardVue @openModal="openModal" :order="order" />
              </v-col>
            </v-row>
            <v-row v-else class="justify-center">
              <h2 style="color: #d50000;">Нет искомых заказов.......</h2>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-dialog v-model="ShowDialog">
        <orderFormVue
          :ids="selectOrderId"
          @updateOrder="updateOrder"
          @closeDialog="closeDialog"
        />
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import orderFormVue from "@/components/orders/orderForm.vue";
import OrderCardVue from "@/components/UI/OrderCard.vue";
import searchInput from "@/components/UI/searchInput.vue";
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const ShowDialog = ref(false);
const searchQuery = ref("");

let selectOrderId = reactive({
  id: "",
  cusId: "",
});

const department = computed(() => {
  return store.getters.department;
});

const SearchOrders = computed(() => {
  return store.getters.orders.filter((order) =>
    order.order_serial.includes(searchQuery.value)
  );
});

const acceptedOrders = computed(() => {
  return store.getters.orders.filter(
    (order) => order.order_status === "ACCEPTED"
  );
});

const anotherOrders = computed(() => {
  return store.getters.orders.filter(
    (order) => order.order_status !== "ACCEPTED"
  );
});

const ongoingOrders = computed(() => {
  return store.getters.orders.filter(
    (order) => order.order_status === "ONGOING"
  );
});

const productionOrders = computed(() => {
  return store.getters.orders.filter(
    (order) => order.order_status === "PRODUCTION"
  );
});

const role = computed(() => {
  return store.getters.role;
});

const updateOrder = async (data) => {
  console.log(data);
  await store.dispatch("updateOrder", data);
};

const closeDialog = () => {
  ShowDialog.value = !ShowDialog.value;
};

const openModal = (data) => {
  selectOrderId.id = data.id;
  selectOrderId.cusId = data.cusId;
  ShowDialog.value = !ShowDialog.value;
};

const checkRoute = () => {
  if (
    localStorage.getItem("token") &&
    role.value !== "OPERATOR" &&
    role.value !== "ADMIN"
  ) {
    router.push("/");
  } else {
    setTimeout(store.dispatch("fetchOrders"), 2000);
  }
};

onMounted(() => {
  checkRoute();
});
</script>

<style scoped>
.order_header {
  text-align: center;
  color: white;
  background-color: #d50000;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
}
.order_title {
  color: #d50000;
}
</style>