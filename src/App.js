import React, {useState} from "react";

function App() {
    const [likes, setLikes] = useState(5);

    function increment() {
        setLikes(likes + 1);
        console.log(likes);
    }

    function decrement() {
        setLikes(likes - 1);
        console.log(likes);
    }
    return (
    <div className="App">
        <h1>{likes}</h1>
        <button onClick={increment}> Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
//npm start