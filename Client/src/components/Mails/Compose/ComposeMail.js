import { useRef, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from 'react-redux';

import { mailActions } from "../../store/mailSlice";

const ComposeMail = () => {
  const token = localStorage.getItem("token");
  const toRef = useRef();
  const subjectRef = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch()

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const to = toRef.current.value;
    const subject = subjectRef.current.value;
    const message = editorState.getCurrentContent().getPlainText();
    const userName = localStorage.getItem('userName');

    const obj = {
      userName,
      mailId: to,
      subject,
      message,
      viewed:false
    };

    try {
      const res = await fetch("http://localhost:4000/composeMail/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(obj),
      });

      const data = await res.json();

      console.log("successfully posted mail", data);

      alert("successfully sended mail");
      dispatch(mailActions.sendMail(obj));
    } catch (error) {
      console.log(error, "error in client side");
      alert(error);
    }
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <Col xs={10}>
      <Form onSubmit={submitFormHandler}>
        <Form.Group>
          <Form.Label className="mt-2">To:-</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipient's name"
            ref={toRef}
            className="mb-2"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Subject:-</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            ref={subjectRef}
            className="mb-2"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Message:-</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="align-self-start"
          style={{ boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)" }}
        >
          Send
        </Button>
      </Form>
    </Col>
  );
};

export default ComposeMail;
