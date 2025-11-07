// import { Stack } from "expo-router";
// import React, { useEffect, useRef, useState } from "react";
// import {
//     View,
//     Text,
//     SafeAreaView,
//     TextInput,
//     TouchableOpacity,
//     FlatList,
//     Image,
//     KeyboardAvoidingView,
//     Platform,
//     StyleSheet,
// } from "react-native";

// // Place a GPT logo in your project assets and require it here
// // e.g. ./assets/gpt-logo.png
// const GPT_AVATAR = require("../../assets/images/chatbot.png");

// export default function ChatScreen() {
//     const [messages, setMessages] = useState([
//         {
//             id: "1",
//             role: "assistant",
//             text: "Xin chào! Tôi là GPT, tôi có thể giúp gì cho bạn hôm nay?",
//             time: new Date().toISOString(),
//         },
//     ]);
//     const [input, setInput] = useState("");
//     const [sending, setSending] = useState(false);
//     const listRef = useRef(null);

//     useEffect(() => {
//         // scroll to bottom when messages change
//         if (listRef.current && messages.length > 0) {
//             setTimeout(() => listRef.current.scrollToEnd({ animated: true }), 100);
//         }
//     }, [messages]);

//     async function sendMessage() {
//         if (!input.trim()) return;
//         const userMsg = {
//             id: String(Date.now()),
//             role: "user",
//             text: input.trim(),
//             time: new Date().toISOString(),
//         };

//         setMessages((m) => [...m, userMsg]);
//         setInput("");
//         setSending(true);

//         try {
//             // Replace the URL below with your server endpoint that proxies to OpenAI
//             const res = await fetch("http://localhost:3000/api/chat", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ message: userMsg.text }),
//             });
//             const json = await res.json();
//             const assistantText = json.reply || "Xin lỗi, tôi không trả lời được.";

//             const botMsg = {
//                 id: String(Date.now() + 1),
//                 role: "assistant",
//                 text: assistantText,
//                 time: new Date().toISOString(),
//             };
//             setMessages((m) => [...m, botMsg]);
//         } catch (err) {
//             console.error("Error calling chat API", err);
//             const errMsg = {
//                 id: String(Date.now() + 2),
//                 role: "assistant",
//                 text: "Có lỗi xảy ra khi gọi API. Vui lòng thử lại sau.",
//                 time: new Date().toISOString(),
//             };
//             setMessages((m) => [...m, errMsg]);
//         } finally {
//             setSending(false);
//         }
//     }

//     function renderItem({ item }) {
//         const isUser = item.role === "user";
//         return (
//             <View
//                 style={[
//                     styles.row,
//                     isUser ? styles.rowRight : styles.rowLeft,
//                 ]}
//             >
//                 {!isUser && (
//                     <Image source={GPT_AVATAR} style={styles.avatar} resizeMode="cover" />
//                 )}

//                 <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
//                     <Text style={[styles.bubbleText, isUser ? styles.textUser : styles.textBot]}>
//                         {item.text}
//                     </Text>
//                     <Text style={styles.timeText}>{new Date(item.time).toLocaleTimeString()}</Text>
//                 </View>

//                 {isUser && <View style={{ width: 40 }} />}
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <Stack.Screen options={{ title: 'home', headerShown: false }} />

//             <View style={styles.header}>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <Image source={GPT_AVATAR} style={styles.headerAvatar} />
//                     <Text style={styles.headerTitle}>GPT Assistant</Text>
//                 </View>
//             </View>

//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={{ flex: 1 }}
//                 keyboardVerticalOffset={90}
//             >
//                 <FlatList
//                     ref={listRef}
//                     data={messages}
//                     keyExtractor={(item) => item.id}
//                     renderItem={renderItem}
//                     contentContainerStyle={styles.listContent}
//                 />

