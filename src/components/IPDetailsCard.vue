<script setup lang="ts">
import IPDetailItem from "./IPDetailItem.vue";
import { type IPDetail } from "./../composables/useIPDetails";
import Spinner from "./Spinner.vue";

defineProps<{
  ipDetails: IPDetail[] | null;
  loading: boolean;
}>();
</script>

<template>
  <div
    class="bg-white rounded-xl flex flex-col items-center justify-center gap-x-6 gap-y-4 py-4 px-10 md:flex-row md:justify-between shadow-[0_30px_35px_-5px_rgba(0,0,0,0.1)] md:p-10 md:pr-22.5"
  >
    <div
      class="absolute inset-0 flex items-center justify-center"
      v-if="loading"
    >
      <Spinner />
    </div>
    <template v-else-if="ipDetails && ipDetails.length > 0">
      <IPDetailItem
        v-for="detail in ipDetails"
        :key="detail.id"
        :label="detail.label"
        :value="detail.value"
      />
    </template>
  </div>
</template>
