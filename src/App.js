// Задание 1.  (вариант 1) (5. Запросы к серверу)
// JSON Placeholder

import { useEffect, useState } from "react";
import styles from "./App.module.css";

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loadingLabel}></div>
			) : (
				todos.map(({ id, userId, title, completed }) => (
					<div key={id} className={styles.todo}>
						<input
							className={styles.checkbox}
							type="checkbox"
							checked={completed}
							readOnly
						/>
						№: {id}. - {title}: Статус задачи:
						{completed ? " Завершена" : " Надо завершить"}
					</div>
				))
			)}
		</div>
	);
};
