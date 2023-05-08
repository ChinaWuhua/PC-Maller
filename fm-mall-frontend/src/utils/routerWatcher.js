import store from "@/store/index"
import { ElMessage } from "element-plus";
export default (to, from, next) => {
  if (to?.meta?.authorisation === false) {
    next();
    return ;
  } else if (!store?.state?.user?.userinfo?.id) {
    if (from?.name) {
      ElMessage({
        message: "您暂无权限访问此页面",
        type: "warning",
      });
      return;
    }
    next('/login')
    return;
  }
  // 权限处理
  next()
}