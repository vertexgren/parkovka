<template>
  <div class="mx-auto max-w-[1640px] p-5">
    <h1 class="text-center text-2xl pb-[50px]">
        Приемущества сервиса
    </h1>
    <div class="flex flex-row gap-2  justify-center">
      <div class="flex flex-col gap-2 border-2 drop-shadow-sm p-2" v-for="bennefit in bennefits">
        <div class="flex flex-row gap-2">
          <Icon :name="bennefit.icon" class="h-[40px] w-[40px]" />
          <div class="flex flex-col justify-center">
            <h1 class="text-2xl font-semibold">{{ bennefit.title }}</h1>
            <p class="text-lg font-ligth">{{ bennefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const bennefits = ref([
  {
    title: "Удобство",
    description: "Парковки находятся в удобных местах города, что позволяет вам быстро добраться до нужного вам места",
    icon: "material-symbols:directions-car-sharp"
  },
  {
    title: "Безопасность",
    description: "Все парковки оборудованы камерами видеонаблюдения, что позволяет вам не беспокоиться за свой автомобиль",
    icon: "mdi:shield-car"
  },
  {
    title: "Комфорт",
    description: " Все парковки оборудованы камерами видеонаблюдения, что позволяет вам не беспокоиться за свой автомобиль",
    icon: "mdi:car-info"
  }
]);
</script>
