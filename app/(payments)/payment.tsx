import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentScreen() {
  const [message, setMessage] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [corporateInvoice, setCorporateInvoice] = useState(false);
  
  // ✅ Nhận total từ trang cart (đơn vị VNĐ)
  const params = useLocalSearchParams();
  const totalVND = params.total ? parseFloat(params.total as string) : 58000;
  const total = totalVND / 23000; // Chuyển sang USD để hiển thị (nếu cần)
  
  // ✅ Debug: In ra console
  useEffect(() => {
    console.log("📱 Payment nhận params:", params);
    console.log("💰 Total VNĐ:", totalVND);
  }, []);

  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const vnpCode = url.searchParams.get("vnp_ResponseCode");

      if (vnpCode === "00") {
        setMessage("Thanh toán thành công!");
      } else if (vnpCode) {
        setMessage("Thanh toán thất bại!");
      }
    }
  }, []);

  const handlePayment = async () => {
    if (!selectedPayment) {
      setMessage("Vui lòng chọn phương thức thanh toán");
      return;
    }

    if (!agreeTerms) {
      setMessage("Vui lòng đồng ý với điều khoản");
      return;
    }

    if (selectedPayment === "vnpay") {
      try {
        // ✅ Gửi số tiền VNĐ lên server, server sẽ nhân 100 cho VNPay
        const res = await fetch(`http://localhost:3000/payment?amount=${totalVND}`);
        const data = await res.json();
        const url = data.url;

        if (Platform.OS === "web") {
          window.location.href = url;
        }
      } catch (e) {
        setMessage("⚠️ Lỗi kết nối server");
      }
    } else if (selectedPayment === "cod") {
      setMessage("Đặt hàng thành công! Thanh toán khi nhận hàng.");
    } else if (selectedPayment === "momo") {
      setMessage("Chuyển đến trang thanh toán MoMo...");
    }
  };

  const PaymentOption = ({ id, title, logo, selected, onSelect }: {
    id: string;
    title: string;
    logo?: string[];
    selected: boolean;
    onSelect: (id: string) => void;
  }) => (
    <TouchableOpacity
      style={[styles.paymentOption, selected && styles.paymentOptionSelected]}
      onPress={() => onSelect(id)}
    >
      <View style={styles.paymentLeft}>
        <View
          style={[
            styles.radioButton,
            selected && styles.radioButtonSelected,
          ]}
        >
          {selected && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={styles.paymentTitle}>{title}</Text>
      </View>
      {logo && (
        <View style={styles.paymentLogos}>
          {logo.map((item, index) => (
            <View key={index} style={styles.logoBox}>
              <Text style={styles.logoText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Checkout", headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Payment Method Section */}
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <PaymentOption
            id="card"
            title="Credit Card"
            logo={["VISA", "MC"]}
            selected={selectedPayment === "card"}
            onSelect={setSelectedPayment}
          />

          <PaymentOption
            id="vnpay"
            title="VNPay"
            logo={["VNPAY"]}
            selected={selectedPayment === "vnpay"}
            onSelect={setSelectedPayment}
          />

          <PaymentOption
            id="momo"
            title="MoMo"
            logo={["MoMo"]}
            selected={selectedPayment === "momo"}
            onSelect={setSelectedPayment}
          />

          <PaymentOption
            id="cod"
            title="Thanh toán khi nhận hàng"
            selected={selectedPayment === "cod"}
            onSelect={setSelectedPayment}
          />

          {/* Card Details - Only show if Credit Card is selected */}
          {selectedPayment === "card" && (
            <View style={styles.cardDetailsSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Holder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name on card"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Terms Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View
              style={[
                styles.checkbox,
                agreeTerms && styles.checkboxChecked,
              ]}
            >
              {agreeTerms && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <Text style={styles.checkboxText}>
              I have read the{" "}
              <Text style={styles.linkText}>preliminary information conditions</Text> and
              the <Text style={styles.linkText}>distance sales agreement</Text>.
            </Text>
          </TouchableOpacity>

          {/* Corporate Invoice Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setCorporateInvoice(!corporateInvoice)}
          >
            <View
              style={[
                styles.checkbox,
                corporateInvoice && styles.checkboxChecked,
              ]}
            >
              {corporateInvoice && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <Text style={styles.checkboxText}>I require a corporate invoice.</Text>
          </TouchableOpacity>

          {/* Total and Pay Button */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>{totalVND.toLocaleString()} VNĐ</Text>
            </View>
            <TouchableOpacity
              style={[styles.payButton, !agreeTerms && styles.payButtonDisabled]}
              onPress={handlePayment}
              disabled={!agreeTerms}
            >
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
          </View>

          {/* Message */}
          {message !== "" && (
            <View
              style={[
                styles.messageBox,
                message.includes("thành công")
                  ? styles.messageSuccess
                  : styles.messageError,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.includes("thành công")
                    ? styles.messageTextSuccess
                    : styles.messageTextError,
                ]}
              >
                {message}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  skipButton: {
    fontSize: 16,
    color: "#3B82F6",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  paymentOption: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  paymentOptionSelected: {
    borderColor: "#3B82F6",
    borderWidth: 2,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#3B82F6",
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  paymentLogos: {
    flexDirection: "row",
    gap: 8,
  },
  logoBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#F3F4F6",
  },
  logoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  cardDetailsSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
  },
  inputRow: {
    flexDirection: "row",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
  },
  linkText: {
    color: "#3B82F6",
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  payButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  messageBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  messageSuccess: {
    backgroundColor: "#D1FAE5",
  },
  messageError: {
    backgroundColor: "#FEE2E2",
  },
  messageText: {
    fontSize: 14,
    fontWeight: "500",
  },
  messageTextSuccess: {
    color: "#065F46",
  },
  messageTextError: {
    color: "#991B1B",
  },
});