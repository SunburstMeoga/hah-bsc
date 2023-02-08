<template>
    <div class="container">
        <operating-address></operating-address>
        <van-field v-model="value1" style="padding: 10px 0;" name="地址余额" label="地址余额:" placeholder="地址余额" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="已投金额" label="已投金额:" placeholder="已投金额" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="空投金额" label="空投金额:" placeholder="空投金额" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="放大系数" label="放大系数:" placeholder="放大系数" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="基本算力" label="基本算力:" placeholder="基本算力" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="提交算力" label="提交算力:" placeholder="提交算力" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="系统总算力" label="系统总算力:" placeholder="系统总算力" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="算力百分比" label="算力百分比:" placeholder="算力百分比" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="请输入金额" label="请输入金额:" placeholder="请输入金额" />
        <div class="button-group">
            <div class="button-item">
                <van-button round type="info">投票</van-button>
            </div>
            <div class="button-item">
                <van-button round type="primary">撤投</van-button>
            </div>

        </div>
    </div>
</template> 

<script>
import OperatingAddress from './OperatingAddress.vue'
export default {
    components: { OperatingAddress },
    data() {
        return {
            value1: 'sfsf',
        }
    },

}
</script>

<style>
.container {
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}

.button-group {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-item {
    width: 46%;
}

.van-button {
    width: 100%;
}
</style>