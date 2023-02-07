<template>
    <div class="container">
        <div class="link-network">
            <div class="link-network">
                <van-button type="info" @click="login()">链接网络</van-button>
            </div>
            <div class="address">
                <div class="current-address address-item">
                    <van-field v-model="currentAddress" style="padding: 0;" rows="2" autosize label="当前地址："
                        type="textarea" readonly show-word-limit />

                </div>
                <div class="superior-address address-item">
                    <van-field v-model="superiorAddress" style="padding: 0;" rows="2" autosize label="上级地址："
                        type="textarea" readonly show-word-limit />
                </div>
            </div>
            <div class="signature-data">
                <van-field v-model="sign" style="padding: 0;" rows="2" autosize label="签名数据：" type="textarea"
                    show-word-limit />
            </div>
            <div class="to-promote" v-show="isLinked">
                <van-button type="info" @click="clickButton()">{{ buttonWord }}</van-button>
            </div>
            <div class="address-table">
                <van-field style="padding: 0;" rows="1" autosize label="当前地址：" type="input" readonly show-word-limit />
            </div>
            <div class="table-content">
                <!-- <vue-good-table :columns="columns" :rows="rows" /> -->
            </div>
        </div>
    </div>

</template>

<script>
import { config } from '../const/config.js'
export default {
    data() {
        return {
            web3: new this.Web3(window.ethereum),
            user_addr: '',
            active: 0,

            currentAddress: '',
            superiorAddress: '',
            sign: '',
            buttonWord: '推广',
            isLinked: false,
            havePreAddress: false,
            networkId: 97,
            signJson: {}
            // columns: [
            //     {
            //         label: '序号',
            //         field: 'number',
            //     },
            //     {
            //         label: '地址',
            //         field: 'address',
            //     },
            //     {
            //         label: '投票',
            //         field: 'vote',
            //     },
            //     {
            //         label: '算力',
            //         field: 'power'
            //     },
            // ],
            // rows: [
            //     { id: 1, number: "1", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },
            //     { id: 1, number: "2", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },
            //     { id: 1, number: "3", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },
            //     { id: 1, number: "4", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },
            //     { id: 1, number: "5", address: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8', vote: '3000', field: 23423 },

            // ],

        }
    },
    methods: {
        //click promote or sign button
        clickButton() {
            // havePreAddress to to promote
            if (this.havePreAddress) {
                this.popularize()
            } else {
                // to sign
                this.signPopularize()
            }
        },
        // to promote
        async popularize() {
            let eth_lib = require('eth-lib');
            let vrs = eth_lib.Account.decodeSignature(this.signJson.sign);
            let sign_temp_data = eth_lib.Account.sign(this.web3.utils.keccak256(this.currentAddress), this.signJson.key);
            let vrs_temp = eth_lib.Account.decodeSignature(sign_temp_data);

            const con = new this.web3.eth.Contract(this.abi, '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8');
            let data = con.methods.popularizeFast(this.signJson.child, this.signJson.address, vrs[0], vrs[1], vrs[2], vrs_temp[0], vrs_temp[1], vrs_temp[2]).encodeABI();
            const transactionParameters = {
                gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'Gwei')),
                to: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8',
                from: window.ethereum.selectedAddress,
                data: data,
                chainId: this.web3.utils.toHex(this.chainId),
            };
            let voteResult = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            console.log(voteResult)
        },

        //sign
        async signPopularize() {
            let temp = this.web3.eth.accounts.create()
            let address_ = temp.address
            let privateKey_ = temp.privateKey
            this.signParent_address = address_
            this.signParent_private = privateKey_
            const msgParams = {
                domain: {
                    chainId: this.networkId,
                    name: 'Hash Ahead @BSC',
                    verifyingContract: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8',
                    version: '1'
                },
                message: { addr: address_ },
                primaryType: 'popularize',
                types: {
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'version', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    popularize: [
                        { name: 'addr', type: 'address' },
                    ],
                },
            };
            try {

                const from = window.ethereum.selectedAddress;
                const sign = await window.ethereum.request({
                    method: 'eth_signTypedData_v4',
                    params: [from, JSON.stringify(msgParams)],
                });

                this.signJson = {
                    sign: sign,
                    key: privateKey_,
                    address: address_,
                    child: from,
                };
                this.sign = JSON.stringify(this.signJson)
            } catch (err) {
                console.log(err)
            }
        },

        //login metamask
        async login() {
            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                this.init()
            } else {
                //console.log('')
            }
        },

        //init metamask
        init() {
            this.currentAddress = window.ethereum.selectedAddress
            this.user_addr = window.ethereum.selectedAddress

            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            if (window.ethereum.selectedAddress !== null) {
                web3Contract.methods.spreads(window.ethereum.selectedAddress).call().then((v) => {
                    this.isLinked = true
                    if (v.parent === '0x0000000000000000000000000000000000000000') {
                        this.buttonWord = '签名'
                        this.superiorAddress = ''
                        this.havePreAddress = false
                    } else {
                        this.buttonWord = '推广'
                        this.superiorAddress = v.parent
                        this.havePreAddress = true
                    }
                    console.log(v)
                })
            }

        },

        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async receipt(txid) {
            let index = 0;
            while (index < 30) {
                await this.web3.eth.getTransactionReceipt(txid).then((result) => {
                    if (result !== null) {
                        // Toast({ message: '操作成功!', position: 'middle', duration: 3000, iconClass: 'icon icon-success' })
                        index = 30
                    } else {
                        // Toast({ message: '处理中...', position: 'middle', duration: 3000, iconClass: 'icon icon-success' })

                    }
                })
                await this.sleep(2000)
                index++;
            }
        },

        //交易
        transfer() {
            const usdt = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            const data = usdt.methods.transfer(this.user_addr, this.web3.utils.toWei('1', 'ether')).encodeABI()
            const transactionParameters = {
                to: config.con_addr,
                from: window.ethereum.selectedAddress,
                data: data,
            }
            window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            }).then((txid) => {
                this.receipt(txid)
            })
        }
    },
    mounted() {
        this.init()
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
