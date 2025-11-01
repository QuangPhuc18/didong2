// import { ADD_TO_CART, GET_ALL } from "@/app/APIService";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Stack, useLocalSearchParams, useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // 🖼️ Load ảnh từ backend
// const GET_IMG = (imagePath: string) => {
//   if (!imagePath || typeof imagePath !== "string") {
//     return "https://via.placeholder.com/150?text=No+Image";
//   }
//   if (imagePath.startsWith("http")) return imagePath;
//   return `http://192.168.1.28:8082/api/public/products/image/${encodeURIComponent(imagePath)}`;
// };

// export default function ProductDetail() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   // 🧠 Lấy chi tiết sản phẩm
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await GET_ALL(`public/products/${id}`);
//         setProduct(res.data);
//       } catch (error) {
//         console.error("❌ Lỗi lấy chi tiết sản phẩm:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // 🛒 Thêm sản phẩm vào giỏ hàng (Backend DB)
//   const handleAddToCart = async () => {
//     try {
//       if (!product?.id) {
//         Alert.alert("Lỗi", "❌ Sản phẩm không hợp lệ, vui lòng thử lại!");
//         return;
//       }

//       // 🧩 Lấy token lưu trong AsyncStorage
// const token = await AsyncStorage.getItem("jwt-token");
//       if (!token) {
//         Alert.alert("Cảnh báo", "⚠️ Bạn cần đăng nhập để thêm vào giỏ hàng!");
//         router.push("/login");
//         return;
//       }

//       // ✅ Gọi API thêm vào giỏ hàng
// const res = await ADD_TO_CART(product.id, quantity);
// if (res.status === 200) {
//   alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
//   router.push("/cart");
// } else {
//   alert("⚠️ Không thể thêm sản phẩm vào giỏ hàng!");
// }

//       console.log("✅ Kết quả thêm giỏ hàng:", res.data);
//       Alert.alert("Thành công", "🛒 Đã thêm sản phẩm vào giỏ hàng!");
//       router.push("/cart");
//     } catch (error: any) {
//       console.error("❌ Lỗi thêm vào giỏ hàng:", error);

//       if (error.response) {
//         const status = error.response.status;
//         if (status === 401) {
//           Alert.alert("Lỗi xác thực", "⚠️ Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại!");
//           router.push("/login");
//         } else if (status === 400) {
//           Alert.alert("Lỗi", "❌ Dữ liệu gửi lên không hợp lệ!");
//         } else {
//           Alert.alert("Lỗi server", "⚠️ Không thể thêm sản phẩm. Vui lòng thử lại sau!");
//         }
//       } else {
//         Alert.alert("Lỗi mạng", "⚠️ Kiểm tra kết nối Internet của bạn!");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#1F41BB" />
//       </View>
//     );
//   }

//   if (!product) {
//     return (
//       <View style={styles.center}>
//         <Text>Không tìm thấy sản phẩm</Text>
//       </View>
//     );
//   }

//   const total = product.price * quantity;

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       <Stack.Screen options={{ headerShown: false }} />

//       {/* 🖼️ Ảnh sản phẩm + nút quay lại */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: GET_IMG(product.image) }}
//           style={styles.productImage}
//           resizeMode="cover"
//         />
//         <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={22} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* Nội dung cuộn */}
//       <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 200 }}>
//         <Text style={styles.name}>{product.productName}</Text>
//         <Text style={styles.brand}>{product.category?.categoryName || "No category"}</Text>
//         <Text style={styles.price}>${product.price.toLocaleString()}</Text>

//         <Text style={styles.title}>Description</Text>
//         <Text style={styles.desc}>
//           {product.description || "No description available."}
//         </Text>

//         {/* Quantity + Total */}
//         <View style={styles.quantityContainer}>
//           <View style={styles.quantityBox}>
//             <Text style={styles.title}>Quantity</Text>
//             <View style={styles.qtyRow}>
//               <TouchableOpacity onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}>
//                 <Text style={styles.qtyBtn}>-</Text>
//               </TouchableOpacity>
//               <Text style={styles.qtyText}>{quantity}</Text>
//               <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
//                 <Text style={styles.qtyBtn}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View>
//             <Text style={styles.title}>Total</Text>
//             <Text style={styles.total}>${total.toLocaleString()}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* ✅ Nút Add to Cart cố định */}
//       <View style={styles.addToCartContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
//           <Text style={styles.buttonText}>Add to Cart</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ✅ Thanh navigation cố định */}
//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => router.push("/(home)/hometab")}
//         >
//           <Ionicons name="home" size={24} color="#1F41BB" />
//           <Text style={[styles.navText, { color: "#1F41BB" }]}>Home</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={() => router.push("/message")}>
//           <Ionicons name="chatbubble-outline" size={24} color="#999" />
//           <Text style={styles.navText}>Message</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={() => router.push("/cart")}>
//           <Ionicons name="cart-outline" size={24} color="#999" />
//           <Text style={styles.navText}>Cart</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={() => router.push("/profile")}>
//           <Ionicons name="person-circle-outline" size={24} color="#999" />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 16 },
//   name: { fontSize: 24, fontWeight: "bold" },
//   brand: { fontSize: 16, color: "#666", marginBottom: 6 },
//   price: { fontSize: 20, fontWeight: "bold", color: "#1F41BB", marginBottom: 10 },
//   title: { fontSize: 16, fontWeight: "600", marginTop: 20, marginBottom: 8 },
//   desc: { fontSize: 14, color: "#444", lineHeight: 20 },
//   quantityContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   quantityBox: { flexDirection: "column" },
//   qtyRow: { flexDirection: "row", alignItems: "center", gap: 20, marginTop: 6 },
//   qtyBtn: {
//     fontSize: 20,
//     fontWeight: "bold",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     backgroundColor: "#eee",
//     borderRadius: 5,
//   },
//   qtyText: { fontSize: 16, fontWeight: "bold" },
//   total: { fontSize: 20, fontWeight: "bold", color: "#1F41BB", marginTop: 6 },

