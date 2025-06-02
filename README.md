# Frontend Mentor - IP address tracker solution

This is my solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![](./public/desktop-design.jpg)
![](./public/mobile-design.jpg)

### Links

- Solution URL: [github](https://github.com/Arkorede/ip-address-tracker)
- Live Site URL: [vercel](https://ip-address-tracker-navy-tau.vercel.app/)

## My process

1️⃣ Component Development

Built the core components of the application:

- SearchInput
- Map
- IpDetailCard
- IpDetailItem

2️⃣ Component Integration

- Assembled these components together within the application.
- Ensured responsiveness across different screen sizes.

3️⃣ API Integration

Created the API logic in a Vue composable:

- Fetches IP details.
- Retrieves map coordinates.
- Passed relevant data and functions through parent components to ensure proper communication

### Built with

- Flexbox
- Mobile-first workflow
- [Vue.js](https://vuejs.org/) - JS library
- [Tailwind CSS](https://tailwindcss.com/) - For styles

### What I learned

- Learned how to use Vue composables to create reusable logic shared across multiple components.
- Learned how to use Vue directives.
- Gained an understanding of the onMounted lifecycle hook and its role in initializing component logic.
- While working on the Map component, I learned to use watchers for handling side effects in response to state changes.

```js
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
```

### Continued development

I would like to strengthen my understanding of API integration, with a focus on optimizing application performance by leveraging best practices and React Query for efficient data fetching.

### Useful resources

- [Traversy media](https://www.traversymedia.com/blog/vue-crash-course) - This material was helpful for me as it covered fundamental concepts of Vue.js, which I applied while working on the project.

## Author

- Website - [Israel Ashaolu](https://www.your-site.com)
- Frontend Mentor - [@Arkorede](https://www.frontendmentor.io/profile/Arkorede)
- Twitter - [@IsraelAshaolu](https://x.com/IsraelAshaolu)

## Acknowledgments

Special thanks to God Almighty and my brothers.
