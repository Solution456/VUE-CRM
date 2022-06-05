<template>
  <v-app>
    <notifications position="top center" />
    <SideBar v-if="isAuth"/>
    <v-main
    >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>

import SideBar from '@/components/SideBar.vue'
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";



const store = useStore()

const isAuth = computed(() =>{
  return store.getters.isAuth
})





onMounted( () =>{
  store.dispatch('STATE_CHANGED')
})

</script>


<style>
thead, tbody, tfoot, tr, td, th {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
}


th{
    text-align: inherit;
    text-align: -webkit-match-parent;
}
</style>
