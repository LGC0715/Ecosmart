import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação

export default function EventsScreen() {
  // State para armazenar as datas marcadas e a data selecionada
  const [markedDates, setMarkedDates] = useState({
    '2024-09-22': { marked: true, dotColor: '#6FA362', activeOpacity: 0 }, // Evento 1
    '2024-09-25': { marked: true, dotColor: '#6FA362', activeOpacity: 0 }, // Evento 2
    '2024-09-30': { marked: true, dotColor: '#6FA362', activeOpacity: 0 }, // Evento 3
  });

  // Hook de navegação
  const navigation = useNavigation();

  // Função para marcar/desmarcar eventos no calendário
  const toggleEvent = (date) => {
    setMarkedDates((prevDates) => {
      const currentMarked = { ...prevDates };
      if (currentMarked[date]) {
        // Se a data já está marcada, desmarca
        delete currentMarked[date];
      } else {
        // Marca a nova data
        currentMarked[date] = { marked: true, dotColor: '#6FA362' };
      }
      return currentMarked;
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header Component */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
            {/* Ícone de Menu */}
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Eventos</Text>
          <View style={styles.headerIcon}>
            {/* Placeholder for Logo Icon */}
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
        </View>

        {/* Calendar Component */}
        <Calendar
          // Current date
          current={new Date().toISOString().split('T')[0]}
          // Evento quando um dia é pressionado
          onDayPress={(day) => {
            toggleEvent(day.dateString); // Chama a função para marcar/desmarcar a data
            console.log('Selected day', day);
          }}
          // Datas marcadas (eventos e data selecionada)
          markedDates={markedDates}
          // Customização do estilo do calendário
          theme={{
            calendarBackground: '#E8EAE6',
            textSectionTitleColor: '#6FA362',
            selectedDayBackgroundColor: '#6FA362',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#6FA362',
            dayTextColor: '#333',
            arrowColor: '#6FA362',
            monthTextColor: '#6FA362',
            textDayFontFamily: 'Roboto',
            textMonthFontFamily: 'Roboto',
            textDayHeaderFontFamily: 'Roboto',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
          }}
          // Mostrar o domingo como o primeiro dia da semana
          firstDay={0}
        />

        {/* Cards com imagens abaixo do calendário */}
          <View style={styles.card}>
            <Image source={require('../assets/eventos/1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardText}>Evento 1 - Workshop de Sustentabilidade</Text>
          </View>

          <View style={styles.card}>
            <Image source={require('../assets/eventos/2.jpg')} style={styles.cardImage} />
            <Text style={styles.cardText}>Evento 2 - Feira de Inovação Tecnológica</Text>
          </View>

          {/* Adicione mais cards conforme necessário */}
       
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
