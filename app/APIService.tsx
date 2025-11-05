// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios, { AxiosResponse } from 'axios';

// // ⚙️ Cấu hình URL chung
// const API_URL = "http://192.168.1.28:8082/api";

// // ==================== TOKEN ====================
// async function getToken() {
//   return await AsyncStorage.getItem('jwt-token');
// }

// // ==================== AXIOS INSTANCE ====================
// const api = axios.create({
//   baseURL: API_URL,
//   headers: { 'Content-Type': 'application/json' },
// });

// // 🧠 Interceptor gắn token tự động (nếu có)
// api.interceptors.request.use(async (config) => {  
//   const token = await AsyncStorage.getItem('jwt-token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;  // ✅ Đúng với backend của bạn
//   }
//   return config;
// });

// // ==================== HÀM CHUNG ====================
// export async function callApi(
//   endpoint: string,
//   method: string,
//   data: any = null
// ): Promise<AxiosResponse<any>> {
//   const token = await getToken(); // 🧠 Lấy token trực tiếp mỗi lần gọi
//   const config = {
//     method,
//     url: `${API_URL}/${endpoint}`,
//     data,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token ? `Bearer ${token}` : '', // 🧩 Thêm token vào đây
//     },
//   };

//   try {
//     const res = await axios(config);
//     return res;
//   } catch (err: any) {
//     console.error(`❌ Lỗi API [${method}] ${endpoint}:`, err.response?.data || err.message);
//     throw err;
//   }
// }

// export function GET_ALL(endpoint: string) {
//   return callApi(endpoint, "GET");
// }

// export function GET_ID(endpoint: string, id: string | number) {
//   return callApi(`${endpoint}/${id}`, "GET");
// }

// export function POST_ADD(endpoint: string, data: any) {
//   return callApi(endpoint, "POST", data);
// }

// export function PUT_EDIT(endpoint: string, data: any) {
//   return callApi(endpoint, "PUT", data);
// }

// export function DELETE_ID(endpoint: string, id: string | number) {
//   return callApi(`${endpoint}/${id}`, "DELETE");
// }

// // ==================== LOGIN ====================
// export async function POST_LOGIN(email: string, password: string): Promise<boolean> {
//   try {
//     const res = await api.post("/login", { email, password });
//     const token = res.data["jwt-token"] || res.data.token;

//     if (token) {
//       await AsyncStorage.setItem("jwt-token", token);
//       await AsyncStorage.setItem("user-email", email); // ✅ thêm dòng này
//       console.log("✅ Đăng nhập thành công, token đã lưu:", token);
//       console.log("✅ Lưu email:", email);
//       return true;
//     } else {
//       console.warn("⚠️ Phản hồi login không có token:", res.data);
//       return false;
//     }
//   } catch (error: any) {
//     console.error("❌ Login error:", error.response?.data || error.message);
//     return false;
//   }
// }

// // ==================== ẢNH ====================
// export function GET_IMG(endpoint: string, imgName: string): string {
//   return `${API_URL}/public/image/${endpoint}/image/${imgName}`;
// }

// export async function GET_IMG_BASE64(endpoint: string, imgName: string): Promise<string | null> {
//   try {
//     const token = await getToken();
//     const res = await axios.get(`${API_URL}/image/${endpoint}/${imgName}`, {
//       headers: { Authorization: token ? `Bearer ${token}` : '' },
//       responseType: 'arraybuffer',
//     });

//     const base64 = `data:image/jpeg;base64,${Buffer.from(res.data, 'binary').toString('base64')}`;
//     return base64;
//   } catch (error) {
//     console.error('GET_IMG_BASE64 error:', error);
//     return null;
//   }
// }

// // ==================== GIỎ HÀNG ====================

// // 🛒 Lấy danh sách sản phẩm trong giỏ
// // ==================== GIỎ HÀNG ====================
// ======================= APIService.js =======================
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

const API_URL = "http://192.168.1.28:8082/api/";

// ==================== TOKEN ====================
async function getToken() {
  return await AsyncStorage.getItem("jwt-token");
}

// ==================== HÀM CHUNG ====================
export async function callApi(
  endpoint: string,
  method: string = "GET",
  data: any = null
): Promise<AxiosResponse<any>> {
  const token = await getToken();
  const url = `${API_URL}${endpoint}`;
  const headers: any = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  console.log(`📡 [${method}] ${url}`);
  if (data) console.log("📦 Data gửi lên:", data);
  if (token) console.log("🔑 Token:", token.substring(0, 20) + "...");

  try {
    const config: any = { method, url, headers };
    if (data) config.data = data;
    const res = await axios(config);
    console.log("✅ Kết quả API:", res.status, res.data);
    return res;
  } catch (error: any) {
    console.error(
      "❌ Lỗi API:",
      error.response?.status,
      error.response?.data || error.message
    );
    throw error;
  }
}

// ==================== GET ====================
export function GET(endpoint: string, id?: string): Promise<AxiosResponse<any>> {
  return callApi(id ? `${endpoint}/${id}` : endpoint, "GET");
}

// ==================== GET_ID ====================
export function GET_ID(endpoint: string, id: string | number): Promise<AxiosResponse<any>> {
  return callApi(`${endpoint}/${id}`, "GET");
}

// ==================== POST ====================
export function POST(endpoint: string, data: any): Promise<AxiosResponse<any>> {
  return callApi(endpoint, "POST", data);
}

// ==================== PUT ====================
export function PUT(endpoint: string, data: any): Promise<AxiosResponse<any>> {
  return callApi(endpoint, "PUT", data);
}

// ==================== DELETE ====================
export function DELETE(endpoint: string, id: string): Promise<AxiosResponse<any>> {
  return callApi(`${endpoint}/${id}`, "DELETE");
}

// ==================== GET_IMG ====================
export function GET_IMG(folder: string, imgName: string): string {
  if (!imgName) return `${API_URL}public/default.jpg`;
  return `${API_URL}public/${folder}/image/${imgName}`;
}

// ==================== LOGIN ====================
export async function POST_LOGIN(email: string, password: string): Promise<boolean> {
  try {
    console.log("🔐 Đang đăng nhập:", email);
    const res = await axios.post(`${API_URL}login`, { email, password });
    const token = res.data["jwt-token"] || res.data.token;

    if (token) {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("jwt-token", token);
      await AsyncStorage.setItem("user-email", email);
      console.log("✅ Đăng nhập thành công:", token.substring(0, 25) + "...");
      return true;
    } else {
      console.warn("⚠️ Phản hồi không có token:", res.data);
      return false;
    }
  } catch (error: any) {
    console.error("❌ Login error:", error.response?.data || error.message);
    return false;
  }
}
