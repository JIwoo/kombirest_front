<template>
<div>
    <Intro v-if="_state.introBool"/>
    <div>        
        <div id="columns">
            <Card ref="product" />
            <AddPost />
        </div>
    </div>
    <!-- S : 게시물 없음 -->
    <!-- <div class="listNonePage">
        <p>게시물이 없습니다<br>더 많은 사람들을 팔로우해보세요!</p>
    </div> -->
    <!-- E : 게시물 없음 -->
</div>
</template>
<script>
    require('@/assets/css/feed.css')
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { axiosCall } from '@/mixins/call.js'
    import { mainArea } from '@/mixins/main.js'
    import Card from '@/views/ProductList.vue'     
    import AddPost from '@/components/AddPost.vue'
    import Intro from '@/components/Account/Intro.vue'
    export default {
        name: 'Hot',
        components: {
            AddPost,
            Card,
            Intro
        },
        data () {
            return {
                lastIndex: this.$store.state._page.productSize,
                area: {
                    width: 0,
                    left: 0,
                    right: 0
                }
            }
        },
        beforeCreate() {
            this.$store.state._state.lastIndexBool = true
            document.querySelector('body').style.height = 100 + "%";
            document.querySelector('body').style.minHeight = 100 + "%";
            document.querySelector('body').style.overflow = "hidden";
            document.querySelector('body').style.touchAction = "none"
        },
        created() {
            this._type.headerSelected = 'HOT'
            this.$store.state._page.product = 1
            window.addEventListener('scroll', this.fnIfinityScroll);
        },
        beforeUnmount() {
            window.removeEventListener('scroll', this.fnIfinityScroll)
            this.fnArea('columns', 1024, false)
        },
        computed: {
            ...mapState(['detailBool', '_items', '_page', '_state','_type'])
        },
        mounted() {
            var filter = "win16|win32|win64|mac";
            if (navigator.platform) {
                if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
                    location.href = ''
                }
            }
            this.fnArea('columns', 58.4, true)
            let params = [{
                base: {
                    action: "acCallGet",
                    url: "/api/product",
                    vue_callback: this.$refs.product.fnlistInitComplete,
                    callback: "setHotList"
                },
                request: {
                    Type: "choice",
                    Text: "",
                    Page: this._page.product,
                    PageSize: this._page.productSize
                }
            }]
            this.$refs.product.fnInit(params)
        },
        methods: {
            ...mapActions([
                'acloginState',
                'acloadingState'
            ]),
            fnIfinityScroll() {                
                let params = [{
                    base: {
                        action: "acCallGet",
                        url: "/api/product",
                        vue_callback: this.$refs.product.fnlistComplete,
                        callback: "setHotList"
                    },
                    request: {
                        Type: "choice",
                        Text: "",
                        Page: this._page.product,
                        PageSize: this._page.productSize
                    }
                }]
                this.$refs.product.fnIfinityScroll(params)
            }
        },
        mixins: [axiosCall, mainArea] 
    }
</script>
