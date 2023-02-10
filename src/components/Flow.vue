<template>
    <div class="container">
        <operating-address></operating-address>

        <van-field v-model="fluidity" style="padding: 10px 0;" name="流动性" label="流动性:" placeholder="" readonly />
        <van-field v-model="percentage" style="padding: 10px 0;" name="百分比" label="百分比:" placeholder="" readonly />
        <van-field v-model="incomeValue" style="padding: 10px 0;" name="收益值" label="收益值:" placeholder="" readonly />
        <van-field v-model="USDTBalance" style="padding: 10px 0;" name="USDT余额" label="USDT余额:" placeholder=""
            readonly />
        <van-field v-model="USDTBalance" style="padding: 10px 0;" name="HAB余额" label="HAB余额:" placeholder="" readonly />

        <van-field v-model="HABAmount" style="padding: 10px 0;" name="" label="添加数量:" placeholder="请输入需要添加的HAB数量" />
        <br />
        <van-button round type="info" @click="addLiquidity">添加流动性</van-button>
        <br />
        <br />
        <van-field v-model="fluidityAmount" style="padding: 10px 0;" name="" label="流动性金额:" placeholder="请输入流动性金额" />
        <van-button round type="danger" @click="removeLiquidity">移除流动性</van-button>
        <br />
        <br />
        <van-button round type="info" v-show="showAuthorizedButton" @click="USDTAuthorized">USDT授权</van-button>


    </div>
</template>

<script>
import OperatingAddress from './OperatingAddress.vue'
import { config } from '../const/config.js'
import { Toast } from 'vant';
export default {
    components: { OperatingAddress, Toast },
    data() {
        return {
            web3: new this.Web3(window.ethereum),
            checked: true,
            fluidity: '',
            percentage: '',
            incomeValue: '',
            USDTBalance: '',
            HABBalance: '',
            HABBalanceNumber: '',
            HABAmount: '',
            fluidityAmount: '',
            showAuthorizedButton: false
        }
    },
    mounted() {
        this.getLiquidMiningData()
    },
    methods: {
        //添加流动性
        addLiquidity() {
            if (this.HABAmount > this.HABBalanceNumber) {
                Toast('余额不足')
            } else if (this.HABAmount <= 0) {
                Toast('添加的HAB数量不得小于0')
            } else {
                let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
                let data = web3Contract.methods.addLiquidity(this.web3.utils.toWei(this.HABAmount.toString(), 'ether')).encodeABI();
                const transactionParameters = {
                    gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(config.amount, config.unit)),
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
        //移除流动性
        removeLiquidity() {
            console.log(Number(this.fluidityAmount), Number(this.fluidity))
            if (Number(this.fluidityAmount) > Number(this.fluidity)) {
                Toast('不得大于当前流动性')
            } else {
                let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
                let data = web3Contract.methods.removeLiquidity(this.web3.utils.toWei(this.fluidityAmount.toString(), 'ether')).encodeABI();
                const transactionParameters = {
                    gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(config.amount, config.unit)),
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
        //USDT授权
        USDTAuthorized() {
            let web3ContractUSDT = new this.web3.eth.Contract(config.erc20_abi, config.usdt_address)
            let data = web3ContractUSDT.methods.approve(config.con_addr, 2n ** 256n - 1n).encodeABI();
            const transactionParameters = {
                gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(config.amount, config.unit)),
                to: config.usdt_address,
                from: window.ethereum.selectedAddress,
                data: data,
                chainId: this.web3.utils.toHex(this.chainId),
            };
            window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        },
        getLiquidMiningData() {
            const BigNumber = require('bignumber.js')
            let web3ContractPair = new this.web3.eth.Contract(config.erc20_abi, config.pair_address)
            let web3ContractUSDT = new this.web3.eth.Contract(config.erc20_abi, config.usdt_address)
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            // 流动性
            web3Contract.methods.lps(this.$store.state.currentAddress).call().then((result) => {
                console.log('流动性', result.lp)
                this.fluidityNumber = result.lp
                this.fluidity = new BigNumber(result.lp).div(1000000000000000000n).toFixed(4)
            })
            //百分比和收益值
            web3Contract.methods.profit(this.$store.state.currentAddress).call().then((result) => {
                console.log('百分比和收益值', result)
                this.incomeValue = new BigNumber(result.lp_value).div(1000000000000000000n).toFixed(4)
                this.percentage = result.lp_ratio / 10000 + '%'
            })
            // HAB余额
            web3Contract.methods.balanceOf(this.$store.state.currentAddress).call().then((result) => {
                console.log('HAB余额', result)
                this.HABBalanceNumber = result
                this.HABBalance = new BigNumber(result).div(1000000000000000000n).toFixed(4)

            })
            //USDT余额
            web3ContractUSDT.methods.balanceOf(this.$store.state.currentAddress).call().then((result) => {
                console.log('USDT余额', result)
                this.USDTBalance = new BigNumber(result).div(1000000000000000000n).toFixed(4)
            })
            //判断usdt授权按钮显示隐藏
            web3ContractUSDT.methods.allowance(this.$store.state.currentAddress, config.con_addr).call().then((result) => {
                console.log('USDT授权', result)
                result === '0' ? this.showAuthorizedButton = true : this.showAuthorizedButton = false
            })
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