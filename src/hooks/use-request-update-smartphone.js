// Наш компонент по обновлению смартфона (кастомный Хук)

import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateSmartphone = () => {
	const [isUpdating, setIsUpdating] = useState(false); // состояние для обновления смартфона

	// функция для изменения состояния смартфона
	// значит в адресе надо обращаться конкретно к смартфону а не ко всему списку товаров
	const requestUpdateSmartphone = () => {
		const smartphoneDbRef = ref(db, 'products/002'); // путь указываем конкретно к смартфону

		set(smartphoneDbRef, {
			name: 'Смартфон',
			price: 17900,
		})
			.then((response) => {
				console.log('Смартфон обновлен, ответ сервера', response);
			})
			.finally(() => setIsUpdating(false)); // возвращает нашу кнопку Добавить, устанавливая новое состояние
	};

	return { isUpdating, requestUpdateSmartphone };
};
