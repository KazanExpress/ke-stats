<template>
  <el-header class="side-panel-header">
    <router-link class="ke-svg-logo" to="/">
      <svg xmlns="http://www.w3.org/2000/svg"
           :width="width"
           :height="height"
           viewBox="0 0 76.73 76.88"
           style="float: left; width: 36px;"
      >
        <g :fill="iconColor">
          <path
              d="M56.06,53.61H47.74L35.36,37.88h0L47.51,23.27h8.31L45.94,35.15H76.73a38.44,38.44,0,1,0,0,6.58h-30Zm-23.12,0H26.36V23.27h6.58V53.61Z"></path>
        </g>
      </svg>
      <p class="logo-label">{{label}}</p>
    </router-link>
  </el-header>
</template>

<script>
  export default {
    name: "SidePanelHeader",
    props: {
      iconName: {
        type: String,
        default: 'box'
      },
      width: {
        type: [Number, String],
        default: 18
      },
      height: {
        type: [Number, String],
        default: 18
      },
      iconColor: {
        type: String,
        default: 'currentColor'
      },
      label: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .logo-label {
    display: inline;
    padding: 0 12px;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 36px;
    vertical-align: baseline;
    color: #fff
  }
  .logo-label:focus, input:focus{
    outline: none;
  }

  .ke-svg-logo {
    display: inline-block;
    vertical-align: middle;
    text-decoration: none;
    text-decoration-color: white;
    /*width: 100%;*/
    padding: 14px 24px;
  }

  .side-panel-header {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
  }
</style>