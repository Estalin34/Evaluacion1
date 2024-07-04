import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { db } from "../Config/Config2";

interface Producto {
  key: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export const EditarEliminarScreen: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(
    null
  );
  const [nuevoNombre, setNuevoNombre] = useState<string>("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState<string>("");
  const [nuevoPrecio, setNuevoPrecio] = useState<string>("");
  const [nuevaCategoria, setNuevaCategoria] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db, "products/");
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productosArray = Object.keys(data).map((key) => ({
            key,
            ...data[key],
          }));
          setProductos(productosArray);
        } else {
          setProductos([]);
        }
      });
    };

    fetchData();

    return () => {
      // Limpiar efecto o realizar otras acciones de limpieza si es necesario
    };
  }, []);

  const editarProducto = async () => {
    if (!productoEditando) return;

    const { key, name, description, price, category } = productoEditando;
    const dbRef = ref(db, `products/${key}`);
    try {
      await update(dbRef, {
        name: nuevoNombre || name,
        description: nuevaDescripcion || description,
        price: nuevoPrecio || price,
        category: nuevaCategoria || category,
      });
      Alert.alert("Mensaje", "El producto se ha editado correctamente.");
      setProductoEditando(null);
      setNuevoNombre("");
      setNuevaDescripcion("");
      setNuevoPrecio("");
      setNuevaCategoria("");
    } catch (error: any) {
      console.error("Error al editar el producto:", error.message || error);
    }
  };

  const confirmarEliminar = (producto: Producto) => {
    Alert.alert(
      "Confirmar Eliminación",
      `¿Estás seguro de eliminar el producto '${producto.name}'?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => eliminarProducto(producto),
          style: "destructive",
        },
      ]
    );
  };

  const eliminarProducto = async (producto: Producto) => {
    const dbRef = ref(db, `products/${producto.key}`);
    try {
      await remove(dbRef);
      Alert.alert("Mensaje", "El producto se ha eliminado correctamente.");
    } catch (error: any) {
      console.error("Error al eliminar el producto:", error.message || error);
    }
  };

  const handleEditar = (producto: Producto) => {
    setProductoEditando(producto);
    setNuevoNombre(producto.name);
    setNuevaDescripcion(producto.description);
    setNuevoPrecio(producto.price);
    setNuevaCategoria(producto.category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar y Eliminar Registros</Text>
      <ScrollView style={styles.productListContainer}>
        {productos.map((producto) => (
          <View key={producto.key} style={styles.productItem}>
            <Text style={styles.productName}>{producto.name}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditar(producto)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmarEliminar(producto)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {productoEditando && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Producto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nuevoNombre}
            onChangeText={setNuevoNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={nuevaDescripcion}
            onChangeText={setNuevaDescripcion}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={nuevoPrecio}
            onChangeText={setNuevoPrecio}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoría"
            value={nuevaCategoria}
            onChangeText={setNuevaCategoria}
          />
          <TouchableOpacity style={styles.saveButton} onPress={editarProducto}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  productListContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  productItem: {
    backgroundColor: "#444",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    zIndex: 999,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#4CD964",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: "center",
  },
});

export default EditarEliminarScreen;
