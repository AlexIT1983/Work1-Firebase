// Наш пользовательский Хук для пылесоса
// добавим обработчик, который по нажатию кнопки будет добавлять на пылесос( для этого тоже используем fetch запрос
// только с методом POST, по умолчанию там метод GET)
// если мы хотим, чтобы после добавления пылесоса список сам обновился, надо указать в массив
// зависимостей в useEffect - после изменения которой будет запускаться наш рендер

import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddVacuumCleaner = () => {
	const [isCreating, setIsCreating] = useState(false); // новое состояние для управления кнопкой

	const requestAddVacuumCleaner = () => {
		setIsCreating(true);
	};

	const productsDbRef = ref(db, 'products');

	push(productsDbRef, {
		name: 'Новый пылесос',
		price: 4880,
	})
		.then((response) => {
			console.log('Пылесос добавлен, ответ сервера', response);
		})
		.finally(() => setIsCreating(false)); // возвращает нашу кнопку Добавить, устанавливая новое состояние

	return { isCreating, requestAddVacuumCleaner };
};
