import styles from './Task.module.css';

import checkedImg from '../assets/checked.png';
import uncheckedImg from '../assets/unchecked.png';

import { Trash } from 'phosphor-react';

interface TaskProps {
  id: string;
  isCompleted: boolean;
  content: string;
  onToggleCompletedTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Task({ id, isCompleted=false, content, onToggleCompletedTask, onDeleteTask }:TaskProps) {
  function handleCompletedTask() {
    onToggleCompletedTask(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.task}>
      {
        isCompleted ?
        <img onClick={handleCompletedTask} src={checkedImg} /> :
        <img onClick={handleCompletedTask} src={uncheckedImg} />
      }
      <p className={isCompleted ? styles.isCompleted : ''}>
        {content}
      </p>
      <button onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  )
}