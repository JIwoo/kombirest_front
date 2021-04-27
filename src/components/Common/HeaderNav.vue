<template>
    <div class="product_sort">
        <!--<router-link :to="item.link">-->
            <button type="button" v-for="(item, idx) in navList" :key="idx" :class="{active: item.text == _type.headerSelected}" @click="fnNav(item.text)">
                {{ item.text }}
            </button>
            <button type="button" class="btn_category" @click="fnviewCatePop">관심 카테고리 설정 팝업 열기</button>
            <categoryPopup v-if="catePopupBool" ref="category_popup"/>
        <!--</router-link>-->
    </div>
</template>
<script>
    import categoryPopup from '@/components/Common/categoryPopup.vue'
    import { mapState } from 'vuex'
    export default {
        name: 'HeaderNav',
        components: {
            categoryPopup
        },
        data() {
            return {
                navList: [
                    {
                        link: '/Hot',
                        text: 'HOT'
                    },
                    {
                        link: '/New',
                        text: 'NEW'
                    }
                ],
                selected: undefined,
                catePopupBool: false
            }
        },
        computed: {
            ...mapState(['_type'])
        },
        created() {
            this.selected = 'HOT'
        },
        methods: {
            fnNav(item) {
                this._type.headerSelected = item
                this.$router.push(item.toLowerCase())
            },
            fnviewCatePop() {
                console.log(this.$store.state._state.closeCateBool)
                this.catePopupBool = true
                this._state.closeCateBool = true
                //this.$store.state.closeCateBool = true
            },
        }
    }
</script>
<style scoped>
    li a {
        position: relative;
        font-weight: 500;
    }
    li a::after {
        position: absolute;
        left: -2px;
        bottom: -6px;
        width: calc(100% + 4px);
        height: 2px;
        display: block;
        content: '';
        background-color: #ff1658;
        transition: 0.3s;
        transform: scale(0);
    }
/*    .router-link-exact-active {
        color: #ff1658;
    }*/
    .router-link-exact-active::after {
        transform: scale(1);
    }
</style>