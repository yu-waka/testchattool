<template>
  <div class="main-contents">
    <!-- value is {{ $route.params.id }}  -->
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
    {{error}}
    <el-input placehoder="メッセージを入力" v-model="message" @keydown.enter.native="sendMessage"></el-input>
  </div>
</template>


<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { createMessage } from '../graphql/mutations'
import { listMessages } from '../graphql/queries'
import { onCreateMessage } from '../graphql/subscriptions'

export default {
  name:'Chat',
  data(){
    return{
      username:'',
      roomId:'',
      messages:[{id:'0',message:'test',owner:'testuser'}],
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
    sendMessage(){
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
    fetch(){
      const filter = {
        roomId: {
          eq:this.roomId
        }
      }
      console.log(filter)
      API.graphql(graphqlOperation(listMessages,{filter:filter,limit:100}))
      .then(messages => this.messages = messages.data.listMessages.items.sort((a,b) => a.id > b.id ? 1 : -1))
      .catch(error => this.error = JSON.stringify(error))
    },
    subscribe(){
      this.subscription = API.graphql(graphqlOperation(onCreateMessage))
      .subscribe({
        next: (eventData) => {
          const message = eventData.value.data.onCreateMessage
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
    console.log(this.roomId)
    this.fetch()
    this.subscribe()
  },
  beforeDestroy(){
    this.subscription.unsbscribe()
  },
  updated: function(){
    this.scrollBottom()
  }
}
</script>

<style>

</style>