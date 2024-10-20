import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RegistreSeuProgresso = ({ navigation }) => {
  const [progress, setProgress] = useState(70); // Progresso padrão inicial
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { user: 'JU123', progress: 30 },
    { user: 'LU321', progress: 90 }
  ]); // Comentários iniciais

  const handleSave = () => {
    if (comment.trim()) {
      const newComment = {
        user: 'Você', // Aqui pode colocar o nome do usuário logado
        progress: progress
      };

      // Atualiza a lista de comentários com o novo comentário
      setComments([...comments, newComment]);

      // Limpa o campo de comentário
      setComment('');

      Alert.alert('Sucesso', 'Seu progresso foi salvo!');
    } else {
      Alert.alert('Erro', 'Por favor, insira um comentário.');
    }
  };

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

      {/* Título do Progresso */}
      <View style={styles.progressTitleContainer}>
        <Text style={styles.progressTitle}>REGISTRE SEU PROGRESSO</Text>
      </View>

      {/* Campo de Comentário */}
      <TextInput
        style={styles.commentInput}
        placeholder="Comente aqui..."
        placeholderTextColor="#fff"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      {/* Barra de Progresso */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={progress}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000000"
          onValueChange={setProgress}
        />
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>

      {/* Botão de Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      {/* Seção de Comentários */}
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>OUTROS COMENTÁRIOS</Text>

        {comments.map((item, index) => (
          <View key={index} style={styles.commentCard}>
            <View style={styles.commentAvatar} />
            <Text style={styles.commentText}>
              {item.user} concluiu {item.progress}% desse desafio!
            </Text>
          </View>
        ))}
      </View>
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
  progressTitleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  progressTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  commentInput: {
    backgroundColor: '#C0C0C0',
    color: '#fff',
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    
  },
  slider: {
    flex: 1,
    height: 40,
  },
  progressText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#52771a',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  commentsSection: {
    backgroundColor: '#C4E6A6',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  commentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#52771a',
    borderRadius: 20,
    marginRight: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  arrowButton: {
    position: 'absolute',
    top: 80, // Ajustado para ficar abaixo do header
    left: 20, // Mantém à esquerda
    backgroundColor: '#5D9251',
    padding: 10,
    borderRadius: 20,
    zIndex: 1, // Garante que a seta fique acima de outros elementos
  },
});

export default RegistreSeuProgresso;
