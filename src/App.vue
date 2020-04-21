<template>
  <div id="app">
    <el-row :guttter="20">
      <el-col :span="12" :offset="6">
        <el-container>
          <el-header>
            <navi/>
          </el-header>
          <el-container>
            <el-aside width="200px">
              <side/>
            </el-aside>
            <el-main>
            <router-view/>
          </el-main>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navi from './components/Navi'
import side from './components/Side'
export default {
  name:'App',
  components:{
    navi,
    side
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>