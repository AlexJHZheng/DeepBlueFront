import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 路由配置
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: { title: '个人信息', requiresAuth: true }
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/admin/index.vue'),
        meta: { title: '系统管理', requiresAuth: true },
        children: [
          {
            path: 'role',
            name: 'Role',
            component: () => import('@/views/admin/role/index.vue'),
            meta: { title: '角色管理', requiresAuth: true }
          },
          {
            path: 'permission',
            name: 'Permission',
            component: () => import('@/views/admin/permission/index.vue'),
            meta: { title: '权限管理', requiresAuth: true }
          }
        ]
      },
      {
        path: 'ai',
        name: 'AI',
        component: () => import('@/views/ai/index.vue'),
        meta: { title: 'AI' }
      },
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: () => import('@/views/knowledge/index.vue'),
        meta: { title: '知识库' }
      },
      {
        path: 'workflow',
        name: 'Workflow',
        component: () => import('@/views/workflow/index.vue'),
        meta: { title: '工作流' }
      },
      {
        path: 'fengming',
        name: 'Fengming',
        component: () => import('@/views/fengming/index.vue'),
        meta: { title: '孚盟' }
      },
      {
        path: 'jdy',
        name: 'JDY',
        component: () => import('@/views/jdy/index.vue'),
        meta: { title: '简道云' }
      },
      {
        path: 'wecom',
        name: 'Wecom',
        component: () => import('@/views/wecom/index.vue'),
        meta: { title: '企业微信' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.token

  // 判断页面是否需要登录权限
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 需要登录权限
    if (!token) {
      // 未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 已登录
      if (!userStore.userInfo?.userId) {
        // 没有用户信息，获取用户信息
        try {
          await userStore.loadUserInfo()
          next()
        } catch (error) {
          // 获取用户信息失败，可能是token过期
          userStore.logout()
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      } else {
        next()
      }
    }
  } else {
    // 不需要登录权限
    if (to.path === '/login' && token) {
      // 已登录状态下访问登录页，重定向到首页
      next({ path: '/' })
    } else {
      next()
    }
  }
})

export default router 