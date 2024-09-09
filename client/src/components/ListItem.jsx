import { useState } from "react";
import Modal from "./Modal";

function ListItem({task, getData}) {
  const [showModal, setShowModal] = useState(false);

  // function to delete data
  async function deleteItem() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/books/${task.id}`, {
        method: "DELETE"
      });
      if(response.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className="list-item">

      <div className="info-container">
        <p className="task-title">{task.title}</p>
        <p className="task-title">{task.summary}</p>
        <p className="task-title">{task.book_publish_year}</p>
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={deleteItem}>DELETE</button>
      </div>
      {showModal && <Modal mode={"edit"} setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
  );
}

export default ListItem;