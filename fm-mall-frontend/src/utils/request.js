import axios from 'axios'

const request = axios;

request.interceptors.request.use(
  function (config) {
    // console.log({config})
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default {
  get: function (url, params) {
    return new Promise((resolve) => {
      request.get(url, {
          params: params,
        })
        .then((response) => {
          resolve(response);
        })
        .catch(() => {
          // 接受响应拦截器中Promise.reject(response)，如果不需要对错误信息进行操作可以不用返回 reject(err)
          // reject(err);
        });
    });

  },
  post: function (url, data, headers) {
    return new Promise((resolve) => {
      request.post(url, data, {
          headers: headers || {
            "Content-Type": "application/json",
          },
        })
        .then(
          (response) => {
            resolve(response);
          },
          () => {
            // reject(err);
          }
        );
    });
  },
  delete: function (url, data, ) {
    return new Promise((resolve) => {
      request.delete(url + '' + data)
        .then(
          (response) => {
            resolve(response);
          },
          () => {
            // reject(err);
          }
        );
    });
  },
  put: function (url, data) {
    return new Promise((resolve) => {
      request.put(url, data)
        .then(
          (response) => {
            resolve(response);
          },
          () => {
            // reject(err);
          }
        );
    });
  },

}