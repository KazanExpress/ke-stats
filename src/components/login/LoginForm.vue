<template>
  <el-form :model="form" status-icon :rules="rules" ref="form" class="form">
    <el-form-item label="Login">
      <el-input v-model="form.username" autocomplete="off" placeholder="example@mail.com"></el-input>
    </el-form-item>
    <el-form-item  label="Password" prop="pass" :error="form.passError" :show-message="form.passErrorShow">
      <el-input type="password" v-model="form.pass" autocomplete="off" placeholder="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">Login</el-button>
      <el-button @click="resetForm('form')" :disabled="!form.pass">Reset</el-button>
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
        this.form.pass = undefined;
        this.form.passError = 'Credentials are not valid';
        this.form.passErrorShow = true;
      },
      claimAccessToken() {
        // let _this = this;
        this.$store.commit('loading', true);
        this.apiClient.getAccessToken(this.form.username, this.form.pass)
          .then(res => {
            console.log(res.status);
            console.log(res.data);
            if (res.error) {
              this.$store.commit('clearCredentials');
              this.warnMessage();
            } else {
              this.$store.commit('saveCredentials', {username: this.form.username, access_token: res.data.access_token});
              this.claimUserInfo();
              this.$router.push('/')
            }
            this.$store.commit('loading', false);
          })
          .catch(() => {
            this.$store.commit('clearCredentials');
            this.warnMessage();
            this.$store.commit('loading', false);
          });
      },
      saveUserInfo: function (firstName) {
        this.$store.commit('firstName', firstName);
      },
      claimUserInfo() {
        // this.apiClient.getUserInfo().then(res => {
        //   if (res.error) {
        //     console.log(res.errorMessage)
        //   } else {
        //     this.saveUserInfo(res.data.first_name);
        //   }
        // })
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
      }
    }
  }
</script>

<style scoped>
  .form {
    width: 70%;
    max-width: 350px;
    margin: 200px 0;
    padding: 40px;
  }
</style>