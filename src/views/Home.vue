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
    <div class="error"> {{this.error}}</div>
  </div>
</template>
<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { createChatroom } from '../graphql/mutations'

export default {
  name:'Home',
  data(){
    return{
      username:'',
      roomName: '',
      error: ''
    }
  },
  computed:{
    getUserName(){
      return this.$store.getters.getUserName
    }
  },
  methods:{
    async created(){
      this.username = this.$store.getters.getUserName
    },
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
    }
  }
}
</script>>