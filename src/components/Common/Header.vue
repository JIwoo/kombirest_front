<template>
    <header class="header " id="headNb">
        <!-- <div class="inner_wrap"> -->
            <HeaderSearch/>
            <!--<HeaderNav/>-->
        <!-- </div> -->
    </header>
</template>
<script>
    import HeaderSearch from '@/components/Common/HeaderSearch.vue'
    //import HeaderNav from '@/components/Common/HeaderNav.vue'
    export default {
        name: 'Header',
        components: {
            HeaderSearch,
            //HeaderNav
            },
        data() {
            return {
                
            }
        },
        watch: {
            '$store.state._state.introBool': function () {
                if (this.$store.state._state.introBool) {
                    const headerId = document.getElementById('headNb')
                    headerId.classList.add('bbNone')
                }
                else {
                    const headerId = document.getElementById('headNb')
                    headerId.classList.remove('bbNone')
                }
            }         
        },
        mounted() {
            if (this.$store.state._state.introBool) {
                const headerId = document.getElementById('headNb')
                headerId.classList.add('bbNone')
            }
        }
    }
</script>
