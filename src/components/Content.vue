<template>
    <div>
        <div class="row">
            <div class="col-xs-6">
                <app-chat></app-chat>
            </div>
            <div class="col-xs-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Active Users</div>
                    <div class="panel-body">
                        <ul class="form-control contentList">
                            <li v-for='(x,index) in userArray' @mouseover='tellMap({key:x.key,lat:x.lat, long:x.long})' :id='x.user' @mouseleave='leaveMap(x.key)'>
                                {{x.user}} is currently {{x.status}} 
                            </li>
                        </ul> 
                    </div>
                </div>
                <app-map></app-map>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import Chat from './Chat.vue';
    import MapVue from './Map.vue';
    export default {
        computed:{
            ...mapGetters([
                'userArray'
            ])
        },
        data() {
            return {
        
            }
        },
        methods:{
        ...mapMutations([
            'tellMap','leaveMap'])
        },
        components:{
            'app-chat':Chat,
            'app-map':MapVue
        }
    }
</script>

<style scoped>
    ul,
    li {
        list-style: none;
    }
    ul{
        height:100%;
    }
    li{
        margin:1% 0;
        cursor:pointer;
    }
    li:hover{
        cursor:pointer;
    }
    span{
        color:lightgrey;
        opacity:0.8;
          cursor:pointer;
    }
</style>
