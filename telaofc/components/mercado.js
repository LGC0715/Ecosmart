import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Alert, StatusBar } from 'react-native';

export default function CompraScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]); // Estado para o carrinho
  const [expandedItemId, setExpandedItemId] = useState(null); // Estado para item expandido

  // Itens fictícios para o grid
  const products = [
    { id: 1, name: 'Ecobag', image: require('../assets/prod1.png'), price: 20.00, details: 'Uma ecobag sustentável.' },
    { id: 2, name: 'Ecobag', image: require('../assets/prod2.png'), price: 22.00, details: 'Uma ecobag sustentável.' },
    { id: 3, name: 'Ecobag', image: require('../assets/prod3.png'), price: 22.00, details: 'Uma ecobag sustentável.' },
    { id: 4, name: 'Caneca', image: require('../assets/prod4.jpeg'), price: 18.00, details: 'Caneca reutilizável cerâmica.' },
    { id: 5, name: 'Caderno', image: require('../assets/prod5.png'), price: 15.00, details: 'Caderno 100% de papel reciclado.' },
    { id: 6, name: 'Chaveiro', image: require('../assets/prod8.png'), price: 8.00, details: 'Chaveiro personalizado.' },
    { id: 7, name: 'Camiseta Masculina', image: require('../assets/prod6.png'), price: 35.00, details: 'Uma camiseta de tecido sustentável. TAM Único.' },
    { id: 8, name: 'Camiseta Feminina', image: require('../assets/prod7.png'), price: 30.00, details: 'Uma camiseta de tecido sustentável. TAM Único.' },
  ];

  const [filteredItems, setFilteredItems] = useState(products);

  // Função de busca
  const handleSearch = (query) => {
    const results = products.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(results);
  };

  // Função para adicionar item ao carrinho
  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert('Item adicionado ao carrinho', `${item.name} foi adicionado ao seu carrinho.`);
  };

  // Função para alternar a expansão do card
  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* Header Fixo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mercado</Text>
        <View style={styles.headerIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('Carrinho', { cart })}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);  // Atualiza o estado da query
            handleSearch(text);    // Executa a função de pesquisa automaticamente
          }}
        />
      </View>

      {/* Grid de itens */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {filteredItems.map((item) => (
          <View key={item.id} style={styles.imageBox}>
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Image
                source={item.image}
                style={styles.image}
              />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
            {expandedItemId === item.id && (
              <View style={styles.detailsContainer}>
                <Text style={styles.itemDetails}>{item.details}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Botão de carrinho no canto inferior direito */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Carrinho', { cart })} // Passando o carrinho
      >
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/50/shopping-cart.png' }}
          style={styles.cartIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    width: '100%',
    height: 115,
    backgroundColor: '#A3C68C',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: StatusBar.currentHeight || 20, // Ajuste dinâmico para a StatusBar
    position: 'absolute',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 130, // Ajuste para dar espaço ao header
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
  itemName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginTop: 5,
    color: '#888',
  },
  detailsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#E0E0E0',
  },
  itemDetails: {
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  addButton: {
    backgroundColor: '#A3C68C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#A3C68C',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  imageBox: {
    width: '48%', // Ajuste para garantir alinhamento uniforme
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
  },
});
