<template>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px" class="demo-ruleForm"
           style="width: 50vw; display: inline-block;">
    <el-form-item label="Login">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="pass">
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
        form: {
          pass: '',
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let store = this.$store;
            store.commit('loading', true);
            let apiClient = new api.ApiClient();
            apiClient.getAccessToken(this.form.username, this.form.pass)
              .then(res => {
                console.log(res);
                this.saveCredentials(res.access_token);
                store.commit('loading', false);
                this.$router.push('/')
              })
              .catch(error => {
                console.log(error);
                store.commit('loading', false);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      saveCredentials(access_token) {
        let store = this.$store;
        store.commit('username', this.form.username);
        store.commit('access_token', access_token);
      }
    }
  }
</script>

<style scoped>

</style>