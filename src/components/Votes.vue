<template>
    <div class="container">
        <operating-address></operating-address>
        <van-field v-model="addressBalance" style="padding: 10px 0;" name="地址余额" label="地址余额:" readonly />
        <van-field v-model="investedAmount" style="padding: 10px 0;" name="已投金额" label="已投金额:" readonly />
        <van-field v-model="airdropAmount" style="padding: 10px 0;" name="空投金额" label="空投金额:" readonly />
        <van-field v-model="amplificationFactor" style="padding: 10px 0;" name="放大系数" label="放大系数:" readonly />
        <van-field v-model="basicComputingPower" style="padding: 10px 0;" name="基本算力" label="基本算力:" readonly />
        <van-field v-model="submitComputingPower" style="padding: 10px 0;" name="提交算力" label="提交算力:" readonly />
        <van-field v-model="systemPower" style="padding: 10px 0;" name="系统总算力" label="系统总算力:" placeholder="" readonly />
        <van-field v-model="powerPercentage" style="padding: 10px 0;" name="算力百分比" label="算力百分比:" placeholder=""
            readonly />
        <van-field v-model="amount" style="padding: 10px 0;" name="请输入金额" label="请输入金额:" placeholder="请输入金额" />
        <div class="button-group">
            <div class="button-item">
                <van-button round type="info" @click="toVotes">投票</van-button>
            </div>
            <div class="button-item">
                <van-button round type="primary" @click="toWithdraw">撤投</van-button>
            </div>

        </div>
    </div>
</template> 

<script>
import OperatingAddress from './OperatingAddress.vue'
import { config } from '../const/config.js'
import { Toast } from 'vant';


export default {
    components: { OperatingAddress, Toast },
    computed: {
        submitComputingPower() {
            return this.$store.state.submitComputingPower;
        },
        basicComputingPower() {
            return this.$store.state.basicComputingPower;
        }
    },
    data() {
        return {
            web3: new this.Web3(window.ethereum),
            addressBalance: '',
            investedAmount: '',
            airdropAmount: '',
            amplificationFactor: 0,
            systemPower: '',
            powerPercentage: '',
            amount: '',
            lockNumber: '',
            balance: '',
            systemPowerNumber: '',
            currentBlockHeight: ''
        }
    },
    mounted() {
        this.getAddressBalance()
        this.getInvestedAmount()
        this.getAirdropAmount()
    },
    methods: {
        toVotes() {
            console.log(this.amount, this.balance)
            if (this.amount > this.balance) {
                Toast.fail('投票金额不能大于地址余额');
            } else {
                const con = new this.web3.eth.Contract(config.erc20_abi, config.con_addr);
                let data = con.methods.voteOut(this.web3.utils.toWei(this.amount.toString(), 'ether')).encodeABI();
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
            }
        },
        toWithdraw() {
            if (this.currentBlockHeight <= this.lockNumber) {
                Toast.fail('当前区块高度不足');
            } else {
                const con = new this.web3.eth.Contract(config.erc20_abi, config.con_addr);
                let data = con.methods.voteIn(this.web3.utils.toWei(this.amount.toString(), 'ether')).encodeABI();
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
            }
        },
        getAddressBalance() {
            const BigNumber = require('bignumber.js')
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.balanceOf(this.$store.state.currentAddress).call().then((result) => {
                console.log('result', result)
                this.balance = result
                this.addressBalance = new BigNumber(result).div(1000000000000000000n).toFixed(4)
            })
            web3Contract.methods.whole_power().call().then((result) => {
                this.systemPower = new BigNumber(result).div(10000000000000000n).toFixed(4)
                this.systemPowerNumber = result
            })
            web3Contract.methods.profit(this.$store.state.currentAddress).call().then((result) => {
                console.log('区块高度', result)
                this.currentBlockHeight = result.number
            })
        },
        getInvestedAmount() {
            const BigNumber = require('bignumber.js')
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.spreads(this.$store.state.currentAddress).call().then((result) => {
                console.log('已投金额', result)
                this.investedAmount = new BigNumber(result.vote).div(1000000000000000000n).toFixed(4)
                this.amplificationFactor = parseInt(result.vote_power) / parseInt(result.vote) * 100
                this.$store.commit('getSubmitComputingPower', new BigNumber(result.real_power).div(10000000000000000n).toFixed(4))
                this.$store.commit('getBasicComputingPower', new BigNumber(result.vote_power).div(10000000000000000n).toFixed(4))
                this.powerPercentage = (result.real_power / this.systemPowerNumber) * 100 + '%'
                this.lockNumber = result.lock_number + result.cycle_period * 2
                console.log(result.real_power / this.systemPowerNumber)
            })
        },
        getAirdropAmount() {
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.airdrops(this.$store.state.currentAddress).call().then((result) => {
                console.log('空投金额', result)
                this.airdropAmount = result.vote

            })
        },

    }

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