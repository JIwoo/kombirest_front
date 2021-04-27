<template>
    <div>
        <div class="post_add">
            <h2>게시물 생성하기</h2>
            <section class="cf">
                <article class="left_box">
                    <div class="add_img">
                        <ul class="cf" v-if="!files.length">
                            <li>
                                <button type="button">ㅡ</button>
                                <input type="file" id="uploadImg" name="uploadImg" ref="files" @change="fnFile" multiple>
                                <label for="uploadImg"></label>
                                <img v-if="imageUrl" :src="imageUrl" style="width:100%" />
                            </li>
                        </ul>
                        <ul v-else class="cf">
                            <li v-for="(file, idx) in files" :key="idx">
                                <div>
                                    <img :src="file.preview" v-if="file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'image/png'" style="width:100%; height:100%">
                                    <video v-else :src="file.preview" style="width:100%;height:100%" controls autoplay muted="muted"></video>
                                </div>
                                <button type="button" @click="fnFileDel" :name="file.number">ㅡ</button>
                            </li>
                            <li v-if="files.length < 3">
                                <input type="file" id="uploadImg" name="uploadImg" ref="files" @change="fnFile" multiple>
                                <label for="uploadImg"></label>
                                <img v-if="imageUrl" :src="imageUrl" style="width:100%" />
                            </li>
                        </ul>
                    </div>
                    <div class="add_title">
                        <input type="text" placeholder="제목을 입력해주세요." v-model="title" maxlength="50" autocomplete="off">
                    </div>
                    <div class="add_description">
                        <textarea v-on:input="fnTextArea" cols="30" rows="10" placeholder="사람들에게 게시물에 대해 설명해 보세요 :)" v-model="contents"></textarea>
                    </div>
                    <p class="txt_count">{{contents.length}} / 1000</p>
                </article>
                <article class="right_box">
                    <div class="btn_cate">
                        <button type="button">카테고리 선택</button>
                    </div>
                    <div class="add_activity">
                        <input type="text" placeholder="신혼집 꾸미기와 같은 활동명을 입력 해주세요." v-model="actnm" maxlength="10" autocomplete="off" />
                    </div>
                    <div>
                        <div class="add_list_input">
                            <input type="text" name="item_name" value="" placeholder="+ 아이템 추가" maxlength="8" readonly />
                            <button class="item_add" type="button" id="item_add" name="item_add" @click="itemAdd">+ 추가</button>
                        </div>
                        <ul id="item_list" class="item_list">
                            <li class="cf" v-for="(item, idx) in _items.item" :key="idx">
                                <input type="text" name="item_name" @blur="fnItemName($event,idx)" placeholder="아이템입력" maxlength="20" style="float: left;" autocomplete="off"/>
                                <div class="action cf" @mouseover="fnItemOver(idx)" @mouseout="fnItemOut(idx)">
                                    <a href="#" class="txt_set">{{item.model}}</a>
                                    <a href="#" class="txt_set">{{item.pageUrl}}</a>
                                    <button :class="{active: item.pageUrl, item_url: true}" type="button" @click="openUrlPopup(idx)">URL</button>
                                    <button class="item_del" type="button" name="item_del" @click="itemDel(idx)"></button>
                                    <div v-if="item.temp">
                                        <div class="keyword_pop">
                                            <p><strong>상품명:</strong>{{item.model}}</p>
                                            <p><strong>URL:</strong> {{item.pageUrl}}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </article>
            </section>
            <button type="button" class="btn_fill" @click="fnProductConfirm">게시</button>
        </div>
        <div v-if="item.popup" class="activity_popup">
            <div class="popup_con">                
                <input type="text" name="item_name" placeholder="상품명을 입력해주세요" v-model="item.model" maxlength="20" autocomplete="off"/>
                <input type="text" name="item_name" placeholder="URL을 입력해주세요" v-model="item.url" maxlength="1000" autocomplete="off"/>
                <p class="info_txt">* 부적절한 URL을 추가 할 경우 불이익을 받을 수 있습니다.</p>
                <button type="button" class="btn_cert" @click="fnSetItem">확인</button>
                <button type="button" class="close" @click="closeUrlPopup"><img src="@/assets/images/icon_close_white.png" alt=""></button>
            </div>
        </div>
    </div>
