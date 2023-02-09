<template>
    <div class="container">
        <operating-address></operating-address>

        <van-field v-model="currentCycle" style="padding: 10px 0;" name="当前周期" label="当前周期:" placeholder="" readonly />
        <van-field v-model="submitComputingPower" style="padding: 10px 0;" name="提交算力" label="提交算力:" placeholder=""
            readonly />
        <van-field v-model="estimatedIncome" style="padding: 10px 0;" name="预计收益" label="预计收益:" placeholder=""
            readonly />
        <van-field v-model="actualComputingPower" style="padding: 10px 0;" name="实际算力" label="实际算力:" placeholder=""
            readonly />
        <br />
        <van-button round type="info" :disabled="disabled" @click="clickButton">{{ buttonWord }}</van-button>
        <br />
        <br />


        <van-field v-model="value1" style="padding: 10px 0;" name="算力明细" label="基本算力:" readonly />
        <van-field v-model="superiorContribution" style="padding: 10px 0;" name="上级贡献" label="上级贡献:"
            placeholder="min(xxx,xxx) * 2 = xxx" readonly />
        <van-field v-model="selfContribution" style="padding: 10px 0;" name="自身贡献" label="自身贡献:"
            placeholder="xxx * 4 = xxx" readonly />
        <van-field v-model="subordinateContribution" style="padding: 10px 0;" name="下级贡献" label="下级贡献:"
            placeholder="min(xxx,xxx) + min(xxx,xxx) + ... + = xxx" readonly />
        <van-field v-model="actualComputingPower" style="padding: 10px 0;" name="实际算力" label="实际算力:"
            placeholder="xxx + xxx + xxx = xxx" readonly />

    </div>
</template>

<script>import OperatingAddress from './OperatingAddress.vue'
import { config } from '../const/config.js'
import { Toast } from 'vant';
export default {
    components: { OperatingAddress, Toast },
    computed: {
        submitComputingPower() {
            return this.$store.state.submitComputingPower;
        },
        selfContribution() {
            return this.$store.state.basicComputingPower + ' * 4 = ' + this.$store.state.basicComputingPower * 4
        }
    },
    data() {
        return {
            web3: new this.Web3(window.ethereum),
            currentCycle: '',
            estimatedIncome: '',
            actualComputingPower: '',
            superiorContribution: '',
            subordinateContribution: '',
            value1: '',
            buttonWord: '',
            disabled: true,
        }
    },
    methods: {
        // 点击按钮
        clickButton() {
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            let data = web3Contract.methods.voteMining().encodeABI();
            const transactionParameters = {
                gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'Gwei')),
                to: config.con_addr,
                from: window.ethereum.selectedAddress,
                data: data,
                chainId: this.web3.utils.toHex(this.chainId),
            };
            window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        },
        //收益详情 提交算力或者领取收益
        benefitDetails() {
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            let begin = ''
            let cycle = ''
            let profit = ''
            web3Contract.methods.begin().call().then((result) => {
                console.log('begin', result)
                begin = result
            })
            web3Contract.methods.cycle().call().then((result) => {
                console.log('cycle', result)
                cycle = result
            })
            web3Contract.methods.profit(this.$store.state.currentAddress).call().then((result) => {
                console.log('profit', result)
                profit = result.number
            })
            if (begin + cycle * 28800 > profit) {
                this.buttonWord = '领取收益'
                this.disabled = false
            } else if (this.actualComputingPower > this.submitComputingPower) {
                this.buttonWord = '提交算力'
                this.disabled = false


            } else {
                this.buttonWord = '提交算力'
                this.disabled = true
            }
        },
        getData() {
            const BigNumber = require('bignumber.js')
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            //当前周期
            web3Contract.methods.cycle().call().then((result) => {
                console.log('当前周期', result,)
                this.currentCycle = result
            })
            //预计收益
            web3Contract.methods.profit(this.$store.state.currentAddress).call().then((result) => {
                console.log('预计收益', result,)
                this.estimatedIncome = new BigNumber(result.pow_value).div(1000000000000000000n).toFixed(4)
            })
            //实际算力
            web3Contract.methods.spreads(this.$store.state.currentAddress).call().then((result) => {
                console.log('实际算力', result,)
                this.actualComputingPower = new BigNumber(result.real_power).div(1000000000000000000n).toFixed(4)
            })
            //上级基本算力
            web3Contract.methods.spreads(this.$store.state.superiorAddress).call().then((result) => {
                console.log('上级基本算力', result.vote_power)
                this.superiorContribution = 'min(' + this.$store.state.basicComputingPower + ',' + result.vote_power + ') * 2 = ' + Math.min(this.$store.state.basicComputingPower, result.vote_power) * 2
            })
            //下级地址列表
            web3Contract.methods.spreadChild(this.$store.state.currentAddress).call().then((result) => {
                console.log('列表', result)
                this.subordinateContribution = 'min(' + this.$store.state.basicComputingPower + ',' + result.powers + ') = ' + Math.min(this.$store.state.basicComputingPower, result.powers)
            })
        }
    },
    mounted() {
        this.benefitDetails()
        this.getData()
    }
}
</script>

<style scoped>
.container {
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}
</style>