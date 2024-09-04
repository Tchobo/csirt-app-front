<template>
   <form class="py-1 px-4 flex items-center">


        <div class="relative w-full flex border rounded-[4px] items-center">
         <img src="../assets/images/search.svg" alt="" class="ml-2 w-5 h-5">
            <input type="text" @input="search" placeholder="Search" class="bg-gray-50 font-mono text-basde focus:border-maroon-dark border border-gray-300 text-gray-900 rounded-md h-8 px-2 py-2 search-csirt w-full ">
        </div>
    
   </form>
</template>

<script setup>

const emit = defineEmits(['search'])
   const search = (e)=>{
    emit('search', e.target.value)

   }
</script>

<style scoped>
.search-csirt::placeholder {
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color:  rgba(0, 0, 0, 1);
  
  
}

.search-csirt{
   border:none!important;
  outline: none;
  border-width: none;
  outline-width: 0;
  border-radius: 4px;

}
</style>