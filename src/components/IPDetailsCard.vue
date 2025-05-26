<script setup lang="ts">
import IPDetailItem from "./IPDetailItem.vue";

const ipDetails = [
  { id: 1, label: "IP Address", value: "192.168.1.1" },
  { id: 2, label: "Location", value: "New York, USA" },
  { id: 3, label: "Time Zone", value: "UTC-5:00" },
  { id: 4, label: "ISP", value: "SpaceX Starlink" },
];
</script>

<template>
  <div
    class="bg-white rounded-xl flex flex-col items-center justify-center border border-dark-gray gap-x-6 gap-y-4 py-4 px-10 md:flex-row md:justify-between md:p-10"
  >
    <IPDetailItem
      v-for="detail in ipDetails"
      :key="detail.id"
      :label="detail.label"
      :value="detail.value"
    />
  </div>
</template>
