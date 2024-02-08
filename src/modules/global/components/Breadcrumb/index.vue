<template>
  <div class="breadcrumb-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(_r, key) in matched"
        :key="key"
        :to="{ path: _r.path }"
      >
        <template v-if="_r.meta.code">
          {{ $t(_r.meta.code + ".code") }}
        </template>
        <template v-else>
          {{ _r.meta.label }}
        </template>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const matched = computed(() => route.matched);
</script>

<style lang="scss" scoped>
.breadcrumb-wrap {
  margin-bottom: 12px;
}
</style>
