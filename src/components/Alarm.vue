<template>
    <div>
        <article class="alarm">
        <h2>알림</h2>
        <ul>
            <!-- <li class="nothing">
                <div> 알림 내역이 존재하지 않습니다. </div>
            </li> -->

            <li class="list cf">
                <p>
                    <strong>@item.PartnerEmail</strong> 님이 <strong>"@allActivity"</strong> 함께하기를 요청하셨습니다.
                    <span>@item.StrCreateDate</span>
                </p>
                <div class="user_action cf">
                    <input type="hidden" name="hdn_inviteId" value="@item.InviteId" />
                    <button type="button" class="accept" value="1">수락</button>
                    <button type="button" class="reject" value="2">거절</button>
                </div>
            </li>
            <li class="list done cf">
                <p>
                    <strong>@item.PartnerEmail</strong> 님이 <strong>"@allActivity"</strong> 함께하기를 요청하셨습니다.
                    <span>@item.StrCreateDate</span>
                </p>
                <div class="user_action @if (item.State == 1) {<text>ok</text> } ">
                    <i>@inviteResult</i>
                </div>
            </li>
        </ul>
    </article>
    </div>
</template>
<script>
export default {
    name: 'Alarm',
    data () {
        return {
        }
    }
}
</script>
<style scoped>
.alarm {
    padding-top: 140px;
}
.alarm h2 {
    margin-bottom: 110px;
    font-size:24px;
    font-weight: 700
}
.alarm li {
    padding: 12px 0;
    font-size: 17px;
    line-height: 1.4;
        
}
.alarm li.nothing {
    text-align: center;
}
.alarm li.list {
    border-bottom: 1px solid #c6c6c6;
}
.alarm li.list p {
    float: left;
    width: calc(100% - 120px);
    line-height: 33px;
}
.alarm li.done p {
    width: calc(100% - 66px);
}
.alarm li.list p strong {
    font-weight: 500;
}
.alarm li.list p span {
    color: #ccc;
    font-size: 14px;
}
.alarm li.list .user_action {
    float: left;
    width: 120px;
    border-radius: 5px;
}
            
.alarm li.list button {
    float: left;
    width: 56px;
    height: 33px;
    border-radius: 5px;
    font-size: 15px;
}
.alarm li.list button.accept {
    margin-right: 6px;
    background-color: #ff1759;
    color: #fff;
}
.alarm li.list button.reject {
    background-color: #c6c6c6;
    color: #303030;
}
.alarm li.done .user_action {
    width: 66px;
}

.alarm li.done .user_action i {
    display: block;
    display: 100%;
    height: 34px;
    border-radius: 5px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 15px;
    line-height: 32px;
    color: #aaa
}

.alarm li.done .user_action.ok i {
    border-color: #ff1759;
    color: #ff1759
}
</style>
