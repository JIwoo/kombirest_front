<template>
  <div>
    <Header/>
    <router-view class="inner_wrap" :key="$route.fullPath"/>
     <LoadingOverlay v-if="_state.loadingBool"/>
    <Footer v-if="!this.$store.state._state.introBool"/>    
    <Alert v-if="_modal.modalState" />
  </div>
</template>
<script>
require('@/assets/css/style.css')
    import Header from '@/components/Common/Header.vue'
    import { mapState } from 'vuex';
    import Alert from '@/components/Common/Alert.vue'
    import Footer from '@/components/Common/Footer.vue'
    import LoadingOverlay from '@/components/Common/LoadingOverlay.vue'

    export default {
        name: 'App',
        components: {
        Header,
        Footer,
        LoadingOverlay,
        Alert
        },
        watch: {
            $route(to, from) {
                if(to.path !== from.path && to.path !== '/Post/Detail') {
                    this.$store.state.detailBool = false
                }
            }
        },
        data () {
            return {
            }
        },
        created() {
            if (localStorage.accessToken) {                
                this.$store.state._state.loginState = true
            }
            if (localStorage.profile) {
                this.$store.state._type.profile = localStorage.profile
            }
        },
        computed: {
            ...mapState(['_state', '_modal'])
        },
    }
</script>
