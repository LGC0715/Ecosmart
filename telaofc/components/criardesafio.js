import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  ImageBackground, 
  Image,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DesafioCustomizado({ navigation }) {
  const [challenges, setChallenges] = useState([]);
  const [challengeName, setChallengeName] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [challengeDifficulty, setChallengeDifficulty] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(null);

  const maxChallenges = 10;
  const categories = ['Fitness', 'Estudo', 'Trabalho', 'Lazer'];

  const backgroundOptions = [
    require('../assets/fundo/fundo1.jpg'),
    require('../assets/fundo/fundo2.jpg'),
    require('../assets/fundo/fundo3.jpg'),
  ];

  const loadChallenges = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@challenges');
    if (jsonValue != null) {
      setChallenges(JSON.parse(jsonValue));
    } else {
      setChallenges([]); // Inicia com a lista vazia
    }
  } catch (e) {
    console.error(e);
    setChallenges([]); // Garante que a lista fique vazia em caso de erro
  }
};

  const saveChallenges = async (challengesToSave) => {
    try {
      const jsonValue = JSON.stringify(challengesToSave);
      await AsyncStorage.setItem('@challenges', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const addChallenge = () => {
    if (!challengeName || !challengeDescription || !challengeDifficulty || !endDate || !category || !priority) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de adicionar o desafio.');
      return;
    }

    if (challenges.length >= maxChallenges) {
      Alert.alert('Limite Excedido', `Você pode adicionar no máximo ${maxChallenges} desafios.`);
      return;
    }

    const newChallenges = [
      ...challenges,
      { 
        name: challengeName, 
        description: challengeDescription, 
        difficulty: challengeDifficulty,
        endDate: endDate.toLocaleDateString('pt-BR'),
        category: category,
        priority: priority,
        backgroundImage: null 
      }
    ];

    setChallenges(newChallenges);
    saveChallenges(newChallenges);

    // Limpar campos
    setChallengeName('');
    setChallengeDescription('');
    setChallengeDifficulty('');
    setEndDate(new Date());
    setCategory('');
    setPriority('');
  };

  const removeChallenge = (index) => {
    const updatedChallenges = challenges.filter((_, i) => i !== index);
    setChallenges(updatedChallenges);
    saveChallenges(updatedChallenges);
  };

  const selectBackground = (index, uri) => {
    const updatedChallenges = [...challenges];
    updatedChallenges[index].backgroundImage = uri;
    setChallenges(updatedChallenges);
    saveChallenges(updatedChallenges);
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Desafios Pessoais</Text>
        <View style={styles.headerIcon}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Criação de Desafios</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Nome do Desafio" 
          value={challengeName} 
          onChangeText={setChallengeName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Descrição do Desafio" 
          value={challengeDescription} 
          onChangeText={setChallengeDescription} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Nível de Dificuldade" 
          value={challengeDifficulty} 
          onChangeText={setChallengeDifficulty} 
        />

        {/* Seleção de Data */}
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text>{endDate ? endDate.toLocaleDateString('pt-BR') : 'Selecione a Data de Término'}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || endDate;
              setShowDatePicker(false);
              setEndDate(currentDate);
            }}
          />
        )}

        {/* Seleção de Categoria */}
        <View style={styles.categoryContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton, 
                category === cat ? styles.categorySelected : null
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput 
          style={styles.input} 
          placeholder="Prioridade" 
          value={priority} 
          onChangeText={setPriority} 
        />

        <TouchableOpacity style={styles.button} onPress={addChallenge}>
          <Text style={styles.buttonText}>Adicionar Desafio</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.challengesContainer}>
          {challenges.map((challenge, index) => (
            <View key={index} style={styles.cardContainer}>
              <ImageBackground 
                source={challenge.backgroundImage 
                  ? { uri: challenge.backgroundImage } 
                  : require('../assets/FUNDODESAFIO.png')} 
                style={styles.challengeBox}
                imageStyle={styles.backgroundImage}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.challengeName}>{challenge.name}</Text>
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Dificuldade:</Text>
                    <Text style={styles.infoText}>{challenge.difficulty}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Data de Término:</Text>
                    <Text style={styles.infoText}>{challenge.endDate}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Categoria:</Text>
                    <Text style={styles.infoText}>{challenge.category}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Prioridade:</Text>
                    <Text style={styles.infoText}>{challenge.priority}</Text>
                  </View>
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity 
                    style={styles.removeButton} 
                    onPress={() => removeChallenge(index)}
                  >
                    <Text style={styles.removeButtonText}>Remover</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.selectImageButton} 
                    onPress={() => {
                      setSelectedChallengeIndex(index);
                      setModalVisible(true);
                    }}
                  >
                    <Image 
                      style={styles.imageIcon}  
                      source={require('../assets/logo.png')} 
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Modal para Seleção de Fundo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedChallengeIndex(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione um Fundo</Text>
            <View style={styles.modalOptions}>
              {backgroundOptions.map((bg, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    selectBackground(selectedChallengeIndex, Image.resolveAssetSource(bg).uri);
                    setModalVisible(false);
                    setSelectedChallengeIndex(null);
                  }}
                  style={styles.backgroundOption}
                >
                  <Image source={bg} style={styles.backgroundPreview} />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedChallengeIndex(null);
              }}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fundo verde claro
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
  
  scrollContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: '#699922',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  challengesContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  cardContainer: {
    marginBottom: 15,
  },
  challengeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
    height: 'auto',
    minHeight: 250,
  },
  backgroundImage: {
    borderRadius: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
  challengeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  challengeDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
    width: 130,
  },
  infoText: {
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  removeButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  selectImageButton: {
    backgroundColor: '#A3C68C',
    padding: 10,
    borderRadius: 5,
    flex: 0.3,
    alignItems: 'center',
  },
  imageIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  categorySelected: {
    backgroundColor: '#A3C68C',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },

  // Estilos para o Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backgroundOption: {
    marginHorizontal: 5,
  },
  backgroundPreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#A3C68C',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
