import { PlusCircle } from 'phosphor-react'
import { FormEvent, ChangeEvent, useState } from 'react';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  createNewTask: (newTaskText: string) => void;
}

export function SearchBar({ createNewTask }:SearchBarProps) {
  const [newTaskText, setNewTaskText] = useState('');

  function handleCreateNewTask(event:FormEvent) {
    event.preventDefault();
    
    createNewTask(newTaskText);
    setNewTaskText('');
  }

  function handleNewTaskText(event:ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  const newTaskInputIsEmpty = newTaskText.length === 0;

  return (
    <form onSubmit={handleCreateNewTask} className={styles.searchBar}>
        <input
          onChange={handleNewTaskText}
          name='task'
          type='text'
          value={newTaskText}
          placeholder='Adicione uma nova tarefa'
          required
        />
        <button disabled={newTaskInputIsEmpty}>
          Criar
          <PlusCircle size={16} />
        </button>
      </form>
  )
}