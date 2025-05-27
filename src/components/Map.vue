<script setup>
import { onMounted } from "vue";
import { iconLocation } from "../assets";

const markerIcon = L.icon({
  iconUrl: iconLocation,
});

onMounted(() => {
  const map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView([51.505, -0.09], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);
});
</script>

<template>
  <div
    id="map"
    class="w-full h-[calc(100vh-300px)] md:h-[calc(100vh-240px)]"
  ></div>
</template>
