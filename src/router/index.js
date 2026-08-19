import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Welcome from '../views/Welcome.vue'

import store from "../store";




  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
routes:[
  
    // Root now lands on the home page (Welcome / map). Since Welcome is
    // publicly accessible in guest mode — full details unlock via the
    // in-tab login — no auth guard is needed to reach it.
    {
      path: '/',
      redirect: '/csirthome',
    },
    // Standalone login page kept for direct navigation (bookmarks, deep
    // links). The inline login inside Welcome's tab is the primary path.
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: 'Login' },
    },
    // Home page — public. Guest mode shows the map with limited details;
    // the inline login tab unlocks descriptions and expandable panels.
    // The previous beforeEnter guard was removed on purpose: with the '/'
    // redirect above, keeping it would cause an infinite redirect loop
    // for guests (/ → /csirthome → / → …).
    {
      path: '/csirthome',
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
