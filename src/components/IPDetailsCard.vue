<script setup lang="ts">
import IPDetailItem from "./IPDetailItem.vue";
import { type IPDetail } from "./../composables/useIPDetails";

defineProps<{
  ipDetails: IPDetail[] | null;
}>();
</script>

<template>
  <div
    class="bg-white rounded-xl flex flex-col items-center justify-center gap-x-6 gap-y-4 py-4 px-10 md:flex-row md:justify-between shadow-[0_30px_35px_-5px_rgba(0,0,0,0.1)] md:p-10 md:pr-22.5"
  >
    <IPDetailItem
      v-for="detail in ipDetails"
      :key="detail.id"
      :label="detail.label"
      :value="detail.value"
    />
  </div>
</template>
