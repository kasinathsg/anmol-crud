import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button,Row, Col, message } from 'antd';

const Create: React.FC = () => {
  const [todo, setTodo] = useState<string>('');

  const handleAddTodo = async () => {
    if (todo.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3001/todos', { todo });
        console.log('Todo added:', response.data);
        setTodo('');
        message.success('Todo added successfully');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  return (
<div style={{maxWidth:'40vw'}}>
      <h2>Create Page</h2>
      <Row gutter={10} >
        <Col flex="auto">
          <Input
            placeholder="Add a new todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            style={{ width: '100%' }}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </Col>
      </Row>
      <br />
    </div>
  );
};
export default Create;
