<template>
  <div class="example1-wrap">
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
          <h2 class="title">接口代理请求</h2>

          <div>
            <el-button type="primary" @click="onSuccess"> 成功示例</el-button>
            <el-button type="warning" @click="onWarning"> 失败示例</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { Edit, Download } from "@element-plus/icons-vue";
import { api_search, api_search2 } from "@/example1/service";
const _example1 = useExample1Store();
const _example2 = useExample2Store();
const editable = isAllowed("example1", "edit");
const exportable = isAllowed("example1", "export");
const onSuccess = () => {
  api_search().then(() => {
    ElMessage.success("请求成功. 请在控制台 Network 查看");
  });
};

const onWarning = () => {
  api_search2().then(() => {
    // ElMessage.success("请求成功. 请在控制台 Network 查看");
  });
};
</script>
<style lang="scss" scoped>
.example1-wrap {
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
