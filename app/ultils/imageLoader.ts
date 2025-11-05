import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadProtectedImage = async (imageName: string) => {
  try {
    const token = await AsyncStorage.getItem("jwt-token");
    const res = await fetch(`http://192.168.1.28:8082/api/image/products/${imageName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const blob = await res.blob();
    const reader = new FileReader();

    return new Promise<string>((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("❌ Lỗi tải ảnh:", err);
    return "https://via.placeholder.com/300?text=No+Image";
  }
};
