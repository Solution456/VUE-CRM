<template>
  <v-card>
    <v-card-title class="justify-center">
      <span class="text-h5 text-primary"
        >Создание оператора</span
      >
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="email"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Email"
           
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="password"
              type="password"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Пароль"
              
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <SelectTempVue v-model="selectDepartment" :items="Departments"  @change="setDepartment"/>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="cardpass"
              variant="outlined"
              hide-details
              color="primary"
              density="compact"
              label="Номер карты"
              
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="text-end mt-10">
          <v-col>
            <v-btn color="primary" class="mr-4" @click="emitData">
              Зарегистрировать
            </v-btn>
            <v-btn color="primary" @click="closeDialog">
              Отмена
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import SelectTempVue from "./SelectTemp.vue";

const emit = defineEmits(["emitData", "CloseDialog"]);

const email = ref('')
const password = ref('')
const cardpass = ref('')
const selectDepartment = ref('')
const Departments = [
  {product_id:1, product_name:'Отдел сбыта'}, 
  {product_id:2, product_name:'Склад'}, 
  {product_id:3, product_name:'Производство'}
  ]

let dep = ref('')

const emitData = ()=> {
    
    let data = {
        email: email.value,
        password: password.value,
        operator_cardPass:cardpass.value,
        operator_department:dep.value
    }
    emit('emitData',data)
    email.value = ''
    password.value = ''
    cardpass.value = ''
    
}

const setDepartment = ()=>{
  let temp = Departments.find(item => item.product_id === parseInt(selectDepartment.value,10))
  dep.value = temp.product_name
}

const closeDialog = () =>{
    emit('CloseDialog')
}
</script>


<style>
</style>