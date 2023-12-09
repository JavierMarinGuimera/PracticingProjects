<script setup>
import { RouterView } from 'vue-router'
import MyHeader from './components/MyHeader/MyHeader.vue'
</script>

<style src="./assets/main.css"></style>

<template>
  <MyHeader/>
  <RouterView />
</template>