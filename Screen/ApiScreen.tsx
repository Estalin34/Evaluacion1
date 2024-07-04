import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";

const API_URL = "https://jritsqmet.github.io/web-api/musica.json";

interface Song {
  id: string;
  title: string;
  artist: {
    name: string;
    genre: string;
    year_formed: number;
  };
  album: string;
  year: number;
  duration: string;
  media: {
    url: string;
    cover_image: string;
  };
}

export const ApiScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error de red - " + response.status);
        }
        return response.json();
      })
      .then((json) => setData(json.musica))
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setError("No se pudieron cargar los datos");
      })
      .finally(() => setLoading(false));
  }, []);

  const showMessage = (item: Song) => {
    Alert.alert(
      item.title,
      `Artista: ${item.artist.name}\nÁlbum: ${item.album}\nAño: ${item.year}\nGénero: ${item.artist.genre}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Canciones</Text>
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Canciones</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Canciones</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => showMessage(item)}
          >
            <Image
              style={styles.image}
              source={{ uri: item.media.cover_image }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.subtitleText}>
                {item.artist.name} - {item.album}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#222", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff", 
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
    color: "#ccc", 
  },
  errorText: {
    fontSize: 18,
    marginTop: 20,
    color: "#ff0000", 
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#333", 
    padding: 10,
    borderRadius: 8,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", 
  },
  subtitleText: {
    fontSize: 14,
    color: "#ccc",
  },
});

