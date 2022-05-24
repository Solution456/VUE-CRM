<template>
  <div>
    <div class="header">
      <div class="header-bg">
        <v-img
          max-height="250"
          min-height="120"
          cover
          :src="require('@/assets/Image/background.jpg')"
        >
        </v-img>
      </div>
      <div class="header-content">
        <h2 class="text-center">
          {{ userName }}, добро пожаловать в систему обработки заявок
          <strong>АО "РЕММАШ"</strong>
        </h2>
      </div>
    </div>

    <v-container class="mt-10">
      <v-row>
        <v-col class="text-center">
          <v-btn color="primary" @click="ShowDialog = !ShowDialog">
            Заказать продукцию
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <v-btn @click="Show = !Show" color="primary">
            Посмотреть мои заказы
          </v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="ShowDialog">
        <ClientForm
          @emitData="CreateOrder"
          @closeDialog="ShowDialog = !ShowDialog"
        />
      </v-dialog>
      <v-dialog scrollable v-model="Show">
        <OrderTableVue @emitOrderDate="openOrder" @emitBlank="openBlank" :orders="orders" />
      </v-dialog>
      <v-dialog v-model="ShowDialog2">
        <orderFormVue :ids="order" />
      </v-dialog>
      <v-dialog v-model="ShowDialog3">
      
        <div id='print-pdf'>
          <pdfView :ids="order"/>
        </div>
        <v-btn @click="generate" color="primary">
            Скачать
          </v-btn>
      </v-dialog>
    </v-container>
    
  </div>
</template>

<script setup>
import ClientForm from "@/components/ClientUiForm/ClientForm.vue";
import orderFormVue from "@/components/orders/orderForm.vue";
import pdfView from "@/components/pdf/pdfView.vue"
import * as html2pdf from 'html2pdf.js';


import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import OrderTableVue from "@/components/UI/OrderTable.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";


const ShowDialog = ref(false);
const ShowDialog2 = ref(false);
const ShowDialog3 = ref(false)
const Show = ref(false);
const store = useStore();
const router = useRouter();
const order = ref({});


const role = computed(() => {
  return store.getters.role;
});

const customerId = computed(() => {
  return store.state.user.user["customer"].customer_id;
});

const userName = computed(() => {
  return store.state.user.user["customer"].customer_name;
});

const orders = computed(() => {
  return store.getters.orders;
});

const openBlank = (data) => {
  order.value = { id: data.order_id, cusId: customerId };
  Show.value = !Show.value;
  ShowDialog3.value = !ShowDialog3.value;
}

const openOrder = (data) => {
  order.value = { id: data.order_id, cusId: customerId };
  Show.value = !Show.value;
  ShowDialog2.value = !ShowDialog2.value;
};



const CreateOrder = (orderData) => {
  store.dispatch("createOrder", orderData);
};



const generate = ()=> {
  var element = document.getElementById('print-pdf')
  html2pdf(element)
}


const fetchOrders = () => {
  store.dispatch(
    "fetchOrdersByCusId",
    store.state.user.user["customer"].customer_id
  );
};

const checkRoute = () => {
  if (localStorage.getItem("token") && role.value !== "CUSTOMERS") {
    router.push("/orders");
  } else {
    setTimeout(fetchOrders, 2000);
  }
};

onMounted(() => {
  checkRoute();
});
</script>

<style scoped>
.header {
  height: 250px;
  position: relative;
}
.header-bg {
  position: relative;
}
.header-bg:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  background-image: linear-gradient(to left, #ae565e, #f30d37);
  opacity: 0.8;
}

.header-content {
  position: absolute;
  top: 100px;
  left: 100px;
  color: white;
  z-index: 22;
}
.header-content strong {
  color: #d50000;
}
</style>
