import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

function App() {
  const [tasks, setTasks] = useState(null);

  async function getData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/books`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      getData();
  }, []);

  // Sort Tasks By Dates if tasks exist
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      <ListHeader listName="Your books and their summary" getData={getData} />
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      <p className="copyright">© All rights reserved to Ravuri Nikhil</p>
    </div>
  );
}

export default App;
