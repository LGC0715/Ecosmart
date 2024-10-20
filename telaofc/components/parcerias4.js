import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PartnerDetailScreen4({ navigation }) {
  const partnerInfo = {
    name: 'CicloVerde',
    description:
      'A CICLOVERDE é uma empresa de reciclagem dedicada à proteção dos mares e da vida marinha, focando na coleta de resíduos sólidos que afetam os oceanos. A empresa busca preservar ecossistemas marinhos, reduzindo a poluição e protegendo espécies aquáticas por meio de soluções sustentáveis e conscientização ambiental.',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0D9" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parcerias</Text>
        <View style={styles.headerIcon}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      {/* Botão de Navegação */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('Parcerias')}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Ícone grande */}
      <View style={styles.iconContainer}>
        <Image source={require('../assets/icons/5.png')} style={styles.partnerImage} />
      </View>

      {/* Nome do parceiro */}
      <Text style={styles.partnerName}>{partnerInfo.name}</Text>

      {/* Descrição */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.partnerDescription}>{partnerInfo.description}</Text>
      </View>
    </View>
  );
}

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
  iconContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  partnerImage: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    resizeMode: 'contain',
    borderRadius: 100,
  },
  partnerName: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
  },
  descriptionContainer: {
    backgroundColor: '#C8D7A8',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: '90%',
  },
  partnerDescription: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
  },
  arrowButton: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: '#5D9251',
    padding: 10,
    borderRadius: 20,
  },
});
