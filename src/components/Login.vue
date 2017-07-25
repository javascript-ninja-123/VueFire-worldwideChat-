<template>
    <div>
        <h1>{{welcome}}</h1>
        <form class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <input type="text" class="form-control" id="text" placeholder="name" v-model='loginName'>
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-12 text-center">
                    <button type="submit" class="btn btn-default" @click='getStarted(loginName)'>Enter</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
    export default {
        computed:{
            loginName:{
                get(){
                    return this.$store.getters.LoginName;
                },
                set(value){
                    this.$store.commit('updateLoginName',value)
                }
            }
        },
        data() {
            return {
                welcome:this.$store.state.welcome
            }
        },
        methods:{
            ...mapMutations([
                'getStarted'
            ])
        }
    }
</script>

<style scoped>
    h1 {
        text-align: center;
        margin:3% 0;
    }
    .form-horizontal{
        margin-top:5%;
    }
    input{
        width:60%;
        margin:0 auto;
    }
</style>
