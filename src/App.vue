<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core'
import { useStore } from 'vuex'
import TheNavbar from './components/TheNavbar'

export default {
  setup () {
    const store = useStore()
    onBeforeMount(() => store.dispatch('getTasks'))
  },
  components: {
    TheNavbar
  }
}
</script>

<style></style>
