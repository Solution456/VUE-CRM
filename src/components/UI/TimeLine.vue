<template>
  <v-timeline side="end">
    <v-timeline-item
      v-for="item in props.items"
      :key="item.id"
      :dot-color="ColorRoute(item.name)"
      size="small"
    >
      <v-alert
        :value="true"
        :color="ColorRoute(item.name)"
        icon="mdi-information"
        class="white--text"
      >
        {{$filters.formatedDate(item.order_route['createdAt'])}}
        <span>{{item.name}}</span>
      </v-alert>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>

const props = defineProps({
    items: {
        type: Array,
        require:true
    }
})



const color = [
    {

        color:'#aaf726'
    },
     {
        color:'info'
    },
     {
        color:'success'
    },
]




const ColorRoute = (route) => {
    switch(route){
        case 'Обработка в отделе сбыта':
        case 'Обработка на складе':
            return color[1].color
            
        case 'Производство на предприятии':
        case 'Отправка готовой продукции на склад':
            return color[0].color
        case 'Реализация':
        case 'Реализован':
            return color[2].color
    }
}



</script>

<style>
</style>