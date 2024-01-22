<script setup lang="ts">
const loginStore = useLoginStore();
const onClick = () => {
  loginStore.user = "222222";
};
</script>
<template>
  home

  {{ loginStore.user }}

  <div @click="onClick">ffff</div>
</template>

<style lang="scss" scoped>
.b {
  color: red;
}
</style>
