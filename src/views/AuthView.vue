<template>
 <div class="auth">
  <v-container fluid>
      <v-layout full-height class="justify-center align-center">
           <v-flex xs12 sm8 md4>
               <v-card>
                   <v-img
                        :src="require('@/assets/logo.svg')"
                        max-height="50"
                        alt="logo"
                        
                        class="me-3 justify-center"
                    ></v-img>
                   <v-tabs v-model="tab" background-color="primary">
                       <v-tab value="one">Авторизация</v-tab>
                       <v-tab value="two">Регистрация клиента</v-tab>
                   </v-tabs>

                   <v-card-text>
                       <v-window v-model="tab">
                            <v-window-item value="one">
                            <AuthForm  @login='login'/>
                            </v-window-item>

                            <v-window-item value="two">
                            <RegisterForm @register='register'/>
                            </v-window-item>
                       </v-window>
                   </v-card-text>
               </v-card>
               
           </v-flex>
      </v-layout>
  </v-container>
 </div>
  
</template>

<script setup>

import {ref} from '@vue/reactivity'
import RegisterForm from '@/components/Auth/RegisterForm.vue'
import AuthForm from '@/components/Auth/AuthForm.vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


const store = useStore()
const router = useRouter()
const tab = ref(null)


const auth = ()=>{
    console.log(store.getters.role)
    if(store.getters.role === 'OPERATOR'){
           router.push('/orders')
       }else if (store.getters.role === 'ADMIN'){
           router.push('/admin')
       }else{
           router.push('/')
       }
}
const login =  async (user) => {
   try{
       store.dispatch('login',user)
       setTimeout(auth, 1000)
       
   } catch{
       console.log('Ошибка')
   }
   
}

const register = async (user) => {
    store.dispatch('register',user)
}




</script>

<style scoped>
.auth{
    height: 100%;
    width: 100%;
    background-color: #BDBDBD;
}

</style>