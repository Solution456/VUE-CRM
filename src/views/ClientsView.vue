<template>
    <v-container>
        <ClientTableVue :data='CustomersData' @OpenInfo='OpenModal'/>
        <v-dialog  v-model="Show">
            <ClientInfoFormVue  @openOrder="openOrder" :data='info'/>
        </v-dialog>
        <v-dialog v-model="Active">
            <orderFormVue @closeDialog="Active = !Active" :ids='order'/>
        </v-dialog>
    </v-container>
</template>

<script setup>
import ClientTableVue from '@/components/UI/ClientTable.vue';
import ClientInfoFormVue from '@/components/UI/ClientInfoForm.vue';
import orderFormVue from '@/components/orders/orderForm.vue';
import { computed, onMounted, reactive,ref } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
let CustomersData= reactive([])
const Show = ref(false)
const Active = ref(false)
const id = ref(0)
let info = ref([])
let order = ref({})

const role = computed(() => {
  return store.getters.role
})

const OpenModal = (ind) => {
    id.value = ind
    Show.value = !Show.value
    info.value = CustomersData.filter(item => item.customer_id === id.value)
}

const openOrder = (data) => {
  order.value = data
  console.log(order.value)
  Show.value = !Show.value
  Active.value = !Active.value
}

const fetchData = () => {
    store.dispatch('fetchCustomerWithOrders').then(data => {
        data.forEach(element => {
            CustomersData.push(element)
        });
    })
}

const checkRoute = ()=> {
  if(localStorage.getItem('token') && role.value !== 'OPERATOR' && role.value !== 'ADMIN'){
    router.push('/')
  }
  else {
    setTimeout(fetchData(),2000)
  }
}

onMounted(() => {
    checkRoute()
    
    
})
</script>

<style>

</style>