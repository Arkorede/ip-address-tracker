<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { iconLocation } from "../assets";
import { type MapCoordinates } from "./../composables/useIPDetails";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps<{
  coordinates: MapCoordinates;
  loading: boolean;
}>();

// const loading = true;

let map: L.Map | null = null;
let marker: L.Marker | null = null;

console.log(props);

const markerIcon = L.icon({
  iconUrl: iconLocation,
});

const isValidCoordinates = computed(() => {
  return props.coordinates.lat !== 0 && props.coordinates.lng !== 0;
});

const shouldRenderMap = computed(() => {
  return isValidCoordinates.value && !props.loading;
});

const initializeMap = () => {
  if (!shouldRenderMap.value) return;

  if (map) {
    map.remove();
  }

  map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView([props.coordinates.lat, props.coordinates.lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  marker = L.marker([props.coordinates.lat, props.coordinates.lng], {
    icon: markerIcon,
  }).addTo(map);
};

onMounted(() => {
  initializeMap();
});

watch(
  [() => props.coordinates, () => props.loading],
  () => {
    initializeMap();
  },
  { deep: true }
);
</script>

<template>
  <div class="relative w-full h-[calc(100vh-300px)] md:h-[calc(100vh-240px)]">
    <div
      class="absolute text-4xl inset-0 flex items-center justify-center"
      v-if="loading"
    >
      Loading...
    </div>
    <div id="map" class="h-full w-full" :class="{ 'opacity-0': loading }"></div>
  </div>
</template>
