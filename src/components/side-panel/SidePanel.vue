<template>
  <el-container class="side-panel-container">
    <side-panel-header icon-color="#e53935" width="36px" height="36px" label="Stats"></side-panel-header>
    <side-menu></side-menu>
    <side-panel-footer></side-panel-footer>
  </el-container>
</template>

<script>
  import SidePanelHeader from "@/components/side-panel/SidePanelHeader.vue"
  import SideMenu from "@/components/side-panel/SideMenu.vue"
  import SidePanelFooter from "@/components/side-panel/SidePanelFooter.vue"

  export default {
    name: "SidePanel",
    components: {
      SidePanelHeader,
      SideMenu,
      SidePanelFooter
    }
  }
</script>

<style scoped>

  .side-panel-container {
    height: 100vh;
    display:flex;
    flex-basis:auto;
    flex-direction:column;
  }
</style>