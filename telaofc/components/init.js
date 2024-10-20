import React, { useEffect, useRef } from 'react';  
import { View, StyleSheet, Animated, Easing, Text, Image } from 'react-native';  
import logoImage from '../assets/logo.png'; // Imagem do logo centralizado  
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';  

const StartScreen = ({ navigation }) => {  
  const animatedValues = useRef([...Array(20)].map(() => new Animated.Value(0))).current; // 40 bolinhas  
  const logoAnimation = useRef(new Animated.Value(0)).current; // Animação do logo  
  const titleAnimation = useRef(new Animated.Value(0)).current; // Animação do título  

  useEffect(() => {  
    activateKeepAwakeAsync();  

    const animations = animatedValues.map((animatedValue, index) => {  
      return Animated.loop(  
        Animated.sequence([  
          Animated.timing(animatedValue, {  
            toValue: 1,  
            duration: 2000 + index * 200,  
            easing: Easing.linear,  
            useNativeDriver: true,  
          }),  
          Animated.timing(animatedValue, {  
            toValue: 0,  
            duration: 2000 + index * 200,  
            easing: Easing.linear,  
            useNativeDriver: true,  
          }),  
        ])  
      );  
    });  

    animations.forEach(animation => animation.start());  

    Animated.loop(  
      Animated.sequence([  
        Animated.timing(logoAnimation, {  
          toValue: 1,  
          duration: 3000,  
          easing: Easing.linear,  
          useNativeDriver: true,  
        }),  
        Animated.timing(logoAnimation, {  
          toValue: 0,  
          duration: 3000,  
          easing: Easing.linear,  
          useNativeDriver: true,  
        }),  
      ])  
    ).start();  

    Animated.loop(  
      Animated.sequence([  
        Animated.timing(titleAnimation, {  
          toValue: 1,  
          duration: 3000,  
          easing: Easing.linear,  
          useNativeDriver: true,  
        }),  
        Animated.timing(titleAnimation, {  
          toValue: 0,  
          duration: 3000,  
          easing: Easing.linear,  
          useNativeDriver: true,  
        }),  
      ])  
    ).start();  

    const timer = setTimeout(() => {  
      navigation.navigate('Login');  
      deactivateKeepAwake();  
    }, 2500);  

    return () => {  
      animations.forEach(animation => animation.stop());  
      clearTimeout(timer);  
      deactivateKeepAwake();  
    };  
  }, [navigation, animatedValues, logoAnimation, titleAnimation]);  

  const translateYValues = animatedValues.map(animatedValue =>  
    animatedValue.interpolate({  
      inputRange: [0, 1],  
      outputRange: [0, -30 + Math.random() * 60],  
    })  
  );  

  const logoTranslateY = logoAnimation.interpolate({  
    inputRange: [0, 1],  
    outputRange: [0, -30],  
  });  

  const titleTranslateY = titleAnimation.interpolate({  
    inputRange: [0, 1],  
    outputRange: [0, -20],  
  });  

  return (  
    <View style={styles.background}>  
      <View style={styles.greenBackground} />  

      {translateYValues.map((translateY, index) => {  
        const randomLeft = Math.random() * 100;  
        const randomTop = Math.random() * 100;  
        return (  
          <Animated.View  
            key={index}  
            style={[  
              styles.dot,  
              {  
                transform: [{ translateY }],  
                left: `${randomLeft}%`,  
                top: `${randomTop}%`,  
                position: 'absolute',  
                zIndex: -1, // Bolinhas atrás de tudo
              }  
            ]}  
          />  
        );  
      })}  

      <Animated.Image  
        source={logoImage}  
        style={[  
          styles.logo,  
          { transform: [{ translateY: logoTranslateY }] }  
        ]}  
      />  

      <Animated.Text style={[styles.title, { transform: [{ translateY: titleTranslateY }] }]}>  
        {'ECOSMART'}  
      </Animated.Text>  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  background: {  
    flex: 1,  
    width: '100%',  
    height: '100%',  
    justifyContent: 'center',  
    alignItems: 'center',  
  },  
  greenBackground: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
    backgroundColor: '#86b24e',  
    zIndex: -2,  // Fundo verde abaixo de tudo
  },  
  dot: {  
    width: 20,  
    height: 20,  
    backgroundColor: 'white',  
    borderRadius: 10,  
  },  
  logo: {  
    position: 'absolute',  
    top: '30%',  
    width: 300,  
    height: 300,  
    resizeMode: 'contain',  
    zIndex: 1,  // Logo acima das bolinhas
  },  
  title: {  
    position: 'absolute',  
    top: '60%',  
    fontSize: 50,  
    fontWeight: 'bold',  
    color: '#FFF',  
    textAlign: 'center',  
    zIndex: 1,  // Título acima das bolinhas
  },  
});  

export default StartScreen;
