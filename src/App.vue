<template>
  <v-app>

      <HeaderComponent class="header-bar" v-if="showHeaderBar()"></HeaderComponent>

      <v-main>
        <router-view></router-view>
      </v-main>

  </v-app>
</template>

<script setup>

  import HeaderComponent from "./components/HeaderComponent.vue";
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function showHeaderBar() {
    return router.currentRoute.value.fullPath != '/' && router.currentRoute.value.fullPath != '/register'
  }

</script>

<style scoped>

  .header-bar {
    padding: unset;
  }

</style>