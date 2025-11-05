// import { Ionicons } from '@expo/vector-icons';
// import { Stack, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { GET_ALL, GET_IMG } from "@/app/APIService";



// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// const Feed = ({ navigation }: { navigation: any }) => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>;
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const endpoint = selectedCategory
//           ? `public/categories/${selectedCategory}/products?pageNumber=1&pageSize=5&sortBy=productId&sortOrder=asc`
//           : "public/products?pageNumber=1&pageSize=5&sortBy=productId&sortOrder=asc";

//         const response = await GET_ALL(endpoint);
//         setProducts(response.data.content);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory]);

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await GET_ALL("public/categories?pageNumber=0&pageSize=5&sortBy=categoryId&sortOrder=asc");
//         setCategories(response.data.content);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

// }

// // const trendingProducts = [
// //   {
// //     id: '1',
// //     name: 'Nike Dunk Low',
// //     brand: 'Nike',
// //     price: 90,
// //     image: require('../../assets/images/nike1.webp'),
// //   },
// //   {
// //     id: '2',
// //     name: 'Nike Dunk Low',
// //     brand: 'Nike',
// //     price: 90,
// //     image: require('../../assets/images/nikekillshot.jpg'),
// //   },
// //   {
// //     id: '3',
// //     name: 'Nike Dunk Low',
// //     brand: 'Nike',
// //     price: 90,
// //     image: require('../../assets/images/nikeair.jpg'),
// //   },
// // ];


// // const popularProducts = [
// //   {
// //     id: '3',
// //     name: 'Nike Air Max',
// //     brand: 'Nike',
// //     price: 100,
// //     image: require('../../assets/images/nikeforce.jpg'),
// //   },
// //   {
// //     id: '4',
// //     name: 'Nike Zoom',
// //     brand: 'Nike',
// //     price: 85,
// //     image: require('../../assets/images/tennis.jpg'),
// //   },
// //   {
// //     id: '4',
// //     name: 'Nike Zoom',
// //     brand: 'Nike',
// //     price: 85,
// //     image: require('../../assets/images/nike1.webp'),
// //   },
// //   {
// //     id: '5',
// //     name: 'Nike Zoom',
// //     brand: 'Nike',
// //     price: 85,
// //     image: require('../../assets/images/nikesneaker.jpg'),
// //   },

// // ];

// export default function HomeTab() {
//   const router = useRouter();
//   return (
//     <>
//       <Stack.Screen
//         options={{
//           title: "home",
//           headerShown: false,
//         }}
//       />
//       <ScrollView style={styles.container}>
//         {/* === Header avatar giả định === */}
//         <View style={styles.header}>
//           {/* Icon Menu */}
//           <TouchableOpacity>
//             <Ionicons name="menu-outline" size={28} color="#000" />
//           </TouchableOpacity>
//           {/* Các icon bên phải */}
//           <View style={styles.headerRight}>
//             <TouchableOpacity style={styles.iconSpacing}>
//               <Ionicons name="search-outline" size={24} color="#000" />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.iconSpacing}>
//               <Image
//                 source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
//                 style={styles.avatar}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.iconSpacing}>
//               <Ionicons name="filter-outline" size={22} color="#000" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* === Banner khuyến mãi === */}
//         <ImageBackground
//           source={require('../../assets/images/banner1.png')} // hình dấu %
//           style={styles.banner}
//           imageStyle={styles.bannerImage}
//         >
//           <View style={styles.bannerContent}>
//             <Text style={styles.bannerTopText}>BLACK FRIDAY</Text>
//             <Text style={styles.bannerTitle}>20% off</Text>
//             <Text style={styles.bannerDesc}>All products</Text>
//             <TouchableOpacity style={styles.getButton}>
//               <Text style={styles.getText}>Get</Text>
//             </TouchableOpacity>
//           </View>
//         </ImageBackground>

