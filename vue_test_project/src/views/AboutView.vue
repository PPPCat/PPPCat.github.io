<script setup>
import { useCounterStore } from "../stores/counter";
const useCounter = useCounterStore();
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>count = {{ useCounter.count }}</h1>
    <button @click="useCounter.increment()">+1</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
