<template>
    <div class="model">
        <div class="mask">123</div>
        <div class="model-dialog">
            <div class="model-header">
                <span>提示</span>
                <a href="javascript:;" class="icon-close"></a>
            </div>
            <div class="model-body">
                <div class="body">{{ msg }}</div>
            </div>
            <div class="model-footer">
                <button class="btn">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


<style>
.mask {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(167, 165, 165, 0.486);
    opacity: 0.5;
    z-index: 9;
}

.model-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 12px;
    width: 600px;
    height: 300px;
    border: 1px solid #f5f5f5;
    overflow: hidden;
    z-index: 10;
}

.model-header {
    position: relative;
    height: 50px;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 20px;
    line-height: 50px;
    background-color: #f5f5f5;
    border-bottom: 1px solid rgb(177, 176, 176);
}

.model-body {
    height: 150px;
    line-height: 150px;
    font-size: 28px;
    text-align: center;
    background-color: #fff;
}

.model-footer {
    background-color: #f5f5f5;
    height: 100px;
    text-align: center;
    line-height: 100px;
}

.btn {
    width: 180px;
    height: 40px;
    border-radius: 8px;
    background-color: rgb(180, 103, 103);
    color: #fff;
    font-size: 18px;
    border: none;
}

.icon-close {
    position: absolute;
    background-color: pink;
    right: 15px;
    top: 16px;
    width: 30px;
    height: 30px;
    z-index: 10;
    background-size: contain;
}
</style>
