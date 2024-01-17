<template>
  <!-- 作布局拦截 -->
  <div :class="['global-wrap', single && 'single', topic]">
    <!-- 单布局 -->
    <template v-if="single">
      <router-view v-slot="{ Component, route }">
        <suspense>
          <template #default>
            <div class="module-wrap">
              <component class="module" :is="Component" :key="route.path" />
            </div>
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </router-view>
    </template>

    <!-- 内容布局 -->
    <template v-else>
      <el-container style="width: 100%; height: 100%">
        <el-header height="40px" style="padding: 0">
          <Header />
        </el-header>
        <el-container style="width: 100%; height: 100%; overflow: hidden">
          <Aside />
          <el-container style="width: 100%; height: 100%">
            <el-header height="50px">
              <!-- <no-navigation></no-navigation> -->
            </el-header>
            <el-main style="padding: 12px; padding-top: 0">
              <router-view v-slot="{ Component, route }">
                <suspense>
                  <template #default>
                    <div class="module-wrap">
                      <component
                        class="module"
                        :is="Component"
                        :key="route.path"
                      />
                    </div>
                  </template>
                  <template #fallback> Loading... </template>
                </suspense>
              </router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </template>
  </div>
</template>
<script lang="ts" setup>
import Header from "../components/Header.vue";
import Aside from "../components/Aside/index.vue";
const topic = useTopic();
const route = useRoute();
const single = computed(() =>
  ["login"].some((path) => route.path.includes(path))
);
</script>

<style lang="scss" scoped>
.global-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: var(--el-text-color-primary);
  .module-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  &.sunny {
    background-color: #fff;
  }
  &.night {
    background-color: #000;
  }
}
</style>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  font-size: 16px;
  :focus-visible {
    outline: none;
  }
  .global-wrap .module-wrap .module {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 12px;
    overflow: hidden;
  }
}
</style>
