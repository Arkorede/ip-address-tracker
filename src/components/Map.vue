<script setup lang="ts">
import { onMounted, computed, watch, nextTick } from "vue";
import { iconLocation } from "../assets";
import { type MapCoordinates } from "./../composables/useIPDetails";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Spinner from "./Spinner.vue";

const props = defineProps<{
  coordinates: MapCoordinates;
  ipAddress: string;
  loading: boolean;
}>();

let map: L.Map | null = null;
let marker: L.Marker | null = null;

const markerIcon = L.icon({
  iconUrl: iconLocation,
});

const isValidCoordinates = computed(() => {
  return props.coordinates.lat !== 0 && props.coordinates.lng !== 0;
});

const shouldShowMap = computed(() => {
  return isValidCoordinates.value && !props.loading;
});

const coordinates = computed((): [number, number] => [
  props.coordinates.lat,
  props.coordinates.lng,
]);

const createOrUpdateMarker = () => {
  if (marker) {
    marker.setLatLng(coordinates.value);
  } else {
    if (map) {
      marker = L.marker(coordinates.value, { icon: markerIcon })
        .bindPopup(props.ipAddress)
        .openPopup()
        .addTo(map);
    }
  }
};

const createNewMap = () => {
  map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView(coordinates.value, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);
};

const updateExistingMap = () => {
  map?.setView(coordinates.value, 13);
};

const cleanUpMap = () => {
  if (map) {
    map.remove();
    map = null;
    marker = null;
  }
};

const initializeMap = async () => {
  await nextTick();

  if (!shouldShowMap.value) {
    cleanUpMap();
    return;
  }

  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.error("Map container not found");
    return;
  }

  if (map) {
    updateExistingMap();
  } else {
    createNewMap();
  }

  createOrUpdateMarker();
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
      class="absolute inset-0 flex items-center justify-center"
      v-if="loading"
    >
      <Spinner />
    </div>
    <div id="map" class="h-full w-full" :class="{ 'opacity-0': loading }"></div>
  </div>
</template>
