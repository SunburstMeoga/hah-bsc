<template>
  <div id="app">
    <!-- <mt-button type="primary" @click="login()">链接网络</mt-button>
    <hr />
    <mt-field label="转出地址" placeholder="请输入地址" v-model="addr" readonly></mt-field>
    <mt-field label="转入地址" placeholder="请输入地址" v-model="user_addr" readonly></mt-field>
    <mt-button type="primary" @click="transfer()">转账</mt-button> -->
    <van-tabs animated style="margin-top:20px;" v-model="active">
      <van-tab title="推广">
        <to-promote></to-promote>
      </van-tab>
      <van-tab title="投票">内容 2</van-tab>
      <van-tab title="算力挖矿">内容 3</van-tab>
      <van-tab title="流动挖矿">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { config } from './const/config.js'
import ToPromote from './components/ToPromote.vue'
export default {
  components: {
    ToPromote
  },
  data() {
    return {
      web3: new this.Web3(window.ethereum),
      addr: '',
      user_addr: '0xaC76dd1172bE3F240Cc2495C972ccEd56a5030b6',
      active: 0,
    };
  },
  methods: {
    async login() {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        this.init()
      } else {
        //console.log('')
      }
    },
    init() {
      this.addr = window.ethereum.selectedAddress
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
