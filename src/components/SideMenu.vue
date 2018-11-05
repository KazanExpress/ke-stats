<template>
  <el-main class="side-panel-main">
    <div>
      <el-menu default-active="2" class="menu-item"
               background-color="#373737" text-color="hsla(0,0%,100%,.6)" active-text-color="#fff" >
        <el-menu-item index="1">
          <span>Navigator One</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>Navigator Three</span>
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