import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getDatabase, ref, set } from "firebase/database";
import { db } from "../Config/Config2";

interface Producto {
  name: string;
  description: string;
  price: string;
  category: string;
}

 export const ProductosScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [titleColor, setTitleColor] = useState<string>("#36BA98");

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleColor((prevColor) =>
        prevColor === "#36BA98" ? "white" : "#36BA98"
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const writeProductData = () => {
    if (!productName || !productDescription || !productPrice || !productCategory) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    const dbRef = ref(db, `products/${productName}`);
    const nuevoProducto: Producto = {
      name: productName,
      description: productDescription,
      price: productPrice,
      category: productCategory,
    };

    set(dbRef, nuevoProducto)
      .then(() => {
        Alert.alert("Mensaje", "Producto registrado exitosamente.");
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductCategory("");
      })
      .catch((error) => {
        console.error("Error al registrar producto:", error);
        Alert.alert("Error", "No se pudo registrar el producto.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: titleColor }]}>
        Registro de Producto
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del producto:</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={(text) => setProductName(text)}
            placeholder="Introduce el nombre del producto"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            value={productDescription}
            onChangeText={(text) => setProductDescription(text)}
            placeholder="Introduce la descripción del producto"
            multiline={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Precio:</Text>
          <TextInput
            style={styles.input}
            value={productPrice}
            onChangeText={(text) => setProductPrice(text)}
            keyboardType="numeric"
            placeholder="Introduce el precio del producto"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Categoría:</Text>
          <TextInput
            style={styles.input}
            value={productCategory}
            onChangeText={(text) => setProductCategory(text)}
            placeholder="Introduce la categoría del producto"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={writeProductData}>
          <Text style={styles.buttonText}>Registrar Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("RegistroAlmacen")}
        >
          <Text style={styles.buttonText}>Ver Productos Registrados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#222", // Fondo oscuro para el contenedor principal
  },
  formContainer: {
    backgroundColor: "#333", // Fondo oscuro para el contenedor del formulario
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 16,
    color: "#fff", // Texto blanco para etiquetas
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff", // Fondo blanco para inputs
  },
  button: {
    backgroundColor: "#007BFF", // Fondo azul para botones principales
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#6C757D", // Fondo gris para botones secundarios
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF", // Texto blanco para botones
    fontSize: 18,
    fontWeight: "bold",
  },
});


