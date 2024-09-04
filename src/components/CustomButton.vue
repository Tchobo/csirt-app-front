<template>
    <button
    :style="{ backgroundColor: `${backgroundColor}` }"
    disabled="false" type="button" class=" text-[14px] font-Ag  text-white rounded-[4px]"
    >
    <span class="py-[0.4rem] px-4 block text-[16px] "> {{title}}</span>
  
    </button>
</template>

<script setup>
const props = defineProps({
  title:{

   type:String,
    required:true
  },
  backgroundColor:
  {
    type:String,
    required:true,
    default:"#3563E9"
  }
})
</script>

<style lang="scss" scoped>

</style>