<script setup lang="ts">
import { iconArrow } from "../assets";

defineProps<{
  placeholder?: string;
}>();
</script>

<template>
  <div class="flex">
    <input
      type="text"
      class="w-full px-4 py-3 border bg-white border-gray-300 rounded-l-xl focus:outline-none"
      :placeholder="placeholder"
    />
    <div
      class="bg-black flex items-center justify-center w-13 h-13 rounded-r-xl cursor-pointer"
    >
      <img :src="iconArrow" alt="arrow icon" class="w-3 h-3" />
    </div>
  </div>
</template>
