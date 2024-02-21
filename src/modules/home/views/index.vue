<template>
  <div class="home-wrap">
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="block">
          <h2 class="title">数据共享</h2>
          <div>
            <div style="display: inline-block; margin-right: 24px">
              <el-statistic title="青龙 Count" :value="_example2.count" />
              <el-button type="primary" plain @click="_example2.count += 1">
                + Count</el-button
              >
            </div>
            <div style="display: inline-block">
              <el-statistic title="朱雀 Count" :value="_example1.count" />
              <el-button type="primary" plain @click="_example1.count += 1">
                + Count</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="block">
          <h2 class="title">按钮权限</h2>

          <div>
            <el-button
              type="primary"
              :icon="Edit"
              circle
              :disabled="!editable"
            />
            <el-button
              type="primary"
              :icon="Download"
              circle
              :disabled="!exportable"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="block">
          <h2 class="title">更多主题</h2>
          <el-button type="primary" @click="onCrazy">Crazy</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="block">
          <h2 class="title">路由模式</h2>
          <div>
            <el-button
              type="primary"
              :plain="_global.mode !== 'staticMatch'"
              @click="onMode('staticMatch')"
              >前端路由</el-button
            >
            <el-button
              type="primary"
              :plain="_global.mode !== 'dynamicLoad'"
              @click="onMode('dynamicLoad')"
              >后端路由</el-button
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { Edit, Download } from "@element-plus/icons-vue";
const _global = useGlobalStore();
const _example1 = useExample1Store();
const _example2 = useExample2Store();
const editable = isAllowed("home", "edit");
const exportable = isAllowed("home", "export");
const theme = useTheme();
const onCrazy = () => {
  theme.value = "crazy";
};
const onMode = (mode: "staticMatch" | "dynamicLoad") => {
  _global.mode = mode;
  localStorage.setItem("MODE", mode);
  router.go(0);
};
</script>
<style lang="scss" scoped>
.home-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .el-row {
    width: 100%;
    height: 100%;
    .el-col {
      margin: 12px 0;
    }
    .block {
      width: 100%;
      height: 60%;
      text-align: center;
      padding-bottom: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
