import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useStore } from '../stores/pinia/store'
import { StorageService } from '@/services/storage'

function guardMyroute(to, from, next) {
  const store = useStore()

  let isAuthenticated = store.isAuth;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (localStorage.getItem('LoggedUser'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }
}




const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      requireAuth: true,
      hideNavbar: true,

    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requireAuth: true,
      hideNavbar: true,
    }
  },

  {
    path: '/notes',
    name: 'Notes',
    component: () => import('../views/NotesView.vue'),
    meta: {
      requireAuth: true,
      hideNavbar: true,
    }
  },
  {
    path: '/notes/:_id',
    name: 'Note',
    component: () => import('../views/NoteView.vue'),
    meta: {
      requireAuth: true,
      hideNavbar: true,
    }
  },
  {
    path: '/notes/new',
    name: 'NewNote',
    component: () => import('../views/NewNoteView.vue'),
    meta: {
      requireAuth: true,
      hideNavbar: true,
    }
  },
  {
    path: '/notes/edit/:_id',
    name: 'EditNote',
    component: () => import('../views/EditNoteView.vue'),
    meta: {
      requireAuth: true,
      hideNavbar: true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      requireAuth: true,
      hideNavbar: true,
    }
  },





  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {

    }
    /* beforeEnter: (to, from, next) => {
       console.log("enter")
       next()
     }*/
  },
]





const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

})


/*
router.beforeEach(async (to, from, next) => {
  const store = useStore()

  if (to.name !== 'Login' && !store.isAuth) next({ name: 'Login',  })
  else next()
})
*/

/*
router.beforeEach(async (to, from, next) => {
  const store = useStore()
  //const token = localStorage.getItem("TOKEN")
  const token = await StorageService.getItem("TOKEN")
  const usr = await StorageService.getItem("USER")
  if (usr) {
    store.setUser(usr)
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.name !== 'Login' && !token) {
        store.setAuth(false)
        next({ name: 'Login', query: {redirect: to.fullPath} })

    } else {
      store.setAuth(Boolean(token))
      next()
    }
  }else{
    next()
  }
})
*/

router.beforeEach(async (to, from, next) => {
  const store = useStore()

  if (to.meta.requiresAuth) {
    //const token = localStorage.getItem("TOKEN")
    const token = await StorageService.getItem("TOKEN")
    const usr = await StorageService.getItem("USER")
    if (usr) {
      store.setUser(usr)
    }
    if (token) {
      store.setAuth(Boolean(token))
      next()
    } else {
      store.setAuth(false)
      next({ name: 'Login', })
    }
  } else {
    next()
  }

})


// resolve
/*
router.beforeResolve(async (to, from, next) => {
  const store = useStore()
  if (to.meta.requiresAuth) {
    //const token = localStorage.getItem("TOKEN")
    const token = await StorageService.getItem("TOKEN")
    const usr = await StorageService.getItem("USER")
    if (!token) {
      store.setAuth(false)
      next({ name: 'Login', })
    }

   // store.setUser(usr)

    if (token) {
      store.setAuth(Boolean(token))
      next()
    }
  }

})
*/


export default router


