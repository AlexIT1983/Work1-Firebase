// Наш хук для запроса товаров

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database'; // получаем функции из базы firebase
import { db } from '../firebase';

// пример с использованием запроса через fetch() and JSON-Server

export const useRequestGetProduct = () => {
	const [products, setProducts] = useState({});

	const [isloading, setIsLoading] = useState(true);
	useEffect(() => {
		const productsDbRef = ref(db, 'products'); // получаем на рефу нашу таблицу товаров

		return onValue(productsDbRef, (snapshot) => {
			// функция подписчик
			const loadedProducts = snapshot.val() || {}; // получаем слепок данных

			console.log(loadedProducts);
			setProducts(loadedProducts); // устанавливаем это данные
			setIsLoading(false); // отключаем загрузку
		});
	}, []);
	return { isloading, products }; // возвращаем то что используем во вне
};
