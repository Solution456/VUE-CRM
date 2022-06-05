<template>
  <v-card>
    <v-card-title class="justify-center">
      <span class="text-h5 text-primary">Добавить продукт</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" >
            <v-text-field
              v-model="productName"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Название"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="productCost"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Цена"
            >
            </v-text-field>
          </v-col>
        </v-row>
         <v-row class="text-end mt-10">
          <v-col>
            <v-btn color="primary" class="mr-4" @click="emitData">
              Создать
            </v-btn>
            <v-btn color="primary" @click="emit('closeDialog')">
              Отмена
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "@vue/reactivity"

const emit = defineEmits(['emitData', 'closeDialog'])


const productName = ref('')
const productCost = ref(0)


const emitData = () => {
    let data = {
        productName:productName.value,
        productCost:productCost.value
    }
    emit('emitData',data)
    productCost.value = 0
    productName.value = ''
}

</script>

<style>
</style>