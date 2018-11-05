<template>
  <el-main class="side-panel-main">
    <div>
      <el-menu default-active="chart1"
               class="menu-item"
               background-color="#373737"
               text-color="hsla(0,0%,100%,.6)"
               active-text-color="#fff"
               :router="true">
        <el-menu-item index="chart1">
          <span>Chart One</span>
        </el-menu-item>
        <el-menu-item index="chart2">
          <span>Chart Two</span>
        </el-menu-item>
        <el-menu-item index="chart3">
          <span>Chart Three</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-main>
</template>

<script>
  export default {
    name: "SideMenu"
  }
</script>

<style scoped>
  .menu-item {
    text-align: left;
    display: block;
    padding: 0;
    border: none;
    width: 100%;
  }

  .side-panel-main {
    padding: 20px 0;
  }
</style>