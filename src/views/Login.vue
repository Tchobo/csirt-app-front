<template>
    <div class=" relative pt-8 h-full   w-100 bg-contain bg-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center min-h-screen">

        <div class=" absolute w-full left-0 top-0 bottom-0  right-0 m-auto bg-white shadow-lg rounded-lg p-6 max-w-xs md:max-w-md min-w-[480px] h-[35rem] ">
            <div class="mt-[4.2rem] flex justify-center flex-col items-center w-auto height-[70%]">
                <h3 class="  font-mono text-task-welcom-black font-medium leading-normal text-[42px]">Welcome back !
                </h3>
  
                <div class=" w-[90%]">
                    <v-container class="">
                        <v-row>
                            <v-col cols="12" class="flex justify-start flex-col">
                                <label for="emailInput"
                                    class="font-mono text-left text-task-black-label font-medium leading-6 text-[14px]">Email</label>
                                <input
                                v-model="loginData.email"
                                autocomplete="off"
                                    class="font-mono mt-2 pl-3 font-medium leading-6 text-[14px] focus:outline-task-blue border border-x-task-gray h-[40px] w-full rounded-md placeholder-task-input-placeholder"
                                    id="emailInput" placeholder="Email" variant="outlined" />
                                <label for="passwordInput"
                                    class="mt-6 font-mono text-left text-task-black-label font-medium leading-6 text-[14px]">Password
                                    </label>
                                <div class="w-100 relative">
                                    <input  v-model="loginData.password" class=" mt-2 pl-3 font-mono font-medium leading-6 text-[14px] focus:outline-task-blue border border-x-task-gray h-[40px] w-full rounded-md placeholder-task-input-placeholder" id="passwordInput" placeholder="***************"
                                        :type="visible ? 'text' : 'password'" outlined />
                                 <component :is="visible ? EyeArrowLeft : Eye " :size=20  class="ml-4 cursor-pointer text-task-black text-center absolute top-[9px] right-[8px] font-mono font-medium leading-4 text-[14px] p-[10px]"  @click="changePasswordVisibility()" />
                                </div>

                               

                            </v-col>
                        </v-row>
                        <v-row class="flex justify-center mt-5">
                            <a href="#" deactivate class="text-center underline text-task-bg-blue font-mono font-medium leading-6 text-[14px] cursor-pointer">Forgot password ?</a>
                        </v-row>
                        <v-row class="flex justify-center mt-8">
                                <v-btn :loading="isLoading" 
 class="text-center w-[130px] rounded-md  btnColor" @click="onloginUser()">
                                <span class=" font-mono font-medium leading-6 text-[14px] spnLogin" v-if="!isLoading">Login</span>
                                <v-progress-circular class="font-mono" v-else indeterminate size="8" aria-colcount="white">

                                </v-progress-circular>
                                
                                </v-btn>

                                </v-row>


                    </v-container>
                </div>

            </div>

        </div>
      
    </div>
</template>

<script setup>
import { VLabel } from 'vuetify/lib/components/index.mjs';
import { VTextField } from 'vuetify/lib/components/index.mjs';
import { VRow } from 'vuetify/lib/components/index.mjs';
import { VContainer } from 'vuetify/lib/components/index.mjs';
import { VCol } from 'vuetify/lib/components/index.mjs';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ref } from "vue"
import { VBtn } from 'vuetify/lib/components/index.mjs';
import { VProgressCircular } from 'vuetify/lib/components/index.mjs';
import Eye from "vue-material-design-icons/Eye.vue"
import EyeArrowLeft from "vue-material-design-icons/EyeOff.vue"

import store from "../store";
import { useRouter } from 'vue-router';
const visible = ref(false)
const isLoading = ref(false)
const loginData = ref({ email: '', password: '' });

const router = useRouter();

const changePasswordVisibility =()=>{
    visible.value = !visible.value
    console.log("This is the visibility", visible.value);
}


const onloginUser = async () => {
  try {
    isLoading.value= true
    const loginStatus = await store.dispatch('loginUser', loginData.value);
    if (loginStatus) {
      // Redirect to dashboard or any other route on successful login
      isLoading.value=false
      router.push('/csirt-home');
    } else {
     console.log("Connection impossible"); // Handle unsuccessful login (show error message, etc.)
    }
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error (show error message, retry login, etc.)
  }
};
</script>

<style scoped>
/* .bg-image {
    background-image: url('../assets/images/cyber_ssl.jpg');
   background-color:rgba(217, 217, 217, 1);
    background-blend-mode: multiply, screen, darken;
    filter: contrast(1.1);
    background-position: bottom 0 right 0;
    width: 50%;
 



} */

.v-text-field--outlined :deep(fieldset) {
    outline-color: rgb(168, 85, 247, 1) !important;
    background: rgb(168, 85, 247, 1);
}

.spnLogin{
    text-transform: none;
   
}
.btnColor{
    background: rgb(168, 85, 247, 1);
    color: #ffffff;
    width: 100%;
}
input:focus{
    border-color: none;
}
input:valid {
  background: none!important; /* Change to your desired background color */
}
</style>
