<template>
  <el-footer class="side-panel-footer">
    <el-popover
        placement="top"
        width="100%"
        v-model="popoverVisible">
      <p>Are you sure to exit?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="popoverVisible = false">cancel</el-button>
        <el-button type="primary" size="mini" @click="logout()">confirm</el-button>
      </div>
      <el-button type="text" slot="reference" style="padding: 16px 40px">Logout
      </el-button>
    </el-popover>
  </el-footer>
</template>

<script>
  export default {
    name: "SidePanelFooter",
    methods: {
      logout() {
        this.$store.commit('clearCredentials');
        this.$router.push('/login');
      }
    },
    data() {
      return {
        popoverVisible: false
      }
    }
  }
</script>

<style scoped>

</style>