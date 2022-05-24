<template>
  <v-card :class="`mx-auto pa-3 order ${props.order.order_status}`">
    <v-layout class="justify-space-between align-center mb-3">
      <v-flex>
        <div class="text-caption ml-3">
          Заказ №:{{ props.order.order_serial }}
        </div>
      </v-flex>
      <v-flex>
        <v-chip :class="`${props.order.order_status} ma-2 pa-4`">
          {{ props.order.order_status }}
        </v-chip>
      </v-flex>
    </v-layout>

    <v-layout class="flex-wrap align-center justify-space-between">
      <v-flex xs6 sm4 md2>
        <div class="text-subtitle-2">
          Дата:
          <span class="text-caption">{{
            $filters.formatedDate(props.order.createdAt)
          }}</span>
        </div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="text-subtitle-2">
          Заказчик:
          <span class="text-caption">{{
            props.order.customer["customer_name"]
          }}</span>
        </div>
      </v-flex>
    </v-layout>
    <v-card-actions class="justify-end">
      <div class="btn text-center">
        <v-btn
          flat
          prepend-icon="mdi-information"
          variant="outlined"
          color="secondary-light-1"
          @click="openModal"
          >Подробнее</v-btn
        >
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  order: {
    type: [Object],
    require: true,
  },
});

const emit = defineEmits(['openModal'])

const openModal = ()=> {
    let data = {
        id:props.order.order_id,
        cusId:props.order.customerCustomerId
    }
    emit('openModal', data)
}
</script>

<style scoped>
.order.ACCEPTED {
  border-left: 3px solid #64b5f6;
}
.order.ONGOING {
  border-left: 3px solid #64ffda;
}

.order.COMPLETE {
  border-left: 3px solid #00e676;
}
.order.PRODUCTION {
  border-left: 3px solid #aaf726;
}
.order.CANCELED {
  border-left: 3px solid #b00020;
}

.v-chip.ACCEPTED {
  color: #64b5f6;
}
.v-chip.ONGOING {
  color: #64ffda;
}
.v-chip.COMPLETE {
  color: #00e676;
}
.v-chip.PRODUCTION {
  color: #aaf726;
}
.v-chip.CANCELED {
  color: #b00020;
}
</style>