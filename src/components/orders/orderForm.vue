<template>
  <v-card v-if="customerInfo">
    <v-card-title>
      <span class="text-h5 text-primary">Заказ № {{ props.ids.id }}</span>
    </v-card-title>
    <v-card-subtitle>
      <span class="text-h5 text-secondary">Информация о клиенте</span>
    </v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" >
            <v-text-field
              v-model="customerInfo.customer_name"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Имя"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="email"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Email"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="customerInfo.customer_phone"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Номер телефона"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <TimeLineVue :items="orderInfo[0].routes" />
          </v-col>
          <v-col cols="12">
            <div class="text-h5 text-primary my-1">Продукция</div>
            <productTableVue :items="orderInfo" />
          </v-col>
          <div class="max-w-full" v-if="role === 'OPERATOR'">
            <v-col
              cols="12"
              v-if="
                orderInfo[0].order_status === 'ONGOING' ||
                orderInfo[0].order_status === 'ACCEPTED'
              "
            >
              <div class="text-subtitle-2">
                <span v-if="orderInfo[0].order_status === 'ACCEPTED'"
                  >Требуется проверка наличия продукции на складе:</span
                >
                <span v-else-if="orderInfo[0].order_status !== 'ACCEPTED'"
                  >Выберите одно из действий</span
                >
              </div>
              <v-row>
                <v-col>
                  <v-btn
                    v-if="orderInfo[0].order_status === 'ACCEPTED'"
                    color="primary mt-2"
                    @click="updateOrder(orderInfo[0].order_status, 'ONGOING')"
                  >
                    Осуществить запрос на склад
                  </v-btn>
                  <div
                  
                    v-else-if="orderInfo[0].order_status !== 'ACCEPTED' && department !== 'Отдел сбыта'"
                    class="btn-realise"
                  >
                    <v-btn
                      color="primary mt-2"
                      @click="
                        updateOrder(orderInfo[0].order_status, 'PRODUCTION')
                      "
                    >
                      Отправить закакз на производство
                    </v-btn>
                    <v-btn
                      color="primary mt-2"
                      @click="
                        updateOrder(orderInfo[0].order_status, 'COMPLETE')
                      "
                    >
                      Отпавить заказ на реализацию
                    </v-btn>
                  </div>
                </v-col>
                <v-col class="text-end">
                  <v-btn color="primary mt-2" @click="close"> Закрыть </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" v-else-if="orderInfo[0].order_status === 'PRODUCTION'">
              <div class="text-subtitle-2">
                <span>Выберите действие</span>
              </div>
              <v-row class="justify-around">
                <v-col>
                  <v-btn color="primary mt-2" @click="updateOrder(orderInfo[0].order_status,'ONGOING')"> Отправить заказ на склад </v-btn>
                </v-col>
                <v-col class="text-end">
                  <v-btn color="primary mt-2" @click="close"> Закрыть </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </div>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
// import {ucFirst} from '@/helpers/helper'
import productTableVue from "./productTable.vue";
import TimeLineVue from "../UI/TimeLine.vue";

const store = useStore();

const emit = defineEmits(["closeDialog", "updateOrder"]);
const props = defineProps({
  ids: {
    type: Object,
    require: true,
  },
});

const role = computed(() => {
  return store.getters.role;
});

const department = computed(() => {
  return store.getters.department;
});

const email = computed(() => {
  return store.state.user.user.email;
});

const close = () => {
  emit("closeDialog");
};

const customerInfo = computed(() => {
  return store.getters.getCustomer;
});


const orderInfo = computed(() => {
  return store.getters.orders.filter((item) => item.order_id === props.ids.id);
});

const updateOrder = (order, status) => {
  if (order === "ACCEPTED" && status === "ONGOING") {
    emit("updateOrder", {
      id: props.ids.id,
      status,
      route: 2,
    });
  } else if (order === "ONGOING" && status === "COMPLETE") {
    emit("updateOrder", {
      id: props.ids.id,
      status,
      route: 6,
    });
  } else if (order === "ONGOING" && status === "PRODUCTION") {
    emit("updateOrder", {
      id: props.ids.id,
      status: status,
      route: 3,
    });
  }
  else if (order === "PRODUCTION" && status === "ONGOING") {
    emit("updateOrder", {
      id: props.ids.id,
      status: status,
      route: 4,
    });
  }
  emit("closeDialog");
};

onMounted(() => {
  console.log("Mounted");
  store.dispatch("fetchCustomerById", props.ids.cusId);
  customerInfo;
});
</script>

<style>
</style>