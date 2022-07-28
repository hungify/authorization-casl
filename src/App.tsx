import { Route, Routes } from 'react-router-dom';
import ProtectedLayout from '~/components/ProtectedLayout';
import MainLayout from '~/layouts/MainLayout';
import AdminDashboard from '~/pages/AdminDashboard';
import Editor from '~/pages/Editor';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import Todo from '~/pages/Todo';
import Unauthorized from '~/pages/Unauthorized';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<ProtectedLayout allowedRoles={['Admin']} />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedLayout allowedRoles={['Admin', 'Editor']} />}>
          <Route path='/editor' element={<Editor />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/todo' element={<Todo />} />
        <Route path='/login' element={<Login />} />

        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
