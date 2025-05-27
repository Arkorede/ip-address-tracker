<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex items-center justify-center group">
    <div class="flex flex-col items-center md:gap-y-2 md:items-start">
      <h5
        class="text-[0.625rem] text-dark-gray text-nowrap uppercase font-medium md:text-xs"
      >
        {{ label }}
      </h5>
      <p class="text-base font-medium md:text-xl">{{ value }}</p>
    </div>
    <div
      class="hidden ml-18 border-l border-dark-gray h-12 group-last:hidden md:block"
    ></div>
  </div>
</template>
