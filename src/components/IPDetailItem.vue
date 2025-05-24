<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex items-center justify-center group">
    <div class="flex flex-col items-center gap-y-2 sm:items-start">
      <h5
        class="text-[0.625rem] text-dark-gray uppercase font-normal sm:text-xs"
      >
        {{ label }}
      </h5>
      <p class="text-base font-semibold sm:text-xl">{{ value }}</p>
    </div>
    <div
      class="hidden ml-12 border-l border-dark-gray h-12 group-last:hidden sm:block"
    ></div>
  </div>
</template>
