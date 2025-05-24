<script setup lang="ts">
import iconArrow from "./../assets/icon-arrow.svg";

defineProps<{
  placeholder?: string;
}>();
</script>

<template>
  <div className="flex">
    <input
      type="text"
      class="w-full px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none"
      :placeholder="placeholder"
    />
    <div
      class="bg-black flex items-center justify-center w-12 h-12 rounded-r-xl cursor-pointer"
    >
      <img :src="iconArrow" alt="arrow icon" class="w-3 h-3" />
    </div>
  </div>
</template>
