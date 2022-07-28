import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';

interface Todo {
  id: number;
  title: string;
}

export default function Todo() {
  const { user } = useAuth();
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

  const handleAddTodo = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (user?.role === 'Admin' || user?.role === 'Editor') {
      setTodos([...todos, { id: new Date().getTime(), title }]);
    } else {
      alert('You are not authorized to add todos');
    }
  };

  const handleDeleteTodo = (id: number) => {
    if (user?.role === 'Admin') {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      alert('Only admin can delete todo');
    }
  };

  return (
    <div>
      <h1>This is the User Dashboard Page</h1>
      <h2> Your role is: {user?.role ? user?.role : 'You are not logged in'}</h2>
      <h2>
        Your role has permissions:
        {user?.role === 'Admin'
          ? 'You can add and delete todos'
          : user?.role === 'Subscriber'
          ? 'You can read and edit todo'
          : 'You can read todo'}
      </h2>

      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
      <form onSubmit={handleAddTodo}>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <button>Add todo</button>
      </form>
    </div>
  );
}
