import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Animated } from 'react-native';
import slide1 from '../assets/slide/slide1.jpeg';
import slide2 from '../assets/slide/slide2.jpeg';
import slide3 from '../assets/slide/slide3.jpeg';

const { width } = Dimensions.get('window');
const carouselItems = [
    { id: '1', image: slide1 },
    { id: '2', image: slide2 },
    { id: '3', image: slide3 },
];

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2024 ECOSMART - Todos os direitos reservados</Text>
        </View>
    );
};

export default function AboutScreen({ navigation }) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const nextIndex = (prevIndex === carouselItems.length - 1) ? 0 : prevIndex + 1;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex; // Retorna o próximo índice
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
        </View>
    );

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sobre Nós</Text>
                <View style={styles.headerIcon}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                </View>
            </View>

            {/* Carousel */}
            <FlatList
                ref={flatListRef}
                data={carouselItems}
                horizontal
                pagingEnabled
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                viewabilityConfig={viewConfigRef.current}
                onViewableItemsChanged={onViewRef.current}
            />

            {/* Indicadores de paginação */}
            <View style={styles.pagination}>
                {carouselItems.map((_, index) => (
                    <View key={index} style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]} />
                ))}
            </View>

            <View style={styles.content}>
                <Text style={styles.appTitle}>ECOSMART</Text>
                <Text style={styles.paragraph}>
                    O aplicativo tem como objetivo disseminar informações sobre a 8ª edição da ODSN e o Pacto Global da ONU, buscando facilitar o acesso dos consumidores a produtos de empresas que adotam práticas sustentáveis. Ao oferecer um mercado com produtos apenas de empresas comprometidas com a sustentabilidade, o aplicativo destaca a importância das boas práticas e promove um consumo mais consciente e responsável. Além de apoiar as empresas já engajadas em estratégias sustentáveis, o aplicativo também impulsiona o surgimento de novas iniciativas alinhadas a essa filosofia, contribuindo para um mercado mais ético e comprometido com o meio ambiente.
                </Text>
            </View>

            {/* Footer */}
            <Footer />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
 /* carousel: {
    margin: 25,
    overflow: 'hidden', // aq é onde eu mexi, se tirar volta ao normal de antes
    borderRadius: 10,
  }, */
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
imageContainer: {
    width: width, // A largura agora ocupa 100% da tela
    height: 200,
    // marginHorizontal: 10, // Remova esta linha para evitar margem horizontal
},
    image: {
        width: '100%',
        height: '100%',
        
        resizeMode: 'cover',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#5D9251',
    },
    inactiveDot: {
        backgroundColor: '#A3C68C',
    },
    content: {
        backgroundColor: '#D5E5C1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        marginTop: 40,
        padding: 40,
        borderRadius: 10,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#5D9251',
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        width: '100%',
        textAlign: 'justify',
        color: '#333',
    },
    footer: {
        padding: 10,
        backgroundColor: '#A3C68C',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    footerText: {
        fontFamily: 'Poppins_700Bold',
        color: 'white',
        alignItems: 'center',
    },
});
