import { DELETE, GET, GET_IMG, POST } from "@/app/APIService"; // ✅ thêm DELETE
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CartScreen() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // ✅ Hàm tải giỏ hàng
  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt-token");
      const email = await AsyncStorage.getItem("user-email");
      const cartId = await AsyncStorage.getItem("cart-id");

      if (!email || !cartId) {
        Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng hoặc giỏ hàng.");
        return;
      }

      const endpoint = `public/users/${encodeURIComponent(email)}/carts/${cartId}`;
      const res = await GET(endpoint);
      setCart(res.data);
    } catch (err: any) {
      console.error("❌ Lỗi tải giỏ hàng:", err.response?.data || err.message);
      Alert.alert("Lỗi", "Không thể tải giỏ hàng!");
    } finally {
      setLoading(false);
    }
  };
  const handlePayment = async () => {
    try {
      const email = await AsyncStorage.getItem("user-email");
      const cartId = await AsyncStorage.getItem("cart-id");

      if (!email || !cartId) {
        Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng hoặc giỏ hàng.");
        return;
      }

      const paymentMethod = "vnpay"; // bạn có thể thay "momo" nếu backend hỗ trợ

      const endpoint = `public/users/${encodeURIComponent(email)}/carts/${cartId}/payments/${paymentMethod}/order`;

      console.log("💳 Gửi request thanh toán:", endpoint);

      const res = await POST(endpoint, {}); // body rỗng
      console.log("✅ Kết quả thanh toán:", res.data);

      // Nếu backend trả về URL thanh toán VNPAY
      if (res.data.paymentUrl) {
        Linking.openURL(res.data.paymentUrl); // mở web thanh toán
      } else {
        Alert.alert("Đơn hàng đã được tạo!", "Thanh toán bằng VNPAY đang xử lý.");
      }
    } catch (error: any) {
      console.error("❌ Lỗi thanh toán:", error.response?.data || error.message);
      Alert.alert("Lỗi", "Không thể thực hiện thanh toán, vui lòng thử lại!");
    }
  };

  // ✅ Hàm xóa sản phẩm khỏi giỏ hàng
  const handleDelete = async (productId: number) => {
    try {
      const cartId = await AsyncStorage.getItem("cart-id");
      if (!cartId) {
        Alert.alert("Lỗi", "Không tìm thấy cartId!");
        return;
      }

      console.log("🧩 cartId:", cartId);
      console.log("🧩 productId:", productId);

      Alert.alert(
        "Xác nhận",
        "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Xóa",
            style: "destructive",
            onPress: async () => {
              try {
                // ✅ chỉ truyền phần gốc, id là productId
                const baseEndpoint = `public/carts/${cartId}/product`;
                console.log("🚀 Gửi DELETE:", `${baseEndpoint}/${productId}`);

                const res = await DELETE(baseEndpoint, productId.toString());
                console.log("✅ Kết quả xóa:", res.data);

                await fetchCart();
                Alert.alert("Thành công", "Sản phẩm đã được xóa khỏi giỏ hàng!");
              } catch (err: any) {
                console.error("❌ Lỗi khi gọi DELETE:", err.response?.data || err.message);
                Alert.alert("Lỗi", "Không thể xóa sản phẩm khỏi giỏ hàng.");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("❌ Lỗi ngoài try:", error);
    }
  };

  // ✅ Khi vào lại màn hình sẽ tự load giỏ hàng
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchCart();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F41BB" />
      </View>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="cart-outline" size={60} color="#ccc" />
        <Text style={{ fontSize: 16, color: "#999", marginTop: 10 }}>
          Giỏ hàng của bạn đang trống
        </Text>
      </View>
    );
  }

  const total = cart.totalPrice || 0;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
        <Text style={styles.itemCount}>{cart.products.length} items</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={cart.products}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 220 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: GET_IMG("products", item.image || "noimage.png") }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.productName}</Text>
              <Text style={styles.size}>Qty: {item.quantity}</Text>
              <View style={styles.actions}>
                <Text style={styles.price}>
                  {(item.specialPrice || item.price).toLocaleString()} VNĐ
                </Text>

                {/* Nút XÓA */}
                <TouchableOpacity onPress={() => handleDelete(item.productId)}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.bottomBar}>
        <View style={styles.footer}>
          <View>
            <Text style={styles.subtotalLabel}>Total</Text>
            <Text style={styles.subtotal}>{total.toLocaleString()} VNĐ</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() =>
              router.push({
                pathname: "/(payments)/payment",
                params: { total: total.toString() },
              })
            }
          >
            <Text style={styles.checkoutText}>Buy</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>


        </View>

        {/* Navbar */}
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push("/(home)/hometab")}
          >
            <Ionicons name="home" size={24} color="#1F41BB" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push("/message")}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#999" />
            <Text style={styles.navText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push("/cart")}
          >
            <Ionicons name="cart-outline" size={24} color="#999" />
            <Text style={styles.navText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push("/(profile)/profile")}
          >
            <Ionicons name="person-circle-outline" size={24} color="#999" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  itemCount: { color: "gray", fontSize: 14 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 90, height: 90, resizeMode: "contain", borderRadius: 10 },
  info: { flex: 1, marginLeft: 12, justifyContent: "space-between" },
  name: { fontWeight: "bold", fontSize: 16 },
  size: { color: "gray", marginTop: 4 },
  actions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  price: { fontWeight: "bold", fontSize: 16, color: "#000" },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#eee" },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12 },
  subtotalLabel: { color: "#666", fontSize: 14 },
  subtotal: { fontSize: 20, fontWeight: "bold", color: "#1F41BB" },
  checkoutBtn: { backgroundColor: "#1F41BB", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  checkoutText: { color: "#fff", fontWeight: "bold", marginRight: 8 },
  navbar: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopWidth: 1, borderTopColor: "#eee", paddingVertical: 10 },
  navButton: { justifyContent: "center", alignItems: "center" },
  navText: { fontSize: 12, marginTop: 4, color: "#999" },
});
