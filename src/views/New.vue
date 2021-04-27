<template>
    <div id="columns">
        <Product ref="product"/>
        <AddPost />
    </div>
</template>
<script>
    require('@/assets/css/feed.css')
    import { mapState } from 'vuex'    
    import { mapActions } from 'vuex'
    import { axiosCall } from '@/mixins/call.js'
    import { mainArea } from '@/mixins/main.js'
    import Product from '@/views/ProductList.vue'      
    import AddPost from '@/components/AddPost.vue'     
    export default {
        name: 'New',
        components: {
            AddPost,
            Product
        },
        data() {
            return {
                idx: 0,
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
            this.$store.state._page.product = 1            
        },
        beforeUnmount() {
            window.removeEventListener('scroll', this.fnIfinityScroll)
            this.fnArea('columns', 1024, false)
        },
        created() {
            this._type.headerSelected = 'NEW'
            this.$store.state._page.product = 1
            window.addEventListener('scroll', this.fnIfinityScroll);
        },
        computed: {
            ...mapState(['_items','_page','_state', '_type'])
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
                    callback: "setNewList"
                },
                request: {
                    Type: "new",
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
                        callback: "setNewList"
                    },
                    request: {
                        Type: "new",
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
