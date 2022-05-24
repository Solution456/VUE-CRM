<template>
  <div class="card">
    <div class="card-header pt-3">
      <h3 class="card-title flex-column align-start">
        <span class="title">Клиенты</span>
        <span class="text-muted mt-1"
          >АО <span class="logo-text">РЕММАШ</span></span
        >
      </h3>
    </div>
    <div class="card-body py-3">
      <div class="table-responsive">
        <table class="table align-middle gs-0 gy-4">
          <thead>
            <tr class="font-semibold text-muted bg-primary">
              <th class="pl-4 min-width-325 rounded-start">Клиент</th>
              <th class="min-w-200px">Телефон, адрес</th>
              <th class="min-w-125px">Кол-во заказов</th>
              <th class="min-w-125px text-center pr-4 rounded-end">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cus in Customers" :key="cus.customer_id">
              <td>
                <div class="d-flex align-center">
                  <div class="d-flex justify-center flex-column">
                    <span>{{ cus.customer_name }}</span>
                    <span class="text-muted d-block">{{
                      cus.customer_organisation
                    }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-center">
                  <div class="d-flex justify-center flex-column">
                    <span>{{ cus.customer_phone }}</span>
                    <span class="text-muted d-block">{{
                      cus.customer_address
                    }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-center">
                  <div class="d-flex justify-center flex-column">
                    <span>{{ cus.orders.length }}</span>
                    <span class="text-muted d-block">Орга</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-center">
                  <div class="d-flex justify-center flex-column">
                    <v-btn variant="plain" color="primary" @click="openInfoCustomer(cus.customer_id)">Посмотреть</v-btn>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
const emit = defineEmits(['OpenInfo'])
const props = defineProps({
  data: {
    type: Array,
    require: true,
  },
});

const Customers = computed(() => {
  return props.data;
});


const openInfoCustomer= (id)=> {
  emit('OpenInfo',id)
}
</script>

<style lang="scss" scoped>
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

