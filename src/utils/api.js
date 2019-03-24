import axios from "axios";

// ローカル開発環境でSwagger Hubと接続する際の設定
// export default
let axiosInstance = axios.create({
  baseURL: "http://localhost:8080"
  // headers: {
  //   "Content-Type": "application/json;charset=utf-8",
  //   "X-Xss-Protection": "1; mode=block",
  //   Accept: "application/json",
  // },
  // responseType: "json"
});

axiosInstance.interceptors.response.use(res => {
  if (!res.status) {
    throw new Error("通信エラーが発生しています");
  } else if (res.status === 200) {
    return res;
  } else if (res.status === 400) {
    throw new Error(res.statusText);
  } else if (res.status === 404) {
    // 404ページに飛ばす
    throw new Error("該当リソースが存在しません。");
  } else if (res.status === 409) {
    // メッセージ未定
    throw new Error("未定");
  } else if (res.status === 429) {
    // メッセージ未定
    throw new Error("未定");
  } else if (res.status === 500) {
    // ダイアログ表示
    throw new Error(res.statusText);
  } else {
    throw new Error("例外のエラーが発生しています。");
  }
});

export default axiosInstance;
