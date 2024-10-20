import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Linking } from 'react-native';

const { width } = Dimensions.get('window'); // Obtém a largura da tela do dispositivo

export default function ArticlesScreen({ navigation }) {
  const openWebPage = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          {/* Ícone de Menu */}
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artigos</Text>
        <View style={styles.headerIcon}>
          {/* Placeholder for Logo Icon */}
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      {/* Main Button */}
      <TouchableOpacity style={styles.mainButton}>
        <Image source={require('../assets/icons/art.jpg')} style={styles.articlesIcon} />
        <Text style={styles.mainButtonText}>Artigos</Text>
      </TouchableOpacity>

      {/* Articles List */}
      <ScrollView contentContainerStyle={styles.articlesContainer}>
        {/* Article 1 */}
        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://www.globalgoals.org/goals/')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
            Os Objetivos de Desenvolvimento Sustentável (ODS)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://www.ipea.gov.br/ods/ods12.html')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
            ODS 12
          </Text>
        </TouchableOpacity>


        {/* Article 2 */}
        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjo3qOK2dSIAxWwNK0GHamxPeYYABAAGgJwdg&co=1&ase=2&gclid=EAIaIQobChMI6N6jitnUiAMVsDStBh2psT3mEAAYASAAEgKNZfD_BwE&ohost=www.google.com&cid=CAASJORodV3YxnilOT8t7hA_kB8gz-jmGMeBAXqO6SwLF71fiNIHyw&sig=AOD64_0l2AaNZcOo0EKp4w4ORttewPGYXg&q&nis=4&adurl&ved=2ahUKEwiRvpaK2dSIAxXurJUCHcY4GPoQ0Qx6BAgTEAE')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
            Ações sustentáveis
          </Text>
        </TouchableOpacity>


{/* Article 1 */}
        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://www.todamateria.com.br/sustentabilidade/')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
           Sustentabilidade: o que é, conceito e seus tipos (com exemplos)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://www.scielo.br/j/dados/a/S8F4G8YjdBJVZFKYQ3VFy7w/?lang=pt')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
           Índice de Sustentabilidade Financeira Municipal (ISFM): Alternativa à Frágil Caracterização Proposta na PEC do Pacto Federativo Brasileiro
          </Text>
        </TouchableOpacity>


        {/* Article 2 */}
        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://brasilescola.uol.com.br/geografia/meio-ambiente.htm')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
        Meio ambiente
          </Text>
        </TouchableOpacity>

{/* Article 1 */}
        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://www.econodata.com.br/maiores-empresas/todo-brasil/reciclagem')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
         Ranking das 100 Maiores empresas de reciclagem no Brasil por faturamento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://exame.com/negocios/lixo-zero-conheca-5-empresas-que-reaproveitam-seus-residuos-ao-maximo/')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
            Lixo zero: conheça 5 empresas que reaproveitam seus resíduos ao máximo
          </Text>
        </TouchableOpacity>


        {/* Article 2 */}
        <TouchableOpacity 
          style={styles.articleItem} 
          onPress={() => openWebPage('https://www.gov.br/mma/pt-br/acesso-a-informacao/acoes-e-programas/programa-projetos-acoes-obras-atividades/combate-ao-lixo-no-mar')}
        >
          <Image source={require('../assets/logo.png')} style={styles.articleImage} />
          <Text style={styles.articleText}>
          Combate ao Lixo no Mar
          </Text>
        </TouchableOpacity>


        {/* Adicione mais artigos conforme necessário */}
      </ScrollView>
    </View>
    </ScrollView>
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
    padding: 20,
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
  mainButton: {
    width: '80%',
    height: 100,
    backgroundColor: '#97bf5a',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  articlesIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  mainButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  articlesContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: width, // Ajusta ao tamanho da tela
  },
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '100%', // Ocupa a largura total da tela
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  articleImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  articleText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
