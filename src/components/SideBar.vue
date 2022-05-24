<template>
 <v-navigation-drawer
        class="bg-white elevation-5"
        permanent
      >
        <v-list class="bg-primary mt-4" density="compact" nav v-if="role !== 'CUSTOMERS'">
          <v-list-item v-if="role === 'OPERATOR'" prepend-icon="mdi-view-dashboard" title="Доска заявок" value="tasks" to="/orders"></v-list-item>
          <v-list-item v-if="department === 'Отдел сбыта' || role === 'ADMIN'" prepend-icon="mdi-account-box" title="Клиенты" value="clients" to="/clients"></v-list-item>
          <v-list-item v-if="role === 'ADMIN'" prepend-icon="mdi-gavel" title="Admin" value="admin" to="/admin"></v-list-item>
        </v-list>
        <v-list  v-else class="bg-primary mt-4" density="compact" nav>
          <v-list-item prepend-icon="mdi-account-box" title="Главная" value="acc" to="/"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block color='primary' @click="logout">
              Выйти
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
</template>



<script setup>
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";


const store = useStore()
const router = useRouter()

const role = computed(() =>{
  return store.getters.role
})

const department = computed(() => {
  return store.getters.department
})

const logout =  () => {

   store.dispatch('logout')
   router.push('/auth')
}

</script>


<style>

</style>