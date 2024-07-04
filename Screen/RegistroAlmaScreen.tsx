import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { onValue, ref } from "firebase/database";
import { db } from "../Config/Config2";

interface Producto {
  key: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export const RegistroAlmaScreen = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const starCountRef = ref(db, "products/");
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const dataTemp = Object.keys(data).map((key) => ({
              key,
              ...data[key],
            }));
            setProductos(dataTemp);
          } else {
            setProductos([]);
          }
        });
      } catch (error) {
        console.error("Error obteniendo productos:", error);
        Alert.alert("Error", "No se pudieron cargar los productos");
      }
    };
    obtenerProductos();
  }, []);

  const toggleProducto = (producto: Producto) => {
    if (productoSeleccionado && productoSeleccionado.key === producto.key) {
      setProductoSeleccionado(null);
    } else {
      setProductoSeleccionado(producto);
    }
  };

  const mostrarDetalles = (producto: Producto) => {
    Alert.alert(
      "Más Información",
      `ID: ${producto.key}\nNombre: ${producto.name}\nDescripción: ${producto.description}\nPrecio: ${producto.price}\nCategoría: ${producto.category}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos Registrados</Text>

      {productoSeleccionado && (
        <View style={styles.productDetails}>
          <Text style={styles.productLabel}>Detalles del Producto</Text>
          <View style={styles.productInfo}>
            <Text style={styles.productInfoText}>
              ID: {productoSeleccionado.key}
            </Text>
            <Text style={styles.productInfoText}>
              Nombre: {productoSeleccionado.name}
            </Text>
            <Text style={styles.productInfoText}>
              Descripción: {productoSeleccionado.description}
            </Text>
            <Text style={styles.productInfoText}>
              Precio: {productoSeleccionado.price}
            </Text>
            <Text style={styles.productInfoText}>
              Categoría: {productoSeleccionado.category}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => mostrarDetalles(productoSeleccionado)}
          >
            <Text style={styles.buttonText}>Ver Detalles</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.productListContainer}>
        {productos.map((producto) => (
          <TouchableOpacity
            key={producto.key}
            onPress={() => toggleProducto(producto)}
          >
            <View style={styles.productItem}>
              <Text style={styles.productName}>{producto.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  productListContainer: {
    flex: 1,
    marginTop: 10,
  },
  productItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  productName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  productDetails: {
    backgroundColor: "#333", // Fondo oscuro para los detalles del producto
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  productLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  productInfo: {
    marginBottom: 15,
  },
  productInfoText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007BFF", // Fondo azul para el botón de detalles
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegistroAlmaScreen;
