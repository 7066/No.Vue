<template>
  <div
    :class="['menu-selector ignore-', disabled && 'disabled']"
    :tabindex="disabled ? 'null' : '-1'"
  >
    <template v-if="disabled">
      <div class="el-input__wrapper">
        {{ label }}
      </div>
      <div class="el-input__wrapper" v-if="type !== 'menu'">
        {{ path }}
      </div>
    </template>
    <template v-else>
      <el-select
        v-model="type"
        placeholder="type"
        :disabled="!allowSelect"
        @change="onTypeChange"
      >
        <el-option label="菜单目录" value="menu" />
        <el-option label="内嵌链接" value="iframe" />
        <el-option label="外部跳转" value="link" />
        <el-option label="内置模块" value="module" />
      </el-select>
      <el-select
        v-if="type === 'module'"
        v-model="code"
        placeholder="Select"
        @change="onModuleChange"
      >
        <el-option
          v-for="item in store.modules"
          :label="item.label"
          :value="item.code"
          value-key="code"
          :key="item.code"
        />
      </el-select>
      <el-input v-else v-model="label" placeholder="label"> </el-input>
      <el-input
        v-if="type !== 'menu'"
        :readonly="type === 'module'"
        v-model="path"
        placeholder="path"
      >
      </el-input>
    </template>
  </div>
</template>

<script lang="ts" setup>
const store = usePermissionsStore();
const props = defineProps([
  "type",
  "code",
  "path",
  "label",
  "allowSelect",
  "disabled",
]);
const emit = defineEmits([
  "update:type",
  "update:code",
  "update:path",
  "update:label",
]);

const type = computed({
  get() {
    return props.type;
  },
  set(value) {
    emit("update:type", value);
  },
});

const code = computed({
  get() {
    return props.code;
  },
  set(value) {
    emit("update:code", value);
  },
});

const path = computed({
  get() {
    return props.path;
  },
  set(value) {
    emit("update:path", value);
  },
});

const label = computed({
  get() {
    return props.label;
  },
  set(value) {
    emit("update:label", value);
  },
});

const onTypeChange = () => {
  label.value = "";
  code.value = "";
  path.value = "";
};

const onModuleChange = (code: string) => {
  store.modules.forEach((item) => {
    if (item.code === code) {
      label.value = item.label;
      path.value = item.path;
    }
  });
};
</script>
<style lang="scss" scoped>
.menu-selector {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  overflow: hidden;
  border-right: none;
  overflow: hidden;
  &.ignore- {
    height: 36px;
    :deep(.el-input__wrapper) {
      height: 32px;
    }
  }

  &:focus {
    border: 1px solid var(--el-color-primary);
  }
  :deep(.el-input__wrapper) {
    width: 136px;
    box-shadow: none;
    border-right: 1px solid var(--el-border-color);
    border-radius: 0;
  }
}
</style>
