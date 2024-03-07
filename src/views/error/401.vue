<template>
  <div class="page-exception-401">
    <div class="exception-img">
      <img src="../../assets/images/icon-403.svg" />
    </div>
    <div class="exception-content">
      <h1>401</h1>
      <p class="exception-content-desc">抱歉，你无权访问该页面</p>
      <el-button size="large" type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-exception-401 {
  display: flex;
  width: 80%;
  align-items: center;
  margin: 0 auto;
  height: 80vh;
  min-height: 500px;

  .exception-img {
    flex: 0 0 62.5%;
    width: 62.5%;
  }

  .exception-content {
    flex: auto;

    h1 {
      margin-bottom: 24px;
      color: #515a6e;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }

    .exception-content-desc {
      margin-bottom: 16px;
      color: #808695;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
