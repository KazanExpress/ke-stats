<template>
  <div id="app">
    <el-container style="height: 100vh" v-loading="$store.getters.loading">
      <el-container>
        <el-header class="el-main-header">Header</el-header>
        <el-main class="el-main-main">
          <router-view/>
        </el-main>
      </el-container>
      <el-aside width="250px" class="el-main-aside">
        <side-panel></side-panel>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import SidePanel from "@/components/SidePanel.vue"

  export default {
    components: {
      SidePanel
    }
  }
</script>

<style>
  .el-main-header {
    border-bottom-color: rgb(0, 0, 0);
    box-shadow: rgba(0, 0, 0, 0.12) 0 0 1px 0;

  }

  .el-main-main {
    background: rgba(0, 0, 0, 0.07);
  }

  .el-main-aside {
    background: #373737;
    color: #FFF;
  }

  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html {
  /* Change default typefaces here */
  font-family: Roboto, sans-serif;;
  font-size: 100%;
  -webkit-font-smoothing: antialiased;
}

</style>
