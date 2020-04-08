<template>
  <div class="home">
    welcom {{getUserName}}
  </div>
</template>
<script>
export default {
  computed:{
    getUserName(){
      return this.$store.getters.getUserName
    }
  }
}
</script>>