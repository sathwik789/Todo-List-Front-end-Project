import React, { useState, useRef } from "react";

const Todo1 = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [completedItems, setCompletedItems] = useState(new Set());
  const inputRef = useRef(null);

  function addtodo() {
    const todoText = inputRef.current.value.trim();
    if (todoText) {
      const newTodo = {
        id: Date.now(),
        text: todoText,
        createdAt: new Date().toLocaleTimeString()
      };
      setItems([...items, newTodo]);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  function deleteTodo(id) {
    setItems(items.filter(item => item.id !== id));
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }

  function toggleComplete(id) {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  function clearCompleted() {
    const completedIds = Array.from(completedItems);
    setItems(items.filter(item => !completedIds.includes(item.id)));
    setCompletedItems(new Set());
  }

  const filteredItems = items.filter(item => {
    if (filter === "active") return !completedItems.has(item.id);
    if (filter === "completed") return completedItems.has(item.id);
    return true;
  });

  const completedCount = completedItems.size;
  const activeCount = items.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onKeyDown={(e) => {
                if (e.key === "Enter") addtodo();
              }}
            />
            <button
              onClick={addtodo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add
            </button>
          </div>
        </div>

        {/* Stats & Filters */}
        {items.length > 0 && (
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-600 text-sm">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">
                  Completed: {completedCount}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Active: {activeCount}
                </span>
              </div>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
                >
                  Clear Completed
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              {["all", "active", "completed"].map(filterType => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 rounded-full text-xs capitalize transition-all ${
                    filter === filterType 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {filteredItems.map((todo) => (
            <div
              key={todo.id}
              className="group bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      completedItems.has(todo.id) 
                        ? "bg-green-600 border-green-600 text-white" 
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {completedItems.has(todo.id) && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`text-gray-800 font-medium transition-all duration-200 ${
                      completedItems.has(todo.id) 
                        ? "line-through opacity-60 text-gray-500" 
                        : ""
                    }`}>
                      {todo.text}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Added at {todo.createdAt}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Warning Message */}
        {items.length >= 5 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800 font-medium text-sm">
              You have quite a few tasks! Consider completing some before adding more.
            </p>
          </div>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 text-gray-400">📝</div>
            <p className="text-gray-500 text-lg">
              No todos yet! Add your first task above
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Stay organized and productive!</p>
        </div>
      </div>
    </div>
  );
};

export default Todo1;