//         {/* === Trending Section === */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Trending</Text>
//           <FlatList
//             horizontal
//             contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
//             data={trendingProducts}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() =>
//                   router.push({
//                     pathname: '/details/product/[id]',
//                     params: { id: item.id },
//                   })
//                 }
//               >
//                 <View style={styles.card1}>
//                   <TouchableOpacity style={styles.favoriteBtn}>
//                     <Ionicons name="heart" size={20} color="red" />
//                   </TouchableOpacity>

//                   <Image source={item.image} style={styles.productImage1} />

//                   <Text style={styles.name}>{item.name}</Text>
//                   <View style={styles.row}>
//                     <Ionicons name="star" size={14} color="#f5a623" />
//                     <Text style={styles.rating}>(5.0)</Text>
//                   </View>
//                   <Text style={styles.brand}>{item.brand}</Text>
//                   <Text style={styles.price}>${item.price}</Text>

//                   <TouchableOpacity style={styles.addBtn}>
//                     <Ionicons name="add" size={20} color="#fff" />
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             )}
//             keyExtractor={(item, index) => `trending-${item.id}-${index}`}
//             showsHorizontalScrollIndicator={false}
//           />

//         </View>

//         {/* === Most Popular Section === */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Most Popular</Text>
//             <TouchableOpacity>
//               <Text style={styles.viewAll}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <FlatList
//             horizontal
//             data={popularProducts}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <Image source={item.image} style={styles.productImage} />
//                 <Text>{item.name}</Text>
//                 <Text style={styles.brand}>{item.brand}</Text>
//                 <Text style={styles.price}>${item.price}</Text>
//               </View>
//             )}
//             keyExtractor={(item, index) => `popular-${item.id}-${index}`}
//             showsHorizontalScrollIndicator={false}
//           />

//         </View>
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             {/* <Text style={styles.sectionTitle}>Most Popular</Text> */}
//             <TouchableOpacity>
//               {/* <Text style={styles.viewAll}>View all</Text> */}
//             </TouchableOpacity>
//           </View>

//           <FlatList
//             horizontal
//             data={popularProducts}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <Image source={item.image} style={styles.productImage} />
//                 <Text>{item.name}</Text>
//                 <Text style={styles.brand}>{item.brand}</Text>
//                 <Text style={styles.price}>${item.price}</Text>
//               </View>
//             )}
//             keyExtractor={(item, index) => `popular-${item.id}-${index}`}
//             showsHorizontalScrollIndicator={false}
//           />

//         </View>
//       </ScrollView>
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.navButton} onPress={() => router.push('/(home)/hometab')}>
//           <Ionicons name="home" size={24} color="#1F41BB" />
//           <Text style={styles.navText}>Home</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={() => router.push('/message')}>
//           <Ionicons name="chatbubble-outline" size={24} color="#999" />
//           <Text style={styles.navText}>Message</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={() => router.push('/cart')}>
//           <Ionicons name="cart-outline" size={24} color="#999" />
//           <Text style={styles.navText}>Cart</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={() => router.push('/profile')}>
//           <Ionicons name="person-circle-outline" size={24} color="#999" />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>

//       </View>
//     </>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconSpacing: {
//     marginLeft: 16,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   banner: {
//     height: 160,
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 20,
//     flexDirection: 'row', // Chia làm 2 cột: chữ và ảnh %
//     backgroundColor: '#2c140a', // fallback nếu ảnh lỗi
//   },

//   bannerImage: {
//     resizeMode: 'cover',
//     position: 'absolute',
//     right: 0,
//     width: '100%',
//     height: '100%',
//   },

//   bannerContent: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     width: '60%', // chỉ chiếm phần trái
//     zIndex: 2, // đảm bảo nằm trên ảnh %
//   },

//   bannerTopText: {
//     color: '#fff',
//     fontSize: 12,
//     marginBottom: 6,
//     fontWeight: '600',
//   },

//   bannerTitle: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#FFA534',
//   },

