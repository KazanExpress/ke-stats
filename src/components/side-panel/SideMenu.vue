<template>
  <nav class="side-panel-main">
    <el-menu :default-active="$route.path.substr(1)"
             class="menu-item"
             background-color="#373737"
             text-color="hsla(0,0%,100%,.6)"
             active-text-color="#fff"
             :router="true">
      <el-menu-item v-for="menuItem in menu"
                    :index="menuItem.url"
                    v-show="!menuItem.hidden"
                    :key="menuItem.url">
        <span>{{routerTitle(menuItem.url)}}</span>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
  export default {
    name: "SideMenu",
    data() {
      return {
        menu: [
          {
            url: '',
            hidden: true
          }, {
            url: 'chart1',
          }, {
            url: 'chart2',
          }
        ],
      }
    },
    methods: {
      routerTitle(url) {
        return this.$router.resolve('/' + url).route.meta.title;
      }
    }
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
    height: 100%;
    padding: 20px 0;
  }
</style>