<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12" v-if='enter'>
            <app-login></app-login>
        </div>  
         <div class="col-xs-12" v-if='!enter'>
            <app-header></app-header>
        </div>  
         <div class="col-xs-12" v-if='!enter'>
            <app-content></app-content>
        </div>  
      </div>  
    </div>  
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import {mapGetters} from 'vuex';
export default {
  computed:{
        ...mapGetters([
                'enter'
            ]),
  },
  data () {
    return {
    }
  },
  components:{
    'app-login':Login,
    'app-header':Header,
    'app-content':Content
  }
}
</script>

<style>

</style>
