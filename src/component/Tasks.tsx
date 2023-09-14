

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, message , Input} from 'antd';
import { DeleteOutlined,EditOutlined, CheckOutlined } from '@ant-design/icons';

const Tasks: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [updatedTodo, setUpdatedTodo] = useState<string>('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>('http://localhost:3001/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      fetchTodos(); 
      message.error('Deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  const handleEditTodo = (id: number, todo: string) => {
    setEditingTodoId(id);
    setUpdatedTodo(todo);
  };

  const handleUpdateTodo = async (id: number) => {
    try {
      await axios.put(`http://localhost:3001/todos/${id}`, { todo: updatedTodo });
      setEditingTodoId(null);
      fetchTodos(); 
      message.info('Updated successfully');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
    <h2>Tasks Page</h2>
    <List
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item
          actions={[
            editingTodoId === todo.id ? (
              <>
                <Button
                  type="text"
                  icon={<CheckOutlined />}
                  onClick={() => handleUpdateTodo(todo.id)}
                />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteTodo(todo.id)}
                />
              </>
            ) : (
              <>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEditTodo(todo.id, todo.todo)}
                />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteTodo(todo.id)}
                />
              </>
            )
          ]}
        >
          {editingTodoId === todo.id ? (
            <Input
              value={updatedTodo}
              onChange={(e) => setUpdatedTodo(e.target.value)}
              onPressEnter={() => handleUpdateTodo(todo.id)}
            />
          ) : (
            todo.todo
          )}
        </List.Item>
      )}
    />
  </div>
  );
};

export default Tasks;

interface Todo {
  id: number;
  todo: string;
}
