<template>
  <div class="m-module-wrap">
    <div class="tools-wrap">
      <el-button
        link
        type="primary"
        @click="onIncreaseModule(null)"
        :disabled="lock || editing"
        >新增模块</el-button
      >
    </div>

    <el-table
      class="module-table"
      :data="modules"
      border
      default-expand-all
      row-key="code"
      style="width: 100%"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="label" fixed label="名称" width="200">
        <template #default="scope">
          <div v-if="scope.row.new" class="new-cell">
            <el-input v-model="scope.row.label"></el-input>
          </div>
          <template v-else>
            {{ scope.row.label }}
            <el-tooltip
              v-if="scope.row.redirect"
              content="默认跳转"
              placement="top"
            >
              <el-text type="success" size="small">
                <el-icon><Icon-Promotion /></el-icon>
              </el-text>
            </el-tooltip>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="Code" width="160">
        <template #default="scope">
          <div v-if="scope.row.new" class="new-cell">
            <el-input :disabled="lock" v-model="scope.row.code"></el-input>
          </div>
          <template v-else>
            {{ scope.row.code }}
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="path" label="路由">
        <template #default="scope">
          <template v-if="scope.row.new">
            <el-input :disabled="lock" v-model="scope.row.path"></el-input>
          </template>
          <template v-else>
            {{ scope.row.path }}
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="组件">
        <template #default="scope">
          <template v-if="scope.row.new">
            <el-input :disabled="lock" v-model="scope.row.url"></el-input>
          </template>
          <template v-else>
            {{ scope.row.url }}
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="permission" label="关联权限" width="200">
        <template #default="scope">
          <el-checkbox-group
            v-if="scope.row.superior"
            v-model="scope.row.permission"
            :disabled="!scope.row.new"
            :min="1"
          >
            <el-checkbox label="use">操作</el-checkbox>
            <!-- <el-checkbox label="view">查看</el-checkbox> -->
          </el-checkbox-group>
          <div v-else>-</div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <template v-if="scope.row.new">
            <el-button
              link
              type="primary"
              size="small"
              :disabled="
                !scope.row.label ||
                !scope.row.code ||
                !scope.row.path ||
                !scope.row.url
              "
              @click="onSave(scope.row)"
            >
              保存
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              :disabled="lock"
              @click="onDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
          <template v-else>
            <el-button
              link
              type="primary"
              size="small"
              @click="onIncreaseModule(scope.row)"
              :disabled="lock || editing"
              >新增</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="onEdit(scope.row)"
              :disabled="editing"
              >修改</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="onDelete(scope.row)"
              :disabled="lock || editing"
              >删除</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
// 锁
const lock = ref(false);

const editing = ref(false);
const modules: Ref<any[]> = ref([
  {
    label: "角色管理",
    code: "role",
    path: "/role",
    url: "role/views/index",
  },
  {
    label: "用户管理",
    code: "user",
    path: "/user",
    url: "user/views/index",
  },
  {
    label: "系统设置",
    code: "system-settings",
    path: "/system-settings",
    url: "system-settings/views/index",
  },
  {
    label: "系统日志",
    code: "system-log",
    path: "/system-log",
    url: "system-log/views/index",
    children: [
      {
        superior: "system-log-home",
        redirect: true,
        label: "日志首页",
        code: "system-log-home",
        path: "/system-log/home",
        url: "system-log/views/home",
        permission: ["view"],
      },
      {
        superior: "system-log",
        label: "日志详情",
        code: "system-log-details",
        path: "/system-log/details/:id",
        url: "system-log/views/details",
        permission: ["view"],
      },
    ],
  },
]);
const onIncreaseModule = (row: any) => {
  if (row) {
    row.children = row.children || [];
    row.children.push({
      redirect: !row.children.length,
      superior: row.code,
      label: "",
      code: "",
      path: "",
      url: "",
      permission: ["use"],
      new: true,
    });
  } else {
    modules.value.push({
      label: "",
      code: "",
      path: "",
      url: "",
      new: true,
    });
  }

  editing.value = true;
};
const store = usePermissionsStore();
const onSave = (row: any) => {
  row.new = false;
  editing.value = false;
  if (lock.value) {
    store.modules = modules.value;
  }
};
const onEdit = (row: any) => {
  row.new = true;
  editing.value = false;
};
const onDelete = (row: any) => {
  row.new = false;
  editing.value = false;
  if (row.superior) {
    depDelete(modules.value, row, row.superior);
  } else {
    modules.value = modules.value.filter(({ code }) => code !== row.code);
  }
};

const depDelete = (arr: any[], row: any, superior: string) => {
  arr.forEach((el) => {
    if (el.code === superior) {
      el.children = el.children.filter(({ code }: any) => code !== row.code);
    }
    if (el.children && el.children.length) {
      depDelete(el.children, row, superior);
    }
  });
};
</script>

<style lang="scss" scoped>
.m-module-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .tools-wrap {
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .module-table {
    .new-cell {
      width: 140px;
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
