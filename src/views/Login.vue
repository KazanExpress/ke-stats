<template>
  <el-row :gutter="0" style="height: 100%; width: 100%">
    <el-col :xs="0" :sm="10" :md="12" :lg="12" :xl="12" hidden-xs-only="true" style="height: 100%">
      <div class="image-container">
      </div>
    </el-col>
    <el-col :xs="24" :sm="14" :md="12" :lg="12" :xl="12">
      <LoginForm></LoginForm>
    </el-col>
  </el-row>
</template>

<script>
  // @ is an alias to /src
  import LoginForm from '@/components/login/LoginForm.vue'

  export default {
    name: 'username',
    components: {
      LoginForm
    }
  }
</script>

<style scoped>
  .login {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }

  .image-container {
    background: url("../assets/sign_.jpg");
    filter: saturate(2);
    background-position-x: 50%;
    background-position-y: center;
    height: 100%;
    min-width: 100px;
    overflow: hidden;
  }
</style>