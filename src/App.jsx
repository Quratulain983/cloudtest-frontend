import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "https://todo-app-bakcned-382170497486.us-central1.run.app/cloud";

  const fetchTodos = () => {
    fetch(`${API}/todos/`)
      .then(res => res.json())
      .then(data => setTodos(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = () => {
    fetch(`${API}/todos/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    }).then(() => {
      setTitle("");
      fetchTodos();
    });
  };

  const deleteTodo = (id) => {
    fetch(`${API}/todos/delete/${id}/`, {
      method: "DELETE"
    }).then(() => fetchTodos());
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body, #root {
          min-height: 100vh;
          width: 100%;
        }

        body {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);
          background-attachment: fixed;
        }

        @keyframes marquee {
          from { transform: translateX(100vw); }
          to   { transform: translateX(-100%); }
        }

        .marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }
      `}</style>

      <div style={{ minHeight: "100vh", width: "100%" }}>

        {/* MARQUEE */}
        <div style={{ width: "100%", overflow: "hidden", background: "rgba(0,0,0,0.3)", padding: "10px 0" }}>
          <span className="marquee" style={{ color: "white", fontSize: "15px", fontWeight: "500", letterSpacing: "0.04em" }}>
             Welcome to Todo App &nbsp;&nbsp;|&nbsp;&nbsp; Stay productive, stay focused! &nbsp;&nbsp;|&nbsp;&nbsp; Add your tasks below &nbsp;&nbsp;|&nbsp;&nbsp; Get things done today! &nbsp;&nbsp;|&nbsp;&nbsp;  Built with React + Django &nbsp;&nbsp;|&nbsp;&nbsp; Keep crushing your goals! &nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
        </div>

        {/* CONTENT */}
        <div style={{ display: "flex", justifyContent: "center", padding: "60px 16px" }}>
          <div style={{ width: "100%", maxWidth: "460px" }}>

            <h1 style={{ fontSize: "42px", fontWeight: "800", textAlign: "center", color: "white", marginBottom: "32px", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
              Todo App
            </h1>

            {/* INPUT */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder="Enter a task..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "15px",
                  outline: "none",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }}
              />
              <button
                onClick={addTodo}
                style={{
                  background: "white",
                  color: "#7c3aed",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>

            {/* LIST */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {todos.length === 0 && (
                <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "14px", paddingTop: "16px" }}>
                  No tasks yet — add one above!
                </p>
              )}
              {todos.map(todo => (
                <li key={todo.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  padding: "14px 18px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}>
                  <span style={{ color: "white", fontSize: "15px" }}>{todo.title}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;