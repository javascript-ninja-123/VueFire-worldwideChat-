<template>
  <div>
    <div class='container'>
      <div class="row">
        <div class="col-xs-12">
          <h1>{{title}}</h1>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
 
  export default {
    data() {
      return {
        title: this.$store.state.title
      }
    }
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
