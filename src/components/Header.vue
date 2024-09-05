<template>
  <div class="relative w-full">
    <nav class="bg-white border-gray-200">
      <div class="max-w-screen-2xl w-100 flex  flex-wrap items-center justify-start space-x-8  py-2 px-10 ">
        <a href="" class="flex  items-center space-x-3 rtl:space-x-reverse">
          <img class=" rounded-full m-0" src="../assets/images/csirt_africa_logo.svg" alt="user photo">

        </a>
        <div class="hidden md:flex  ">
          <a href="" deactivate class="text-maroon-deactivate font-mono mr-2 text-[16px] font-medium leading-5 p-2 px-2 py-[10px] rounded-[4px]">Europe</a>
          <a href=""  class="text-white bg-maroon-dark font-mono mr-2 text-[16px] leading-5 p-2 px-2 py-[10px] rounded-[4px]">Africa</a>
          <a href="" deactivate class="text-maroon-deactivate font-mono mr-2 text-[16px] leading-5 px-2 py-[10px] rounded-[4px]">Nort America</a>
        </div>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button v-if="isLoging===true" type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" @click="userMenuState">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full m-0" src="../assets/images/csirt_africa_logo.svg" alt="user photo">
          </button>
          
          <button  data-collapse-toggle="navbar-user" type="button" class="inline-flex  items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false" @click="menuState">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
      <!--   <div class="items-center md:mr-5 m-[0] justify-between w-full md:flex md:w-auto md:order-1" :class="{ hidden: !showMenu }" id="navbar-user">
          <ul class="flex flex-col font-medium p-4 md:p-0 rounded-lg bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <a href="#" class="block text-white whitespace-nowrap py-2 px-3  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" class="block whitespace-nowrap py-2 px-3 text-secondary-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-primary md:p-0" @click="goToSearch()">Search</a>
            </li>
            <li>
              <a href="#" class="block whitespace-nowrap py-2 px-3 text-secondary-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-primary md:p-0">Add Car</a>
            </li>
          
          </ul>
        </div> -->

        
      </div>
    </nav>
    <div class="absolute z-50 right-[1rem] top-[3.2rem] w-[10.5rem] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown" v-show="showUserMenu">
      <div class="px-4 py-3">
        <span class="block text-sm text-gray-900">Bonnie Green</span>
        <span class="block text-sm text-gray-500 truncate">name@flowbite.com</span>
      </div>
      <ul class="py-2" aria-labelledby="user-menu-button">
        <li>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Earnings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomButton from '../components/CustomButton.vue'
import { useRouter } from 'vue-router';

const showUserMenu = ref(false)
const showMenu = ref(false)
const isLoging = ref(false)
const router = useRouter();
const userMenuState = () => {
  showUserMenu.value = !showUserMenu.value
}

const menuState = () => {
  showMenu.value = !showMenu.value
}


const goToSearch = ()=>{
  router.push('/search');
}
</script>

<style  scoped>
/* Add your custom styles here */
</style>
