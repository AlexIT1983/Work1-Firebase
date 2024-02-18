// Наш пользовательский Хук для удаления фена

import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteHairDryer = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	// функция для удаления фена (HairDryer)
	const requestDeleteHairDryer = () => {
		setIsDeleting(true); // устанавливаем флаг при создани товара, чтобы блокировать кнопку

		const hairDryerDbRef = ref(db, 'products/003'); // получаем конкретный элемнт из базы в ссылку
		remove(hairDryerDbRef) // удаляем элемент по ссылке
			.then((response) => {
				console.log('Фен был удален, ответ сервера', response);
			})
			.finally(() => setIsDeleting(false)); // возвращает нашу кнопку Добавить, устанавливая новое состояние
	};
	return { isDeleting, requestDeleteHairDryer };
};
