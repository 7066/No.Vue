import { Ref, ref, watch, readonly } from "vue";
/** @_target - 当前主题, 采用 Ref 便于监听用户改变 */
const _target: Ref<any> = ref("");

/** @_themes - 当前系统支持的主题列表, 由接口获取, 文件可放置在 public/_themes, 采用异步加载 */
const _themes: Ref<Set<string>> = ref(new Set([]));

/** @_loaded - 缓存当前页面已加载过的主题, 防止重复加载 */
const _loaded: Set<any> = new Set([]);

/** @_code - 标识, 用于指示触发 _target 改变的来源 0 用户操作, 1 初始化, -1 监听函数 */
let _code = 0; // 仅用于处理文件内逻辑判断

/** @watch 监听变化 */
watch(_target, (_) => {
  if (_themes.value.has(_)) {
    lazy_loading(_);
  } else ElMessage.warning("该主题暂未实现");
});

/** @hooks 获取当前主题代理, 可更改 */
export const useTheme = (): typeof _target => _target;
/** @hooks 获取所有主题列表, 只读 */
export const getThemes = () => readonly(_themes);
/** @hooks 初始化 */
export const INIT_THEME = () => {
  console.info("初始化主题");
  // 获取当前系统是否是暗色主题
  const _system = window.matchMedia("(prefers-color-scheme: dark)");
  // 接口请求
  return request
    .get("/api/themes", { headers: { openApi: true } })
    .then((_data: any) => {
      _data.forEach((_a: string) => {
        // 添加主题列表
        _themes.value.add(_a);
      });

      // 获取用户持久化设置
      const local = localStorage.getItem("THEME");

      _code = 1; // 标记初始化触发

      // 当用户首次登录, 或跟随系统主题时
      if (!local || local === "auto") {
        // 首次登录, 跟随系统主题
        if (!local) localStorage.setItem("THEME", "auto");
        // 跟随系统设置 深色 主题
        if (_system.matches) _target.value = "dark";
        // 跟随系统设置 亮色 主题
        else _target.value = "light";
      } else {
        // 用户已经选择了主题时
        _target.value = local;
      }

      console.log(_target.value, "-");
    });
};

/** @异步加载文件 */
function lazy_loading(_: string) {
  /** @如果文件已加载 设置主题 */
  if (_loaded.has(_)) return set_theme(_);

  /** @如果文件未加载 */

  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "/themes/" + _ + "_variable.css";
  // link.href = import.meta.env.BASE_URL + "_themes/" + _ + "_variable.css";
  document.head.appendChild(link);
  // 标记该主题已加载
  _loaded.add(_);
  // 设置主题
  set_theme(_);
}

/** @设置主题 */
function set_theme(_: any) {
  document.documentElement.className = _;

  // 获取当前系统是否是暗色主题
  const _system = window.matchMedia("(prefers-color-scheme: dark)");

  // 获取当前的主题存储 local
  const local = localStorage.getItem("THEME");
  if (
    (_system.matches === true && _ === "dark") ||
    (_system.matches === false && _ === "light")
  ) {
    // A: 本地持久化的主题与当前系统主题一致 在初始化时有两种情况
    // A-1: 初始化时, local 就是 auto, 表示与系统一致 - 监听系统主题变化
    // A-2: 初始化时, local 不是 auto, 恰好与系统一致 - 不监听系统主题变化
    if (_code === 1 && local === "auto") {
      _system.addEventListener("change", onChange);
    }
    // B: 本地持久化的主题与当前系统主题一致 在改变时有两种情况
    // B-1: 监听触发, 不改变本地持久化的主题, 且无需重复设置监听
    // B-2: 用户触发, 设置本地持久化的主题与系统一致, 且设置监听
    if (_code === 0) {
      localStorage.setItem("THEME", "auto");
      _system.addEventListener("change", onChange);
    }
  } else {
    // C: 本地持久化的主题与当前系统主题不一致
    // C-1: 设置本地持久化
    // C-2: 当触发时, 本地持久化为跟随系统时, 需要移除监听事件
    localStorage.setItem("THEME", _);
    if (local === "auto") {
      _system.removeEventListener("change", onChange);
    }
  }
  // 重置触发标记为用户触发
  _code = 0;
}
function onChange(event: any) {
  // 标记监听触发
  _code = -1;
  if (event.matches) {
    _target.value = "dark";
  } else {
    _target.value = "light";
  }
}
