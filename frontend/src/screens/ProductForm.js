import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import api from '../services/api';

const ProductForm = ({ route, navigation }) => {
  const [name, setName] = useState(route.params?.product?.name || '');
  const [description, setDescription] = useState(route.params?.product?.description || '');
  const [quantity, setQuantity] = useState(route.params?.product?.quantity || '');

  const handleSubmit = async () => {
    const product = { name, description, quantity };
    try {
      if (route.params?.product) {
        await api.put(`/products/${route.params.product._id}`, product);
      } else {
        await api.post('/products', product);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar produto', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Descrição" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Quantidade" keyboardType="numeric" value={quantity.toString()} onChangeText={text => setQuantity(Number(text))} />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ProductForm;
