import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Desafioeduca = () => {
  const navigation = useNavigation(); // Usando o hook de navegação aqui

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          {/* Ícone de Menu */}
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Desafios</Text>
        <View style={styles.headerIcon}>
          {/* Placeholder for Logo Icon */}
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>
      
      
      {/* Botão de Navegação */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('Desafios')} // Navegação de volta ou para outra tela
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Título do Desafio */}
      <View style={styles.challengeTitleContainer}>
        <Text style={styles.challengeTitle}>EDUCANDO-SE SOBRE SUSTENTABILIADE</Text>
      </View>

      {/* Imagem do Desafio */}
      <Image source={require('../assets/desafio3.png')} style={styles.challengeImage} />

      {/* Descrição */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Dedique 30 dias para aprender mais sobre sustentabilidade, envolvendo-se em livros, documentários e workshops sobre o tema.
        </Text>
      </View>

      {/* Dicas e Estratégias */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>DICAS E ESTRATÉGIAS</Text>
        <View style={styles.tip}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.tipText}>Escolha um livro ou um documentário sobre desenvolvimento sustentável por semana.</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.tipText}>Participe de webinars ou cursos online gratuitos.</Text>
        </View>
         <View style={styles.tip}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.tipText}>Compartilhe o que você aprendeu com amigos ou familiares.</Text>
        </View>
      </View>

      {/* Prêmio */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>PRÊMIO</Text>
        <Text style={styles.tipText}>Um livro sobre sustentabilidade e um chaveiro do projeto!</Text>
      </View>

      {/* Botão "Registre o seu progresso" */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Desafios2')} // Navegação para a página de registro
      >
        <Text style={styles.registerButtonText}>Registre o seu progresso</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: '15%',
    backgroundColor: '#A3C68C',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  challengeTitleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  challengeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  challengeImage: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 15,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  tipsContainer: {
    backgroundColor: '#C4E6A6',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  tip: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 5,
  },
  tipText: {
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
    arrowButton: {
    position: 'absolute',
    top: '12%', // Logo abaixo do header (ajustar conforme a altura do header)
    left: 20,
    backgroundColor: '#5D9251',
    padding: 10,
    borderRadius: 20,
    zIndex: 1000, // Para garantir que fique acima de outros elementos
  },
});


export default Desafioeduca;