//                 <View style={styles.inputRow}>
//                     <TextInput
//                         value={input}
//                         onChangeText={setInput}
//                         placeholder="Nhập tin nhắn..."
//                         style={styles.input}
//                         multiline
//                     />
//                     <TouchableOpacity
//                         onPress={sendMessage}
//                         style={[styles.sendButton, sending && { opacity: 0.6 }]}
//                         disabled={sending}
//                     >
//                         <Text style={styles.sendText}>{sending ? "..." : "➤"}</Text>
//                     </TouchableOpacity>
//                 </View>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#fffff" },
//     header: {
//         height: 70,
//         backgroundColor: "rgba(255,255,255,0.06)",
//         borderBottomWidth: 1,
//         borderBottomColor: "rgba(255,255,255,0.04)",
//         paddingHorizontal: 12,
//         alignItems: "center",
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     headerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
//     headerTitle: { color: "#ddddd", fontWeight: "600", fontSize: 16 },
//     listContent: { padding: 12, paddingBottom: 20 },
//     row: { flexDirection: "row", marginVertical: 8, alignItems: "flex-end" },
//     rowLeft: { justifyContent: "flex-start" },
//     rowRight: { justifyContent: "flex-end" },
//     avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
//     bubble: {
//         maxWidth: "78%",
//         paddingVertical: 8,
//         paddingHorizontal: 12,
//         borderRadius: 14,
//         shadowColor: "#000",
//         shadowOpacity: 0.08,
//         shadowRadius: 4,
//     },
//     bubbleBot: {
//         backgroundColor: "#f1f5f9",
//         borderTopLeftRadius: 4,
//     },
//     bubbleUser: {
//         backgroundColor: "#0ea5e9",
//         borderTopRightRadius: 4,
//     },
//     bubbleText: { fontSize: 15, lineHeight: 20 },
//     textBot: { color: "#0f1720" },
//     textUser: { color: "#fff" },
//     timeText: { fontSize: 10, color: "rgba(0,0,0,0.4)", marginTop: 6, textAlign: "right" },
//     inputRow: {
//         flexDirection: "row",
//         alignItems: "flex-end",
//         padding: 8,
//         borderTopWidth: 1,
//         borderTopColor: "rgba(255,255,255,0.04)",
//         backgroundColor: "#1F41BB",
//     },
//     input: {
//         flex: 1,
//         minHeight: 40,
//         maxHeight: 120,
//         backgroundColor: "rgba(255,255,255,0.03)",
//         color: "#fff",
//         paddingHorizontal: 12,
//         paddingVertical: 8,
//         borderRadius: 20,
//     },
//     sendButton: {
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         backgroundColor: "#fffff",
//         alignItems: "center",
//         justifyContent: "center",
//         marginLeft: 8,
//     },
//     sendText: { color: "#fff", fontSize: 18, fontWeight: "700" },
// });
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GPT_AVATAR = require("../../assets/images/chatbot.png");

interface Message {
    id: string;
    role: "user" | "assistant";
    text: string;
    time: string;
}

