<template>
  <div class="login-wrap">
    <div class="special-wrap">
      <no-special></no-special>
    </div>
    <h1 class="title">
      <a
        href="https://github.com/liliiliiilil/No.Vue/tree/element-plus"
        target="_blank"
        >壹贰叁壹</a
      >
    </h1>

    <el-form
      class="form-block"
      label-position="top"
      label-width="100px"
      :model="form"
      style="max-width: 460px"
    >
      <el-form-item :label="$t('login.Account')">
        <el-input
          v-model="form.account"
          :placeholder="$t('global.pleaseInput', { name: $t('login.Account') })"
        />
      </el-form-item>
      <el-form-item :label="$t('login.Password')">
        <el-input
          type="password"
          show-password
          v-model="form.password"
          :placeholder="
            $t('global.pleaseInput', { name: $t('login.Password') })
          "
        />
        <el-text style="margin-left: auto">
          {{ $t("login.ForgotPassword") }}</el-text
        >
      </el-form-item>
      <el-form-item class="operate-button">
        <el-button type="primary" @click="onLogin"
          >{{ $t("login.Login") }}
        </el-button>
        <el-button type="primary" plain>
          {{ $t("login.Register") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
const form = reactive({
  account: "admin",
  password: "admin2023",
});
const router = useRouter();
const onLogin = () => {
  router.replace("/helloworld");
};
</script>
<style lang="scss" scoped>
.login-wrap {
  border: 6px solid var(--el-color-primary);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .special-wrap {
    position: absolute;
    top: 10px;
    right: 24px;
  }
  .title {
    margin-bottom: 24px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    font-weight: bolder;
    padding: 0 12px;
    color: var(--el-color-primary);
    user-select: none;
    &:hover {
      border-bottom: 2px solid var(--el-color-primary);
    }
  }
  .form-block {
    width: 60%;
    margin-bottom: 24px;
    .operate-button {
      .el-button {
        width: 100%;
      }
      .el-button + .el-button {
        margin-left: 0px;
        margin-top: 12px;
      }
    }
  }
}
</style>
