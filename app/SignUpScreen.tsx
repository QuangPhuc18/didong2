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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST } from "./APIService";

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !mobileNumber) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newUser = {
      userId: 0,
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      roles: [
        {
          roleId: 101,
          roleName: "user",
        },
      ],
      address: {
        addressId: 0,
        street: "string",
        buildingName: "string",
        city: "string",
        state: "string",
        country: "string",
        pincode: "string",
      },
      cart: {
        cartId: 0,
        totalPrice: 0,
        products: [],
      },
    };

    try {
      const response = await POST("register", newUser);
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Thành công", "Đăng ký thành công!");
        router.push("/login");
      } else {
        Alert.alert("Lỗi", "Đăng ký thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Lỗi", "Không thể kết nối tới máy chủ.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text1}>Create Account</Text>
      <Text style={styles.Text2}>
        Create an account so you can explore all the existing jobs
      </Text>

      <View style={styles.formLogin}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.sign} onPress={handleSignup}>
          <Text style={styles.signText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingVertical: 30 },
  Text1: { textAlign: "center", color: "#1F41BB", fontSize: 24, fontWeight: "700" },
  Text2: { textAlign: "center", fontSize: 16, marginTop: 10, marginBottom: 20 },
  formLogin: { width: "100%", alignItems: "center" },
  input: {
    backgroundColor: "#F1F4FF",
    borderRadius: 10,
    width: 330,
    height: 50,
    paddingLeft: 20,
    marginTop: 15,
  },
  sign: {
    backgroundColor: "#1F41BB",
    borderRadius: 10,
    width: 330,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  signText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
