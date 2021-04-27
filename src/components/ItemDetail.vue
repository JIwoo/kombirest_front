<template>
    <div>
        <div class="detail_contents" id="scrollDetailArea">
            <div class="cf">
                <div class="left_con">
                  <div class="progress-container">
                    <div class="progress-bar" :style="{ width: myWidth + '%' }"></div>
                  </div>
                    <div class="img_slider" id="imageBar" @scroll="fnScroll">
                        <div v-for="(item, idx) in _items.detail.options" :key="idx">
                            <img :src="item.imgPath" v-if="item.imgType == 'image/jpeg' || item.imgType == 'image/gif' || item.imgType == 'image/png'" alt="" style="width:100%" />
                            <video v-else :src="item.imgPath" style="width:100%" controls autoplay muted="muted" playsinline></video>
                        </div>
                    </div>
                    <div class="cover-bar"></div>
                </div>
                <div class="right_con">
                    <div class="right_top" id="scrollArea">
                        <div class="title">
                            <h2>{{_items.detail.product?.prdNm}}</h2>
                            <p v-if="_items.detail.activity">{{_items.detail.activity[0].actNm}}</p>
                        </div>
                        <div class="keyword_list">
                            <p>등록된 키워드 <strong>{{_count.itemCount}}</strong>/20</p>
                            <ul class="cf">
                                <li v-for="(item, idx) in _items.detail.items" :key="idx" :class="{link:item.pageUrl}"
                                    @click="fnItemClick"
                                    @mouseover="fnItemOver($event,idx)"
                                    @mouseout="fnItemOut(idx)"
                                    :data-url="item.pageUrl"
                                    :data-model="item.model">
                                    {{item.itemNm}}
                                    <div>
                                        <div v-if="item.temp" class="keyword_pop">
                                            <p><strong>상품명:</strong> {{link.model}}</p>
                                            <p><strong>URL:</strong> {{link.url}}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="scroll_area" :style="{ height: scrollHeight + 'px' }" @scroll="fnBoardScroll">
                        <div class="writer_info">
                            <div class="user_info cf">
                                <div class="user cf">
                                    <div class="profile">
                                        <img v-if="_items.detail.product?.profile" :src="_items.detail.product.profile" alt="" />
                                        <img v-else src="@/assets/images/set_user_profile.png" alt="" />
                                    </div>
                                    <span @click="fnMove(_items.detail.product?.nickNm)">{{_items.detail.product?.nickNm}}</span>
                                    <button type="button" class="btn_follow" @click="fnFollow(_items.detail.product.nickNm)">
                                        <!--20201226 팔로우한 게시물등록자 분기처리-->
                                        <img v-if="_items.detail.product?.followState" src="@/assets/images/icon_following.png" alt="">
                                        <img v-else src="@/assets/images/icon_follow.png" alt="">
                                    </button>
                                </div>
                                <div class="user_more">
                                    <button type="button" @click="fntoggleBool">
                                        <img src="@/assets/images/icon_more.png" alt="" />
                                    </button>
                                    <ul v-if="moreBool">
                                        <li @click="fnclipBoard" class="btn_copy">링크복사</li>
                                        <li @click="fnReport" class="btn_report">신고하기</li>
                                    </ul>
                                </div>
                                <div class="btn_fav">
                                    <button type="button" :class="{active:_items.detail.product?.choiceState}" @click="fnProductChoice">{{_items.detail.product?.choice ?? 0}}</button>
                                </div>
                            </div>
                            <div class="text_info">
                                <!--{{_items.detail.product?.prdContent}}-->
                                <textarea id="contentValue" :value="_items.detail.product?.prdContent" class="detail_textarea" :style="{ height: contentHeight + 'px' }" disabled></textarea>
                            </div>                            
                        </div> 
                        <div class="reply">
                            <p>
                                댓글 ({{_count.boardCount}})
                            </p>
                            <ul>
                                <li class="cf" v-for="(item, idx) in _items.detail.board" :key="idx">
                                    <div class="user_profile">
                                        <img :src="item.profile" alt="" v-if="item.profile" />
                                        <img src="@/assets/images/set_user_profile.png" alt="" v-else />
                                    </div>
                                    <div class="text">
                                        <p class="text_info">
                                                <span class="nickname" @click="fnMove(item.memberNick)">{{item.memberNick}}</span>&nbsp;
                                                <span class="date">{{item.regDt}}</span>&nbsp;
                                                <span @click="fnSetReply" :data-nick="item.memberNick">답글</span>
                                                <button class="ml10" @click="fnBoardUpdate(item.boardIdx, item.contents, item.memberNick)" v-if="nickname == item.memberNick">수정</button>
                                                <button @click="fnBoardDelete(item.boardIdx)" v-if="nickname == item.memberNick" class="reply_del">삭제</button>
                                        </p>
                                        <p class="text_con">{{item.contents}}</p>
                                    </div>
                                </li>
                            </ul>
                            <LoadingOverlay v-if="_state.footerloadingBool" />
                        </div>
                    </div>
                    <div class="reply_input" v-if="boardState">
                        <input type="text" placeholder="댓글을 입력해보세요" v-model="boardTxt">
                        <button type="button" @click="fnBoardConfirm" class="btn_cert">입력</button>
                    </div>
                    <div class="reply_input" v-else-if="!boardState && !replyState">
                        <button type="button" class="btn_del" @click="fnBoardUpdateCancel"><img src="@/assets/images/icon_reply_del.png" alt="댓글취소"></button>
                        <input type="text" v-model="boardUpdateTxt">
                        <button type="button" @click="fnSetBoardUpdate" class="btn_cert">입력</button>
                    </div>
                    <div class="reply_input" v-if="replyState">
                        <button type="button" class="btn_del" @click="fnSetReplyCancel"><img src="@/assets/images/icon_reply_del.png" alt="답글취소"></button>
                        <input type="text" v-model="boardTxt">
                        <button type="button" @click="fnBoardConfirm" class="btn_cert">입력</button>
                    </div>
                </div>
            </div>
            <button type="button" class="close" @click="fnclosePopup">
                <img src="@/assets/images/icon_close_white.png" alt="">
            </button>            
        </div>        
        <Report v-if="_state.reportBool" v-bind:reportIdx="idx"/>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { axiosCall } from '@/mixins/call.js'
    import { alertBase } from '@/mixins/alert.js'
    import Report from '@/components/Common/Report.vue'
    import LoadingOverlay from '@/components/Common/LoadingOverlay.vue'
    export default {
        name: 'ItemDeail',
        components: {
            Report,
            LoadingOverlay
        },
        props: ['parentIdx'],
        data () {
            return {
                idx: this.parentIdx,
                boardState: true,
                boardDeleteBtn: false,
                moreBool: false,
                myWidth: 0,
                contentHeight: 0,
                scrollHeight: 0,
                baseHeight: 0,
                scrollMin: 63,
                alertMsg: "",
                boardTxt: "",
                boardUpdateTxt: "",
                boardUpdateIdx: 0,
                boardNick: '',
                replyNm: "",
                form: [],         
                page: this.$store.state._page.board,
                pageSize: this.$store.state._page.boardSize,
                nickname: localStorage.nickname,
                link: {
                    bool: false,
                    model: "",
                    url: ""
                }                
            }
        },
        beforeCreate() {
            document.querySelector('body').style.height = 100 + "%";
            document.querySelector('body').style.minHeight = 100 + "%";
            document.querySelector('body').style.overflow = "hidden";
            document.querySelector('body').style.touchAction = "none"
        },
        beforeUnmount() {
            document.querySelector('body').style.height = "unset"
            document.querySelector('body').style.minHeight = "unset"
            document.querySelector('body').style.overflow = "unset"
            document.querySelector('body').style.touchAction = "unset"
        },
        create() {            
            this.moreBool = false                  
        },
        mounted() {            
            var filter = "win16|win32|win64|mac";
            if (navigator.platform) {
                if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
                    location.href = this.idx
                }
            }
            if (this.idx > 0) {
                let params = [{
                    base: {
                        action: "acCallAuthGet",
                        url: "/api/product/detail",
                        vue_callback: this.fnContentSet,
                        callback: "setDetail"
                    },
                    request: {
                        Key: this.idx
                    }
                }]
                this.fnCall(params)
            }            
            this.fnPageSet()
        },
        computed: {
            ...mapState(['_items', '_count', '_state', '_page'])
        },
        //updated() {
        //    this.fnScrollHeight()
        //},
        methods: {
            ...mapActions([
                'acloginState',
                'acloadingState',
                'acChoiceState',
                'acfooterloadingState'
            ]),
            fnContentSet() {
                this.contentHeight = document.getElementById("contentValue").scrollHeight
                this.fnScrollHeight()
            },
            fnPageSet() {
                this._page.board = this._page.board + this._page.boardSize
            },
            fnScrollHeight() {
                const obj = document.getElementById("scrollArea");
                const area = document.getElementById("scrollDetailArea")
                this.scrollHeight = area.scrollHeight - obj.scrollHeight - this.scrollMin
                this.baseHeight = this.scrollHeight
            },
            fnclosePopup () {
                this._state.detailBool = false
                this.scrollHeight = 0
                this.baseHeight = 0
            },
            fntoggleBool () {
                this.moreBool = !this.moreBool
            },
            fnScroll() {
                let obj = document.getElementById("imageBar");
                let height = obj.scrollHeight - obj.offsetHeight;
                let width = (obj.scrollTop / height) * 100;
                if (width > 100) {
                    width = 100
                }
                this.myWidth = width;
            },
            fnItemClick(event) {
                if (event.target.dataset.url) {
                    if (event.target.dataset.url.indexOf('http') !== -1) {
                        window.open(`${event.target.dataset.url}`);
                    }
                    else {
                        window.open(`https://${event.target.dataset.url}`);
                    }
                }
            },
            fnItemOver(event, idx) {
                if (event.target.dataset.url) {                    
                    this.$store.state._items.detail.items[idx].temp = true
                    this.link.model = event.target.dataset.model
                    this.link.url = event.target.dataset.url
                    //this.scrollMin = 6
                    //this.scrollHeight = this.baseHeight
                }
            },
            fnItemOut(idx) {
                this.$store.state._items.detail.items[idx].temp = false
                this.scrollMin = 63
            },
            fnReport() {
                this.$store.state._state.reportBool = true
            },
            fnclipBoard() {                
                //const url = `${window.location.protocol}//${window.location.host}/Post/Detail?idx=${this.idx}`
                const url = `${window.location.protocol}//${window.location.host}/kombi/${this.idx}`
                const input = document.createElement('input');

                document.body.appendChild(input);
                input.value = url;
                input.select();

                document.execCommand('copy');
                document.body.removeChild(input);

                this.fnAlert("링크가 복사되었습니다.")
            },
            fnBoardConfirm() {                
                const value = {
                    event: this.fnBoard,
                    alert: false,
                    confirm: true
                }                
                this.fnAlert("댓글을 등록하시겠습니까?", value)
            },
            fnBoard() {            
                this.fnAlertClose()
                this.acloadingState(true)
                const form = new FormData();     
                form.append("contents", this.boardTxt);
                form.append("prdidx", this.idx);
                form.append("nickname", this.replyNm);

                this.form = form
                let params = [{
                    base: {
                        action: "acCallPost",
                        url: "/api/board",
                        vue_callback: this.fnBoardComplete,
                        callback: "setBoard"
                    },
                    request: form
                }]
                this.fnCall(params)

                this.boardTxt = ""
                this.replyNm = ""
            },
            fnBoardComplete(response) {
                const stateCode = response.code
                if (stateCode == 0) {                  
                    this.replyState = false
                    let params = [{
                        base: {
                            action: "acCallGet",
                            url: "/api/board",
                            vue_callback: null,
                            callback: "setBoardList"
                        },
                        request: {
                            key: this.idx,
                            page: 1,
                            pageSize: 30
                        }
                    }]
                    this.fnCall(params)
                    this.fnAlert(response.msg)
                    this.fnBoardUpdateCancel()
                }
                else if (stateCode <= -4001 && stateCode >= -4009) {
                    this.fnAlert("로그인 후 이용 가능합니다.")
                }
                else {
                    this.fnAlert(response.msg)
                }
                this.form = []
            },
            fnSetReply(event) {
                this.boardState = false
                this.replyState = true
                this.replyNm = event.target.dataset.nick
                this.boardTxt = `@${event.target.dataset.nick} : `
            },
            fnSetReplyCancel() {
                this.boardState = true
                this.replyState = false
                this.replyNm = ''                
                this.boardTxt = ''
            },
            fnBoardScroll(event) {
                if (event.target.scrollHeight - event.target.offsetHeight === event.target.scrollTop) {
                    if (this._state.boardLastIndexBool) {
                        let params = [{
                            base: {
                                action: "acCallGet",
                                url: "/api/board",
                                vue_callback: null,
                                callback: "setBoardScroll"
                            },
                            request: {
                                key: this.idx,
                                page: this._page.board,
                                pageSize: this._page.boardSize
                            }
                        }]
                        this.acloadingState(true)
                        this.acfooterloadingState(true)
                        this.fnCall(params)
                    }
                }
            },
            fnFollow(nick) {
                if (!nick) {
                    this.fnAlert("시스템 오류입니다.")
                    return false;
                }

                let params = [{
                    base: {
                        action: "acCallPost",
                        url: "/api/mylist/addmember",
                        vue_callback: this.fnFollowComplete,
                        callback: ""
                    },
                    request: {
                        followNick: nick
                    }
                }]
                this.fnCall(params)
            },
            fnFollowComplete(response) {
                const stateCode = response.code
                if (stateCode <= -4001 && stateCode >= -4009) {
                    this.fnAlert("로그인후 이용 가능합니다.")
                }
                else {
                    this.fnAlert(response.msg)
                }
            },
            fnBoardUpdate(boardIdx, content, nick) {
                if (!boardIdx || this.idx <= 0) {
                    this.fnAlert("시스템 오류입니다.")
                    return false;
                }

                if (this.boardState) {
                    this.boardState = false
                    this.boardUpdateTxt = content
                    this.boardUpdateIdx = boardIdx
                    this.boardNick = nick
                }
            },
            fnBoardUpdateCancel() {
                if (!this.boardState) {
                    this.boardState = true
                    this.boardUpdateTxt = ''
                    this.boardUpdateIdx = 0
                    this.boardNick = ''
                }
            },
            fnSetBoardUpdate() {
                let params = [{
                    base: {
                        action: "acCallAuthPut",
                        url: "/api/board",
                        vue_callback: this.fnBoardComplete,
                        callback: "setBoard"
                    },
                    request: {
                        boardIdx: this.boardUpdateIdx,
                        prdIdx: this.idx,
                        contents: this.boardUpdateTxt,
                        memberNick: this.boardNick
                    }
                }]
                this.fnCall(params)
            },
            fnBoardDelete(boardIdx) {
                if (!boardIdx || this.idx <= 0) {
                    this.fnAlert("시스템 오류입니다.")
                    return false;
                }

                let params = [{
                    base: {
                        action: "acCallAuthDelete",
                        url: "/api/board",
                        vue_callback: this.fnBoardComplete,
                        callback: "setBoard"
                    },
                    request: {
                        boardIdx: boardIdx,
                        prdIdx: this.idx
                    }
                }]
                this.fnCall(params)
            },
            fnProductChoice() {                
                let params = [{
                    base: {
                        action: "acCallAuthPut",
                        url: "/api/product/choice",
                        vue_callback: this.fnChoiceComplete,
                        callback: "setChoice"
                    },
                    request: {
                        key: this.idx
                    }
                }]
                this.fnCall(params)
            },
            fnChoiceComplete(response) {
                const stateCode = response.code
                if (stateCode <= -4001 && stateCode >= -4009) {
                    this.fnAlert("로그인후 이용 가능합니다.")
                }
                else if (stateCode != 0) {
                    this.fnAlert(response.msg)
                }
            },
            fnMove(nick) {
                this._state.detailBool = false
                this.$router.push({ path: '/Post/UserDetail', query: { nick: nick } });
            }
        },
        mixins: [axiosCall, alertBase] 
    }
