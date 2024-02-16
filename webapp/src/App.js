import './App.css';
import { useState, useEffect } from "react";

function ViewPage(props) {
  return (
    <>
      <h1>{props.page}</h1>
      <p>{props.content}</p>
    </>
  );
}

function EditPage(props) {
  const [content, setContent] = useState(props.content);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const publishContent = async () => {
    await fetch(`/api/page/set/${encodeURIComponent(props.page)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content }),
    });
  };

  return (
    <div className="edit-page">
      <h1>עריכת עמוד {props.page}</h1>
      <textarea rows="20" cols="50" value={content} onChange={handleChange} />
      <button onClick={publishContent}>שמור</button>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('ראשי');
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState('טוען...');

  useEffect(() => {
    const async_impl = async () => {
      const response = await fetch(
        `/api/page/get/${encodeURIComponent(page)}`
      );
      setContent(await response.text())
    };
    async_impl();
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="App">
      {editMode ? (
        <EditPage page={page} content={content} />
      ) : (
        <ViewPage page={page} content={content} />
      )}
      <hr />
      <button onClick={toggleEditMode}>
        {editMode ? "תצוגת עמוד" : "עריכת עמוד"}
      </button>
    </div>
  );
}

export default App;
