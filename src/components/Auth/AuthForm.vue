<template>
  <v-card class="auth-card pa-3" style="width:29rem">
      
      <v-card-title class="d-flex align-center justify-center py-1">
         <span class="text-2xl font-weight-semibold">Авторизация в системе обработки
             заявок
         </span>
      </v-card-title>
      <v-card-text>
          <v-alert v-if="(error !== 'Не авторизован') && (error !== '')" type="error">{{error}}</v-alert>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Добро пожаловать! 👋🏻
          </p>
          <p class="mb-2">
            Пожалуйста авторизуйтесть для начала работы</p>
        </v-card-text>

        <v-card-text>
            <v-form>
                <v-text-field
                variant="outlined"
                color="secondary"
                label="Email"
                v-model="user.email"
                :rules="[rules.email]"
                required
                placeholder="john@example.com"
                
                class="mb-3"
                ></v-text-field>
                <v-text-field
                
                v-model='user.password'
                color="secondary"
                type="password"
                variant="outlined"
                label="Пароль"
                placeholder="············"
                required
                :rules="[rules.required]"
                ></v-text-field>
                <v-btn
                    @click="loginUser"
                    block
                    color="primary"
                    class="mt-6"
                    :disabled="loading"
                    >
                    Войти
                </v-btn>
                
            </v-form>
            
        </v-card-text>

  </v-card>
</template>

<script setup>

import {reactive} from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import {rules} from '@/helpers/rulesValidate'

const emit = defineEmits(['login',])

const store = useStore()

const loading = computed(() => {
    return store.getters.isLoading
})

const error = computed(() => {
    return store.getters.error
});

const user = reactive({password:'',email:''})

const loginUser = () => {
    let data = {
        password: user.password,
        email: user.email
    }
    emit('login', data)
}




</script>

<style>

</style>