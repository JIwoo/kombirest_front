<template>
    <div class="loading_overlay">
        <div class="spinner">
        </div>
    </div>
</template>
<script>
export default {
    name: 'LoadingOverlay'
}
</script>
<style scoped>
/* .loading_overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    z-index: 10;
} */

.loading_overlay {
    padding: 10px 0;
}
@keyframes spinner {
    to {transform: rotate(360deg);}
}
.spinner:before {
    content: '';
    position: relative;
    left: 50%;
    display: inline-block;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    border-radius: 50%;
    border-top: 5px solid #ff1759;
    border-left: 5px solid #ff1759;
    border-bottom: 3px solid #ff1759;
    border-right: 5px solid transparent;
    animation: spinner .6s linear infinite;
}
</style>