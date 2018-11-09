import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/details_page',
    name: 'details_page',
    meta: {
      access:["admin"],
      title:'查看进货表明细',
      hideInMenu: true
    },
    component: () => import('@/view/components/tables/group_detailstables.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/people_manage',
    name: 'people_manage',
    meta: {
      icon: 'ios-people',
      access:["super_admin","admin"],
      title:'人员管理'
    },
    component: Main,
    children: [
      {
        path: 'user_page',
        name: 'user_page',
        meta: {
          icon: 'md-person',
          access:["super_admin"],
          title:'管理员管理'
        },
        component: () => import('@/view/components/tables/usertables.vue')
      },
      {
        path: 'customer_page',
        name: 'customer_page',
        meta: {
          icon: 'md-contacts',
          title:'用户管理'
        },
        component: () => import('@/view/components/tables/customertables.vue')
      },
      {
        path: 'access_page',
        name: 'access_page',
        meta: {
          icon: 'md-contact',
          title:'权限管理',
          access:["super_admin"]
        },
        component: () => import('@/view/components/tables/accesstables.vue')
      }
    ]
  },
  {
    path: '/store_manage',
    name: 'store_manage',
    meta: {
      icon: 'ios-home',
      access:["super_admin","admin"],
      title:'仓库管理'
    },
    component: Main,
    children: [
      {
        path: 'store_page',
        name: 'store_page',
        meta: {
          icon: 'md-search',
          access:["super_admin"],
          title:'仓库查询'
        },
        component: () => import('@/view/components/tables/storetables.vue')
      },
      {
        path: 'storemanage_page',
        name: 'storemanage_page',
        meta: {
          icon: 'md-home',
          access:["admin"],
          title:'仓库管理'
        },
        component: () => import('@/view/components/tables/storemanagetables.vue')
      },
    ]
  },
  {
    path: '/product_manage',
    name: 'product_manage',
    meta: {
      icon: 'md-apps',
      access:["super_admin","admin"],
      title:'货物管理'
    },
    component: Main,
    children: [
      {
        path: 'product_page',
        name: 'product_page',
        meta: {
          icon: 'md-apps',
          title:'货物信息'
        },
        component: () => import('@/view/components/tables/producttables.vue')
      },
      {
        path: 'import_page',
        name: 'import_page',
        meta: {
          icon: 'md-add',
          access:["admin"],
          title:'新建进货单'
        },
        component: () => import('@/view/components/tables/importtables.vue')
      },
      {
        path: 'shelve_page',
        name: 'shelve_page',
        meta: {
          icon: 'md-arrow-dropup-circle',
          access:["admin"],
          title:'上架'
        },
        component: () => import('@/view/components/tables/shelvetables.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
