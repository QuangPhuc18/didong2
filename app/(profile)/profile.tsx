// import { Ionicons } from '@expo/vector-icons';
// import { Stack, router } from 'expo-router';
// import React from 'react';
// import {
//     FlatList,
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const recentlyViewed = [
//     { id: '1', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
//     { id: '2', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
//     { id: '3', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
//     { id: '4', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
//     { id: '5', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
// ];

// const stories = [
//     { id: '1', image: require('../../assets/images/story1.png') },
//     { id: '2', image: require('../../assets/images/story2.png') },
//     { id: '3', image: require('../../assets/images/story3.jpg') },
//     //   { id: '4', image: require('../../assets/images/story4.htm') },
// ]
// export default function ProfileTab() {
//     return (
//         <>
//             <Stack.Screen options={{ headerShown: false }} />
//             <ScrollView style={styles.container}>
//                 {/* Header */}
//                 <View style={styles.header}>
//                     <Image
//                         source={require('../../assets/images/user.png')}
//                         style={styles.avatar}
//                     />
//                     <TouchableOpacity style={styles.activityButton}>
//                         <Text style={styles.activityText}>My Activity</Text>
//                     </TouchableOpacity>
//                     <View style={styles.headerIcons}>
//                         <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
//                         <Ionicons name="settings-outline" size={24} color="#333" />
//                     </View>
//                 </View>

//                 {/* Greeting */}
//                 <Text style={styles.greeting}>Hello, Amanda!</Text>

//                 {/* Announcement */}
//                 <View style={styles.announcement}>
//                     <Text style={styles.announcementTitle}>Announcement</Text>
//                     <Text style={styles.announcementText}>
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     </Text>
//                 </View>

//                 {/* Recently Viewed */}
//                 <Text style={styles.sectionTitle}>Recently viewed</Text>
//                 <FlatList
//                     horizontal
//                     data={recentlyViewed}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                         <Image source={{ uri: item.image }} style={styles.recentAvatar} />
//                     )}
//                     showsHorizontalScrollIndicator={false}
//                 />

//                 {/* My Orders */}
//                 <Text style={styles.sectionTitle}>My Orders</Text>
//                 <View style={styles.orderButtons}>
//                     <TouchableOpacity style={styles.orderButton}><Text>To Pay</Text></TouchableOpacity>
//                     <TouchableOpacity style={styles.orderButton}><Text>To Receive</Text></TouchableOpacity>
//                     <TouchableOpacity style={styles.orderButton}><Text>To Review</Text></TouchableOpacity>
//                 </View>

//                 {/* Stories */}
//                 <Text style={styles.sectionTitle}>Stories</Text>
//                 <FlatList
//                     horizontal
//                     data={stories}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                         <View style={styles.storyCard}>
//                             <Image source={item.image} style={styles.storyImage} />
//                             <Ionicons name="play-circle" size={32} color="white" style={styles.playIcon} />
//                         </View>
//                     )}
//                     showsHorizontalScrollIndicator={false}
//                 />
//                 <View style={styles.footer}>
//                     <TouchableOpacity style={styles.navButton} onPress={() => router.push('/(home)/hometab')}>
//                         <Ionicons name="home" size={24} color="#1F41BB" />
//                         <Text style={styles.navText}>Home</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.navButton} onPress={() => router.push('/')}>
//                         <Ionicons name="chatbubble-outline" size={24} color="#999" />
//                         <Text style={styles.navText}>Message</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.navButton} onPress={() => router.push('/cart')}>
//                         <Ionicons name="cart-outline" size={24} color="#999" />
//                         <Text style={styles.navText}>Cart</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.navButton} onPress={() => router.push('/profile')}>
//                         <Ionicons name="person-circle-outline" size={24} color="#999" />
//                         <Text style={styles.navText}>Profile</Text>
//                     </TouchableOpacity>

//                 </View>

//             </ScrollView>
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         padding: 16,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     avatar: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//     },
//     activityButton: {
//         backgroundColor: '#1F41BB',
//         paddingHorizontal: 14,
//         paddingVertical: 6,
//         borderRadius: 20,
//         marginLeft: 12,
//     },
//     activityText: {
//         color: '#fff',
//         fontSize: 14,
//     },
//     headerIcons: {
//         flexDirection: 'row',
//         marginLeft: 'auto',
//     },
//     icon: {
//         marginRight: 12,
//     },
//     greeting: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 16,
//     },
//     announcement: {
//         backgroundColor: '#f5f5f5',
//         padding: 12,
//         borderRadius: 10,
//         marginVertical: 12,
//     },
//     announcementTitle: {
//         fontWeight: 'bold',
//         marginBottom: 4,
//     },
//     announcementText: {
//         color: '#666',
//     },
//     sectionTitle: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginTop: 16,
//         marginBottom: 8,
//     },
//     recentAvatar: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     orderButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginVertical: 10,
//     },
//     orderButton: {
//         backgroundColor: '#f0f0f0',
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 20,
//     },
//     storyCard: {
//         position: 'relative',
//         marginRight: 12,
//     },
//     storyImage: {
//         width: 140,
//         height: 300,
//         borderRadius: 10,
//     },
//     playIcon: {
//         position: 'absolute',
//         top: 10,
//         left: 10,
//     },
//     footer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         paddingVertical: 12,
//         borderTopWidth: 1,
//         borderTopColor: '#eee',
//         marginTop: 100
//     },
//     navButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     navText: {
//         fontSize: 12,
//         marginTop: 4,
//         color: '#999',
//     },
// });
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET } from '../APIService';

