<template>
  <v-col cols="12" sm="5">
    <SelectTemp
      v-model="selectProduct"
      :items="props.products"
      @change="setProduct"
    />
  </v-col>
  <v-col cols="12" sm="3">
    <v-text-field
      v-model="costProduct"
      hide-details
      variant="outlined"
      color="primary"
      density="compact"
      label="Цена"
      readonly
    ></v-text-field>
  </v-col>
  <v-col cols="12" sm="3">
    <v-text-field
      v-model="totalProduct"
      hide-details
      variant="outlined"
      color="primary"
      density="compact"
      label="Кол-во"
      numeric
      @input="updateTotal"
    ></v-text-field>
  </v-col>
  <v-col cols="12" sm="1">
    <v-btn
      color="secondary"
      icon="mdi-delete"
      size="x-small"
      @click="$emit('remove', props.id)"
    ></v-btn>
  </v-col>
</template>

<script setup>
import SelectTemp from "../UI/SelectTemp.vue";
import { computed, ref } from "vue";

const emit = defineEmits(["setProduct", "setCost", "updateTotal"]);
const props = defineProps({
  products: {
    type: Array,
    require: true,
  },
  id: {
    type: [String, Number],
    require: true,
  },
});
let costProduct = ref("");
const selectProduct = ref("");
const totalProduct = ref(1);

costProduct = computed(() => {
  let ar = props.products.filter(
    (item) => item.product_id === parseInt(selectProduct.value, 10)
  );
  if (ar.length > 0) return ar[0].product_cost;
  return 0;
});

const setProduct = () => {
  let product = {
    id: props.id,
    product: selectProduct.value,
    cost: costProduct.value,
    total: totalProduct.value,
  };
  emit("setProduct", product);
};

const updateTotal = (event) => {
    emit('updateTotal', {
        total:event.target.value,
        id:props.id
        })
}
</script>

<style>
</style>