<template>
  <div class="tags-wrap">
    <el-tag
      v-for="(tag, key) in tags"
      :key="key"
      :type="type === tag.key ? 'primary' : 'info'"
      size="large"
      closable
      @click="onClick(tag)"
      @close="onClose(tag)"
    >
      <template v-if="tag.icon in ELEMENTIcons">
        <el-icon>
          <component :is="(ELEMENTIcons as any)[tag.icon]"></component>
        </el-icon>
      </template>
      {{ $t(tag.code + ".code") }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import * as ELEMENTIcons from "@element-plus/icons-vue";
// 页签
const tags: any = ref({});
// 高亮
const type = ref("");
// 当前路由信息
const route = useRoute();

const updateTags = () => {
  sessionStorage.setItem("TAGS", JSON.stringify(tags.value));
};

watch(
  route,
  (v) => {
    // 获取本地持久化存储
    const TAGS = JSON.parse(sessionStorage.getItem("TAGS") || "{}");
    // 初始化, 应对页面刷新
    tags.value = TAGS;

    // 获取当前路由的父级路由信息
    const item = v.matched.at(0) as any;
    // 如果不是无权限路由则加到页签
    if (item && item.meta.code !== "auto") {
      // 设置当前高亮展示的页签
      type.value = item.path;
      // 存储父级路由为 key, 子级路由为 value, 父级路由地址作为唯一标识
      tags.value[item.path] = Object.assign({}, item.meta, {
        key: item.path,
        // path: (v.matched.at(v.matched.length - 1) as any).path,
        path: route.path,
      });

      updateTags();
    }
  },
  {
    immediate: true,
  },
);

const onClick = (tag: any) => {
  router.push(tag.path);
};

const onClose = (tag: any) => {
  const keys = Object.keys(tags.value);
  // 捕获父级 key, 因为 TAGS 存储的是 父级路由key: 当前路由地址
  const item = route.matched.at(0) as any;

  if (tag.key in tags.value) {
    if (keys.length > 1) {
      // 表示删除的是当前路由
      if (item.path === tag.key) {
        // 删除
        delete tags.value[tag.key];
        // 获取当前剩余第一个页签
        const _t: any = Object.keys(tags.value).at(0);
        // 获取路由地址
        const path = tags.value[_t].path;
        // 跳转路由
        router.replace(path);
      } else {
        // 删除
        delete tags.value[tag.key];
      }
    }
    updateTags();
  }
};
</script>

<style lang="scss" scoped>
.tags-wrap {
  display: flex;
  .el-tag {
    margin-right: 6px;
    cursor: pointer;
    :deep(.el-tag__content) {
      display: flex;
      align-items: center;
      .el-icon {
        margin-right: 6px;
      }
    }
  }
}
</style>
