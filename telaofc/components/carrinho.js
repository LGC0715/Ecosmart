import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  const { cart: initialCart } = route.params; // Recebendo os itens do carrinho
  const [cart, setCart] = useState(initialCart); // Estado do carrinho
  const [quantities, setQuantities] = useState(Array(initialCart.length).fill(1)); // Inicializa as quantidades com 1

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione itens ao carrinho antes de finalizar a compra.');
    } else {
      const total = cart.reduce((acc, item, index) => acc + item.price * quantities[index], 0).toFixed(2);
      
      navigation.navigate('CompraFinalizada', {
        total,      // Passa o valor total do pedido
        cart,       // Passa os itens do carrinho
        quantities, // Passa as quantidades de cada item
      });
    }
  };

  const handleAddMoreItems = () => {
    navigation.navigate('Mercado');
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(value) || 1;
    setQuantities(newQuantities);
  };

  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    const newQuantities = [...quantities];

    newCart.splice(index, 1);
    newQuantities.splice(index, 1);

    setCart(newCart);
    setQuantities(newQuantities);
  };

  // Cálculo do total
  const total = cart.reduce((acc, item, index) => acc + item.price * quantities[index], 0).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Ajuste da StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#A3C68C" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/50/shopping-cart.png' }}
              style={styles.cartIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carrinho</Text>
          <View style={styles.headerIcon}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
        </View>

        {/* Lista de itens no carrinho */}
        <ScrollView contentContainerStyle={styles.cartList}>
          {cart.length === 0 ? (
            <Text style={styles.emptyCart}>Seu carrinho está vazio.</Text>
          ) : (
            cart.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                {/* Exibindo o nome do produto */}
                <Text style={styles.productName}>{item.name}</Text>

                <View style={styles.productPriceSection}>
                  <Text style={styles.productPrice}>R$ {(item.price * quantities[index]).toFixed(2)}</Text>
                  <TextInput
                    style={styles.quantityInput}
                    value={String(quantities[index])}
                    onChangeText={(value) => handleQuantityChange(index, value)}
                    placeholder="1"
                    keyboardType="numeric"
                  />
                </View>

                {/* Botão para remover item */}
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(index)}>
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        {/* Exibindo o total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R$ {total}</Text>
        </View>

        {/* Botões de confirmação e adicionar mais itens */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmOrder}
          >
            <Text style={styles.buttonText}>Confirmar Pedido</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addMoreButton} onPress={handleAddMoreItems}>
            <Text style={styles.buttonText}>Adicionar Mais Itens</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 115,
    backgroundColor: '#A3C68C',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
    top: 0,
  },
  menuButton: {
    marginRight: 10,
  },
  cartIcon: {
    width: 30,
    height: 30,
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
  cartList: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  productPriceSection: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityInput: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    textAlign: 'center',
    marginTop: 5,
    borderRadius: 4,
  },
  removeButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#F5F5F5',
    margin: 10,
  },
  confirmButton: {
    backgroundColor: '#A3C68C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addMoreButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  emptyCart: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  totalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartScreen;