//   addToCartContainer: {
//     position: "absolute",
//     bottom: 70,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: "#eee",
//   },
//   button: {
//     backgroundColor: "#1F41BB",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   navButton: { justifyContent: "center", alignItems: "center" },
//   navText: { fontSize: 12, marginTop: 4, color: "#999" },

//   imageContainer: { position: "relative" },
//   productImage: {
//     marginTop: 5,
//     width: "100%",
//     height: 400,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   backButton: {
//     position: "absolute",
//     top: 40,
//     left: 20,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     padding: 8,
//     borderRadius: 30,
//   },

//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
// });
import { GET_ID, GET_IMG, POST } from "@/app/APIService";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Lấy chi tiết sản phẩm + cartId
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Lấy chi tiết sản phẩm
        const res = await GET_ID("public/products", String(id));
        setProduct(res.data);

        // ✅ Lấy email người dùng
        const email = await AsyncStorage.getItem("user-email");
        if (!email) {
          Alert.alert("Lỗi", "Không tìm thấy email người dùng!");
          return;
        }

        // ✅ Lấy thông tin user
        const userRes = await GET_ID("public/users/email", encodeURIComponent(email));
        let userCartId: number;

        if (userRes.data.cart) {
          // Nếu đã có cart
          userCartId = userRes.data.cart.id ?? userRes.data.cart.cartId;
        } else {
          // Nếu chưa có cart → tạo mới
          const newCart = await POST("public/carts/create", { userId: userRes.data.id });
          userCartId = newCart.data.id;
        }

        // 🔹 Lưu cartId vào AsyncStorage để CartScreen đọc được
        await AsyncStorage.setItem("cart-id", userCartId.toString());
        setCartId(userCartId);

      } catch (error) {
        console.error("❌ Lỗi tải dữ liệu:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin sản phẩm!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!cartId) {
      Alert.alert("Lỗi", "Không tìm thấy giỏ hàng người dùng!");
      return;
    }

    const endpoint = `public/carts/${cartId}/products/${id}/quantity/${quantity}`;
    try {
      const res = await POST(endpoint, null);

      // Nếu API trả về cartId mới (nếu backend tạo cart khi add)
      if (res.data.cartId) {
        await AsyncStorage.setItem("cart-id", res.data.cartId.toString());
        setCartId(res.data.cartId);
      }

      Alert.alert("Thành công", "Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error: any) {
      console.error("❌ Thêm giỏ hàng lỗi:", error.response?.data || error.message);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng!");
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F41BB" />
      </View>
    );

  if (!product)
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy sản phẩm</Text>
      </View>
    );

  const total = (product.specialPrice ?? product.price ?? 0) * quantity;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: GET_IMG("products", product.image) }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 200 }}>
        <Text style={styles.name}>{product.productName}</Text>
        <Text style={styles.brand}>{product.category?.categoryName || "Không có danh mục"}</Text>
        <Text style={styles.price}>
          {product.specialPrice ? `${product.specialPrice.toLocaleString()} VNĐ` : `${product.price.toLocaleString()} VNĐ`}
        </Text>

        <Text style={styles.title}>Mô tả</Text>
        <Text style={styles.desc}>{product.description || "Không có mô tả cho sản phẩm này."}</Text>

        <View style={styles.quantityContainer}>
          <View style={styles.quantityBox}>
            <Text style={styles.title}>Số lượng</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => setQuantity(prev => Math.max(1, prev - 1))}>
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.title}>Tổng tiền</Text>
            <Text style={styles.total}>{total.toLocaleString()} VNĐ</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.addToCartContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/(home)/hometab")}>
          <Ionicons name="home" size={24} color="#1F41BB" />
          <Text style={[styles.navText, { color: "#1F41BB" }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/(cart)/cart")}>
          <Ionicons name="cart-outline" size={24} color="#999" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/(profile)/profile")}>
          <Ionicons name="person-circle-outline" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  name: { fontSize: 24, fontWeight: "bold" },
  brand: { fontSize: 16, color: "#666", marginBottom: 6 },
  price: { fontSize: 20, fontWeight: "bold", color: "#1F41BB", marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "600", marginTop: 20, marginBottom: 8 },
  desc: { fontSize: 14, color: "#444", lineHeight: 20 },
  quantityContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  quantityBox: { flexDirection: "column" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 20, marginTop: 6 },
  qtyBtn: { fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, paddingVertical: 4, backgroundColor: "#eee", borderRadius: 5 },
  qtyText: { fontSize: 16, fontWeight: "bold" },
  total: { fontSize: 20, fontWeight: "bold", color: "#1F41BB", marginTop: 6 },
  addToCartContainer: { position: "absolute", bottom: 70, left: 0, right: 0, backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, borderColor: "#eee" },
  button: { backgroundColor: "#1F41BB", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#fff", paddingVertical: 12, borderTopWidth: 1, borderTopColor: "#eee" },
  navButton: { justifyContent: "center", alignItems: "center" },
  navText: { fontSize: 12, marginTop: 4, color: "#999" },
  imageContainer: { position: "relative" },
  productImage: { marginTop: 5, width: "100%", height: 400, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backButton: { position: "absolute", top: 40, left: 20, backgroundColor: "rgba(0,0,0,0.4)", padding: 8, borderRadius: 30 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
