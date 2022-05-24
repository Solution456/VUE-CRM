<template>
  <v-card class="pa-4">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script setup>
import { reactive } from "@vue/reactivity";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const obj = reactive({
    ...props.data[3]
})

const series = [
  {
    name: obj.options[0],
    data: props.data[2],
  },
  {
    name: obj.options[2],
    data: props.data[0],
  },
  {
    name: obj.options[1],
    data: props.data[1],
  },
];



const chartOptions = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: {
    title: {
      text: obj.title,
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " заявок";
      },
    },
  },
};

</script>

<style>
</style>