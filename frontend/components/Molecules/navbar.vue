<template>
    <div class="relative pt-[10px] w-full">
      <div class="w-full mx-auto">
        <nav class="4xl:max-w-[1740px] 3xl:max-w-[1640px] 2xl:max-w-[1400px] xl:max-w-[1160px] lg:max-w-[980px] px-3 lg:px-0 flex-row items-center m-auto flex justify-between gap-12 lg:gap-10">
          <div class="flex flex-row justify-between md:flex md:justify-between md:items-center">
            <NuxtLink to="/" class="">
              <div class="flex flex-col lg:flex-row text-primary items-center space-x-5">
                <img src="/logo.png" class="w-[199px] h-[63px] object-contain" draggable="false" />
              </div>
            </NuxtLink>
            <div @click="toggleNav" class="flex md:hidden ml-auto">
              <button type="button" class="btn btn-primary">
                <Icon name="ph:list-fill" class="h-[20px] w-[20px]" />
              </button>
            </div>
          </div>
          <ul class="text-slate-900 md:flex flex-col w-full md:flex-row justify-end item-center gap-5 lg:gap-16 font-semibold">
            <li class="hover:text-primary transition-all ease-in z-[20]">
              <NuxtLink to="/" class=""> О компании </NuxtLink>
            </li>
            <li @click="routeToAnchor('sheperes')" class="hover:text-primary transition-all ease-in z-[20]">Услуги</li>
            <li @click="routeToAnchor('rate')" class="hover:text-primary transition-all ease-in z-[20]">Тарифы</li>
            <li @click="routeToAnchor('support')" class="hover:text-primary transition-all ease-in z-[20]">FAQ</li>
            <li @click="routeToAnchor('contact')" class="hover:text-primary transition-all ease-in z-[20]">Контакты</li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
<script setup></script>