const recentlyViewed = [
    { id: '1', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: '4', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '5', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
];

const stories = [
    { id: '1', image: require('../../assets/images/story1.png') },
    { id: '2', image: require('../../assets/images/story2.png') },
    { id: '3', image: require('../../assets/images/story3.jpg') },
];

export default function ProfileTab() {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('user-email');
            const userData = await AsyncStorage.getItem('user-data');
            const token = await AsyncStorage.getItem('jwt-token');
            
            console.log('📧 Email:', userEmail);
            console.log('🔑 Token exists:', !!token);
            console.log('👤 User data from storage:', userData);

            if (!userEmail) {
                console.warn('⚠️ Không tìm thấy email, người dùng chưa đăng nhập');
                setLoading(false);
                return;
            }

            setEmail(userEmail);

            if (userData) {
                const parsedUser = JSON.parse(userData);
                console.log('✅ User info parsed:', parsedUser);
                console.log('👤 FirstName:', parsedUser.firstName);
                console.log('👤 LastName:', parsedUser.lastName);
                setUserInfo(parsedUser);
            }

            await fetchUserOrders(userEmail);

        } catch (error) {
            console.error('❌ Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserOrders = async (email: string) => {
        try {
            console.log('📦 Đang lấy orders cho:', email);
            
            const response = await GET(`public/users/${encodeURIComponent(email)}/orders`);
            
            console.log('✅ Orders Full Response:', JSON.stringify(response.data, null, 2));
            
            let allOrders: any[] = [];
            
            if (Array.isArray(response.data)) {
                allOrders = response.data;
                console.log('✅ Orders là array, có', allOrders.length, 'đơn hàng');
            } else if (response.data.content && Array.isArray(response.data.content)) {
                allOrders = response.data.content;
                console.log('✅ Orders dạng pagination, có', allOrders.length, 'đơn hàng');
            }

            // Log tất cả orders để xem cấu trúc
            allOrders.forEach((order, index) => {
                console.log(`📦 Order ${index}:`, {
                    orderId: order.orderId,
                    orderStatus: order.orderStatus,
                    paymentStatus: order.paymentStatus,
                    totalAmount: order.totalAmount,
                    orderDate: order.orderDate
                });
            });

            // Lọc đơn hàng đã thanh toán
            const paidOrders = allOrders.filter((order: any) => {
                const status = (order.orderStatus || '').toLowerCase().trim();
                const paymentStatus = (order.paymentStatus || '').toLowerCase().trim();
                
                // Kiểm tra có chứa các từ khóa này không
                const isOrderAccepted = status.includes('order accepted') || 
                                       status.includes('accepted');
                const isDelivered = status.includes('delivered');
                const isConfirmed = status.includes('confirmed');
                const isShipped = status.includes('shipped');
                const isPaid = status.includes('paid') || 
                              paymentStatus.includes('paid') ||
                              paymentStatus.includes('completed');
                
                return isOrderAccepted || isDelivered || isConfirmed || isShipped || isPaid;
            });
            
            console.log('💳 Paid orders count:', paidOrders.length);
            console.log('💳 Paid orders:', paidOrders);
            
            setOrders(paidOrders);
            
        } catch (error: any) {
            console.error('❌ Error fetching orders:', error.response?.data || error.message);
            console.error('❌ Error status:', error.response?.status);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return 'N/A';
        }
    };

    const getUserName = () => {
        if (!userInfo) {
            return email ? email.split('@')[0] : 'User';
        }
        
        // Lấy firstName và lastName
        const firstName = userInfo.firstName || userInfo.first_name || '';
        const lastName = userInfo.lastName || userInfo.last_name || '';
        
        console.log('🔍 Getting name - First:', firstName, 'Last:', lastName);
        
        // Tạo full name
        const fullName = `${firstName} ${lastName}`.trim();
        
        if (fullName) {
            return fullName;
        }
        
        return userInfo.username || email.split('@')[0] || 'User';
    };

    const getUserAvatar = () => {
        if (!userInfo) return require('../../assets/images/user.png');
        
        const avatarUrl = userInfo.avatar || userInfo.profileImage || userInfo.image;
        
        return avatarUrl ? { uri: avatarUrl } : require('../../assets/images/user.png');
    };

    const renderOrderItem = ({ item }: { item: any }) => (
        <View style={styles.orderItem}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>
                    Order #{item.orderId || item.id || 'N/A'}
                </Text>
                <Text style={styles.orderDate}>
                    {formatDate(item.orderDate || item.createdAt || item.paidAt || item.paymentDate)}
                </Text>
            </View>
            <Text style={styles.orderAmount}>
                Total: {(item.totalAmount || item.totalPrice || 0).toLocaleString()} VNĐ
            </Text>
            <Text style={styles.orderStatus}>
                Status: {item.orderStatus || item.paymentStatus || 'Paid'} ✓
            </Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1F41BB" />
                <Text style={{ marginTop: 10, color: '#666' }}>Đang tải thông tin...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            
            <ScrollView 
                style={styles.scrollContent}
                contentContainerStyle={styles.scrollContentContainer}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={getUserAvatar()}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.activityButton}>
                        <Text style={styles.activityText}>My Activity</Text>
                    </TouchableOpacity>
                    <View style={styles.headerIcons}>
                        <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
                        <Ionicons name="settings-outline" size={24} color="#333" />
                    </View>
                </View>

                {/* Greeting */}
                <Text style={styles.greeting}>
                    Hello, {getUserName()}!
                </Text>

                {/* Announcement */}
                <View style={styles.announcement}>
                    <Text style={styles.announcementTitle}>Announcement</Text>
                    <Text style={styles.announcementText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                </View>

                {/* Recently Viewed */}
                <Text style={styles.sectionTitle}>Recently viewed</Text>
                <FlatList
                    horizontal
                    data={recentlyViewed}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.image }} style={styles.recentAvatar} />
                    )}
                    showsHorizontalScrollIndicator={false}
                />

                {/* My Orders */}
                <Text style={styles.sectionTitle}>My Orders</Text>
                <View style={styles.orderButtons}>
                    <TouchableOpacity style={styles.orderButton}>
                        <Text>To Pay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.orderButton}>
                        <Text>To Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.orderButton}>
                        <Text>To Review</Text>
                    </TouchableOpacity>
                </View>

                {/* Paid Orders List */}
                {orders.length > 0 ? (
                    <View style={styles.ordersContainer}>
                        <Text style={styles.sectionTitle}>
                            Paid Orders ({orders.length})
                        </Text>
                        <FlatList
                            data={orders}
                            keyExtractor={(item, index) => 
                                (item.orderId || item.id || index).toString()
                            }
                            renderItem={renderOrderItem}
                            scrollEnabled={false}
                        />
                    </View>
                ) : (
                    <View style={styles.noOrdersContainer}>
                        <Ionicons name="receipt-outline" size={48} color="#ccc" />
                        <Text style={styles.noOrdersText}>No paid orders yet</Text>
                    </View>
                )}

                {/* Stories */}
                <Text style={styles.sectionTitle}>Stories</Text>
                <FlatList
                    horizontal
                    data={stories}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.storyCard}>
                            <Image source={item.image} style={styles.storyImage} />
                            <Ionicons name="play-circle" size={32} color="white" style={styles.playIcon} />
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    style={styles.storiesList}
                />
            </ScrollView>

            {/* Fixed Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.navButton} onPress={() => router.push('/(home)/hometab')}>
                    <Ionicons name="home" size={24} color="#999" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => router.push('/')}>
                    <Ionicons name="chatbubble-outline" size={24} color="#999" />
                    <Text style={styles.navText}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => router.push('/cart')}>
                    <Ionicons name="cart-outline" size={24} color="#999" />
                    <Text style={styles.navText}>Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => router.push('/profile')}>
                    <Ionicons name="person-circle-outline" size={24} color="#1F41BB" />
                    <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flex: 1,
    },
    scrollContentContainer: {
        padding: 16,
        paddingBottom: 100, // Space for fixed footer
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
    },
    activityButton: {
        backgroundColor: '#1F41BB',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginLeft: 12,
    },
    activityText: {
        color: '#fff',
        fontSize: 14,
    },
    headerIcons: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    icon: {
        marginRight: 12,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#333',
    },
    announcement: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 10,
        marginVertical: 12,
    },
    announcementTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    announcementText: {
        color: '#666',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
        color: '#333',
    },
    recentAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: '#f0f0f0',
    },
    orderButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    orderButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    ordersContainer: {
        marginTop: 16,
    },
    orderItem: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#1F41BB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderNumber: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    orderDate: {
        color: '#666',
        fontSize: 13,
    },
    orderAmount: {
        fontSize: 16,
        color: '#1F41BB',
        fontWeight: '600',
        marginBottom: 4,
    },
    orderStatus: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '500',
    },
    noOrdersContainer: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginTop: 10,
    },
    noOrdersText: {
        color: '#999',
        fontSize: 16,
        marginTop: 10,
    },
    storyCard: {
        position: 'relative',
        marginRight: 12,
    },
    storyImage: {
        width: 140,
        height: 300,
        borderRadius: 10,
    },
    playIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    storiesList: {
        marginBottom: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
    },
    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: '#999',
    },
    navTextActive: {
        color: '#1F41BB',
        fontWeight: '600',
    },
});