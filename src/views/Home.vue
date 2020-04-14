<template>
  <div class="home">
    <el-row >
      <el-col :span="18">
        welcom {{getUserName}}
      </el-col>
      <el-col :span="6">
            <el-input placeholder="create room" v-model="roomName" @keydown.enter.native="createRoom"></el-input>
      </el-col>
    </el-row>
    <div class="roomlist_base">
      <div v-for="room in rooms" :key="room.id">
        {{room.name}}
      </div>
    </div>
    <div class="error"> {{this.error}}</div>
  </div>
</template>
<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { createChatroom } from '../graphql/mutations'
import { listChatrooms } from '../graphql/queries'
import { onCreateChatroom } from '../graphql/subscriptions'

export default {
  name:'Home',
  data(){
    return{
      username:'',
      roomName: '',
      rooms:[],
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
    //ルーム作成
    createRoom(){
      if (event.keyCode !== 13) return
      const param = {
        name : this.roomName,
        owner : this.$store.getters.getUserName
      }
      console.log(param)
      API.graphql(graphqlOperation(createChatroom,{input:param}))
      .catch(error => this.error = JSON.stringify(error))
      this.roomName = ""
    },
    //レコード一覧の取得
    fetch(){
      API.graphql(graphqlOperation(listChatrooms,{limit: 100}))
      .then(rooms => this.rooms =rooms.data.listChatrooms.items)
      .catch(error => this.error = JSON.stringify(error))
    },
    //サブスクライブ
    subscribe(){
    this.subscription = API.graphql(graphqlOperation(onCreateChatroom))
      .subscribe({
        next: (eventData) => {
          const room = eventData.value.data.onCreateChatroom
          this.rooms.push(room)
        }
      })
    }
  },
  async created(){
    this.fetch()
    this.subscribe()
  },
  beforeDestoroy(){
    this.subscription.unsubscribe()
  }
}
</script>>