import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Task } from './components/Task';

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ClipboardText } from 'phosphor-react';

import styles from './App.module.css';

interface TaskInterface {
  id: string;
  isCompleted: boolean;
  content: string;
}

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  function createNewTask(newTaskText: string) {
    const newTask = {
      id: uuidv4(),
      isCompleted: false,
      content: newTaskText,
    };

    setTasks([...tasks, newTask]);
  }

  function toggleCompletedTask(taskId: string) {
    const tasksWithUpdatedOne = tasks.map(task => {
      if (task.id === taskId) {
        task.isCompleted ? task.isCompleted = false : task.isCompleted = true;
      }
      return task;
    })

    setTasks([...tasksWithUpdatedOne]);
  }

  function deleteTask(taskId: string) {
    console.log(taskId);
    const filtredTaskWithoutDeletedOne = tasks.filter(task => {
      if (task.id !== taskId) {
        return task;
      }
    })

    setTasks([...filtredTaskWithoutDeletedOne]);
  }

  const createdTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const taskProgress = `${completedTasks} de ${createdTasks}`;

  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <SearchBar createNewTask={createNewTask} />

        <div className={styles.tasksContainer}>
          <header>
            <div className={styles.createdTasks}>
              <p>Tarefas criadas</p>
              <span>
                {createdTasks}
              </span>
            </div>
            <div className={styles.completedTasks}>
              <p>Concluídas</p>
              <span>
                {taskProgress}
              </span>
            </div>
          </header>

          {
            tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  isCompleted={task.isCompleted}
                  content={task.content}
                  onToggleCompletedTask={toggleCompletedTask}
                  onDeleteTask={deleteTask}
                />
              )
            })
          }
          
          <div className={`${styles.noTasks} ${tasks.length !== 0 ? styles.hideElement : ''}`}>
            <ClipboardText size={56} />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
