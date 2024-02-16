import './App.css';
import { useState, useEffect } from "react";

function ViewPage(props) {
  const [response, setResponse] = useState('טוען...');

  useEffect(() => {
    const async_impl = async () => {
      const tmp_response = await fetch(
        `/api/page/get/${encodeURIComponent(props.page)}`
      );
      setResponse(await tmp_response.text())
    };
    async_impl();
  });

  return (
    <>
      <h1>{props.page}</h1>
      <p>{response}</p>
    </>
  );
}

function EditPage(props) {
  return <p>עריכת עמוד {props.page}</p>;
}

function App() {
  const [page, setPage] = useState('עמוד');
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="App">
      {editMode ? <EditPage page={page} /> : <ViewPage page={page} />}
      <button onClick={toggleEditMode}>עריכת עמוד</button>
    </div>
  );
}

export default App;
