import { useState } from "react";

function Modal({mode, setShowModal, getData, task}) {
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    title: editMode ? task.title : null,
    summary: editMode ? task.summary : null,
    bookPublishYear: editMode ? task.book_publish_year : null,
  })

  // function to post data from form
  async function postData(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/books`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // function to edit data from form
  async function editData(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/books/${task.id}`, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // handles change in input fields and state
  function handleChange(event) {
    const {name, value} = event.target;

    setData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your book</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        {/*to try next -> action="" method="post" */}
        <form>
            <label for="title">Book Title</label>
          <input type="text"
            id="title"
            required maxLength={150}
            placeholder=" Your book title goes here..."
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />

          <label for="summary">Book Summary</label>
          <textarea rows="10" cols="50"
            id="summary"
            required
            placeholder=" Your book summary goes here..."
            name="summary"
            value={data.summary}
            onChange={handleChange}
           ></textarea>
          <br />

          <label for="year">Book Published Year</label>
          <input type="text"
            id="year"
            required maxLength={4}
            placeholder=" Your book published year goes here..."
            name="bookPublishYear"
            value={data.bookPublishYear}
            onChange={handleChange}
          />
          <br />
          
          <input className={mode} type="submit" onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
  );
}
  
export default Modal;