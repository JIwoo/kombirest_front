<template>
<div>
    <div class="alert_popup" v-if="_modal.alertState">
        <div class="popup_con">
            <p>{{ _modal.msg }}</p>
            <button type="button" class="btn_fill" @click="closeAlert">
                확인
            </button>
            <button type="button" class="close" @click="closeAlert">
                <img src="@/assets/images/icon_close.png" alt="닫기">
            </button>
        </div>
    </div>
     <div class="reply_popup" v-if="_modal.confirmState">
        <div class="popup_con">
            <p>{{ _modal.msg }}</p>
            <div class="btn_area">
                <button type="button" class="btn_cancel" @click="closeAlert">취소</button>
                <button type="button" class="btn_check" @click="_modal.event">확인</button>
            </div>
        </div>
    </div> 
</div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
    name: 'Alert',
        props: ['context', 'test'],
        data() {
            return {
                idx: 0
            }
        },
        computed: {
            ...mapState(['_state','_modal'])
        },
        methods: {
            closeAlert() {
                this._modal.msg = ''
                this._modal.alertBool = false
                this._modal.alertState = false
                this._modal.confirmState = false
                this._modal.event = ''
            }
        }
    }
</script>
<style scoped>
    .alert_popup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
        z-index: 100;
    }
    .alert_popup .popup_con {
        padding-top: 75px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 462px;
        min-height: 224px;
        border-radius: 20px;
        background-color: #fff;
    }
    .alert_popup .popup_con p {
        text-align: center;
        font-size: 17px;
    }
    .alert_popup .popup_con .close {
        position: absolute;
        right: 30px;
        top: 30px;
    }
    .alert_popup .popup_con .btn_fill {
        display: block;
        margin: 45px auto 0;
        width: 188px;
        height: 45px;
        border-radius: 5px;
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