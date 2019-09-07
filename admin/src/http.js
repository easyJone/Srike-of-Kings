//引入axios,创建新实例并设置baseURL：此url为请求的基础地址，注意在app.listen中监听相应的端口号。
import axios from 'axios';

const http = axios.create({
  baseURL: "http://localhost:3000/admin/api"
})

export default http;