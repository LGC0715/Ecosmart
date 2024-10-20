
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Animated, Modal, TextInput, Button, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function ConfiguracoesScreen({ navigation }) {
  const [nomeUsuario, setNomeUsuario] = useState(''); // Inicializa como vazio
  useEffect(() => {
    const fetchNomeUsuario = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const { username } = JSON.parse(user);
          setNomeUsuario(username);
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };

    fetchNomeUsuario();
  }, []);


  const [expandedOptionIndex, setExpandedOptionIndex] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Estados para o formulário de conta
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // Estados para Notificações
  const [notifyPosts, setNotifyPosts] = useState(true);
  const [notifyComments, setNotifyComments] = useState(false);

  // Estado para Idiomas
  const [selectedLanguage, setSelectedLanguage] = useState('Português');

  // Estado para Armazenamento
  const [storageUsage, setStorageUsage] = useState(40); // Exemplo: 70% usado

  const [activityHistory, setActivityHistory] = useState([
    { id: 1, action: 'Comentou em uma publicação', date: '01/09/2024' },
    { id: 2, action: 'Seguiu um novo amigo', date: '30/08/2024' },
  ]);
  const [privateAccount, setPrivateAccount] = useState(false); // Configurações de privacidade

  const toggleOption = (index) => {
    const isCurrentlyExpanded = expandedOptionIndex === index;

    // Se já está expandido, feche. Caso contrário, expanda e feche os outros
    setExpandedOptionIndex(isCurrentlyExpanded ? null : index);

    const newAnimatedValue = new Animated.Value(isCurrentlyExpanded ? 1 : 0);
    setAnimatedValues((prev) => ({
      ...prev,
      [index]: newAnimatedValue,
    }));

    Animated.timing(newAnimatedValue, {
      toValue: isCurrentlyExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSaveChanges = () => {
    // Aqui você pode salvar os dados alterados via API ou em algum estado global
    console.log('Dados salvos:', { nomeUsuario, email });
    Alert.alert('Sucesso', 'Alterações salvas com sucesso!');
  };

  const handlePasswordChange = () => {
    console.log('Nova senha:', newPassword);
    setModalVisible(false);
    Alert.alert('Sucesso', 'Senha alterada com sucesso!');
  };

  const handleShare = () => {
    // Simulação de geração de link do aplicativo
    const appLink = 'https://meuaplicativo.com/compartilhar';
    Alert.alert('Compartilhar', `Compartilhe este link com seus amigos: ${appLink}`);
  };

  return (
    <View style={styles.container}>
      {/* Modal para mudança de senha */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alterar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a nova senha"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Button title="Salvar" onPress={handlePasswordChange} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={styles.headerIcon}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <ScrollView>
        {/* Perfil */}
        <View style={styles.profileContainer}>
          <Image source={require('../assets/icons/download.png')} style={styles.profilePic} />
          <Text style={styles.profileName}>{nomeUsuario}</Text>
        </View>

        {/* Opções de Configuração */}
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {[
            { title: 'Conta', subtitle: 'mudança de senha e dados', details: 'Edite suas informações...' },
            { title: 'Notificações', subtitle: 'informações, posts', details: 'Configurações de notificações...' },
            { title: 'Armazenamento', subtitle: 'Rede e dispositivo', details: 'Gerenciar armazenamento...' },
            { title: 'Amigos', subtitle: 'Convidar amigos', details: 'Convide amigos para a plataforma...' },
            { title: 'Atividades', subtitle: 'Histórico de atividades', details: 'Veja suas interações...' },
            { title: 'Privacidade', subtitle: 'Configurações de privacidade', details: 'Gerencie suas configurações de privacidade...' },
          ].map((option, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => toggleOption(index)}
              >
                <Image source={require('../assets/logo.png')} style={styles.optionIcon} />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
                <Text style={styles.arrow}>{expandedOptionIndex === index ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {expandedOptionIndex === index && (
                <Animated.View style={[styles.optionDetails, { height: animatedValues[index]?.interpolate({ inputRange: [0, 1], outputRange: [0, 250] }) }]}>
                  {/* Conta - Formulário */}
                  {option.title === 'Conta' && (
                    <View style={styles.formContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Nome de usuário"
                        value={nome}
                        onChangeText={setNome}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                      />

                      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                        <Text style={styles.saveButtonText}>Salvar alterações</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Notificações */}
                  {option.title === 'Notificações' && (
                    <View style={styles.notificationSettings}>
                      <View style={styles.switchContainer}>
                        <Text>Notificar sobre Posts</Text>
                        <Switch value={notifyPosts} onValueChange={setNotifyPosts} />
                      </View>
                      <View style={styles.switchContainer}>
                        <Text>Notificar sobre Comentários</Text>
                        <Switch value={notifyComments} onValueChange={setNotifyComments} />
                      </View>
                    </View>
                  )}

                  {/* Armazenamento */}
                  {option.title === 'Armazenamento' && (
                    <View>
                      <Text>Uso de Armazenamento: {storageUsage}%</Text>
                      <View style={styles.storageBar}>
                        <View style={[styles.storageFill, { width: `${storageUsage}%` }]} />
                      </View>
                    </View>
                  )}

                  {/* Amigos */}
                  {option.title === 'Amigos' && (
                    <View style={styles.inviteFriends}>
                      <Text>Convide seus amigos enviando um convite personalizado!</Text>
                      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Text style={styles.shareButtonText}>Compartilhar link do App</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Histórico de Atividades */}
                  {option.title === 'Atividades' && (
                    <View>
                      <Text style={styles.sectionTitle}>Histórico de Atividades</Text>
                      {activityHistory.map((activity) => (
                        <Text key={activity.id} style={styles.activityText}>
                          {activity.action} - {activity.date}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Privacidade */}
                  {option.title === 'Privacidade' && (
                    <View style={styles.switchContainer}>
                      <Text>Conta Privada</Text>
                      <Switch value={privateAccount} onValueChange={setPrivateAccount} />
                    </View>
                  )}
                </Animated.View>
              )}
            </View>
          ))}
{/* Dicas e Truques */}
        <Text style={styles.sectionTitle}>Dicas e Truques</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            'Explore nossas novas funcionalidades!',
            'Siga amigos para ver suas atividades.',
            'Participe de eventos para ganhar recompensas!',
          ].map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </ScrollView>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '', // Fundo verde claro
  },

  header: {
    width: '100%',
    height: 115,
    backgroundColor: '#A3C68C',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    // Removido: position: 'absolute', // Não fixar no topo
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
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 20, // Adicione uma margem superior para afastar do header
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsContainer: {
    paddingHorizontal: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  optionIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 18,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  arrow: {
    fontSize: 20,
  },
  optionDetails: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  formContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#388E3C', // Botão verde
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationSettings: {
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  storageBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
  },
  storageFill: {
    height: '100%',
    backgroundColor: '#388E3C', // Verde para o preenchimento do armazenamento
  },
  inviteFriends: {
    marginTop: 10,
  },
  shareButton: {
    backgroundColor: '#388E3C', // Botão verde
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
  },
  tipContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 5,
    margin: 10,
    width: width * 0.7, // Tamanho da dica
  },
  tipText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
