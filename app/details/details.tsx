import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProductDetail() {
  const router = useRouter();
  const { id, name, brand, price, image } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: image as string }} style={styles.productImage} />

      {/* Tên và brand */}
      <View style={styles.details}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productBrand}>{brand}</Text>
        <Text style={styles.productPrice}>${price}</Text>

        {/* Mô tả sản phẩm */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          A comfortable and stylish shoe perfect for everyday wear. Built with quality materials and premium cushioning.
        </Text>

        {/* Chọn size */}
        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.optionRow}>
          {['38', '39', '40', '41', '42'].map((size) => (
            <TouchableOpacity key={size} style={styles.optionBox}>
              <Text style={styles.optionText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chọn màu */}
        <Text style={styles.sectionTitle}>Color</Text>
        <View style={styles.optionRow}>
          <View style={[styles.colorCircle, { backgroundColor: '#000' }]} />
          <View style={[styles.colorCircle, { backgroundColor: '#c00' }]} />
          <View style={[styles.colorCircle, { backgroundColor: '#007bff' }]} />
        </View>

        {/* Số lượng và tổng tiền */}
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityBox}>
              <Text>-</Text>
              <Text style={styles.quantityNumber}>1</Text>
              <Text>+</Text>
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Total</Text>
            <Text style={styles.totalPrice}>${price}</Text>
          </View>
        </View>

        {/* Nút Add to Cart */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  details: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productBrand: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F41BB',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  optionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  optionText: {
    fontSize: 14,
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityBox: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  quantityNumber: {
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F41BB',
  },
  addButton: {
    backgroundColor: '#1F41BB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
