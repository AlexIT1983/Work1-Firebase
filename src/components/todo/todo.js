// Компонент для вывода задач и обработки задач

import styles from "./todo.module.css";

import { Button } from "../button/button";

export const Todo = ({
	id,
	title,
	completed,
	isEditing,
	onTitleChange,
	onCompletedChange,
	onEdit,
	onSave,
	onRemove,
}) => {
	return (
		<div key={id} className={styles.todo}>
			<input
				className={styles.checkbox2}
				type="checkbox"
				checked={completed}
				onChange={({ target }) => onCompletedChange(target.checked)}
			/>
			№: {id}. -{" "}
			<div className={styles.todoTitle}>
				{isEditing ? (
					<input
						type="text"
						value={title}
						onChange={({ target }) => onTitleChange(target.value)}
					/>
				) : (
					<div onClick={onEdit}>{title}</div>
				)}
			</div>
			: Статус задачи:
			{completed ? " Завершена" : " Надо завершить"}
			<div>
				{isEditing ? (
					<Button onClick={onSave}>✎</Button>
				) : (
					<Button onClick={onRemove}>✖</Button>
				)}
			</div>
		</div>
	);
};
