import { useEffect, useState } from "react";
import "./App.css";

const MAX_COUNT = 10;

function App() {
  // =========================
  // COUNT
  // =========================

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    const number = Number(savedCount);

    return Number.isFinite(number) && number >= 0
      ? Math.min(number, MAX_COUNT)
      : 0;
  });

  // =========================
  // DARK MODE
  // =========================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // =========================
  // HISTORY
  // =========================

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("history");

    try {
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch {
      return [];
    }
  });

  // =========================
  // SAVE COUNT
  // =========================

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  // =========================
  // SAVE DARK MODE
  // =========================

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // =========================
  // SAVE HISTORY
  // =========================

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // =========================
  // ADD HISTORY
  // =========================

  const addHistory = (action, oldValue, newValue) => {
    const newActivity = {
      id: `${Date.now()}-${Math.random()}`,
      action: action,
      from: oldValue,
      to: newValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistory((prev) => {
      return [newActivity, ...prev].slice(0, 10);
    });
  };

  // =========================
  // INCREASE
  // =========================

  const increaseCount = () => {
    if (count >= MAX_COUNT) {
      return;
    }

    const newCount = count + 1;

    setCount(newCount);
    addHistory("+1", count, newCount);
  };

  // =========================
  // DECREASE
  // =========================

  const decreaseCount = () => {
    if (count <= 0) {
      return;
    }

    const newCount = count - 1;

    setCount(newCount);
    addHistory("-1", count, newCount);
  };

  // =========================
  // RESET COUNT
  // =========================

  const resetCount = () => {
    if (count === 0) {
      return;
    }

    setCount(0);
    addHistory("Reset", count, 0);
  };

  // =========================
  // DELETE ONE HISTORY ITEM
  // =========================

  const deleteHistoryItem = (id) => {
    setHistory((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  // =========================
  // CLEAR HISTORY
  // =========================

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all activity history?"
    );

    if (confirmed) {
      setHistory([]);
    }
  };

  // =========================
  // RESET EVERYTHING
  // =========================

  const resetEverything = () => {
    const confirmed = window.confirm(
      "Reset count, history, and dark mode?"
    );

    if (!confirmed) {
      return;
    }

    setCount(0);
    setHistory([]);
    setDarkMode(false);

    localStorage.removeItem("count");
    localStorage.removeItem("history");
    localStorage.removeItem("darkMode");
  };

  // =========================
  // KEYBOARD CONTROLS
  // =========================

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tagName = event.target.tagName.toLowerCase();

      // Don't trigger shortcuts while typing
      if (
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select"
      ) {
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        increaseCount();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        decreaseCount();
      }

      if (event.key.toLowerCase() === "r") {
        resetCount();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count]);

  // =========================
  // STATUS MESSAGE
  // =========================

  const getStatusMessage = () => {
    if (count === 0) {
      return "Ready to start 🚀";
    }

    if (count < 5) {
      return "Keep going! 💪";
    }

    if (count < MAX_COUNT) {
      return "Almost there! 🔥";
    }

    return "🎉 Maximum reached!";
  };

  // =========================
  // UI
  // =========================

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <div className="counter-container">

        <h1>Simple Counter</h1>

        {/* Count */}
        <div
          className="count-display"
          aria-live="polite"
          aria-label={`Current count is ${count}`}
        >
          {count}
        </div>

        {/* Status */}
        <p className="status-message">
          {getStatusMessage()}
        </p>

        {/* Limit */}
        <p className="limit-indicator">
          Limit: {count} / {MAX_COUNT}
        </p>

        {/* Progress */}
        <div
          className="progress-container"
          role="progressbar"
          aria-valuenow={count}
          aria-valuemin="0"
          aria-valuemax={MAX_COUNT}
        >
          <div
            className="progress-bar"
            style={{
              width: `${(count / MAX_COUNT) * 100}%`,
            }}
          ></div>
        </div>

        {/* Counter Buttons */}
        <div className="buttons">

          <button
            className="plus-btn"
            onClick={increaseCount}
            disabled={count === MAX_COUNT}
            aria-label="Increase count"
          >
            +
          </button>

          <button
            className="minus-btn"
            onClick={decreaseCount}
            disabled={count === 0}
            aria-label="Decrease count"
          >
            -
          </button>

          <button
            className="reset-btn"
            onClick={resetCount}
            disabled={count === 0}
            aria-label="Reset count"
          >
            Reset
          </button>

        </div>

        {/* Maximum message */}
        {count === MAX_COUNT && (
          <p className="limit-message">
            ⚠️ Maximum count reached!
          </p>
        )}

        {/* Saved */}
        <p className="saved-status">
          ✓ Saved
        </p>

        {/* Dark Mode */}
        <button
          className="theme-btn"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Keyboard Help */}
        <p className="keyboard-help">
          ⌨️ ↑ Increase &nbsp; ↓ Decrease &nbsp; R Reset
        </p>

        {/* Reset Everything */}
        <button
          className="reset-all-btn"
          onClick={resetEverything}
        >
          Reset Everything
        </button>

        {/* =========================
            ACTIVITY HISTORY
           ========================= */}

        <div className="history-section">

          <div className="history-header">

            <h2>Activity History</h2>

            {history.length > 0 && (
              <button
                className="clear-history-btn"
                onClick={clearHistory}
              >
                Clear
              </button>
            )}

          </div>

          {history.length === 0 ? (

            <p className="empty-history">
              No activity yet
            </p>

          ) : (

            <div className="history-list">

              {history.map((item) => (

                <div
                  className="history-item"
                  key={item.id}
                >

                  <span className="history-action">
                    {item.action}
                  </span>

                  <span className="history-values">
                    {item.from} → {item.to}
                  </span>

                  <span className="history-time">
                    {item.time}
                  </span>

                  <button
                    className="delete-history-btn"
                    onClick={() =>
                      deleteHistoryItem(item.id)
                    }
                    aria-label={`Delete ${item.action} activity`}
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;