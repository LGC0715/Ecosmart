import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  
  return (
    <ImageBackground source={require('../assets/back.jpeg')} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerIcon}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.mainButton}
        onPress={() => navigation.navigate('Mercado')}
      >
        <Image source={require('../assets/icons/merc.jpg')} style={styles.marketIcon} />
        <Text style={styles.mainButtonText}>Mercado</Text>
      </TouchableOpacity>

      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Artigo')}
        >
          <Text style={styles.bottomButtonText}>Artigos</Text>
          <Image source={require('../assets/icons/art.jpg')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Eventos')}
        >
          <Text style={styles.bottomButtonText}>Eventos</Text>
          <Image source={require('../assets/icons/even.jpg')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Desafios')}
        >
          <Text style={styles.bottomButtonText}>Desafios</Text>
          <Image source={require('../assets/icons/desa.jpg')} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// ... (mantenha os estilos existentes)

const styles = StyleSheet.create({

  


  container: {
    //marginTop: 30, // tirar isso aq se quiser mexer no espaço branco do home (espaco em cima)
    flex: 1,
    background: '100%',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
  },
  header: {
    width: '100%',
    height: 115,
    backgroundColor: '#A3C68C',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'absolute', // Fixar o cabeçalho no topo
    top: 0,
  },
  menuButton: {
    marginRight: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    marginBottom: 0,
    color: '#333',
    textAlign: 'center',
  },
  headerIcon: {
    marginLeft: 'auto',
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  icon: {
    width: 42, // Aumentando o tamanho dos ícones
    height: 42,
    resizeMode: 'contain',
  },
  mainButton: {
    width: '85%', // Aumentando a largura do botão principal
    height: 120,  // Aumentando a altura do botão principal
    backgroundColor: '#52771a',
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, // Tornar os cantos mais arredondados
  },
  marketIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  mainButtonText: {
    color: '#FFF',
    fontSize: 22, // Aumentando o tamanho do texto do botão principal
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Centraliza os botões horizontalmente
    width: '90%', // Reduzindo a largura total dos botões
    marginVertical: 30,    // Adiciona um espaçamento vertical em torno dos botões
  },
  bottomButton: {
    flex: 1,              // Faz os botões ocuparem a mesma largura
    height: 100,          // Aumentando a altura dos botões inferiores
    backgroundColor: '#97bf5a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,     // Aumentando a borda arredondada
    marginHorizontal: 10, // Espaçamento entre os botões
  },
  bottomButtonText: {
    color: '#FFF',
    fontSize: 18,         // Aumentando o tamanho do texto dos botões inferiores
    marginBottom: 5,
  },
});

