<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Продукт</th>
        <th class="text-left">Стоимость</th>
        <th class="text-left">Кол-во</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.items[0].products" :key="item.name">
        <td>{{ item.product_name }}</td>
        <td>{{ item.product_cost }}</td>
        <td>{{ item.order_product['total'] }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
const props = defineProps({
    items:{
        type:Array,
        require:true
    }
})

</script>

<style>
</style>