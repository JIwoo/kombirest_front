<template>
<div>
    <section class="list_wrap cf grid">
        <article v-for="(item, idx) in this._items.list" :key="idx" @click="fngetDetailView(item.prdIdx)" class="item">
            <div class="content">
                <div class="post_img">
                    <img :src="item.prdImg" alt="대표이미지" v-if="item.prdType == 'image/jpeg' || item.prdType == 'image/gif' || item.prdType == 'image/png'">
                    <video id="myVideo" :src="item.prdImg" v-else autoplay muted playsinline></video>
                    <div class="post_btn cf">
                        <div class="post_like">
                            <input :id="`itemLike${idx}`" type="checkbox">
                            <label :for="`itemLike${idx}`">{{item.choice}}</label>
                        </div>
                        <div class="post_reply">{{item.boardCount}}</div>
                    </div>
                </div>
                <div class="post_title">
                    <strong>{{item.prdNm}}</strong>
                </div>
            </div>
        </article>
    </section>
    <LoadingOverlay v-if="_state.footerloadingBool" />
    <DetailPopup v-bind:parentIdx="idx" />
</div>
</template>
<script>
    require('@/assets/css/feed.css')
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { axiosCall } from '@/mixins/call.js'
    import { mainArea } from '@/mixins/main.js'
    import DetailPopup from '@/components/DetailPopup.vue'
    import LoadingOverlay from '@/components/Common/LoadingOverlay.vue'
    export default {
        name: 'ProductList',
        components: {
            DetailPopup,
            LoadingOverlay
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
        created() {

        },
        computed: {
            ...mapState(['_items', '_page', '_state'])
        },
        beforeUnmount() {
            window.removeEventListener('scroll', this.fnIfinityScroll)
            this.fnArea('columns', 1024, false)
        },
        mounted() {

        },
        methods: {
            ...mapActions([
                'acloginState',
                'acloadingState',
                'acScrollState',
                'acfooterloadingState'
            ]),
            fnInit(params) {
                this._items.list = []                
                if (!this._state.loadingBool) {
                    this.acloadingState(true)
                    this.fnCall(params)
                }                 
            },
            fngetDetailView(idx) {
                this._state.detailBool = true
                this.idx = idx
            },
            fnlistInitComplete() {
                this.acfooterloadingState(false)
                this.fnResizeInit()
            },
            fnlistComplete() {
                this.acfooterloadingState(false)
                this.fnResize()
            },
            fnResizeItem(item) {
                const grid = document.getElementsByClassName("grid")[0];
                const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
                const rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (20 + rowGap));
                item.style.gridRowEnd = "span " + rowSpan;
            },
            async fnResize() {
                const timer = ms => new Promise(res => setTimeout(res, ms))
                let i = 0, bool = false
                while (i < 30) {
                    await timer(1000);
                    bool = this._items.list?.length > 0 ? true : false
                    if (bool) {
                        const item = document.getElementsByClassName("item")
                        const count = item.length
                        for (let x = 0; x < count; x++) {

                            this.fnResizeItem(item[x]);
                        }
                    }
                    i = bool ? 30 : i
                    i++;
                }
                this.acScrollState(false)
            },
            async fnResizeInit() {
                const timer = ms => new Promise(res => setTimeout(res, ms))
                let i = 0, bool = false
                while (i < 30) {
                    await timer(1000);
                    bool = this._items.list?.length > 0 ? true : false
                    if (bool) {
                        const item = document.getElementsByClassName("item")
                        const count = item.length
                        for (let x = 0; x < count; x++) {

                            this.fnResizeItem(item[x]);
                        }
                    }
                    i = bool ? 30 : i
                    i++;
                }
                setTimeout(() => {
                    this.$store.state._state.introBool = false
                    document.querySelector('body').style.height = "unset"
                    document.querySelector('body').style.minHeight = "unset"
                    document.querySelector('body').style.overflow = "unset"
                    document.querySelector('body').style.touchAction = "unset"
                }, 3000)    
                this.acScrollState(false)
            },
            fnIfinityScroll(params) {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    console.log('scroll', this.$store.state._page.product, this.$store.state._page.productSize)
                    if (this._state.lastIndexBool && !this._state.listScrollBool) {
                        this.acScrollState(true)
                        this.acfooterloadingState(true)
                        this.fnCall(params)
                    }
                }
            }
        },
        mixins: [axiosCall, mainArea]
    }
</script>
<style scoped>
    .grid {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
        grid-template-rows: masonry;
    }
</style>

