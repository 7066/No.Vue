<script setup lang="ts">
import { getUserInfo, history } from "@/login/service";

// const locale = useLocale();
const route = useRoute();
console.log(route, "router??--");
const theme = useTheme();
const onLLL = () => {
  //   locale.value = "zh";
  theme.value = "light";
};

const onEEE = () => {
  //   locale.value = "en";
  theme.value = "dark";
};

const onTTT = () => {
  //   locale.value = "tw";
  theme.value = "red";
};
const onAxios = () => {
  getUserInfo().then((resp: any) => {
    console.log(resp, "??");
  });
  history().then((resp: any) => {
    console.log(resp, "??");
  });
};
</script>
<template>
  <p v-t="{ path: 'login.hi', args: { name: '王总' } }"></p>

  <i18n-t keypath="login.info" tag="p">
    <template v-slot:action>
      <a
        target="_blank"
        :href="'http://www.baidu.com'"
        v-t="{ path: 'login.change' }"
      ></a>
    </template>
    <template v-slot:limit>
      <span>2222</span>
    </template>
  </i18n-t>

  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary" @click="onEEE">toEN</el-button>
    <el-button type="primary" @click="onLLL">toZH</el-button>
    <el-button type="primary" @click="onTTT">toTW</el-button>
    <el-button type="success" @click="onAxios">getUserInfo</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <icon-Compass />

  <el-icon size="36"><icon-CaretLeft /></el-icon>
</template>

<style scoped></style>
