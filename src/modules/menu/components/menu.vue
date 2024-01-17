<template>
  <div class="permissions-wrap">
    <div class="tools-wrap">
      <template v-if="editing">
        <el-button
          link
          type="primary"
          :disabled="verifying"
          @click="onIncreaseMenu(null)"
        >
          新增菜单
        </el-button>
        <el-button link type="primary" :disabled="verifying" @click="onSubmit">
          保存更改
        </el-button>
      </template>

      <template v-else>
        <el-tooltip content="更改图标以及可拖拽菜单调整顺序" placement="top">
          <el-button link type="primary" @click="onEditing">
            编辑菜单
          </el-button>
        </el-tooltip>
      </template>
    </div>

    <div class="tree-block">
      <el-tree
        :data="menus"
        :expand-on-click-node="false"
        :allow-drop="allowDrop"
        ref="elTreeRef"
        class="menu-tree"
        node-key="id"
        draggable
      >
        <template #default="{ node, data }">
          <div :class="['menu-tree-node', data.verify && 'verify']">
            <div class="icon">
              <NoIconSelector
                v-model:icon="data.icon"
                v-model:color="data.color"
                :disabled="!editing"
              ></NoIconSelector>
            </div>

            <MenuSelector
              v-model:type="data.type"
              v-model:code="data.code"
              v-model:label="data.label"
              v-model:path="data.path"
              :disabled="!editing"
              :allow-select="!data?.children?.length"
            />
            <div v-if="editing" class="operate-wrap">
              <template v-if="data.verify">
                <el-button
                  link
                  type="primary"
                  @click="onSave(data)"
                  :disabled="isAllowsave(data)"
                  >保存</el-button
                >
              </template>
              <template v-else>
                <el-button
                  v-if="data.type === 'menu'"
                  link
                  type="primary"
                  :disabled="verifying"
                  @click="onIncreaseMenu(data)"
                >
                  新增
                </el-button>
              </template>
              <el-button
                link
                type="primary"
                :disabled="!data.verify && verifying"
                @click="onDelete(node, data)"
              >
                删除
              </el-button>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script lang="ts" setup>
import MenuSelector from "../components/MenuSelector/index.vue";
const editing = ref(false);
const verifying = ref(false);
const elTreeRef = ref();
// 编辑状态
const onEditing = () => {
  editing.value = true;
};
// 提交
const onSubmit = () => {
  editing.value = false;
};
// 新增
const onIncreaseMenu = (data: any) => {
  verifying.value = true;
  const id = Math.floor(Math.random() * 10000);
  const node = {
    id,
    verify: true,
    label: "",
    type: "menu",
    icon: "menu",
    color: "",
    path: "",
  };

  if (data) {
    data.children = data.children || [];
    data.children.push(node);
  } else {
    menus.value.push(node);
  }

  nextTick(() => {
    elTreeRef.value.setCurrentKey(id, true);
  });
};

// 是否允许保存
const isAllowsave = (data: any) => {
  if (data.type === "menu" || data.type === "module") {
    return !data.label;
  } else {
    return !data.label || !data.path;
  }
};
// 保存
const onSave = (data: any) => {
  data.verify = false;
  verifying.value = false;
};

// 删除
const onDelete = (node: any, data: any) => {
  if (data.verify) {
    verifying.value = false;
  }
  let parent = node.parent.data;
  if (parent.children) {
    parent.children = parent.children.filter(
      (item: any) => item.id !== data.id
    );
  } else {
    menus.value = menus.value.filter((item: any) => item.id !== data.id);
  }
};
// 允许拖拽
const allowDrop = (draggingNode: any, dropNode: any, type: any) => {
  if (dropNode.data.type === "menu") {
    return true;
  }
  return false;
};

// 变更类型
const onChange = (data: any) => {
  switch (data.type) {
    case "menu":
      data.icon = "caidan";
      break;
    case "iframe":
      data.icon = "iframe";
      break;
    case "link":
      data.icon = "lianjie";
      break;
    case "module":
      data.icon = "mokuai";
      break;
  }
  data.label = "";
  data.path = "";
  data.verify = true;
  verifying.value = true;
};

// 默认数据
const menus: Ref<any[]> = ref([
  {
    id: 1,
    label: "菜单A",
    type: "menu",
    icon: "caidan",
    color: "",
    children: [
      {
        id: 2,
        label: "菜单A-A",
        type: "menu",
        icon: "caidan",
        color: "",
        children: [
          {
            id: 3,
            label: "内嵌链接",
            type: "iframe",
            path: "www.baidu.com",
            icon: "iframe",
            color: "",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "跳转链接",
    type: "link",
    icon: "lianjie",
    color: "",
    path: "www.baidu.com",
  },
  {
    id: 5,
    type: "module",
    icon: "role",
    color: "",
    label: "角色管理",
    code: "role",
    path: "/role",
  },
  {
    id: 6,
    label: "系统管理",
    type: "menu",
    icon: "caidan",
    color: "",
    children: [
      {
        id: 7,
        type: "module",
        icon: "role",
        color: "",
        label: "角色管理",
        code: "role",
        path: "/role",
      },
      {
        id: 8,
        type: "module",
        icon: "user",
        color: "",
        label: "用户管理",
        code: "user",
        path: "/user",
      },
      {
        id: 9,
        type: "module",
        icon: "set",
        color: "",
        label: "系统设置",
        code: "system-settings",
        path: "/system-settings",
      },
      {
        id: 10,
        type: "module",
        icon: "log",
        color: "",
        label: "系统日志",
        code: "system-log",
        path: "/system-log",
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.permissions-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;

  .tools-wrap {
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tree-block {
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
  }
  .menu-tree {
    border-top: 1px solid;

    :deep(.el-tree-node__content) {
      height: fit-content !important;
      border-bottom: 1px solid;
      border-left: 1px solid;
      border-right: 1px solid;
    }
    .menu-tree-node {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      position: relative;
      box-sizing: border-box;

      .icon {
        margin-right: 12px;
      }

      .operate-wrap {
        margin-left: auto;
        margin-right: 12px;
      }
    }
  }
}
</style>