//   bannerDesc: {
//     fontSize: 14,
//     color: '#fff',
//     marginBottom: 8,
//   },

//   getButton: {
//     backgroundColor: '#FFA534',
//     paddingHorizontal: 20,
//     paddingVertical: 6,
//     borderRadius: 8,
//     alignSelf: 'flex-start',
//   },

//   getText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   section: {
//     marginVertical: 10,

//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     flexWrap: 'wrap',
//     color: '#1E90FF',

//   },
//   viewAll: {
//     fontSize: 14,
//     color: '#888',
//     textDecorationLine: 'underline',
//   },
//   card: {
//     backgroundColor: '#f7f7f7',
//     borderRadius: 16,
//     padding: 12,
//     marginRight: 12,
//     width: 150,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 8,
//     resizeMode: 'contain',
//   },
//   brand: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   price: {
//     fontWeight: 'bold',
//     marginTop: 4,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   navButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   navText: {
//     fontSize: 12,
//     marginTop: 4,
//     color: '#999',
//   },
//   name: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginTop: 4,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 2,
//   },
//   rating: {
//     fontSize: 12,
//     color: "#888",
//     marginLeft: 4,
//   },
//   favoriteBtn: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 4,
//     elevation: 2,
//     zIndex: 1,
//   },
//   addBtn: {
//     position: "absolute",
//     bottom: 12,
//     right: 12,
//     backgroundColor: "#6c5ce7", // tím giống trong ảnh
//     borderRadius: 20,
//     padding: 6,
//   },
//   // gridCard: {
//   //   width: '40%',
//   //   margin:'auto',
//   //   marginBottom: 16,
//   // },
//   card1: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 12,
//     marginRight: 16,
//     width: 180,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   productImage1: {
//     width: '100%',
//     height: 170,
//     borderRadius: 12,
//     marginBottom: 12,
//     resizeMode: 'cover',
//   },
// });

import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GET } from '@/app/APIService';

// 🖼️ Hàm lấy ảnh từ backend
const GET_IMG = (imagePath: string) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return 'https://via.placeholder.com/150?text=No+Image';
  }
  if (imagePath.startsWith('http')) return imagePath;
  return `http://192.168.1.28:8082/api/public/products/image/${encodeURIComponent(imagePath)}`;
};

