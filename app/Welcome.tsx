import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const Welcome = () => {
  return (
    <View style={styles.background}>
    <View style={styles.container}>
        <Image source={require('../assets/images/welcome image.png')} />
      </View>
    <View style={styles.text}>
        Discover your <br></br>
        Dream Job here
        </View>
        <View style={styles.text2}>
        Explore all the most exciting jobs roles based on your <br></br>interest and study major.
        </View>

        <View style={styles.FormLogin}>
        <View >
            
            <Link href="/login" style={styles.Button}>Login</Link>
        </View>
        <View>
            <Link href="/register" style={styles.Register}>Register</Link>

        </View>
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({  
    background:{
        backgroundColor: '#FFFFFF',
        height: '100%',
        
        
    },

    container: {
    flex: 1,   

    justifyContent: 'center',
    alignItems: 'center',
 

    },
    text:{
        textAlign: 'center',
        fontSize: 24,
        color: '#1F41BB',
        
        fontWeight: '700',
    },
      text2:{
        textAlign: 'center',
        fontSize: 15,
       
    },
    FormLogin:{
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    Button:{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F41BB',
        color:'#fff', 
        borderRadius:10,
        width: 153,
        height: 35,
        textAlign: 'center',
        marginTop: 30,
        marginLeft: 10,
    },
    Register:{
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        // backgroundColor: '#1F41BB',
        // color:'#fff', 
        borderRadius:10,
        width: 153,
        height: 35,
        marginTop: 30,
        marginLeft: 10,
     
       
    }



})