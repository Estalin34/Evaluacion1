import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// URL de la imagen que deseas usar
const profileImageUrl = 'https://marketing4ecommerce.cl/wp-content/uploads/2019/08/nueva-portada-enero.jpeg'; // Reemplaza con la URL de tu imagen

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: profileImageUrl }} style={styles.image} />
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Mi nombre es</Text>
      <Text style={styles.name}>Estalin Fuenmayor</Text>
      <Text style={styles.subtitle}>Carrera:</Text>
      <Text style={styles.career}>Desarrollo de Software</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222', // Cambia a un color oscuro, por ejemplo '#222'
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para el título
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc', // Color claro para subtítulos
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para nombre
    marginBottom: 10,
  },
  career: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#ccc', // Color claro para carrera
    marginBottom: 20,
  },
});