</template>
<script>
    require('@/assets/css/post.css')
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { axiosCall } from '@/mixins/call.js'
    import { alertBase } from '@/mixins/alert.js'
    export default {
        name: 'CreatePost',
        components: {

        },
        data() {
            return {
                activityPopup: false,
                form: [],
                item: {
                    popup: false,
                    idx: 0,
                    model: "",
                    url: "",
                    name:""
                },
                selected: undefined,
                title: "",
                actnm: "",
                contents: "",
                actPicked: [],
                buttons: [],
                alertMsg: "",
                imageUrl: null,
                files: [],
                filesPreview: [],
                uploadImageIndex: 1,    
                testttt: [],
                asfasfasf:""
            }
        },
        created() {
            this._items.item = []
        },
        computed: {
            ...mapState(['_items', '_state'])
        },
        mounted() {
            var filter = "win16|win32|win64|mac";
            if (navigator.platform) {
                if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
                    location.href = ''
                }
            }
        },
        methods: {            
            ...mapActions({
                itemAdd: 'acItemSet',
                itemDel: 'acItemDel'
            }),
            fnItemOver(idx) {
                if (this._items.item[idx].pageUrl) {
                    this._items.item[idx].temp = true
                }
            },
            fnItemOut(idx) {
                this._items.item[idx].temp = false
            },
            fnItemName(event, idx) {
                this._items.item[idx].itemNm = event.target.value
            },
            fnTextArea(e) {               
                if (e.target.value.length > 1000) {
                    this.fnAlert("게시물내용은 1000자까지 입력 가능합니다.")
                    this.contents = this.contents.substring(0, 1000)
                }
            },
            fnopenAlert(msg) {
                this.alertMsg = msg
                this._state.alertBool = true
            },
            fnSetItem() {
                let idx = this.item.idx;
                this.selected = idx
                this._items.item[idx].pageUrl = this.item.url
                this._items.item[idx].model = this.item.model                
                this.item.idx = 0
                this.item.popup = false;
            },
            fnProductConfirm() {
                const value = {
                    event: this.fnProductAdd,
                    alert: false,
                    confirm: true
                }
                this.fnAlert("게시물을 등록하시겠습니까?", value)
            },
            fnProductAdd() {
                this.fnAlertClose()
                let confirm = this.fnValidation();
                if (!confirm.is) {
                    this.fnAlert(confirm.msg)
                    return false;
                }

                const image = this.files;              
                const count = this.files.length;
                const itemCount = this._items.item.length;

                const form = new FormData();              
                for (let i = 0; i < count; i++) {
                    form.append("files", image[i].file);
                }
                
                for (let i = 0; i < itemCount; i++) {
                    form.append(`items[${i}].pageUrl`, this._items.item[i].pageUrl);
                    form.append(`items[${i}].itemNm`, this._items.item[i].itemNm);
                    form.append(`items[${i}].model`,this._items.item[i].model);
                }

                form.append("actnm", this.actnm);
                form.append("title", this.title);
                form.append("contents", this.contents);


                this._state.loadingBool = true
                this.form = form

                let params = [{
                    base: {
                        action: "acCallAuthPost",
                        url: "/api/product",
                        vue_callback: this.fnProductComplete,
                        callback: "setProduct"
                    },
                    request: form
                }]
                this.fnCall(params)
            },
            fnProductComplete(response) {
                const stateCode = response.code
                if (stateCode == 0) {
                    this.$router.push('/Mypage/Post')
                }
                else if (stateCode <= -4001 && stateCode >= -4009) {
                    this.$router.push('/Login')
                }
                else {
                    this.fnAlert(response.msg)
                }
                this.form = []
            },
            openUrlPopup(idx) {                               
                this.item.idx = idx
                this.item.model = this._items.item[idx].model
                this.item.url = this._items.item[idx].pageUrl
                this.item.popup = true
            },
            closeUrlPopup() {
                this.item.popup = false
                this.item.idx = 0
                this.item.model = ''
                this.item.url = ''              
            },
            fnFile() {
                let num = -1;
                let count = this.$refs.files.files.length;
                let thisFile = this.$refs.files.files
                for (let i = 0; i < count; i++) {
                    this.files = [
                        ...this.files,
                        {
                            file: thisFile[i],
                            preview: URL.createObjectURL(thisFile[i]),
                            type: thisFile[i].type,
                            number: i + this.uploadImageIndex
                        }
                    ];
                    num = i;
                }
                this.uploadImageIndex = this.uploadImageIndex + num + 1;
            },
            fnPreview(e) {                
                const file = e.target.files[0]; 
                this.imageUrl = URL.createObjectURL(file); 
            },
            fnFileDel(e) {
                const name = e.target.getAttribute('name');
                this.files = this.files.filter(data => data.number !== Number(name));
            },
        },
        mixins: [axiosCall, alertBase] 
    }
</script>
<style scoped>
</style>