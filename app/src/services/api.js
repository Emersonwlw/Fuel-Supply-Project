import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'apisauce';

const api = create ({
    //url base da api
    baseURL: 'http://fuel-supply-api.herokuapp.com',
});

//Busca o token
api.addAsyncRequestTransform(request => async () => {
    const token = await AsyncStorage.getItem('@FuelSupply:token')

    if(token)
        request.headers['Authorization'] = `Bearer ${token}`;
});

//Interceptador...é possível fazer alterações antes de chegar ao componente do react
api.addResponseTransform( response => {
    if(!response.ok) throw response;
});

// exporta a api pra poder utilizar em outros arquivos
export default api;