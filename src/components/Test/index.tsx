import {useState, FormEvent} from 'react';
import './styles/global.css';
import './App.css';
import { Button } from '../Button';

function Test() {
  const [list, setList] = useState<string[]>([]);
  const [listText, setListText] = useState("");

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    setList([...list, listText]);
    setListText("");
  }

  return(
    <div className="app">
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          id="task-input" 
          onChange={(event) => setListText(event.target.value)}
          value={listText}
        />
        <Button type="submit">Criar Tarefa</Button>
      </form>
      <ul>
        {list.map((list, index) => {
          return(
            <li key={index}>{list}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default Test;