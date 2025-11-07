import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { POST } from ".././APIService"; // ✅ dùng hàm POST bạn đã có

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const email = await AsyncStorage.getItem("user-email");
      if (!email) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập lại.");
        router.replace("/SignInScreen");
        return;
      }

      // ✅ Gọi API backend
      const res = await POST("auth/change-password", {
        email,
        oldPassword,
        newPassword,
      });

      console.log("🔁 Kết quả đổi mật khẩu:", res.data);

      Alert.alert("Thành công", "Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
      await AsyncStorage.multiRemove(["jwt-token", "user-email", "cart-id"]);
      router.replace("/SignInScreen");
    } catch (error: any) {
      console.error("❌ Change password error:", error);
      const msg =
        error.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.";
      Alert.alert("Lỗi", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text1}>Change Password</Text>
      <Text style={styles.Text2}>Enter your old and new password below</Text>

      <View style={styles.formLogin}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.formSign} onPress={handleChangePassword}>
          <Text style={styles.sign}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Text1: {
    textAlign: "center",
    color: "#1F41BB",
    fontSize: 24,
    fontWeight: "700",
  },
  Text2: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 20,
    paddingLeft: 20,
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
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 30,
    fontSize: 18,
    fontWeight: "600",
    alignContent: "center",
  },
});
