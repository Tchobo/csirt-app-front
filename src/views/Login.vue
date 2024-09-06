<template>
    <div class=" relative pt-8 h-screen   w-100  bg-center bg-gradient-to-r bg-image flex items-center justify-center min-h-screen">

        <div class=" absolute w-full left-0 top-0 bottom-0  right-0 m-auto   rounded-lg p-6 max-w-xs md:max-w-md min-w-[480px] h-[35rem] ">
            <div class="mt-[4.2rem] flex justify-center flex-col items-center w-auto height-[70%]">
                <h3 class="  font-mono text-white font-medium leading-normal text-[42px]">Welcome back !
                </h3>
                <p class="font-mono text-red text-[15px] p-1 font-medium" v-if="authErrors.length>0"> {{ authErrors }}</p>
  
                <div class=" w-[90%]">
                    <v-container class="">
                        <v-row>
                            
                            <v-col cols="12"  class="flex justify-start flex-col" >
                               
                                <label for="emailInput"
                                    class="font-mono text-left text-white font-medium leading-6 text-[14px]">Email</label>
                                <input
                                 :class="{'input-error': errors.email}"
                                v-model="loginData.email"
                                autocomplete="off"
                                    class="font-mono text-white mt-2 pl-3 font-medium leading-6 text-[14px] focus:outline-white  border-x-test-white h-[40px] w-full rounded-md placeholder-task-input-placeholder"
                                    id="emailInput" placeholder="Email" variant="outlined" />
                                    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                                <label for="passwordInput"
                                    class="mt-6 font-mono text-left text-white font-medium leading-6 text-[14px]">Password
                                    </label>
                                <div class="w-100 relative">
                                    <input 
                                       :class="{'password-error': errors.password}"
                                     v-model="loginData.password" class=" mt-2 pl-3 font-mono text-white font-medium leading-6 text-[14px] focus:outline-white  h-[40px] w-full rounded-md placeholder-task-input-placeholder" id="passwordInput" placeholder="***************"
                                        :type="visible ? 'text' : 'password'" outlined />

                                 <component :is="visible ? EyeArrowLeft : Eye " :size=20  class="ml-4 cursor-pointer text-white text-center absolute top-[9px] right-[8px] font-mono font-medium leading-4 text-[14px] p-[10px]"  @click="changePasswordVisibility()" />
                                </div>
                                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>


                               
                           
                            </v-col>
                        </v-row>
                        <v-row class="flex justify-center mt-5">
                            <a href="#" deactivate class="text-center underline text-white font-mono font-medium leading-6 text-[14px] cursor-pointer">Forgot password ?</a>
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
import { ref, watch } from "vue"
import { VBtn } from 'vuetify/lib/components/index.mjs';
import { VProgressCircular } from 'vuetify/lib/components/index.mjs';
import Eye from "vue-material-design-icons/Eye.vue"
import EyeArrowLeft from "vue-material-design-icons/EyeOff.vue"

import store from "../store";
import { useRouter } from 'vue-router';
const visible = ref(false)
const isLoading = ref(false)
const loginData = ref({ email: '', password: '' });
const email = ref('');
const router = useRouter();
const errors = ref({});
const authErrors = ref('');
const changePasswordVisibility =()=>{
    visible.value = !visible.value
    console.log("This is the visibility", visible.value);
}

const validateForm = () => {
    errors.value.email = "";


  if (!loginData.value.email) {
    errors.value.email = 'Email is required.';
    return false;
  } else if (!/\S+@\S+\.\S+/.test(loginData.value.email)) {
    errors.value.email = 'Email must be valid.';
    return false;
  }
 
  else{
    return true;
  }
};


const validatePassword = () => {
  errors.value.password = "";


  
  if (!loginData.value.password){
    errors.value.password = 'Password is required.';
    return false;
  }
  if (loginData.value.password.length<8){
    errors.value.password = 'Password must be longuer than 8 characters.';
    return false;
  }
  else{
    return true;
  }
};

const onloginUser = async () => {
    authErrors.value =""
  try {
    isLoading.value= true
   // Validate the form
   const isValidEmail = validateForm();
   const isValidPassword= validatePassword();
    if (isValidEmail==false || isValidPassword ==false) {
        isLoading.value=false
      return; // Stop execution and wait for user correction
    }
    const loginStatus = await store.dispatch('loginUser', loginData.value);

    console.log("Voivi le message chers amis ", loginStatus);
    
    if (loginStatus) {
      // Redirect to dashboard or any other route on successful login
      isLoading.value=false
        authErrors.value =""
      router.push('/csirthome');
    } else {
        authErrors.value="Unable to authentificate with provided credentials." 
        isLoading.value=false
        // Handle unsuccessful login (show error message, etc.)
    }
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error (show error message, retry login, etc.)
  }
};


// Watch the email field for changes
watch(() => loginData.value.email, () => {
      validateForm();
    });

    // Watch the password field for changes
    watch(() => loginData.value.password, () => {
      validatePassword();
    });
</script>

<style scoped>
.bg-image {
    background-image: url('../assets/images/back_new.svg'); 
   background-color:#264ECA;
    background-blend-mode: multiply, screen, darken;
  

} 

.v-text-field--outlined :deep(fieldset) {
    outline-color: rgb(168, 85, 247, 1) !important;
    background: rgb(168, 85, 247, 1);
}

.spnLogin{
    text-transform: none;
   
}
.btnColor{
    background: white;
    color: #244BC5;
    width: 100%;
}
input:focus{
    border-color: none;
}
input{
 
    border-color: white!important;
    border:1px solid white;
}
input:valid {
    animation : shake .3s;
  background: none!important;
  border-color: white;
  /* Change to your desired background color */
}
input:invalid{
    animation : shake .4s;
}
.input-error, .password-error {
  border-color: red!important;
  outline: none;
 
 
}

@keyframes shake {
    0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
        
    
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  animation : shake .4s;
}
</style>
