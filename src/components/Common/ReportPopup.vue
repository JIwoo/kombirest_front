<template>
     <div class="check_popup">
        <div class="popup_con">
            <p>{{_type.msg}}</p>
            <button type="button" class="btn_check">확인</button>
        </div>
    </div> 
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'ReportPopup',
        computed: {
            ...mapState(['_state', '_type.msg'])
        },
        methods: {
            closeAlert() {
                this._type.msg = ''
                this._state.reportPopBool = false
            }
        }
    }
</script>
<style scoped>
    .check_popup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
    }
    .check_popup .popup_con {
        padding-top: 55px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 370px;
        height: 180px;
        border-radius: 20px;
        background-color: #fff;
    }
    .check_popup .popup_con p {
        text-align: center;
        font-size: 14px;
    }
    .check_popup .popup_con .close {
        position: absolute;
        right: -30px;
        top: -30px;
    }
    .check_popup .popup_con .btn_check {
        display: block;
        margin: 35px auto 0;
        width: 152px;
        height: 36px;
        font-size: 12px;
        color: #fff;
        border-radius: 5px;
        background-color: #b4b4b4;
    }
</style>