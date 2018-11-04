<template>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px" class="demo-ruleForm"
           style="width: 50vw; display: inline-block;" v-loading="loading">
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
        console.log(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('username', this.form.username);
            this.loading = true;
            let _this = this;
            setTimeout(function(){
              _this.loading = false;

              _this.$router.push('/')
              //do what you need here
            }, 2000);
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

</style>