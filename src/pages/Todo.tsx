import { useMemo, useState } from 'react';
import { findReason } from '~/configs/ability';
import { ACTIONS, SUBJECTS } from '~/configs/auth';
import { useAbility } from '~/hooks';
import { useAuth } from '~/hooks/useAuth';

interface Todo {
  id: number;
  title: string;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Learn React',
    },
    {
      id: 2,
      title: 'Learn TypeScript',
    },
  ]);
  const [title, setTitle] = useState('');

  const { user } = useAuth();
  const ability = useAbility();

  const youCan = useMemo(() => {
    const createTodo = ability?.can(ACTIONS.create, SUBJECTS.Todo);
    const deleteTodo = ability?.can(ACTIONS.delete, SUBJECTS.Todo);
    const readTodo = ability?.can(ACTIONS.read, SUBJECTS.Todo);
    return {
      createTodo,
      deleteTodo,
      readTodo,
    };
  }, [ability]);

  const handleAddTodo = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (youCan.createTodo) {
      setTodos([...todos, { id: new Date().getTime(), title }]);
    } else {
      alert(findReason(ability, 'create'));
    }
  };

  const handleDeleteTodo = (id: number) => {
    if (youCan.deleteTodo) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      alert(findReason(ability, 'delete'));
    }
  };

  return (
    <div>
      {youCan.readTodo ? (
        <>
          <h1>This is the User Dashboard Page</h1>
          <h2> Your role is: {user?.role || 'You are not logged in'}</h2>
          <h2>
            Your role has permissions:
            {ability.rules
              .filter((rule) => !rule.inverted)
              .map((rule) => rule.action)
              .join(', ')}
          </h2>

          {todos.map((todo) => (
            <div key={todo.id}>
              <h2>{todo.title}</h2>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          ))}

          <br />
          <br />

          <form onSubmit={handleAddTodo}>
            <div>
              <label htmlFor='title'>Title</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <br />
            <button>Add todo</button>
          </form>
        </>
      ) : (
        <h1> {findReason(ability, 'create')} </h1>
      )}
    </div>
  );
}
