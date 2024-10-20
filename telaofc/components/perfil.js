import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Animated, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }) {
  const [postagens, setPostagens] = useState([
    {
      id: 1,
      conteudo: 'Conclui 70% do desafio "1 semana sem plástico".',
      likes: 34,
      liked: false,
      comentarios: [],
      comentarioVisivel: false, 
      novoComentario: '',
    },
    {
      id: 2,
      conteudo: 'Completei o desafio "Reciclagem de 30 dias" com sucesso!',
      likes: 50,
      liked: false,
      comentarios: [],
      comentarioVisivel: false,
      novoComentario: '',
    },
    {
      id: 3,
      conteudo: 'Vocês viram o projeto ECOSAFE? Achei muito inovador!',
      likes: 12,
      liked: false,
      comentarios: [],
      comentarioVisivel: false,
      novoComentario: '',
    },
  ]);

  const [novoPost, setNovoPost] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');

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

  const toggleLike = (postId) => {
    setPostagens((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const toggleComentarioVisivel = (postId) => {
    setPostagens((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comentarioVisivel: !post.comentarioVisivel } : post
      )
    );
  };

  const adicionarComentario = (postId) => {
    setPostagens((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId && post.novoComentario.trim()
          ? {
              ...post,
              comentarios: [...post.comentarios, post.novoComentario],
              novoComentario: '',
              comentarioVisivel: false,
            }
          : post
      )
    );
  };

  const handleComentarioChange = (postId, texto) => {
    setPostagens((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, novoComentario: texto } : post))
    );
  };

  const adicionarPostagem = () => {
    if (novoPost.trim()) {
      const novaPostagem = {
        id: postagens.length + 1,
        conteudo: novoPost,
        likes: 0,
        liked: false,
        comentarios: [],
        comentarioVisivel: false,
        novoComentario: '',
      };
      setPostagens([novaPostagem, ...postagens]);
      setNovoPost('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.headerIcon}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../assets/icons/download.png')} style={styles.profilePic} />
        <Text style={styles.profileName}>{nomeUsuario}</Text>
      </View>

      <Text style={styles.postsTitle}>Fazer Nova Postagem</Text>
      <View style={styles.novaPostagemContainer}>
        <TextInput
          style={styles.novoPostInput}
          placeholder="Escreva algo..."
          value={novoPost}
          onChangeText={setNovoPost}
        />
        <TouchableOpacity style={styles.novoPostButton} onPress={adicionarPostagem}>
          <Text style={styles.novoPostButtonText}>Postar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.postsTitle}>Minhas Postagens</Text>
      {postagens.map((post) => (
        <Animated.View key={post.id} style={styles.card}>
          <Image source={require('../assets/icons/download.png')} style={styles.challengeIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{post.conteudo}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => toggleLike(post.id)}>
                <Ionicons name={post.liked ? 'heart' : 'heart-outline'} size={24} color={post.liked ? '#e74c3c' : '#333'} />
                <Text style={styles.actionText}>{post.likes} curtidas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleComentarioVisivel(post.id)}>
                <Ionicons name="chatbubble-outline" size={24} color="#333" />
                <Text style={styles.actionText}>Comentar</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="share-outline" size={24} color="#333" />
                <Text style={styles.actionText}>Compartilhar</Text>
              </TouchableOpacity>
            </View>

            {post.comentarioVisivel && (
              <View style={styles.comentarioContainer}>
                <TextInput
                  style={styles.comentarioInput}
                  placeholder="Escreva um comentário..."
                  value={post.novoComentario}
                  onChangeText={(texto) => handleComentarioChange(post.id, texto)}
                />
                <TouchableOpacity style={styles.comentarioButton} onPress={() => adicionarComentario(post.id)}>
                  <Text style={styles.comentarioButtonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            )}

            {post.comentarios.length > 0 && (
              <View style={styles.comentariosList}>
                {post.comentarios.map((comentario, index) => (
                  <Text key={index} style={styles.comentarioText}>
                    {comentario}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    width: '100%',
    height: 115,
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
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  postsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionText: {
    fontSize: 12,
    color: '#333',
  },
  challengeIcon: {
    width: 40,
    height: 40,
  },
  comentarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  comentarioInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  comentarioButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  comentarioButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  comentariosList: {
    marginTop: 10,
  },
  comentarioText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
   novaPostagemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  novoPostInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  novoPostButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  novoPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
