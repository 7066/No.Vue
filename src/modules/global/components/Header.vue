<template>
  <div class="no-component no-header">
    <h2 class="title">No.Vue</h2>
    <div class="special-wrap">
      <no-special></no-special>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.no-component.no-header {
  width: 100%;
  height: 100%;
  position: relative;
  border-bottom: 2px solid var(--border-color);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  .special-wrap {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>
