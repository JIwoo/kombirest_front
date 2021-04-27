<template>
    <div>
        <ItemDetail v-if="_state.detailBool" :detailBool="detailBool" v-bind:parentIdx="parentIdx" class="detail_popup"/>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import ItemDetail from '@/components/ItemDetail.vue'
    export default {
        name: 'DetailPopup',
        props: ['parentIdx'],
        components: {
            ItemDetail
        },
        data() {
            return {

            }
        },
        mounted() {
           
        },
        computed: {
            ...mapState(['_state'])
        }
    }
</script>
<style>
    .img_slider::-webkit-scrollbar {
        width: 10px;
        display: none;
    }
    .detail_popup {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.6);
        padding: 107px 0 66px;
        z-index: 1;
    }
    .detail_popup .detail_contents {
        width: 982px;
    }
</style>