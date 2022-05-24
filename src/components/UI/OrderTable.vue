<template>
  <v-card>
    <div class="card">
      <div class="card-header pt-3">
        <h3 class="card-title flex-column align-start">
          <span class="title">Заказы</span>
        </h3>
      </div>
      <div class="card-body py-3">
        <div class="mb-3" v-show="Show">
          Заказанные продукты
          <productTableInfo :items="products" />
        </div>
        <div class="table-responsive">
          <table class="table align-middle gs-0 gy-4">
            <thead>
              <tr class="font-semibold text-muted bg-primary">
                <th class="pl-4 min-width-325 rounded-start">Заказ №</th>
                <th class="min-w-200px text-center">Дата</th>
                <th class="min-w-125px">Статус</th>
                <th class="min-w-125px  pr-4 rounded-end">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in Orders" :key="order.order_id">
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex justify-center flex-column">
                      <span>{{ order.order_serial }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <span>{{ $filters.formatedDate(order.createdAt) }}</span>
                </td>
                <td class="">
                  <span :class="`badge badge-${order.order_status}`">{{
                    order.order_status
                  }}</span>
                </td>
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex justify-center">
                      <v-btn
                        variant="plain"
                        color="primary"
                        @click="openInfoOrder(order.order_id)"
                        >Подробнее</v-btn
                      >
                      <v-btn v-if="role === 'CUSTOMERS'"
                        variant="plain"
                        color="primary"
                        class="pa-2"
                        @click="openBlank(order.order_id)"
                      >
                        Бланк заказа
                        <v-icon end icon="mdi-text-box-multiple"></v-icon>
                      </v-btn>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
// import productTableVue from "../orders/productTable.vue";
import productTableInfo from "./productTableInfo.vue";
const props = defineProps({
  orders: {
    type: Array,
    require: true,
  },
});

const store = useStore()
const emit = defineEmits(["emitOrderDate", "emitBlank"]);

// const Show = ref(false);
const ind = ref(0);

let array = ref([]);
// const products = ref([]);


const role = computed(() => {
  return store.getters.role;
});

const Orders = computed(() => {
  return props.orders;
});
const openBlank = (id) => {
  ind.value = id;
  array.value = props.orders.filter((item) => item.order_id === id);
  emit("emitBlank", ...array.value);
  // Show.value = !Show.value;
};

const openInfoOrder = (id) => {
  ind.value = id;
  array.value = props.orders.filter((item) => item.order_id === id);
  emit("emitOrderDate", ...array.value);
  // Show.value = !Show.value;
};
</script>


<style lang="scss" scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.325rem 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1;
  color: #ffffff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.325rem;
}

.badge-ACCEPTED {
  color: #64b5f6;
  background-color: #f1faff;
}
.badge-ONGOING {
  color: #ffc700;
  background-color: #fff8dd;
}
.badge-PRODUCTION {
  color: #aaf726;
  background-color: #e8fff3;
}
.badge-COMPLETE {
  color: #00e676;
  background-color: #e8fff3;
}
.badge-CANCELED {
  color: #b00020;
  background-color: #fff5f8;
}
.g-4,
.gy-4 {
  --bs-gutter-y: 1rem;
}
.title {
  color: #ff5131;
  font-weight: 600 !important;
  font-size: calc(1.26rem + 0.12vw) !important;
}
.text-muted {
  font-weight: 500 !important;
  color: #a1a5b7;
  font-size: 0.95rem !important;
}
.logo-text {
  color: #ff5131;
}
.min-width-325 {
  min-width: 325px !important;
}
.min-w-125px {
  min-width: 125px !important;
}
.min-w-200px {
  min-width: 200px !important;
}
.rounded-end {
  border-top-right-radius: 0.475rem !important;
  border-bottom-right-radius: 0.475rem !important;
}
.rounded-start {
  border-bottom-left-radius: 0.475rem !important;
  border-top-left-radius: 0.475rem !important;
}
.table > :not(caption) > * > * {
  padding: 0.35rem 0.35rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
table {
  caption-side: bottom;
  border-collapse: collapse;
}
.table {
  --bs-table-bg: transparent;
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: #181c32;
  --bs-table-striped-bg: rgba(245, 248, 250, 0.75);
  --bs-table-active-color: #181c32;
  --bs-table-active-bg: #f5f8fa;
  --bs-table-hover-color: #181c32;
  --bs-table-hover-bg: #f5f8fa;
  width: 100%;
  margin-bottom: 1rem;
  color: #181c32;
  vertical-align: top;
  border-color: #eff2f5;
  tr {
    border-color: inherit;
    border-width: inherit;
    border-style: inherit;
    text-transform: inherit;
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
    height: inherit;
    min-height: inherit;

    :first-child {
      padding-left: 0;
    }
    :last-child {
      padding-right: 0;
    }
  }
  th {
    border-color: inherit;
    border-width: inherit;
    border-style: inherit;
    text-transform: inherit;
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
    height: inherit;
    min-height: inherit;
  }
  td {
    border-color: inherit;
    border-width: inherit;
    border-style: inherit;
    text-transform: inherit;
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
    height: inherit;
    min-height: inherit;
  }
}

.table.gs-0 th:first-child,
.table.gs-0 td:first-child {
  padding-left: 0rem;
}
.table.gs-0 th:last-child,
.table.gs-0 td:last-child {
  padding-right: 0rem;
}
.table.gs-0 th.dtr-control:first-child,
.table.gs-0 td.dtr-control:first-child {
  padding-left: 0rem !important;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #ffffff;
  background-clip: border-box;
  border: 1px solid #eff2f5;
  border-radius: 0.625rem;
  box-shadow: 0px 0px 20px 0px rgb(76 87 125 / 2%);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    min-height: 70px;
    padding: 0 2.25rem;
    background-color: transparent;
    border-bottom: 1px solid #eff2f5;

    :first-child {
      border-radius: calc(0.625rem - 1px) calc(0.625rem - 1px) 0 0;
    }
    .card-title {
      display: flex;
      align-items: center;
      margin: 0.5rem;
      margin-left: 0;
    }
  }

  .card-body {
    padding: 2rem 2.25rem;

    .table-responsive {
      overflow-x: auto;
    }
  }
}
</style>

