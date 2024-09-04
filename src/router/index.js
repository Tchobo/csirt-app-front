import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Welcome from '../views/Welcome.vue'

import store from "../store";




  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
routes:[
  
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        title:"Login"
      }     
    },
    {
      
      path: '/csirt-home',
      beforeEnter:(to, from, next) =>{
        localStorage.getItem('token') ? next() : next('/')
      },   
      children:[
        {
        path:'',
        component:Welcome,
        name:'Home',
        meta:{
          title:"Home"
        }    
        },
       

         

       
      ],
    },
  ]

})
   
  



router.beforeEach((to, from, next)=>{
  document.title = `${to.params.slug ? to.params.slug: to.meta.title} | CSIRT - Africa`;
  next();
});
  

export default router
