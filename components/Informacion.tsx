import React from 'react';
import { Text, StyleSheet } from 'react-native';
interface Props {
  children: React.ReactNode;
}

const Informacion = ({ children }: Props) => {
  return <Text style={styles.productName}>{children}</Text>;
};

const styles = StyleSheet.create({
  productName: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Informacion;