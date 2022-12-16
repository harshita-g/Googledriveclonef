import React, { useState } from "react"
import ReactDOM from "react-dom"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../contexts/AuthContext"
import { storage, database } from "../../firebase"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import { v4 as uuidV4 } from "uuid"
import { ProgressBar, Toast } from "react-bootstrap"
import { getStorage, ref } from "firebase/storage";
import firebase from 'firebase'
import { Button, Modal, Form } from "react-bootstrap"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"

export default function DeleteFileButton({ currentFolder }) {
  const [DeletingFiles, setDeletingFiles] = useState([])
  const { currentUser } = useAuth()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  
  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (currentFolder == null) return
   
    setName("")
    closeModal()
  }
  function sayHello() {
    console.log("testing button")
  }
  const [value, setValue] = useState(),
        onInput = ({target:{value}}) => setValue(value),
        onFormSubmit = e => {
          e.preventDefault()
          console.log("main func")
          console.log(currentUser.uid)
          let filename = value
        var query = firebase.firestore().collection("files")
        query = query.where("name", "==", filename)
        query = query.where("userId", "==", currentUser.uid)
        query.get()
        .then(querySnapshot => {
        querySnapshot.docs[0].ref.delete();
        });
        setValue()
        }
  function handleDelete(e) {
    
    
  }

  return (
    <>
      <button onClick={openModal}>Delete</button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={onFormSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>File to be deleted</Form.Label>
              <Form.Control
                type="text"
                value={value}
                onChange={onInput}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" onClick={handleDelete} type="submit">
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )

}