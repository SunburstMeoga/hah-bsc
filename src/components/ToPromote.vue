<template>
    <div class="container">
        <div class="link-network">
            <van-button type="info">链接网络</van-button>
        </div>
        <div class="address">
            <div class="current-address address-item">
                <van-field v-model="currentAddress" style="padding: 0;" rows="2" autosize label="当前地址：" type="textarea"
                    readonly show-word-limit />

            </div>
            <div class="superior-address address-item">
                <van-field v-model="currentAddress" style="padding: 0;" rows="2" autosize label="上级地址：" type="textarea"
                    readonly show-word-limit />
            </div>
        </div>
        <div class="signature-data">
            <van-field v-model="sign" style="padding: 0;" rows="2" autosize label="签名数据：" type="textarea"
                show-word-limit />
        </div>
        <div class="to-promote">
            <van-button type="info">推广</van-button>
        </div>
        <div class="address-table">
            <van-field style="padding: 0;" rows="1" autosize label="当前地址：" type="input" readonly show-word-limit />
        </div>
        <div class="table-content">
            <vue-good-table :columns="columns" :rows="rows" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentAddress: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8',
            superiorAddress: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8',
            sign: '签名数据',
            columns: [
                {
                    label: '序号',
                    field: 'number',
                },
                {
                    label: '地址',
                    field: 'address',
                },
                {
                    label: '投票',
                    field: 'vote',
                },
                {
                    label: '算力',
                    field: 'power'
                },
            ],
            rows: [
                { id: 1, number: "1", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },
                { id: 1, number: "2", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },
                { id: 1, number: "3", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },
                { id: 1, number: "4", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },
                { id: 1, number: "5", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },

            ],
        }
    }
}
</script>

<style scoped>
button {
    width: 100%;
}

input {
    width: 100%;
}

.container {
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}

.link-network {
    margin-bottom: 14px;
}

.address {}

.address-item {
    margin-bottom: 10px;
}

.to-promote {
    margin-bottom: 20px;
}

.signature-data {
    margin-bottom: 20px;
}
</style>
