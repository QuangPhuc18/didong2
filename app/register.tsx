import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.Text1}>Create Account</View>
            <View style={styles.Text2}>Create an account so you can explore all the existing job<br></br>
               existing jobs
            </View>

            <View style={styles.formLogin}>
                <View>
                    <TextInput style={styles.input} placeholder='Email' />

                </View>
                <View>
                    <TextInput style={styles.input} placeholder='Password' />
                </View>
                  <View>
                    <TextInput style={styles.input} placeholder='Confirm Password' />
                </View>

                <View style={styles.formSign}>
                    <View style={styles.sign}>Sign In</View>
                </View>
                <View style={styles.text4}>Already have an account</View>
                <View style={styles.text5}>Or continue with</View>
                <View>
                    <Image source={require('../assets/images/social media.png')} style={styles.icon} />  </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    Text1: {
        textAlign: 'center',
        color: '#1F41BB',
        fontSize: 24,
        fontWeight: '700',
    },
    Text2: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,

    },
    formLogin: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    input: {

        backgroundColor: '#F1F4FF',
        borderRadius: 10,
        width: 330,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        paddingLeft: 20,
    },

    text3: {
        marginTop: 10,
        color: '#1F41BB',
        textAlign: 'center',
        justifyContent: 'center',
    },
    formSign: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sign: {
        backgroundColor: '#1F41BB',
        color: '#fff',
        borderRadius: 10,
        width: 330,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30,
        paddingLeft: 20,
    },
    text4: {
        marginTop: 15,
        textAlign: 'center',
    },
    text5: {
        marginTop: 20,
        textAlign: 'center',
        color: '#1F41BB',
        fontWeight: '700',
        fontSize: 16,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }

})