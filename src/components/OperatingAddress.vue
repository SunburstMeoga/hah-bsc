<template>
    <div class="address">
        <div class="current-address address-item">
            <van-field v-model="currentAddress" style="padding: 0;" rows="2" autosize label="当前地址：" type="textarea"
                readonly show-word-limit />
        </div>
        <div class="superior-address address-item">
            <van-field v-model="superiorAddress" style="padding: 0;" rows="2" autosize label="上级地址：" type="textarea"
                readonly show-word-limit />
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        currentAddress() {
            return this.$store.state.currentAddress;
        },

        superiorAddress() {
            return this.$store.state.superiorAddress;
        }
    }
    // data() {
    //     return {
    //         currentAddress: 'safsdf',
    //         superiorAddress: 'sadfsdfsda'
    //     }
    // },
}
</script>

<style>
.address-item {
    margin-bottom: 10px;
}
</style>