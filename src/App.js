// Задание 1.  (вариант 3) (5. Запросы к серверу)
// FireBase

import { useEffect, useState } from "react";
import { Todo, ControlPanel } from "./components";
import { createTodo, readTodos, updateTodo, deleteTodo } from "./api";
import {
	addTodoInTodos,
	findTodo,
	removeTodoInTodos,
	setTodoInTodos,
} from "./utils";
import { NEW_TODO_ID } from "./constants";
import styles from "./App.module.css";

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	// добавление задачи
	const onTodoAdd = () => {
		setTodos(addTodoInTodos(todos));
	};

	// функция сохранения
	const onTodoSave = (todoId) => {
		const { title, completed } = findTodo(todos, todoId) || {};
		if (todoId === NEW_TODO_ID) {
			createTodo({ title, completed }).then((id) => {
				let updatedTodos = setTodoInTodos(todos, {
					id: NEW_TODO_ID,
					isEditing: false,
				});
				updatedTodos = removeTodoInTodos(updatedTodos, NEW_TODO_ID);
				updatedTodos = addTodoInTodos(updatedTodos, {
					id,
					title,
					completed,
				});
				setTodos(updatedTodos);
			});
		} else {
			updateTodo({ id: todoId, title, completed }).then(() => {
				setTodos(
					setTodoInTodos(todos, { id: todoId, isEditing: false }),
				);
			});
		}
	};

	const onTodoEdit = (id) => {
		setTodos(setTodoInTodos(todos, { id, isEditing: true }));
	};

	const onTodoCompletedChange = (id, newCompleted) => {
		const { title } = findTodo(todos, id) || {};
		updateTodo({ id, title, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
		});
	};

	const onTodoRemove = (id) => {
		// функция удаления
		deleteTodo(id).then(() => setTodos(removeTodoInTodos(todos, id)));
	};
	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodoInTodos(todos, { id, title: newTitle }));
	};

	useEffect(() => {
		setIsLoading(true);

		readTodos(searchPhrase, isAlphabetSorting)
			.then((loadedTodos) => setTodos(loadedTodos))
			.finally(() => setIsLoading(false));
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel
				onTodoAdd={onTodoAdd}
				onSearch={setSearchPhrase}
				onSorting={setIsAlphabetSorting}
			/>
			<div>
				{isLoading ? (
					<div className={styles.loadingLabel}></div>
				) : (
					todos.map(({ id, title, completed, isEditing = false }) => (
						<Todo
							key={id}
							id={id}
							title={title}
							completed={completed}
							isEditing={isEditing}
							onTitleChange={(newTitle) =>
								onTodoTitleChange(id, newTitle)
							}
							onCompletedChange={(newCompleted) =>
								onTodoCompletedChange(id, newCompleted)
							}
							onSave={() => onTodoSave(id)}
							onRemove={() => onTodoRemove(id)}
							onEdit={() => onTodoEdit(id)}
						/>
					))
				)}
			</div>
		</div>
	);
};
