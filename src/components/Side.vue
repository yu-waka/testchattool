<template>
  <div id="side" v-if="this.$store.state.user">
    <div class="roomlist_base">
      <div v-for="room in rooms" :key="room.id">
        <router-link :to="{name: 'chat',params:{id:room.id} }">{{room.name}}</router-link>
      </div>
    </div>
    <div class="creatRoom">   
      <el-button type="text" @click="open">
        CreateRoom
      </el-button>
    </div>
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
      const param = {
        name : this.roomName,
        owner : this.$store.getters.getUserName
      }

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
    },
    open(){
      this.$prompt('please input Create RoomName','CreateRoom',{
        confirmButtonText: 'Create',
        cancelButtonText: 'Cancel',
      }).then(({value})=> {
        this.roomName = value
        this.createRoom()
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: this.roomName
        // })
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
<style scoped>
.roomlist_base{
  padding-top: 5px;
}
.creatRoom{
    margin-top: 15px;
}
</style>