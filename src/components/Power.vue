<template>
    <div class="container">
        <van-field v-model="value1" style="padding: 10px 0;" name="当前周期" label="当前周期:"
            placeholder="xxx(2023-xx-xx xx:xx:xx至2023-xx-xx xx:xx:xx)" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="提交算力" label="提交算力:" placeholder="xxxx" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="预计收益" label="预计收益:" placeholder="xxxx" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="实际算力" label="实际算力:" placeholder="xxxx(+/-)"
            readonly />
        <br />
        <van-button round type="info">提交</van-button>
        <br />
        <br />


        <van-field v-model="value1" style="padding: 10px 0;" name="算力明细" label="基本算力:" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="上级贡献" label="上级贡献:"
            placeholder="min(xxx,xxx) * 2 = xxx" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="自身贡献" label="自身贡献:" placeholder="xxx * 4 = xxx"
            readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="下级贡献" label="下级贡献:"
            placeholder="min(xxx,xxx) + min(xxx,xxx) + ... + = xxx" readonly />
        <van-field v-model="value1" style="padding: 10px 0;" name="实际算力" label="实际算力:"
            placeholder="xxx + xxx + xxx = xxx" readonly />

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}
</style>