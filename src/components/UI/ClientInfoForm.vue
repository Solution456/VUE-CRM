<template>
  <v-card>
    <v-card-title class="justify-center">
      <span class="text-h5 text-primary">Карточка клиента {{info.customer_name}}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="info.customer_name"
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
              v-model="info.customer_phone"
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
            <v-text-field
              v-model="info.customer_organisation"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Название компании"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.customer_address"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Юрид. Адрес"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
              <OrderTableVue @emitOrderDate="openOrder" :orders='info.orders'/>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
import OrderTableVue from "./OrderTable.vue";
import { computed } from "@vue/runtime-core";


const props = defineProps({
    data:{
        type:Array,
        require:true
    }
})

const emit = defineEmits(['openOrder'])

const info = computed(() => {
  return props.data[0];
});

const openOrder = (data)=> {
  emit('openOrder',{id:data.order_id,cusId:info.value['customer_id']})
}

</script>

<style>
</style>