<template>
  <div class="w-full h-full">
    <div>
      <div class="search-input"><input v-model="searchQuery" class="input input-primary input-md" placeholder="Введите адрес" /> <button class="btn btn-primary btn-md" @click="handleInput">Поиск</button></div>

      <transition name="fade">
        <div v-if="suggestions.length" class="suggestion-list">
          <ul>
            <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
              {{ suggestion.label }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="relative w-full h-full">
      <LMap ref="map" :zoom="zoom" :center="mapCenter">
        <LTileLayer ref="layer" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' layer-type="base" name="OpenStreetMap" />
        <div v-for="(marker, index) in markers" :key="index">
          <LMarker :lat-lng="marker.coordinates" @click="openParking(index)">
            <LTooltip :content="marker.name" :lat-lng="marker.coordinates" :options="{ permanent: true }"></LTooltip>
          </LMarker>
        </div>
        <LMarker v-if="searchResult">
          <LTooltip :content="searchResult.label" :lat-lng="[searchResult.y, searchResult.x]" :options="{ permanent: true }"></LTooltip>
        </LMarker>
      </LMap>
      <Transition name="slide">
        <div :class="{ 'slide-in': parkingOpenned, 'slide-out': !parkingOpenned }" class="absolute top-0 overflow-scroll z-[1000] bg-white right-0 w-[600px] h-full">
          <div v-if="parkingOpenned" class="flex flex-col p-2 border-l-2 border-y-2 border-gray-500 gap-2 relative">
            <div class="absolute top-0 right-0" @click="parkingOpenned = false">
              <Icon name="material-symbols:cancel" class="text-black" size="20" />
            </div>
            <div class="w-full h-[400px] pt-5">
              <img :src="parking[opennedIndex].image" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col gap-2">
              <h1 class="text-2xl font-semibold">{{ parking[opennedIndex].name }}</h1>
              <p class="text-lg font-ligth">Адрес: {{ parking[opennedIndex].address }}</p>
              <p class="text-lg font-ligth">Цена парковочного места : {{ parking[opennedIndex].price }}</p>
              <p class="text-lg font-ligth">Количество мест : {{ parking[opennedIndex].space }}</p>
              <p class="text-lg font-light">Доступные места</p>
              <div class="flex flex-row gap-2">
                <div v-for="(available, index) in parking[opennedIndex].available" :class="place == index ? 'bg-amber-200' : ''" :key="available" class="w-[40px] h-[40px] border-2 border-gray-500 rounded-full flex justify-center items-center" @click="place = index">
                  <p class="text-lg font-semibold">{{ available }}</p>
                </div>
              </div>
              <button @click="bookPlace" class="btn btn-primary btn-md">Забронировать</button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div v-if="searchResult" class="h-full">
      <ul>
        <li>
          <p>{{ searchResult.label }}</p>
          <p>Ширина: {{ searchResult.y }}</p>
          <p>Долгота: {{ searchResult.x }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import "leaflet-geosearch/dist/geosearch.css";

let map = ref(null);

const parking = ref([
  {
    image: "/images/parking/1.jpg",
    name: "Парковка 1",
    address: "ул. Абая, 1",
    price: "300 ₸/час",
    space: "40 мест",
    available: ["1", "2", "3", "4", "5"]
  },
  {
    image: "/images/parking/2.jpg",
    name: "Парковка 2",
    address: "ул. Абая, 2",
    price: "300 ₸/час",
    space: "10 мест",
    available: ["1", "2", "3", "4", "5"]
  },
  {
    image: "/images/parking/3.jpg",
    name: "Парковка 3",
    address: "ул. Абая, 3",
    price: "300 ₸/час",
    space: "10 мест",
    available: ["1", "2", "3", "4", "5"]
  }
]);

const bookPlace = () => {
  if (place.value !== null) {
    parking.value[opennedIndex.value].available.splice(place.value, 1);
    place.value = null;
  }
};
const place = ref(null);

let opennedIndex = ref(null);
const parkingOpenned = ref(false);
const openParking = (index) => {
  parkingOpenned.value = !parkingOpenned.value;
  opennedIndex.value = index;
};
let layer = ref(null);
const emit = defineEmits(["openParking"]);
const zoom = ref(15);
const mapCenter = ref([51.187944, 71.409579]);
let provider;
let searchResult = null;
let markers = ref([
  {
    name: "Парковка 1",
    coordinates: [51.188435, 71.410417]
  },
  {
    name: "Парковка 2",
    coordinates: [51.188371, 71.408059]
  },
  {
    name: "Парковка 3",
    coordinates: [51.187357, 71.407937]
  }
]);
let searchQuery = ref("");
let suggestions = ref([]);

onMounted(async () => {
  provider = new GeoSearch.OpenStreetMapProvider();
});

const performSearch = async () => {
  if (provider && searchQuery.value) {
    try {
      const results = await provider.search({ query: searchQuery.value });
      if (results.length > 0) {
        searchResult = results[0];
        mapCenter.value = [searchResult.y, searchResult.x];
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  }
};

const handleInput = async () => {
  if (provider && searchQuery.value) {
    try {
      const results = await provider.search({ query: searchQuery.value });
      suggestions.value = results;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  } else {
    suggestions.value = [];
  }
};

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion.label;
  suggestions.value = [];
  performSearch();
};

useHead({
  script: [
    {
      src: "https://unpkg.com/leaflet/dist/leaflet.js",
      async: true
    },
    {
      src: "https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.umd.js",
      async: true
    }
  ]
});
</script>

<style>
.slide-in {
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
}

.slide-out {
  transform: translateX(100%);
  transition: transform 0.5s ease-in-out;
}

.suggestion-list {
  max-height: 150px;
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.search-input {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  padding: 0 10px;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  outline: none;
  transition: all 0.3s ease;
}

.btn {
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  padding: 0 10px;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  outline: none;
  transition: all 0.3s ease;
}
</style>
