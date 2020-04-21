<template>
  <div class="home">
    welcom {{getUserName}}
  </div>
</template>
<script>
export default {
  name:'Home',
  computed:{
    getUserName(){
      return this.$store.getters.getUserName
    }
  },
}
</script>>