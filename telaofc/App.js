import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import HomeScreen from './components/home'; 
import StartScreen from './components/init'; 
import LoginScreen from './components/login'; 
import RegisterScreen from './components/cadastro';
import EventsScreen from './components/eventos';
import ArticlesScreen from './components/artigo';
import AboutScreen from './components/sobrenos';
import ParceriasScreen from './components/parcerias';
import PartnerDetailScreen1 from './components/parcerias1';
import PartnerDetailScreen2 from './components/parcerias2'
import PartnerDetailScreen3 from './components/parcerias3'
import PartnerDetailScreen4 from './components/parcerias4'
import PartnerDetailScreen5 from './components/parcerias5'
import PartnerDetailScreen6 from './components/parcerias6';
import DesafiosScreen from './components/desafios';
import DesafioSemanaSemPlastico from './components/desafio1';
import RegistreSeuProgresso from './components/desafio2';
import Desafiodias from './components/desafio3';
import DesafioModa from './components/desafio4';
import Desafioeduca from './components/desafio5';
import DesafioCustomizado from './components/criardesafio';
import CompraScreen from './components/mercado'
import FinalizarCompra from './components/comprafinalizada'
import CartScreen from './components/carrinho'
import ConfiguracoesScreen from './components/config';
import PerfilScreen from './components/perfil';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'; 

const Drawer = createDrawerNavigator();

export default function App() {
  
  const [isStarted, setIsStarted] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const startApp = () => {
    setIsStarted(true); 
  };

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Start" 
        screenOptions={{ 
          drawerStyle: { 
            backgroundColor: '#A3C68C', 
          },
          drawerActiveTintColor: '#FFF',  
          drawerInactiveTintColor: '#333', 
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Drawer.Screen 
          name="Sobre Nós" 
          component={AboutScreen} 
          options={{ headerShown: false }}
        />
        <Drawer.Screen 
          name="Perfil" 
          component={PerfilScreen} 
          options={{ headerShown: false }}
        />
        <Drawer.Screen 
          name="Parcerias" 
          component={ParceriasScreen} 
          options={{ headerShown: false }}
        />
         <Drawer.Screen 
          name="Configurações" 
          component={ConfiguracoesScreen} 
          options={{ headerShown: false }}
        />
        <Drawer.Screen 
          name="Start" 
          component={StartScreen} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        {/* Ocultando o item de Login */}
        <Drawer.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Cadastre-se" 
          component={RegisterScreen} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Mercado" 
          component={CompraScreen}
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Carrinho" 
          component={CartScreen}
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Artigo" 
          component={ArticlesScreen} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Eventos" 
          component={EventsScreen} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Desafios" 
          component={DesafiosScreen} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Criardesafio" 
          component={DesafioCustomizado} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Desafios1" 
          component={DesafioSemanaSemPlastico} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Desafios3" 
          component={Desafiodias} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Desafios4" 
          component={DesafioModa} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Desafios5" 
          component={Desafioeduca} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Desafios2" 
          component={RegistreSeuProgresso} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Parcerias1" 
          component={PartnerDetailScreen1} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Parcerias2" 
          component={PartnerDetailScreen2} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Parcerias3" 
          component={PartnerDetailScreen3} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Parcerias4" 
          component={PartnerDetailScreen4} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Parcerias5" 
          component={PartnerDetailScreen5} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="Parcerias6" 
          component={PartnerDetailScreen6} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
        <Drawer.Screen 
          name="CompraFinalizada" 
          component={FinalizarCompra} 
          options={{ 
            headerShown: false, 
            drawerLabel: () => null, // Oculta o item do Drawer
            title: null // Não exibe título no Drawer
          }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
