<template>
    <div>
        <div class="panel panel-success">
            <div class="panel-heading">Live Chat</div>
            <div class="panel-body">
                <ul id='chat'>
                    <li v-for='x in getChat'>
                        <span>{{x.name}}</span> {{x.content}}
                    </li>
                </ul>
            </div>
            <div class="panel-footer">
                <input type="text" class="form-control" placeholder="Text input" v-model='chatInput'>
                <button class='btn btn-success' @click.enter.prevent='chatGetStarted(chatInput)'>Enter</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'getChat'
            ]),
            chatInput: {
                get() {
                    return this.$store.getters.chatInput
                },
                set(value) {
                    this.$store.commit('updateChatInput', value)
                }
            }
        },
        methods: {
            ...mapMutations([
                'chatGetStarted'
            ])
        }
    }
</script>

<style scoped>
    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .panel-body {
        min-height: 400px;
        position: relative;
    }
    
    #chat {
        position: absolute;
        height:390px;
        bottom: 10px;
        left: 10px;
        overflow-y:scroll;
        width:98%;
    }
    
    li {
        margin: 2% 0;
    }
    
    .panel-footer {
        background: none !important;
        display: flex !important;
    }
    
    .panel-footer input {
        align-items: stretch !important;
    }
    
    span {
        color: lightgrey;
        opacity: 0.8;
    }
</style>
