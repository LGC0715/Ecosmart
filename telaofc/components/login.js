import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogin = async () => {
    const { username, password } = this.state;
    if (username && password) {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const { username: storedUsername, password: storedPassword } = JSON.parse(user);
          if (username === storedUsername && password === storedPassword) {
            this.props.navigation.navigate('Home');
          } else {
            Alert.alert('Erro', 'Nome de usuário ou senha incorretos.');
          }
        } else {
          Alert.alert('Erro', 'Nenhum usuário registrado encontrado.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>ECOSMART</Text>
          <Image
            source={require('../assets/flores.png')}
            style={styles.fundo_login}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Logue para continuar</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#666"
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#666"
            secureTextEntry
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem uma conta?{' '}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastre-se')}>
              <Text style={styles.registerLink}>Cadastre-se aqui!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fundo_login: {
    position: 'absolute',
    top: '65%',
    objectFit: 'contain',
    height: 429,
    width: 437,
    zIndex: 10,
    opacity: .8,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 250,
    backgroundColor: '#D8E2DC',
    paddingVertical: 30,
    justifyContent: 'start',
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 75,
    marginBottom: 10,
    height: 75,
    zIndex: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#699922',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
