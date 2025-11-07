
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Thêm dòng này ở đầu file nếu chưa có
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Alert,
//   Image,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";
// import { GET_ID, POST } from "./APIService";
// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();


// const handleLogin = async () => {
//   if (!email || !password) {
//     Alert.alert("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu.");
//     return;
//   }

//   try {
//     await AsyncStorage.multiRemove(["jwt-token", "user-email", "cart-id"]);
//     const res = await POST("login", { email, password });
//     console.log("✅ Login success:", res.data);

//     const token = res.data["jwt-token"] || res.data.token;

//     if (token) {
//       // Lưu token và email
//       await AsyncStorage.setItem("jwt-token", token);
//       await AsyncStorage.setItem("user-email", email);

//       console.log("🔑 Token đã lưu, bắt đầu lấy giỏ hàng...");

//       try {
        
//         // 🧩 Bước 1: Gọi API lấy danh sách giỏ hàng của user
//         const cartRes = await GET_ID(
//           `public/users/${encodeURIComponent(email)}/carts`,
//           ""
//         );

//         // 🧩 Bước 2: Xử lý phản hồi
//         if (cartRes.data && cartRes.data.cartId) {
//           const cartId = cartRes.data.cartId;
//           await AsyncStorage.setItem("cart-id", cartId.toString());
//           console.log("🛒 Giỏ hàng đã tồn tại, ID:", cartId);
//         } else {
//           // 🧩 Nếu chưa có giỏ, tạo mới
//           const newCartRes = await POST(
//             `public/users/${encodeURIComponent(email)}/carts/create-if-not-exists`,
//             {}
//           );
//           const newCartId = newCartRes.data.cartId;
//           await AsyncStorage.setItem("cart-id", newCartId.toString());
//           console.log("🆕 Tạo giỏ hàng mới:", newCartId);
//         }
//       } catch (cartErr) {
//         console.error("❌ Lỗi khi lấy hoặc tạo giỏ hàng:", cartErr);
//       }

//       Alert.alert("Thành công", "Đăng nhập thành công!");
//       router.replace("/hometab");
//     } else {
//       Alert.alert("Lỗi", "Đăng nhập thất bại: Không nhận được token.");
//     }
//   } catch (error: any) {
//     console.error("Login error:", error);
//     const msg = error.response?.data?.message || "Sai email hoặc mật khẩu.";
//     Alert.alert("Đăng nhập thất bại", msg);
//   }
// };
//   return (
//           <View style={styles.container}>
//               <View style={styles.Text1}>Login here</View>
//               <View style={styles.Text2}>Welcome back you have<br></br>
//                   been missed!
//               </View>
  
//               <View style={styles.formLogin}>
//                   <View>
//                       <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} />
//                   </View>
//                   <View>
//                       <TextInput style={styles.input} placeholder='Password'  value={password} onChangeText={setPassword}/>
//                   </View>
//                   <View style={styles.text3}>Forgot Your Password?</View>
  
//                   <TouchableOpacity style={styles.formSign} onPress={handleLogin}>
//                       <View style={styles.sign}>Sign In</View>
//                   </TouchableOpacity>
//                   <View style={styles.text4}>Create new account</View>
//                   <View style={styles.text5}>Or continue with</View>
//                   <View>
//                       <Image source={require('../assets/images/social media.png')} style={styles.icon} />  </View>
//               </View>
//           </View>
//       )
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#FFFFFF',
//         width: '100%',
//         height: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         alignContent: 'center',
//     },
//     Text1: {
//         textAlign: 'center',
//         color: '#1F41BB',
//         fontSize: 24,
//         fontWeight: '700',
//     },
//     Text2: {
//         textAlign: 'center',
//         fontSize: 20,
//         marginTop: 10,

