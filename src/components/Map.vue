<script setup lang="ts">
import { onMounted } from "vue";
import { iconLocation } from "../assets";
import { type MapCoordinates } from "./../composables/useIPDetails";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps<{
  coordinates: MapCoordinates;
}>();

const markerIcon = L.icon({
  iconUrl: iconLocation,
});

onMounted(() => {
  const map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView([props.coordinates.lat, props.coordinates.lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  L.marker([props.coordinates.lat, props.coordinates.lng], {
    icon: markerIcon,
  }).addTo(map);
});
</script>

<template>
  <div
    id="map"
    class="w-full h-[calc(100vh-300px)] md:h-[calc(100vh-240px)]"
  ></div>
</template>
