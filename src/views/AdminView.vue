<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-btn color="primary" @click="ShowDialog = !ShowDialog">
          Создать оператора
        </v-btn>
      </v-col>
      <v-col class="text-center">
        <v-btn @click="Show = !Show" color="primary">
          Создать администратора
        </v-btn>
      </v-col>
       <v-col class="text-center">
        <v-btn @click="ShowDialog2 = !ShowDialog2" color="primary">
          Добавить продукт
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12">
        <h2>Аналитические графики</h2>
      </v-col>
      <v-col cols="12" sm="6">
        <AdminChartVue
          :data="[
            countOrdersToday,
            countOrdersLastYear,
            countOrders2Last,
            { title: 'Кол-во заявок', options: ['2020', '2021', '2022'] },
          ]"
        ></AdminChartVue>
      </v-col>
      <v-col cols="12" sm="6">
        <AdminChartVue
          :data="[
            countOrdersToday,
            countOrdersLastYear,
            countOrders2Last,
            { title: 'Кол-во заявок', options: ['2020', '2021', '2022'] },
          ]"
        ></AdminChartVue>
      </v-col>
    </v-row>
    <v-dialog v-model="ShowDialog">
      <OperatorFormVue
        @emitData="CreateOperator"
        @CloseDialog="ShowDialog = !ShowDialog"
      />
    </v-dialog>
     <v-dialog v-model="ShowDialog2">
      <ProductFormVue
        @emitData="CreateProduct"
        @CloseDialog="ShowDialog2 = !ShowDialog2"
      />
    </v-dialog>
  </v-container>
</template>

<script setup>
import AdminChartVue from "@/components/Admin/AdminChart.vue";
import OperatorFormVue from "@/components/UI/OperatorForm.vue";
import ProductFormVue from "@/components/Admin/ProductForm.vue";
import userService from "@/http/authAPI";
import ProductServices from "@/http/productAPI"
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const ShowDialog = ref(false);
const ShowDialog2 = ref(false);
const store = useStore();
const router = useRouter();

const role = computed(() => {
  return store.getters.role;
});

const countOrdersLastYear = computed(() => {
  return dateYear(new Date().getFullYear() - 1);
});
const countOrdersToday = computed(() => {
  return dateYear(new Date().getFullYear());
});

const countOrders2Last = computed(() => {
  return dateYear(new Date().getFullYear() - 2);
});

const CreateOperator = async (data) => {
  await userService.createOperator(data);
  console.log("Успех");
};
const CreateProduct = async (data) => {
  try{
    const product = await ProductServices.createProduct(data)
    store.dispatch('Notify',{titel:product.product_name,text:"Создание продукта прощло успешно", type:"success"})
  }catch (er){
    store.dispatch('Notify',{title:'Ошибка',text:er.response.data.message,type:'error'})
  }
}

const dateYear = (year) => {
  const resultArray = [];
  const countOrder = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
  };
  const orders = store.getters.orders.filter(
    (item) => new Date(Date.parse(item.createdAt)).getFullYear() === year
  );
  for (let item of orders) {
    switch (new Date(Date.parse(item.createdAt)).getMonth()) {
      case 0: {
        countOrder["0"] += 1;
        break;
      }
      case 1: {
        countOrder["1"] += 1;
        break;
      }
      case 2: {
        countOrder["2"] += 1;
        break;
      }
      case 3: {
        countOrder["3"] += 1;
        break;
      }
      case 4: {
        countOrder["4"] += 1;
        break;
      }
      case 5: {
        countOrder["5"] += 1;
        break;
      }
      case 6: {
        countOrder["6"] += 1;
        break;
      }
      case 7: {
        countOrder["7"] += 1;
        break;
      }
      case 8: {
        countOrder["8"] += 1;
        break;
      }
      case 9: {
        countOrder["9"] += 1;
        break;
      }
      case 10: {
        countOrder["10"] += 1;
        break;
      }
      case 11: {
        countOrder["11"] += 1;
        break;
      }
    }
  }
  for (let item in countOrder) {
    resultArray.push(countOrder[item]);
  }
  return resultArray;
};

const checkRoute = () => {
  if (
    localStorage.getItem("token") &&
    role.value !== "ADMIN" &&
    role.value !== "OPERATOR"
  ) {
    router.push("/");
  } else if (localStorage.getItem("token") && role.value !== "ADMIN") {
    router.push("/orders");
  } else {
    return store.dispatch("fetchOrders");
  }
};

onMounted(() => {
  checkRoute();
});
</script>

<style>
</style>