//     },
//     formLogin: {
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     input: {

//         backgroundColor: '#F1F4FF',
//         borderRadius: 10,
//         width: 330,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 30,
//         paddingLeft: 20,
//     },

//     text3: {
//         marginTop: 10,
//         color: '#1F41BB',
//         alignItems:'flex-end'
//     },
//     formSign: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     sign: {
//         backgroundColor: '#1F41BB',
//         color: '#fff',
//         borderRadius: 10,
//         width: 330,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         textAlign: 'center',
//         marginTop: 30,
//         paddingLeft: 20,
//     },
//     text4: {
//         marginTop: 15,
//         textAlign: 'center',
//     },
//     text5: {
//         marginTop: 20,
//         textAlign: 'center',
//         color: '#1F41BB',
//         fontWeight: '700',
//         fontSize: 16,
//     },
//     icon: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 20,
//     }
// })
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { GET, GET_ID, POST } from "./APIService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    try {
      // Xóa dữ liệu cũ
      await AsyncStorage.multiRemove(["jwt-token", "user-email", "cart-id", "user-data"]);
      
      // Đăng nhập
      const res = await POST("login", { email, password });
      console.log("✅ Login success:", res.data);

      const token = res.data["jwt-token"] || res.data.token;

      if (token) {
        // Lưu token và email
        await AsyncStorage.setItem("jwt-token", token);
        await AsyncStorage.setItem("user-email", email);
        console.log("🔑 Token đã lưu");

        try {
          // 🔹 Lấy thông tin user từ API
          const userRes = await GET(`public/users/${encodeURIComponent(email)}`);
          console.log("👤 User info:", userRes.data);
          
          // Lưu thông tin user vào AsyncStorage
          await AsyncStorage.setItem("user-data", JSON.stringify(userRes.data));
          console.log("💾 Đã lưu thông tin user");
        } catch (userErr) {
          console.error("⚠️ Không lấy được thông tin user:", userErr);
          // Tiếp tục dù không lấy được user info
        }

        try {
          // 🧩 Lấy hoặc tạo giỏ hàng
          const cartRes = await GET_ID(
            `public/users/${encodeURIComponent(email)}/carts`,
            ""
          );

          if (cartRes.data && cartRes.data.cartId) {
            const cartId = cartRes.data.cartId;
            await AsyncStorage.setItem("cart-id", cartId.toString());
            console.log("🛒 Giỏ hàng đã tồn tại, ID:", cartId);
          } else {
            // Tạo giỏ hàng mới
            const newCartRes = await POST(
              `public/users/${encodeURIComponent(email)}/carts/create-if-not-exists`,
              {}
            );
            const newCartId = newCartRes.data.cartId;
            await AsyncStorage.setItem("cart-id", newCartId.toString());
            console.log("🆕 Tạo giỏ hàng mới:", newCartId);
          }
        } catch (cartErr) {
          console.error("❌ Lỗi khi lấy hoặc tạo giỏ hàng:", cartErr);
        }

        Alert.alert("Thành công", "Đăng nhập thành công!");
        router.replace("/hometab");
      } else {
        Alert.alert("Lỗi", "Đăng nhập thất bại: Không nhận được token.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const msg = error.response?.data?.message || "Sai email hoặc mật khẩu.";
      Alert.alert("Đăng nhập thất bại", msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Text1}>Login here</View>
      <View style={styles.Text2}>
        Welcome back you have been missed!
      </View>

      <View style={styles.formLogin}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.text3}>Forgot Your Password?</View>

        <TouchableOpacity style={styles.formSign} onPress={handleLogin}>
          <View style={styles.sign}>Sign In</View>
        </TouchableOpacity>
        <View style={styles.text4}>Create new account</View>
        <View style={styles.text5}>Or continue with</View>
        <View>
          <Image
            source={require("../assets/images/social media.png")}
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  Text1: {
    textAlign: "center",
    color: "#1F41BB",
    fontSize: 24,
    fontWeight: "700",
  },
  Text2: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
  formLogin: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F1F4FF",
    borderRadius: 10,
    width: 330,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingLeft: 20,
  },
  text3: {
    marginTop: 10,
    color: "#1F41BB",
    alignItems: "flex-end",
  },
  formSign: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sign: {
    backgroundColor: "#1F41BB",
    color: "#fff",
    borderRadius: 10,
    width: 330,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 30,
    paddingLeft: 20,
  },
  text4: {
    marginTop: 15,
    textAlign: "center",
  },
  text5: {
    marginTop: 20,
    textAlign: "center",
    color: "#1F41BB",
    fontWeight: "700",
    fontSize: 16,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});