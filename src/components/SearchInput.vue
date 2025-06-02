<script setup lang="ts">
import { ref } from "vue";
import { iconArrow } from "../assets";

const props = defineProps<{
  placeholder?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  search: [searchTerm: string];
}>();

const searchTerm = ref("");

const handleSearch = () => {
  if (searchTerm.value.trim() && !props.loading) {
    emit("search", searchTerm.value.trim());
    searchTerm.value = "";
  }
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};
</script>

<template>
  <div class="flex">
    <input
      type="text"
      class="w-full px-4 py-3 text-sm border bg-white border-gray-300 rounded-l-xl focus:outline-none min-[430px]:text-base"
      :placeholder="placeholder"
      v-model="searchTerm"
      @keypress="handleKeyPress"
    />
    <div
      class="bg-black flex items-center justify-center w-13 h-13 rounded-r-xl cursor-pointer"
      @click="handleSearch"
      :class="{ 'opacity-50 cursor-not-allowed': loading }"
    >
      <img
        :src="iconArrow"
        alt="arrow icon"
        class="w-3 h-3"
        :class="{ 'animate-pulse': loading }"
      />
    </div>
  </div>
</template>
