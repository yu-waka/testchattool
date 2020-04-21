import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
//
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'

import {Auth} from 'aws-amplify'
import {AmplifyEventBus} from 'aws-amplify-vue'

//VueRputerの登録
Vue.use(VueRouter)

let user = null
//処理定義
getUser().then((user) => {
  if(user) {
      router.push({path: '/'})
  }
})
function getUser(){
   return Auth.currentAuthenticatedUser().then((data) =>{
    store.commit('setUser',data)
    return data
   }).catch(() =>{
     store.commit('setUser',null)
     return null
   })
}
AmplifyEventBus.$on('authState', async info => {
  if(info === 'signedIn'){
    router.push({path:'/'})
  }else{
    store.commit('setUser',null)
    router.push({path:'/login'})
  }
})
//ルーター定義
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true}
  },
  {
    path: '/chat/:id',
    name: 'chat',
    component: Chat,
    meta: { requiresAuth: true}
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve(async(to,from,next)=>{
  //ルート先のメタ情報に認証要求がある場合、ユーザー認証情報を確認、未認証の場合、サインイン画面にリダイレクト
  if(to.matched.some(record => record.meta.requiresAuth)){
    user = await getUser();
    if(user === null){
      return next(
        { path:'/login' }
      )
    }
    return next()
  }
  return next()
})
export default router
