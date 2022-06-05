<template>
  <v-card class="auth-card pa-3" style="width: 28rem">
    <v-card-title class="d-flex align-center justify-center py-1">
      <span class="text-2xl font-weight-semibold">Регистрация клиента </span>
    </v-card-title>
    <v-card-text>
      <v-alert v-if="error !== 'Не авторизован' && error !== ''" type="error">{{
        error
      }}</v-alert>
      <v-alert v-if="successMessage !== ''" type="success">{{
        successMessage
      }}</v-alert>
      <p class="text-2xl font-weight-semibold text--primary mb-2">
        Добро пожаловать! 👋🏻
      </p>
      <p>Пожалуйста введите в поля соответсвующую информацию</p>
    </v-card-text>

    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              density="compact"
              variant="outlined"
              color="secondary"
              label="Имя"
              v-model="registrUser.name"
              hide-details
            ></v-text-field>
          </v-col>
         
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              variant="outlined"
              color="secondary"
              label="Email"
              placeholder="john@example.com"
              hide-details
              v-model="registrUser.Email"
              density="compact"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              variant="outlined"
              color="secondary"
              label="Пароль"
              type="password"
              placeholder="........"
              hide-details
              v-model="registrUser.password"
              density="compact"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              color="secondary"
              label="Телефон"
              placeholder="+7"
              hide-details
              v-model="registrUser.phone"
              density="compact"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              color="secondary"
              v-model="registrUser.company"
              label="Название компании"
              hide-details
              density="compact"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              color="secondary"
              v-model="registrUser.address"
              label="Юрид. адрес"
              
              density="compact"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn
          block
          color="primary"
          class="mt-6"
          @click="register"
          :disabled="loading"
        >
          Зарегистрироваться
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";


const emit = defineEmits(['register'])
const store = useStore()
const loading = computed(() => {
    return store.getters.isLoading
})

const error = computed(() => {
    return store.getters.error
});
const successMessage = computed(() => {
    return store.getters.success
})



const registrUser = reactive({
  name:'',
  Email:'',
  password:'',
  phone:'',
  company:'',
  address:''
})

const register = () => {
  emit('register',registrUser)
  registrUser.name = ''
  registrUser.Email = ''
  registrUser.password = ''
  registrUser.phone = ''
  registrUser.company = ''
  registrUser.address = ''
}

</script>

<style>
</style>