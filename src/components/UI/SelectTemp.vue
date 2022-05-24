<template>
 <select class="select-box" v-model="select" @change="changeSelect">
     <option disabled value="">выберите из списка</option>
     <option
        v-for="item in items"
        :key="item.product_id"  
        :value="item.product_id"
     >
        {{item.product_name}}
     </option>
 </select>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['update:modelValue'])

defineProps({
    modelValue:{
        type:String
    },
    items:{
        type:Array,
        require:true
    }
})

const select = ref('')

const changeSelect = (event) =>{
    emit('update:modelValue',event.target.value)
}






</script>

<style lang="scss" scoped>

$glass: rgba(255, 255, 255, 0.2);
$glass-icon: rgba(255, 255, 255, 0.3);
$option: #320a28;
    .select-box{
        position: relative;
        appearance: none;
        border: 1px solid rgb(174, 173, 173);
        outline: 0;
        font: inherit;
        width: 100%;
        height: 2.5em;
        padding-left:1em ;
       
        color: rgb(87, 85, 85);
        border-radius: 0.25em;
        cursor: pointer;
        transition: all .2s ease;


        &:focus{
             border: 1px solid #d50000;
        }

        option {
            color: inherit;
            background-color: white;

            &:focus {
                outline: none;
            }

            &::-ms-expand {
                display: none;
            }
        }

    }
</style>