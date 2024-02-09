<template>
  <div class="login-wrap">
    <!-- 画布 动效 -->
    <canvas id="canvas" />
    <!-- 小球装饰 -->
    <div v-for="(b, key) in bubbles" :key="key" :style="b" class="bubble"></div>
    <!-- 仓库名称 -->
    <div class="logo" @click="onGit"></div>
    <!-- 仓库分支 -->
    <div class="git-wrap">
      <!-- 装饰icon -->
      <svg class="icon youxishoubing" aria-hidden="true">
        <use xlink:href="#icon-youxishoubing"></use>
      </svg>
      <!-- 仓库分支 -->
      <div class="git"></div>
    </div>
    <!-- 项目简介 -->
    <div class="describe"></div>
    <!-- 相关插件 -->
    <el-row class="list-wrap" :gutter="20">
      <el-col v-for="item in list" :key="item" :span="8">
        <div :class="['item', item]" @click="onClick(item)"></div
      ></el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
const onClick = (item: string) => {
  if (item === "go") {
    localStorage.setItem("TOKEN", "7066");
    router.replace("/");
  }
};
const onGit = () => {
  window.open("https://github.com/7066/No.Vue", "_blank");
};
const list = [
  "axios",
  "pinia",
  "i18n",
  "plop",
  "go",
  "eslint",
  "prettier",
  "commitlint",
  "stylelint",
];

const bubbles = [
  {
    top: "300px",
    right: "120px",
    width: "60px",
    height: "60px",
  },
  {
    top: "220px",
    right: "260px",
    width: "20px",
    height: "20px",
  },
  {
    top: "100px",
    right: "300px",
    width: "10px",
    height: "10px",
  },
  {
    top: "100px",
    right: "220px",
    width: "30px",
    height: "30px",
  },
  {
    top: "130px",
    right: "80px",
    width: "100px",
    height: "100px",
  },
  {
    top: "100px",
    right: "30px",
    width: "10px",
    height: "10px",
  },
];
</script>
<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  #canvas {
    position: absolute;
    left: 0;
    top: 0;
  }
  .logo {
    width: 710px;
    height: 320px;
    background: url("~/images/logo.png");
    background-size: cover;
    background-position: center center;
    margin-top: 36px;
    box-sizing: border-box;
    padding: 0 24px;
    cursor: pointer;
    z-index: 1;
  }

  .git-wrap {
    display: flex;
    width: 100%;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.15) 0 20px 15px;
    .icon.youxishoubing {
      font-size: 96px;
      margin-left: 24px;
    }
    .git {
      width: 100%;
      height: 96px;
      background: url("../images/git.png");
      background-position: left;
      background-repeat: no-repeat;
    }
  }

  .describe {
    width: 100%;
    height: 260px;
    background: url("../images/describe.png");
    background-position: center center;
    position: relative;
    background-repeat: no-repeat;
  }
  .list-wrap {
    width: 100%;
    height: 100%;
    padding-left: 24px;
    .item {
      height: 136px;
      background-position: center !important;
      // box-shadow: inset #304b97 0px 0px 60px 2px;
      box-shadow: rgba(0, 0, 0, 0.15) 0 20px 15px;

      border-radius: 6px;
      background-repeat: no-repeat !important;

      &:hover {
        box-shadow: #304b97 0px 0px 10px 2px inset;
        // box-shadow:
        //   0 -0.06em 0.1em hsl(0, 90%, 100%) inset,
        //   0 -0.15em 0.4em hsl(0, 90%, 45%) inset,
        //   0 0.05em 0.05em hsl(0, 90%, 45%) inset,
        //   0.05em 0 0.1em hsl(0, 90%, 100%) inset,
        //   -0.05em 0 0.1em hsl(0, 90%, 100%) inset,
        //   0 0.1em 0.4em hsl(0, 90%, 60%) inset;
      }
      &.go {
        background: url("../images/go.png");
        animation: 0.5s linear 0s infinite alternate go-move;
        cursor: pointer;
        @keyframes go-move {
          from {
            // box-shadow: #f20440 0px 0px 30px 10px;
            box-shadow: rgba(0, 0, 0, 0.15) 0 0px 25px 5px;
          }
          to {
            // box-shadow: #f20440 0px 0px 10px 10px;
            box-shadow: #f20440 0 0px 25px 5px;
          }
        }
      }
      &.axios {
        background: url("../images/axios.png");
      }
      &.pinia {
        background: url("../images/pinia.png");
      }
      &.i18n {
        background: url("../images/i18n.png");
      }
      &.eslint {
        background: url("../images/eslint.png");
      }
      &.prettier {
        background: url("../images/prettier.png");
      }
      &.commitlint {
        background: url("../images/commitlint.png");
      }
      &.stylelint {
        background: url("../images/stylelint.png");
      }
      &.plop {
        background: url("../images/plop.png");
      }
    }
  }

  .bubble {
    background: linear-gradient(#2d2d2d, #731dda);
    border-radius: 50%;
    box-shadow: 0 30px 15px rgba(0, 0, 0, 0.15);
    position: absolute;
    &:nth-child(2n) {
      animation: 0.5s linear 0s infinite alternate bubble-move;
      @keyframes bubble-move {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(0, -10px);
        }
      }
    }

    &:nth-child(2n + 1) {
      animation: 1s linear 0s infinite alternate bubble-move;
      @keyframes bubble-move {
        from {
          transform: translate(0, 20px);
        }
        to {
          transform: translate(10px, 0px);
        }
      }
    }
  }
}
</style>
