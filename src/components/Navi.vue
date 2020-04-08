<template>
  <div id="nav" v-if="this.$store.state.user">
    <div id="nav-item">
          <router-link to="/">Home</router-link> |
          <router-link to="/chat">chat</router-link>
    </div>
    <div id="nav-item-signout">
      <amplify-sign-out></amplify-sign-out>
    </div>
      <!-- <el-row >
        <el-col :span=16 >
        </el-col>
        <el-col :span=8>
          <amplify-sign-out></amplify-sign-out>
        </el-col>
      </el-row> -->
  </div>
</template>
<style scoped>
#nav{
  display: table;
  width: 100%;
}
#nav-item{
  display: table-cell;
  vertical-align: middle;
  text-align: left;
}
#nav-item-signout{
  display: table-cell;
  text-align: right;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* .el-row {
  margin: auto;
}
.el-col {
  text-align: center;
} */
</style>>