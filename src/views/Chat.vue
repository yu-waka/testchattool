<template>
  <div class="main-contents">
    <div class="message_base">
      <div v-for="message in messages" :key="message.id">
        <div v-bind:class="[ message.owner === getUserName ? 'message' : 'message_opponent' ]">
          {{message.message}}
        </div>
        <div v-bind:class="[ message.owner === getUserName ? 'username' : 'username_opponent' ]">
          {{message.owner}}
        </div>
      </div>
    </div>
    <el-input placehoder="メッセージを入力" v-model="message" @keydown.enter.native="sendMessage"></el-input>
    <div class="error">
      {{error}}
    </div>
  </div>
</template>


<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { createMessage } from '../graphql/mutations'
import { listMessages } from '../graphql/queries'
import { onCreateMessageByRoomId } from '../graphql/subscriptions'

export default {
  name:'Chat',
  //ルート変更の監視
  //roomIdが切り替わる場合、messageの読み込みを行う
  beforeRouteUpdate(to,from,next){
    // console.log('beforeRouteUpdate')
    if(to.path !== from.path){
      this.messages = []
      this.roomId = to.params.id
      this.subscription.unsubscribe()
      this.fetch()
      this.subscribe()
    }
    next()
  },
  //変数定義
  data(){
    return{
      username:'',
      roomId:'',
      messages:[],
      message:'',
      subscription: {},
      error: ''
    }
  },
  computed:{
    getUserName(){
      return this.$store.getters.getUserName
    }
  },
  methods:{
    //メッセージの送信
    sendMessage(){
      if(event.keyCode !== 13) return
      if(this.messages === "") return
        const param = {
          id: new Date().getTime() + this.$store.getters.getUserName,
          roomId:this.roomId,
          message:this.message,
          owner: this.$store.getters.getUserName
        }
        
        API.graphql(graphqlOperation(createMessage,{input:param}))
        .catch(error => this.error = JSON.stringfy(error))
        this.message = ''
    },
    //メッセージの取得
    fetch(){
      const filter = {
        roomId: {
          eq:this.roomId
        }
      }
      API.graphql(graphqlOperation(listMessages,{filter:filter,limit:100}))
      .then(messages => this.messages = messages.data.listMessages.items.sort((a,b) => a.id > b.id ? 1 : -1))
      .catch(error => this.error = JSON.stringify(error))
    },
    //サブスクライブ
    subscribe(){
      this.subscription = API.graphql(graphqlOperation(onCreateMessageByRoomId,{roomId: this.roomId}))
      .subscribe({
        next: (eventData) => {
          console.log(eventData)
          const message = eventData.value.data.onCreateMessageByRoomID
          this.messages.push(message)
        }
      })
      
    },
    scrollBottom(){
      const container = this.$el.querySelector(".message_base")
      container.scrollTop = container.scrollHeight
    }
  },
  async created(){
    this.roomId = this.$route.params.id
    this.fetch()
    this.subscribe()
  },
  //view破棄時、サブスクリプションを開放する
  beforeDestroy(){
    // console.log('before Destroy')
    this.subscription.unsubscribe()
  },
  updated: function(){
    this.scrollBottom()
  }
}
</script>

<style src="../assets/chat.css" />