import React, { useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Notebook Dell',
      description: 'Notebook Core i7, 16GB RAM',
      quantity: 10,
      photo: null, // Pode ser uma URL ou um URI local
    },
    {
      id: '2',
      name: 'Mouse Gamer',
      description: 'Mouse RGB com alta precisão',
      quantity: 25,
      photo: null,
    },
  ]);

  const navigation = useNavigation();

  // Função para deletar um produto
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Renderização de cada item da lista
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={
          item.photo
            ? { uri: item.photo }
            : require('../assets/placeholder.png') // Imagem padrão
        }
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('ProductForm', { product: item })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteProduct(item.id)}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ProductForm')}
      >
        <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  listContainer: { paddingBottom: 80 },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  productInfo: { flex: 1 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productDescription: { fontSize: 14, color: '#555' },
  productQuantity: { fontSize: 14, color: '#333' },
  actionButtons: { justifyContent: 'center' },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});

export default ProductList;
