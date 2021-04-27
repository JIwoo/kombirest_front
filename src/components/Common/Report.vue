<template>
    <div class="list_popup">
        <div class="popup_con">
            <h2>신고하기</h2>
            <ul class="list_txt">
                <li v-for="(item, idx) in reportText" :key="idx" @click="selected = item.key" :class="{active: item.key == selected}">
                    <a href="javascript:;">{{item.text}}</a>
                </li>
            </ul>
            <button type="button" class="btn_check" @click="fnReportAdd">등록</button>
            <button type="button" class="close" @click="fnClose">
                <img src="@/assets/images/icon_close.png" alt="닫기">
            </button>
        </div>
    </div>
    <ReportPopup v-if="_state.reportPopBool" />
    <Alert v-if="_state.alertBool" :context="alertMsg" />
</template>
<script>
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { axiosCall } from '@/mixins/call.js'
    import { alertBase } from '@/mixins/alert.js'
    import ReportPopup from '@/components/Common/ReportPopup.vue'
    import Alert from '@/components/Common/Alert.vue'
    export default {
        name: 'Report',
        props: ['reportIdx'],
        components: {
            ReportPopup,
            Alert
        },
        data() {
            return {
                reportText: [
                    {
                        key: '1',text: '스팸 : 오해의 소지가 있거나 반복적으로 게시됨'
                    },
                    {
                        key: '2',text: '노골적인 성적 콘텐츠'
                    },
                    {
                        key: '3',text: '혐오 발언 또는 상징'
                    },
                    {
                        key: '4',text: '지적 재산권 침해 우려'
                    },
                    {
                        key: '5',text: '위험 상품 : 약물, 무기 등 규제 상품'
                    }
                ],
                selected: undefined,
                idx: this.reportIdx
            }
        },
        computed: {
            ...mapState(['_state'])
        },
        methods: {
            ...mapActions([
                'acloginState'
            ]),
            fnClose() {
                this._state.reportBool = false
            },
            fnReportAdd() {
                if (!this.selected) {                    
                    return false;
                }
                const form = new FormData();
                form.append("key", this.selected)
                form.append("idx", this.idx)

                let params = [{
                    base: {
                        action: "acCallPost",
                        url: "/api/product/report",
                        vue_callback: this.fnReportComplete,
                        callback: "setReport"
                    },
                    request: form
                }]
                this.fnCall(params)
            },
            fnReportComplete(response) {
                const stateCode = response.code
                if (stateCode <= -4001 && stateCode >= -4009) {
                    this.fnAlert("로그인후 이용 가능합니다.")
                    this.acloginState(false)
                }
                else {
                    this.fnAlert(response.msg)
                }
            }
        },
        mixins: [axiosCall, alertBase] 
    }
</script>
<style scoped>
    .list_popup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
    }
    .list_popup .popup_con {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 321px;
        border-radius: 20px;
        background-color: #fff;
        overflow: hidden;
    }
    .list_popup .popup_con .close {
        position: absolute;
        right: 18px;
        top: 18px;
    }
    .list_popup .popup_con .close img{
        width: 13px;
        height: auto;
    }
    .list_popup .popup_con h2 {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #000;
        font-weight: bold;
    }
    .list_popup .popup_con .list_txt a {
        display: inline-block;
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
        color: #777;
    }
    .list_popup .popup_con .list_txt a:hover {
        background-color: #f2f2f2;
    }
    .list_popup .popup_con .list_txt .active {
        background-color: #f2f2f2;
    }
    .list_popup .popup_con .btn_check {
        display: block;
        width: 100%;
        height: 45px;
        font-size: 14px;
        color: #000;
        background-color: #b4b4b4;
    }
</style>
