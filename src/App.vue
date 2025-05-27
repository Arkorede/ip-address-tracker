<script setup>
import IPDetailsCard from "./components/IPDetailsCard.vue";
import SearchInput from "./components/SearchInput.vue";
import Map from "./components/Map.vue";
</script>

<template>
  <div class="relative">
    <div
      class="pt-6 px-6 bg-[url('./assets/pattern-bg-mobile.png')] bg-cover bg-no-repeat bg-center h-[300px] md:bg-[url('./assets/pattern-bg-desktop.png')] md:h-[240px]"
    >
      <h1 class="text-2xl text-white text-center font-bold pb-6">
        IP Address Tracker
      </h1>
      <SearchInput
        placeholder="Search for any IP address or domain"
        class="w-full max-w-124.5 mx-auto"
      />
    </div>
    <IPDetailsCard
      class="absolute left-1/2 transform -translate-x-1/2 top-44.5 z-30 w-[92%] px-4 md:top-[172px] mx-auto md:w-[75%]"
    />
    <Map class="relative z-10 pt-12 sm:pt-16" />
  </div>
</template>
