import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import api from '../services/api';

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('ProductForm', { product: item })} />
            <Button title="Excluir" onPress={() => {/* Lógica de exclusão */}} />
          </View>
        )}
      />
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('ProductForm')} />
    </View>
  );
};

export default ProductList;
