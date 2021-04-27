<template>
<div>
    <div class="header_search cf">
        <h1 @click="fnNav">
            <img src="@/assets/images/logo_letter.png" alt="Kombirest">
            <!--<router-link to="/new"><img src="@/assets/images/logo_letter.png" alt="Kombirest"></router-link>-->
        </h1>
        <HeaderNav ref="headerNav"/>
        <div class="search_bar cf">
            <input type="text" placeholder="하고 싶은 활동을 검색해 보세요"  v-model="value" @keyup.enter="actSearch"/>
            <button type="button" class="search" @click="actSearch"></button>
        </div>
        <button type="button" :class="{active: showCate == true, btn_cate: true}" @click="showCate = !showCate">카테고리 열기/닫기</button>
        <div class="link user" v-if="_state.loginState">
            <ul class="cf">
                <li :class="{active:moreLinkToggle, more: true }">
                    <button type="button" @click="fnHeaderMoreLink()" class="btn_more">
                        <img v-if="_type.profile && _type.profile != 'null' && _type.profile != 'undefined'"  :src="_type.profile" alt="더보기">
                        <img v-else src="@/assets/images/header_user.png" alt="더보기">   
                    </button>
                    <div v-if="moreLinkToggle" class="dialog">
                        <ul>
                            <li @click="fnHeaderMoreLink('/Mypage/Post')">마이페이지</li>
                            <li @click="fnHeaderMoreLink('/Setting/Profile')">설정</li>
                            <li @click="fnLogout()">로그아웃</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 로그인/가입 -->
        <div class="login_join" v-else>
            <button type="button" class="active" @click="fnLogin">로그인/가입</button> <!-- 활성화 시에 class="active"-->
        </div>
        <Alert v-if="_state.alertBool" :context="alertMsg" />
    </div>

    <div class="hdSearchCate" v-if="showCate">
        <ul>
            <li><button type="button">여행</button></li>
            <li><button type="button" class="active">게임/취미</button></li>
            <li><button type="button">엔터테인먼트</button></li>
            <li><button type="button">동물</button></li>
            <li><button type="button">식물</button></li>
            <li><button type="button">스포츠/레저</button></li>
            <li><button type="button">뷰티/미용</button></li>
            <li><button type="button">요리</button></li>
            <li><button type="button">인테리어</button></li>
            <li><button type="button">남성패션</button></li>
            <li><button type="button">여성패션</button></li>
            <li><button type="button">육아</button></li>
        </ul>
    </div>
</div>
</template>
<script>
    import Alert from '@/components/Common/Alert.vue'
    import HeaderNav from '@/components/Common/HeaderNav.vue'
    import { alertBase } from '@/mixins/alert.js'
    import { axiosCall } from '@/mixins/call.js'
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    //import axios from 'axios'
    export default {
        name: 'HeaderSearch',
        components: {
            Alert,
            HeaderNav
        },
        data () {
            return {
                moreLinkToggle: false,
                value: '',
                alertMsg: '',
                link: {
                    new: false,
                    hot:false
                },
                profile: null,
                showCate: true
            }
        },
        create() {
            this.profile = localStorage.profile
            alert(this.profile)
        },
        computed: {
            ...mapState(['_state','_type'])
        },
        watch: {
            $route(to, from) {
                if(to.path !== from.path) {
                    this.moreLinkToggle = false
                }
            }
        },
        methods: {
            ...mapActions([
                'acloginState',
            ]),
            fnHeaderMoreLink (link) {
                this.moreLinkToggle = !this.moreLinkToggle
                if(link !== undefined) this.$router.push(link)
            },
            fnNav() {
                this._type.headerSelected = 'NEW'
                this.$router.push("/new")
            },
            actSearch() {
                if (!this.value) {               
                    this.message = "검색어를 입력해주세요."
                    this.$store.state._state.alertBool = true
                    return false;
                }
                this.$router.push({ path: '/Result', query: { search: this.value } })                
            },
            fnOpenAlert(msg) {
                this.alertMsg = msg
                this.$store.state._state.alertBool = true
            },
            fnLogin() {
                this.$router.push('/Login')         
            },
            fnLogout() {
                let params = [{
                    base: {
                        action: "acCallPost",
                        url: "/api/login/Logout",
                        vue_callback: this.fnLogoutComplete,
                        callback: "setLogOut"
                    },
                    request: ""
                }]
                this.fnCall(params)      
            },
            fnLogoutComplete(response) {
                const stateCode = response.code
                if (stateCode === 0) {
                    this.acloginState(false)
                    localStorage.clear()
                    this.$router.push('/Login')
                }
                else {
                    this.fnAlert(response.msg)
                }
            }
        },
        mixins: [axiosCall, alertBase]
}
</script>
