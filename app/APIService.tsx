
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
  //  if (token && !endpoint.startsWith("public/")) {
  //   headers.Authorization = `Bearer ${token}`;
  // }
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
export async function DELETE_CART_PRODUCT(
  cartId: number,
  productId: number
): Promise<AxiosResponse<any>> {
  const token = await AsyncStorage.getItem("jwt-token");
  const url = `${API_URL}public/carts/${cartId}/product/${productId}`;
  const headers: any = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  console.log("📡 DELETE:", url);
  if (token) console.log("🔑 Token:", token.substring(0, 25) + "...");

  try {
    const res = await axios.delete(url, { headers });
    console.log("✅ Xóa thành công:", res.status);
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