</script>
<style scoped>
    .progress-container {
        width: 100%;
        height: 3px;
        background: #ccc;        
        position:absolute;
        top:0;
        left:0;
    }

    .progress-bar {
        height: 3px;
        background: #ff2c67;
        width: 0%;
        transition: all .3s ease;
        position: absolute;
        top: 0;
        left: 0;
    }
    .detail_contents {        
        position: relative;
        margin: 0 auto;
        height: 100%;
        border-radius: 20px;
        background-color: #fff;
    }
    .detail_contents > div {
        height: 100%;
    }
    .left_con {
        /* padding: 30px; */
        float: left;
        width: 540px;
        height: 100%;
        position:relative;
        border-radius: 20px 0 0 20px;
        overflow: hidden;
    }
    .left_con .img_slider {
        height: 100%;
        overflow-y: auto;
    }
    .right_con .right_top {
        padding: 25px 25px 0;
    }
    .right_con .reply {
        padding: 20px 10px;
    }
    .right_con .reply > p {
        margin-bottom: 15px;
        font-size: 14px;
        font-weight: bold;
        color: #777777;
    }
    .right_con .reply li > div {
        float: left;
    }
    .right_con .reply li .user_profile {
        margin-right: 17px;
        position: relative;
        /*width: 46px;
        height: 46px;*/
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
    }
    .right_con .reply li .user_profile img {
        position: absolute;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .right_con .reply li .text {
        width: calc(100% - 63px);
        min-height: 45px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .right_con .reply li .text p {
        font-size: 12px;
    }
    .right_con .reply li .text p.text_info {
        color: #777;
        overflow: hidden;
    }
    .right_con .reply li .text p.text_info .nickname {
        margin-right: 10px;
        font-weight: bold;
    }
    .right_con .reply li .text p.text_info .reply_del {
       float: right;
       width: 10px;
       height: 10px;
       text-indent: -9999px;
       background: url('../assets/images/icon_close.png') no-repeat;
       background-size: 10px auto;
    }
    .right_con .reply li .text p.text_con {
        margin-top: 5px;
        line-height: 1.2;
    }
    .right_con .reply_input {
        position: relative;
        margin: 10px 30px;
        height: 36px;
        border: 1px solid #b4b4b4;
        border-radius: 14px;

    }
    .right_con .reply_input input {
        padding: 0 15px;
        float: left;
        width: calc(100% - 60px);
        height: 100%;
        font-size: 12px;
    }
    .right_con .reply_input .btn_del {
        position: absolute;
        top: 3px;
        left: 2px;
        padding: 5px 5px;
    }
    .right_con .reply_input .btn_cert {
        display: block;
        border-left: 1px solid #b4b4b4;
        float: left;
        width: 60px;
        height: 100%;
        color: #777;
        font-size: 12px;
    }
    .right_con {
        float: left;
        height: 100%;
        width: calc(100% - 540px);
    }
    .right_con .title {
        padding: 0 10px 25px;
    }
    .right_con .title h2 {
        margin-bottom: 12px;
        font-weight: bold;
        font-size: 24px;
        line-height: 1;
    }
    .right_con .title p {
        font-size: 15px;
        color: #ff2c67;
        line-height: 1;
    }
    .right_con .item_list_wrap {
        padding: 15px 10px 0;
        /* height: calc(100% - 107px - 295px); */
        background-color: #f2f2f2;
        overflow-y: auto;
    }
    .right_con .item_list_wrap h3 {
        padding: 0 15px;
        font-weight: bold;
        border-bottom: 1px solid #c6c6c6;
        height: 40px;
        line-height: 40px;
    }
    .right_con .item_list_wrap h3 button {
        float: right;
        height: 40px;
    }
    .right_con .item_list_wrap h3 button img {
        margin-top: 9px;
    }
    .item_list li {
        padding: 0 15px;
        border-bottom: 1px solid #c6c6c6;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
    }
    .item_list li span {
        float: left;
        display: block;
        width: calc(100% - 66px)
    }
    .item_list li .action {
        float: left;
        width: 66px;
        height: 40px;
    }
    .item_list li .action > * {
        float: left;
        margin-top:9px
    }
    .item_list li .action a {
        margin-right: 9px;
        display: inline-block;
        vertical-align: middle;
    }
    .right_con .scroll_area {
        position: relative;
        padding: 0 25px;
        /*height: 560px;*/
        overflow-y: scroll;
    }
    .right_con .scroll_area::-webkit-scrollbar {
        width: 10px;
    }
    .right_con .scroll_area::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: #eaeaea;
    }
    .right_con .scroll_area::-webkit-scrollbar-track-piece {
        background-color: #fff;
    }

    .right_con .writer_info {
        min-height: 120px;
        padding: 15px 5px;
        border-bottom: 1px solid #d9d9d9;
    }
    .right_con .writer_info .user_info .user {
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .right_con .writer_info .user > * {
        float: left;
    }
    .right_con .writer_info .user .profile {
        position: relative;
        /*width: 57px;
        height: 57px;*/
        width: 37px;
        height: 37px;
        border-radius: 50%;
        overflow: hidden;
    }
    .right_con .writer_info .user .profile img {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .right_con .writer_info .user span {
        color: #777;
        font-size: 14px;
        font-weight: 500;
        margin: 0 10px;
    }
    .right_con .writer_info .user .btn_follow {
        width: 42px;
        height: 30px;
    }
    .right_con .writer_info .user .btn_follow img {
        width: 100%;
    }

    .right_con .writer_info .user_info .btn_fav {
        position: relative;
        float: right;
    }

    .right_con .writer_info .user_info .btn_fav button {
        margin: 10px 10px 0 0;
        height: 20px;
        padding-left: 35px;
        color: #ff1759;
        background: url('../assets/images/icon_fav_off.png') no-repeat left center;
    }

    .right_con .writer_info .user_info .btn_fav button.active {
        background: url('../assets/images/icon_fav_on.png') no-repeat left center;
    }

    .right_con .writer_info .user_info .user_more {
        position: relative;
        float: right;
    }
    .right_con .writer_info .user_info .user_more button {
        margin: 10px -5px 0 0;
        padding: 0 5px;
    }
    .right_con .writer_info .user_info .user_more ul {
        position: fixed;
        width: 140px; 
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 0 30px rgba(0,0,0,0.1);
        overflow: hidden;
    }
    .right_con .writer_info .user_info .user_more ul li {
        padding-left: 23px;
        line-height: 38px;
        text-align: center;
        color: #777;
        cursor: pointer;
        font-size: 14px;
    }
    .right_con .writer_info .user_info .user_more ul li:hover {
        background-color: #eaeaea;
    }
    .right_con .writer_info .user_info .user_more .btn_copy {
        background: url('../assets/images/icon_copy.png') no-repeat center left 30px;
    }
    .right_con .writer_info .user_info .user_more .btn_report {
        background: url('../assets/images/icon_flag.png') no-repeat center left 30px;
    }
    .right_con .writer_info .text_info {
        margin-top: 15px;
        color: #777;
        font-size: 14px;
        line-height: 24px;
    }

    .right_con .writer_info .text_info .detail_textarea {
        resize: none;
        border: none;
        width: 100%;
        background-color: #fff;
    }
    
    .detail_contents .close {
        position: absolute;
        right: -28px;
        top: -28px;
        width: 20px;
        height: 20px;
    }
    .keyword_list {
        padding: 0;
    }
    .keyword_list > p {
        margin-bottom: 7px;
        padding-left: 10px;
        font-size: 12px;
        line-height: 1;
        color: #777
    }
    .keyword_list > p strong {
        color: #000

    }
    .keyword_list > ul {
        padding: 0 10px 10px;
        border-bottom: 1px solid #d9d9d9;
    }
    .keyword_list > ul > li {
        position: relative;
        float: left;
        margin: 0 6px 10px 0;
        height: 24px;
        border-radius: 12px;
        padding: 0 15px;
        font-size: 14px;
        line-height: 21px;
        border: 1px solid #777777;
        color: #777777; 
        cursor: pointer;
    }
    .keyword_list > ul > li.link {
        background-color: #ff2c67;
        color: #fff;
        border-color: #ff2c67;
    }
    .keyword_list .keyword_pop {
        position: absolute;
        top: 20px;
        width: 178px;
        padding: 12px 15px;
        border-radius: 15px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        z-index: 1;
    }
    .keyword_list .keyword_pop p {
        color: #777;
        font-size: 12px;
        word-break: break-all;
    }
    .keyword_list .keyword_pop p:first-child {
        margin-bottom: 5px;
    }
    .keyword_list .keyword_pop p strong {
        color: #000
    }

.reply_popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    z-index: 100;
}
.reply_popup .popup_con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 370px;
    height: 180px;
    border-radius: 20px;
    background-color: #fff;
}
.reply_popup .popup_con p {
    padding: 55px 0 35px;
    text-align: center;
    font-size: 14px;
    color: #010101;
}
.reply_popup .popup_con .btn_area {
    text-align: center;
}
.reply_popup .popup_con .btn_area button {
    width: 143px;
    height: 36px;
    font-size: 12px;
    color: #fff;
    border-radius: 7px;
}
.reply_popup .popup_con .btn_cancel {
    background-color: #b4b4b4;
}
.reply_popup .popup_con .btn_check {
    margin-left: 20px;
    background-color: #ff1759;
}
</style>