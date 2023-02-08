<template>
    <div class="container">
        <van-field v-model="value1" style="padding: 10px 0;" name="流动性" label="流动性" placeholder="xxx" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="百分比" label="百分比" placeholder="xxxx" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="收益值" label="收益值" placeholder="xxxx" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="USDT余额" label="USDT余额" placeholder="xxxx" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="" label="HAB金额" placeholder="请输入HAB金额" />
        <br />
        <van-button round type="info">添加流动性</van-button>
        <br />
        <br />


        <van-field v-model="value1" style="padding: 10px 0;" name="" label="流动性金额" placeholder="请输入流动性金额" />
        <van-button round type="danger">移除流动性</van-button>
        <br />
        <br />

        <van-cell center title="USDT授权" style="padding: 10px 0;">
            <template #right-icon>
                <van-switch v-model="checked" size="24" />
            </template>
        </van-cell>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checked: true,
        }
    }
}
</script>

<style>
.container {
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}
</style>