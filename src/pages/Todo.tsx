import { useMemo, useState } from 'react';
import Can from '~/components/Can';
import { findReason } from '~/configs/ability';
import { Actions, Subjects } from '~/configs/auth';
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

  const todoReason = useMemo(() => {
    const createTodo = findReason(ability, Actions.Create, Subjects.Todo);
    const deleteTodo = findReason(ability, Actions.Delete, Subjects.Todo);
    const readTodo = findReason(ability, Actions.Read, Subjects.Todo);
    return {
      createTodo,
      deleteTodo,
      readTodo,
    };
  }, [ability]);

  const youCan = useMemo(() => {
    const createTodo = ability.can(Actions.Create, Subjects.Todo);
    const deleteTodo = ability.can(Actions.Delete, Subjects.Todo);
    const readTodo = ability.can(Actions.Read, Subjects.Todo);

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
      alert(todoReason.createTodo);
    }
  };

  const handleDeleteTodo = (id: number) => {
    if (youCan.deleteTodo) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      alert(todoReason.deleteTodo);
    }
  };

  return (
    <div>
      <Can I={Actions.Read} a={Subjects.Todo}>
        <div>Only guest cannot read todo</div>
      </Can>
      <Can I={Actions.Create} a={Subjects.Todo}>
        <div>Only Editor can create todo</div>
      </Can>
      <Can I={Actions.Delete} a={Subjects.Todo}>
        <div>Only Admin can delete todo</div>
      </Can>

      {youCan.readTodo ? (
        <>
          <h1>This is the User Dashboard Page</h1>
          <h2> Your role is: {user?.role}</h2>
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
        <h1> {todoReason.readTodo} </h1>
      )}
    </div>
  );
}
