<template>
    <div class="errorPage">
        <p>페이지가 존재하지 않습니다<br>링크가 잘못되었거나 페이지가 삭제되었을 수 있습니다.</p>

        <div class="btnBox">
            <button type="button" @click="fnBack">이전 페이지로</button>
            <router-link to="/SettingEmailInquiry">도움이 필요하신가요?</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Error',
        components: {

        }, 
        data() {
            return {
                
            }
        },
        methods: {
            fnBack() {
                this.$router.go(-1)
            }
        },
        
    }
</script>

<style scoped>
.errorPage {
    margin-top: 200px;
}

.errorPage p {
    padding-top: 150px;
    font-size: 17px;
    color: #777;
    line-height: 1.6;
    text-align: center;
    background: url('../../assets/images/icon_notice02.png') no-repeat center top;
    background-size: 120px auto;
}

.errorPage .btnBox {
    margin: 70px auto 0;
    width: 307px;
    text-align: center;
}

.errorPage .btnBox button {
    display: inline-block;
    width: 100%;
    height: 52px;
    font-size: 17px;
    color: #fff;
    font-weight: bold;
    background-color: #ff1759;
    border-radius: 10px;
}

.errorPage .btnBox a {
    margin-top: 35px;
    display: inline-block;
    font-size: 14px;
}
</style>