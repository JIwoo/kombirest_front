<template>
    <div>
        <ItemDetail :detailBool="detailBool" v-bind:parentIdx="idx"  class="detail_page"/>
    </div>
</template>
<script>
    import ItemDetail from '@/components/ItemDetail.vue'
    export default {
        name: 'DetailPage',
        components: {
            ItemDetail
        },
        data() {
            return {
                //idx: this.$route.query.idx,
                idx: this.$route.params.idx
            }
        },
        created() {
        },
        mounted() {            
        }
}
</script>
<style>
    .detail_page {
        height:800px;
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
        margin-top: 20px;
    }
    .detail_page .close {
        display: none;
    }
    .img_slider::-webkit-scrollbar {        
        display: none;
    }
    .right_con::-webkit-scrollbar {
        display: none;
    }

</style>