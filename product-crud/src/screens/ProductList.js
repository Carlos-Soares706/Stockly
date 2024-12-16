import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import api from '../services/api';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('ProductForm', { product: item })} />
          </View>
        )}
      />
      <Button title="Add Product" onPress={() => navigation.navigate('ProductForm')} />
    </View>
  );
}
