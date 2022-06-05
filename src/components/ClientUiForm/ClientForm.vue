<template>
  <v-card>
    <v-card-title class="justify-center">
      <span class="text-h5 text-primary">Заявка на заказ продукции</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="customer.name"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Имя"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="customer.secondName"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Фамилия"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="customer.secondName"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Отчество*"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="customer.Email"
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
              v-model="customer.phone"
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
              v-model="customer.organisation"
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
              v-model="customer.address"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Юрид. Адрес"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" class="text-end">
            <v-btn color="primary" @click="addProductInList">
              Выбрать товар
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center">
          <ProductVaribleItem
            v-for="Var in productsList"
            :key="Var.id"
            :id="Var.id"
            :products="product"
            @updateTotal="updateTotalInList"
            @remove="removeProduct"
            @setProduct="setInProductList"
          >
          </ProductVaribleItem>
        </v-row>
        <v-row class="text-end mt-10">
          <v-col>
            <v-btn color="primary" class="mr-4" @click="emitData">
              Подтвердить заказ
            </v-btn>
            <v-btn color="primary" @click="$emit('closeDialog')">
              Отмена
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
import ProductVaribleItem from "@/components/ClientUiForm/ProductVaribleItem.vue";
import productServices from "@/http/productAPI.js";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { uid } from "uid";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["emitData", "closeDialog"]);

let product = [];
let productsList = reactive([]);
const customer = reactive({
  name: store.state.user.user["customer"].customer_name,
  secondName: store.state.user.user["customer"].customer_name,
  Email: store.state.user.user["email"],
  phone: store.state.user.user["customer"].customer_phone,
  organisation: store.state.user.user["customer"].customer_organisation,
  address: store.state.user.user["customer"].customer_address,
});

const fetchProduct = () => {
  productServices.fetchProduct().then((products) => {
    products.forEach((i) => {
      product.push(i);
    });
  });
};
const setInProductList = (product) => {
  let id = productsList.findIndex((item) => item.id === product.id);
  productsList[id] = {
    id: product.id,
    product_id: product.product,
    cost: product.cost,
    total:product.total
  };
};

const updateTotalInList = (total) => {
  let id = productsList.findIndex((item) => item.id === total.id)
  productsList[id].total = isNaN(parseInt(total.total,10))? 0: parseInt(total.total,10)
  console.log(productsList[id])
}
function addProductInList() {
  productsList.push({
    id: uid(8),
    product_id: ref(""),
    cost: ref(0),
    total:ref(0)
  });
}
function removeProduct(id) {
  productsList.splice(id, 1);
}

const emitData = () => {
  let data = {
    id: store.state.user.user["customer"].customer_id,
    products: productsList,
  };
  emit("emitData", data);
  emit("closeDialog")
  productsList = reactive([]);
};
onMounted(() => {
  fetchProduct();
});
</script>

<style>
</style>