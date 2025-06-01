<script setup lang="ts">
import IPDetailsCard from "./components/IPDetailsCard.vue";
import SearchInput from "./components/SearchInput.vue";
import Map from "./components/Map.vue";
import { onMounted } from "vue";
import { useIPDetails } from "./composables/useIPDetails";

const { fetchIPDetails, ipData, loading, error, mapCoordinates } =
  useIPDetails();

const handleSearch = (searchTerm: string) => {
  fetchIPDetails(searchTerm);
};

onMounted(() => {
  fetchIPDetails();
});
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
        :loading="loading"
        @search="handleSearch"
      />
    </div>
    <IPDetailsCard
      class="absolute left-1/2 transform -translate-x-1/2 top-44.5 z-30 w-[92%] px-4 md:top-[172px] mx-auto md:w-[75%]"
      :ip-details="ipData"
      :loading="loading"
      :error="error"
    />
    <Map class="z-10" :coordinates="mapCoordinates" :loading="loading" />
  </div>
</template>
