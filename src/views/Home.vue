<template>
  <div class="home">
    <el-container style="height: 100vh">
      <el-header>Header</el-header>
      <el-main>
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
