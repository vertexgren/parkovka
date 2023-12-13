<template>
  <div class="flex flex-col p-5 justify-between h-full min-h-screen gap-5 mx-auto max-w-[1640px]">
    <h1 class="text-xl text-center font-bold">Найдите парковочное место по адресу</h1>
    <div class="w-full  h-[600px] relative">
      <LeafletMap @openParking="openParking" />
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.search-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
</style>
