import { createRouter, createWebHistory } from 'vue-router'
import AppTasks from '../views/AppTasks'
import AppNew from '../views/AppNew'
import AppTask from '../views/AppTask'

const routes = [
  {
    path: '/',
    component: AppTasks
  },
  {
    path: '/new',
    component: AppNew
  },
  {
    path: '/task/:id',
    props: true,
    component: AppTask
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
