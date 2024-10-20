import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function ParceriasScreen({ navigation }) {
  const handlePress = (partner) => {
    // Navegar para a tela de detalhes do parceiro e passar os dados
    navigation.navigate('PartnerDetailScreen', { partner });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          {/* Ícone de Menu */}
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parcerias</Text>
        <View style={styles.headerIcon}>
          {/* Placeholder para o Logo */}
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      {/* Body com os parceiros */}
      <ScrollView contentContainerStyle={styles.body}>


        <TouchableOpacity 
          style={styles.partnerButton} // Reutilizando o estilo dos parceiros
          onPress={() => navigation.navigate('Parcerias6')} // Navega para a tela relacionada
        >
          <Image source={require('../assets/icons/6.jpeg')} style={styles.icon} />
          <Text style={styles.partnerText}>ECOSAFE</Text>
        </TouchableOpacity>

        {/* Botão Uma Semana Sem Plastico */}
        <TouchableOpacity 
          style={styles.partnerButton} // Reutilizando o estilo dos parceiros
          onPress={() => navigation.navigate('Parcerias1')} // Navega para a tela relacionada
        >
          <Image source={require('../assets/icons/1.png')} style={styles.icon} />
          <Text style={styles.partnerText}>ECOVITA</Text>
        </TouchableOpacity>

         {/* Botão Uma Semana Sem Plastico */}
        <TouchableOpacity 
          style={styles.partnerButton} // Reutilizando o estilo dos parceiros
          onPress={() => navigation.navigate('Parcerias2')} // Navega para a tela relacionada
        >
          <Image source={require('../assets/icons/2.png')} style={styles.icon} />
          <Text style={styles.partnerText}>SUSTENTAMMIS</Text>
        </TouchableOpacity>

         {/* Botão Uma Semana Sem Plastico */}
        <TouchableOpacity 
          style={styles.partnerButton} // Reutilizando o estilo dos parceiros
          onPress={() => navigation.navigate('Parcerias3')} // Navega para a tela relacionada
        >
          <Image source={require('../assets/icons/3.png')} style={styles.icon} />
          <Text style={styles.partnerText}>RENOVAVIDA</Text>
        </TouchableOpacity>

        {/* Botão Uma Semana Sem Plastico */}
        <TouchableOpacity 
          style={styles.partnerButton} // Reutilizando o estilo dos parceiros
          onPress={() => navigation.navigate('Parcerias4')} // Navega para a tela relacionada
        >
          <Image source={require('../assets/icons/5.png')} style={styles.icon} />
          <Text style={styles.partnerText}>CICLOVERDE</Text>
        </TouchableOpacity>


         {/* Botão Uma Semana Sem Plastico */}
        <TouchableOpacity 
          style={styles.partnerButton} // Reutilizando o estilo dos parceiros
          onPress={() => navigation.navigate('Parcerias5')} // Navega para a tela relacionada
        >
          <Image source={require('../assets/icons/4.png')} style={styles.icon} />
          <Text style={styles.partnerText}>REVERDCENDO</Text>
        </TouchableOpacity>

         

      </ScrollView>
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
    height: 115,
    backgroundColor: '#A3C68C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Certificar de que os elementos fiquem espaçados
    paddingHorizontal: 20,
  },
  menuButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 24,
    color: '#333',
  },
  headerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  partnerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 50, // Aumentar o tamanho dos cartões
    marginBottom: 20, // Espaçamento maior entre os itens
    borderRadius: 15, // Bordas mais arredondadas
    shadowColor: '#000',
    shadowOpacity: 0.2, // Aumentar sombra para destaque
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    borderWidth: 1, // Borda mais visível
    borderColor: '#ccc',
  },
  icon: {
    width: 70, // Aumentar o ícone
    height: 70,
    marginRight: 20,
    borderRadius: 100,
  },
  partnerText: {
    fontSize: 22, // Aumentar o texto
    fontWeight: 'bold',
    color: '#333',
  },
});