// 🟩 Card Trending — có ❤️ và ➕
const TrendingCard = ({ item, onPress }: { item: any; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.card1}>
      {/* ❤️ Nút yêu thích */}
      <TouchableOpacity style={styles.favoriteBtn}>
        <Ionicons name="heart" size={20} color="red" />
      </TouchableOpacity>

      {/* Ảnh sản phẩm */}
      <Image
        source={{ uri: GET_IMG(item.image) }}
        style={styles.productImage1}
        resizeMode="cover"
        onError={(e) => console.log('❌ Lỗi tải ảnh:', e.nativeEvent.error)}
      />

      {/* ➕ Nút thêm */}
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Thông tin */}
      <Text style={styles.name} numberOfLines={1}>
        {item.productName}
      </Text>
      <View style={styles.row}>
        <Ionicons name="star" size={14} color="#f5a623" />
        <Text style={styles.rating}>(5.0)</Text>
      </View>
      <Text style={styles.brand}>{item.category?.categoryName || 'Unknown'}</Text>
      <Text style={styles.price}>${item.price.toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

// 🟦 Card Popular — không có icon
const PopularCard = ({ item, onPress }: { item: any; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.card1}>
      <Image
        source={{ uri: GET_IMG(item.image) }}
        style={styles.productImage1}
        resizeMode="cover"
        onError={(e) => console.log('❌ Lỗi tải ảnh:', e.nativeEvent.error)}
      />
      <Text style={styles.name} numberOfLines={1}>
        {item.productName}
      </Text>
      <View style={styles.row}>
        <Ionicons name="star" size={14} color="#f5a623" />
        <Text style={styles.rating}>(5.0)</Text>
      </View>
      <Text style={styles.brand}>{item.category?.categoryName || 'Unknown'}</Text>
      <Text style={styles.price}>${item.price.toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

// 🏠 HomeTab
export default function HomeTab() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GET(
          'public/products?pageNumber=1&pageSize=10&sortBy=productId&sortOrder=asc'
        );
        setProducts(response.data.content || []);
      } catch (error) {
        console.error('❌ Lỗi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GET(
          'public/categories?pageNumber=0&pageSize=5&sortBy=categoryId&sortOrder=asc'
        );
        setCategories(response.data.content || []);
      } catch (error) {
        console.error('❌ Lỗi lấy danh mục:', error);
      }
    };
    fetchCategories();
  }, []);

  const trendingProducts = products.slice(0, 3);
  const popularProducts = products.slice(3);

  return (
    <>
      <Stack.Screen options={{ title: 'home', headerShown: false }} />
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={28} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconSpacing}>
              <Ionicons name="search-outline" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpacing}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpacing}>
              <Ionicons name="filter-outline" size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 🏷️ Banner giữ nguyên */}
        <ImageBackground
          source={require('../../assets/images/banner1.png')}
          style={styles.banner}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTopText}>BLACK FRIDAY</Text>
            <Text style={styles.bannerTitle}>20% off</Text>
            <Text style={styles.bannerDesc}>All products</Text>
            <TouchableOpacity style={styles.getButton}>
              <Text style={styles.getText}>Get</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* 🔥 Trending */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <FlatList
            horizontal
            data={trendingProducts}
            renderItem={({ item }) => (
              <TrendingCard
                item={item}
                onPress={() =>
                  router.push({
                    pathname: '/details/product/[id]',
                    params: { id: item.productId },
                  })
                }
              />
            )}
            keyExtractor={(item, index) => `trending-${item.productId}-${index}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
          />
        </View>

        {/* 💎 Most Popular */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Popular</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={popularProducts}
            renderItem={({ item }) => (
              <PopularCard
                item={item}
                onPress={() =>
                  router.push({
                    pathname: '/details/product/[id]',
                    params: { id: item.productId },
                  })
                }
              />
            )}
            keyExtractor={(item, index) => `popular-${item.productId}-${index}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
          />
        </View>
      </ScrollView>

      {/* ⚙️ Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/(home)/hometab')}
        >
          <Ionicons name="home" size={24} color="#1F41BB" />
          <Text style={[styles.navText, { color: '#1F41BB' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/message')}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#999" />
          <Text style={styles.navText}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#999" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-circle-outline" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconSpacing: { marginLeft: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20 },

  // 🏷️ Banner giữ nguyên màu
  banner: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#2c140a',
  },
  bannerImage: {
    resizeMode: 'cover',
    position: 'absolute',
    right: 0,
    width: '100%',
    height: '100%',
  },
  bannerContent: { flex: 1, padding: 20, justifyContent: 'center', width: '60%', zIndex: 2 },
  bannerTopText: { color: '#fff', fontSize: 12, marginBottom: 6, fontWeight: '600' },
  bannerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFA534' },
  bannerDesc: { fontSize: 14, color: '#fff', marginBottom: 8 },
  getButton: {
    backgroundColor: '#FFA534',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  getText: { color: '#fff', fontWeight: 'bold' },

  // 🟦 Card style
  card1: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage1: { width: '100%', height: 170, borderRadius: 12, marginBottom: 12 },
  name: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  brand: { fontSize: 12, color: 'gray' },
  price: { fontWeight: 'bold', marginTop: 4 },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 2,
    zIndex: 1,
  },
  addBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#6c5ce7',
    borderRadius: 20,
    padding: 6,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  rating: { fontSize: 12, color: '#888', marginLeft: 4 },
  section: { marginVertical: 10 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E90FF', marginBottom: 10 },
  viewAll: { color: '#1E90FF', fontWeight: '500' },

  // ⚙️ Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: { justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4, color: '#999' },
});
