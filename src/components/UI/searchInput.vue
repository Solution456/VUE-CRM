<template>
  <input
    class="input"
    type="text"
    autofocus
    placeholder="Введите номер заказа.."
    :value="modelValue"
    @input="updateInput"
  />
</template>

<script setup>
defineProps({
  modelValue: [String, Number]
})

const emit = defineEmits(['update:modelValue'])

const updateInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style  scoped>
.button {
  width: 4rem;
  height: 4rem;
  max-width: 4rem;
  max-height: 4rem;

  margin: 0.5rem;
  padding-top: 0.5rem;

  background: #f2f2f2;

  border: 1px solid #cccccc;
  border-radius: 2rem;
  outline: none;

  font-size: 2rem;
}

.button:first-child {
  margin-left: 0;
}

.button:last-child {
  margin-right: 0;
}

.input {
  width: 20rem;
  height: auto;

  background: #d50000;

  border: 1px solid #cccccc;
  border-radius: 2rem;
  outline: none;

  font-size: 1.5rem;
  color: white;
  letter-spacing: 1px;
  text-indent: 2rem;
}

input::placeholder {
  color: white;
  font-size: 0.7em;
}
</style>