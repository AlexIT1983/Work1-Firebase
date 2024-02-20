// Наши функции для приложения

import {
	get,
	orderByChild,
	query,
	ref,
	push,
	set,
	remove,
} from "firebase/database";
import { db } from "../firebase";

// функция добавления задачи
export const createTodo = (newTodo) =>
	push(ref(db, "todos"), newTodo).then(({ key }) => key);

// функция чтения данных
export const readTodos = (searchPhrase = "", isAlphabetSorting = false) => {
	const todosDbRef = ref(db, "todos");
	const orderingField = isAlphabetSorting ? "title" : "id";

	return get(query(todosDbRef, orderByChild(orderingField))).then(
		(snapshot) => {
			let loadedTodos = [];

			snapshot.forEach((todoSnapshot) => {
				const id = todoSnapshot.key;
				const { title, completed } = todoSnapshot.val();
				loadedTodos.push({ id, title, completed });
			});
			if (searchPhrase !== "") {
				loadedTodos = loadedTodos.filter(
					({ title }) =>
						title
							.toLowerCase()
							.indexOf(searchPhrase.toLowerCase()) >= 0,
				);
			}

			return isAlphabetSorting ? loadedTodos : loadedTodos.reverse();
		},
	);
};

// функция редактированя задачи
export const updateTodo = (todoData) =>
	set(ref(db, `todos/${todoData.id}`), todoData);

// функция удаления задачи
export const deleteTodo = (todoId) => remove(ref(db, `todos/${todoId}`));
