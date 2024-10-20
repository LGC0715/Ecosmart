import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Componente ChallengeCard
const ChallengeCard = ({ imageSource, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.challengeCard}>
    <Image source={imageSource} style={styles.challengeImage} />
    <Text style={styles.challengeText}>{text}</Text>
  </TouchableOpacity>
);

const DesafiosScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Desafios</Text>
          <View style={styles.headerIcon}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
        </View>

        {/* Botão principal */}
        <TouchableOpacity style={styles.mainButton}>
          <Image source={require('../assets/icons/desa.jpg')} style={styles.mainButtonImage} />
          <Text style={styles.mainButtonText}>Desafios</Text>
        </TouchableOpacity>

        {/* Desafios Section */}
        <ChallengeCard 
          imageSource={require('../assets/desafio1.png')} 
          text="Desafio: Semana Sem Plástico"
          onPress={() => navigation.navigate('Desafios1')} 
        />

        <ChallengeCard 
          imageSource={require('../assets/desafio2.png')} 
          text="Desafio: Consumo Consciente "
          onPress={() => navigation.navigate('Desafios3')} 
        />

        <ChallengeCard 
          imageSource={require('../assets/desafio4.png')} 
          text="Desafio: Moda Sustentável"
          onPress={() => navigation.navigate('Desafios4')} 
        />

        <ChallengeCard 
          imageSource={require('../assets/desafio3.png')} 
          text="Desafio: Sustentabilidade"
          onPress={() => navigation.navigate('Desafios5')} 
        />

        {/* Botão no rodapé */}
        <TouchableOpacity 
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Criardesafio')}
        >
          <Text style={styles.bottomButtonText}>Criar seu próprio desafio</Text>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Estilos
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
  mainButton: {
    width: '90%',
    height: 100,
    backgroundColor: '#97bf5a',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  mainButtonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  mainButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  challengeCard: {
    width: '90%',
    height: 100,
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  challengeImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  challengeText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A3C68C',
    padding: 15,
    width: '90%',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomButtonText: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default DesafiosScreen;
