import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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
    //   { id: '4', image: require('../../assets/images/story4.htm') },
]
export default function ProfileTab() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
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
                <Text style={styles.greeting}>Hello, Amanda!</Text>

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
                    <TouchableOpacity style={styles.orderButton}><Text>To Pay</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.orderButton}><Text>To Receive</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.orderButton}><Text>To Review</Text></TouchableOpacity>
                </View>

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
                />
                        <View style={styles.footer}>
                          <TouchableOpacity style={styles.navButton} onPress={() => router.push('/(home)/hometab')}>
                            <Ionicons name="home" size={24} color="#1F41BB" />
                            <Text style={styles.navText}>Home</Text>
                          </TouchableOpacity>
                
                          <TouchableOpacity style={styles.navButton} onPress={() => router.push('/message')}>
                            <Ionicons name="chatbubble-outline" size={24} color="#999" />
                            <Text style={styles.navText}>Message</Text>
                          </TouchableOpacity>
                
                          <TouchableOpacity style={styles.navButton} onPress={() => router.push('/cart')}>
                            <Ionicons name="cart-outline" size={24} color="#999" />
                            <Text style={styles.navText}>Cart</Text>
                          </TouchableOpacity>
                
                          <TouchableOpacity style={styles.navButton} onPress={() => router.push('/profile')}>
                            <Ionicons name="person-circle-outline" size={24} color="#999" />
                            <Text style={styles.navText}>Profile</Text>
                          </TouchableOpacity>
                
                        </View>
                
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
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
    },
    recentAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
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
      footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 100
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
});
