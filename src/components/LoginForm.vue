<template>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px" class="demo-ruleForm"
           style="width: 50vw; display: inline-block;">
    <el-form-item label="Login">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="pass" :error="form.passError" :show-message="form.passErrorShow">
      <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">Login</el-button>
      <el-button @click="resetForm('form')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import api from "@/utils/ApiClient.js"

  export default {
    name: "LoginForm",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        apiClient: new api.ApiClient(),
        form: {
          pass: '',
          passError: undefined,
          passErrorShow: true,
          checkPass: '',
          username: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        loading: false
      };
    },
    methods: {
      warnMessage() {
        console.log(this.form.checkPass);
        this.form.pass = undefined;
        this.form.passError = 'Credentials are not valid';
        this.form.passErrorShow = true;
      },
      claimAccessToken() {
        let _this = this;
        this.$store.commit('loading', true);
        this.apiClient.getAccessToken(this.form.username, this.form.pass)
          .catch(() => {
            _this.clearCredentials();
            _this.warnMessage();
            _this.$store.commit('loading', false);
          })
          .then(res => {
            console.log(res.status);
            console.log(res.data);
            if (res.error) {
              _this.clearCredentials();
              _this.warnMessage();
            } else {
              _this.saveCredentials(res.data.access_token);
              _this.$router.push('/')
            }
            _this.$store.commit('loading', false);
          });
      },
      claimUserInfo() {
        this.apiClient.getUserInfo().then(res => {

        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.claimAccessToken();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      clearCredentials() {
        let store = this.$store;
        store.commit('username', undefined);
        store.commit('access_token', undefined);
      },
      saveCredentials(access_token) {
        let store = this.$store;
        store.commit('username', this.form.username);
        console.log(access_token);
        store.commit('access_token', access_token);
      }
    }
  }
</script>

<style scoped>

</style>