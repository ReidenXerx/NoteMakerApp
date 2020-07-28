import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import('../views/MainLayout.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../views/EditNoteLayout.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
