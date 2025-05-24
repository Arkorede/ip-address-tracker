<script setup>
import IPDetailsCard from "./components/IPDetailsCard.vue";
import SearchInput from "./components/SearchInput.vue";
</script>

<template>
  <div class="mt-6 px-4">
    <SearchInput placeholder="Search for any IP address or domain" />
    <IPDetailsCard />
  </div>
</template>