export default function ChatScreen() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            text: "Xin chào! Tôi là GPT Assistant. Tôi có thể giúp gì cho bạn hôm nay? 👋",
            time: new Date().toISOString(),
        },
    ]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        if (listRef.current && messages.length > 0) {
            setTimeout(() => {
                listRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    async function sendMessage() {
        if (!input.trim()) return;
        
        const userMsg: Message = {
            id: String(Date.now()),
            role: "user",
            text: input.trim(),
            time: new Date().toISOString(),
        };

        setMessages((m) => [...m, userMsg]);
        setInput("");
        setSending(true);

        try {
            // Replace with your actual API endpoint
            const res = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg.text }),
            });
            const json = await res.json();
            const assistantText = json.reply || "Xin lỗi, tôi không trả lời được.";

            const botMsg: Message = {
                id: String(Date.now() + 1),
                role: "assistant",
                text: assistantText,
                time: new Date().toISOString(),
            };
            setMessages((m) => [...m, botMsg]);
        } catch (err) {
            console.error("Error calling chat API", err);
            const errMsg: Message = {
                id: String(Date.now() + 2),
                role: "assistant",
                text: "⚠️ Có lỗi xảy ra khi gọi API. Vui lòng thử lại sau.",
                time: new Date().toISOString(),
            };
            setMessages((m) => [...m, errMsg]);
        } finally {
            setSending(false);
        }
    }

    function renderItem({ item }: { item: Message }) {
        const isUser = item.role === "user";
        const time = new Date(item.time);
        const timeStr = time.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return (
            <View style={[styles.messageContainer, isUser ? styles.messageRight : styles.messageLeft]}>
                {!isUser && (
                    <Image source={GPT_AVATAR} style={styles.avatar} resizeMode="cover" />
                )}

                <View style={styles.messageContent}>
                    <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
                        <Text style={[styles.bubbleText, isUser ? styles.textUser : styles.textBot]}>
                            {item.text}
                        </Text>
                    </View>
                    <Text style={[styles.timeText, isUser && styles.timeTextRight]}>
                        {timeStr}
                    </Text>
                </View>

                {isUser && <View style={styles.userAvatarPlaceholder} />}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={28} color="#1F41BB" />
                </TouchableOpacity>

                <View style={styles.headerLeft}>
                    <View style={styles.avatarContainer}>
                        <Image source={GPT_AVATAR} style={styles.headerAvatar} />
                        <View style={styles.onlineIndicator} />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>GPT Assistant</Text>
                        <Text style={styles.headerSubtitle}>Always active</Text>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
                keyboardVerticalOffset={90}
            >
                {/* Messages List */}
                <FlatList
                    ref={listRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TouchableOpacity style={styles.attachButton}>
                            <Ionicons name="add-circle" size={28} color="#1F41BB" />
                        </TouchableOpacity>
                        
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder="Type a message..."
                            placeholderTextColor="#999"
                            style={styles.input}
                            multiline
                            maxLength={500}
                        />

                        <TouchableOpacity
                            onPress={sendMessage}
                            style={[styles.sendButton, (!input.trim() || sending) && styles.sendButtonDisabled]}
                            disabled={!input.trim() || sending}
                        >
                            {sending ? (
                                <Ionicons name="hourglass" size={20} color="#fff" />
                            ) : (
                                <Ionicons name="send" size={20} color="#fff" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    header: {
        height: 70,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 4,
    },
    headerLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    avatarContainer: {
        position: "relative",
        marginRight: 12,
    },
    headerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: "#1F41BB",
    },
    onlineIndicator: {
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#10B981",
        borderWidth: 2,
        borderColor: "#fff",
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#10B981",
        fontWeight: "500",
    },
    headerButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
    },
    keyboardView: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        paddingBottom: 20,
    },
    messageContainer: {
        flexDirection: "row",
        marginVertical: 6,
        alignItems: "flex-end",
    },
    messageLeft: {
        justifyContent: "flex-start",
    },
    messageRight: {
        justifyContent: "flex-end",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
        backgroundColor: "#F3F4F6",
    },
    userAvatarPlaceholder: {
        width: 36,
        marginLeft: 8,
    },
    messageContent: {
        maxWidth: "75%",
    },
    bubble: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
    bubbleBot: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 4,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    bubbleUser: {
        backgroundColor: "#1F41BB",
        borderTopRightRadius: 4,
    },
    bubbleText: {
        fontSize: 15,
        lineHeight: 20,
    },
    textBot: {
        color: "#1F2937",
    },
    textUser: {
        color: "#fff",
    },
    timeText: {
        fontSize: 11,
        color: "#9CA3AF",
        marginTop: 4,
        marginLeft: 4,
    },
    timeTextRight: {
        textAlign: "right",
        marginRight: 4,
        marginLeft: 0,
    },
    inputContainer: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingHorizontal: 12,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#F9FAFB",
        borderRadius: 24,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    attachButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        flex: 1,
        minHeight: 36,
        maxHeight: 100,
        fontSize: 15,
        color: "#1F2937",
        paddingHorizontal: 12,
        paddingVertical: 8,
        lineHeight: 20,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#1F41BB",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
        shadowColor: "#1F41BB",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    sendButtonDisabled: {
        backgroundColor: "#D1D5DB",
        shadowOpacity: 0,
    },
});