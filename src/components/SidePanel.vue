<template>
  <el-container style="height: 100vh">
    <el-header class="side-panel-header">
      <ke-logo icon-color="#e53935" width="36px" height="36px" label="Stats"></ke-logo>
    </el-header>
    <side-menu></side-menu>
    <side-panel-footer></side-panel-footer>
  </el-container>
</template>

<script>
  import KeLogo from "@/components/KeLogo.vue"
  import SideMenu from "@/components/SideMenu.vue"
  import SidePanelFooter from "@/components/SidePanelFooter.vue"

  export default {
    name: "SidePanel",
    components: {
      KeLogo,
      SideMenu,
      SidePanelFooter
    }
  }
</script>

<style scoped>
  .side-panel-header {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .side-panel-footer {
    border-bottom-color: rgb(0, 0, 0);
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 3px 0;
  }
</style>