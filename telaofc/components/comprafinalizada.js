import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Para navegação
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FinalizarCompra() {
  const navigation = useNavigation(); 
  const route = useRoute();
  const { total = 0 } = route.params || {}; // Usar 0 como valor padrão se total não estiver definido

  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [pagamento, setPagamento] = useState('');  
  const [entrega, setEntrega] = useState('gratis');

  const calcularTotal = () => {
    const taxa = entrega === 'rapida' ? 7 : 0;
    return Number(total) + taxa; // Adiciona a taxa ao total
  };

  const handleConfirmarCompra = () => {
    if (!endereco || !telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!pagamento) {
      Alert.alert('Erro', 'Por favor, selecione uma forma de pagamento.');
      return;
    }

    Alert.alert('Sucesso', 'Compra confirmada com sucesso!');
    // Aqui você pode fazer a navegação para uma tela de confirmação final ou resetar o carrinho
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/shopping-cart.png' }}
            style={styles.cartIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar Compra</Text>
        <View style={styles.headerIcon}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.navigate('Mercado')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Digite seu endereço"
          value={endereco}
          onChangeText={setEndereco}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.sectionTitle}>Forma de pagamento</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[styles.radio, pagamento === 'pix' && styles.selectedRadio]}
            onPress={() => setPagamento('pix')}
          >
            <Text style={styles.radioText}>PIX</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.radio, pagamento === 'credito' && styles.selectedRadio]}
            onPress={() => setPagamento('credito')}
          >
            <Text style={styles.radioText}>Cartão de crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.radio, pagamento === 'debito' && styles.selectedRadio]}
            onPress={() => setPagamento('debito')}
          >
            <Text style={styles.radioText}>Cartão de débito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.radio, pagamento === 'cheque' && styles.selectedRadio]}
            onPress={() => setPagamento('cheque')}
          >
            <Text style={styles.radioText}>Cheque</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Entrega</Text>
        <View style={styles.deliveryOptions}>
          <TouchableOpacity
            style={[styles.radio, entrega === 'gratis' && styles.selectedRadio]}
            onPress={() => setEntrega('gratis')}
          >
            <Text style={styles.radioText}>GRÁTIS - 20 dias</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.radio, entrega === 'rapida' && styles.selectedRadio]}
            onPress={() => setEntrega('rapida')}
          >
            <Text style={styles.radioText}>R$ 7,00 - 7 dias</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.total}>
          <Text style={styles.totalText}>Valor do pedido: R$ {Number(total).toFixed(2)}</Text>
          <Text style={styles.totalText}>Taxa de envio: R$ {(entrega === 'rapida' ? 7 : 0).toFixed(2)}</Text>
          <Text style={styles.totalText}>Total: R$ {calcularTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmarCompra}>
          <Text style={styles.confirmButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    paddingTop: 40, // Ajuste dinâmico para a StatusBar
    position: 'absolute',
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
  content: {
    marginTop: 120, // Para empurrar o conteúdo abaixo do header
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  paymentOptions: {
    marginBottom: 16,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  selectedRadio: {
    backgroundColor: '#A3C68C',
  },
  radioText: {
    fontSize: 16,
    color: '#555',
  },
  deliveryOptions: {
    marginBottom: 16,
  },
  total: {
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#A3C68C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowButton: {
    margin: 10, // Ajuste conforme necessário
    backgroundColor: '#5D9251',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start', // Alinha o botão à esquerda
  },
});
