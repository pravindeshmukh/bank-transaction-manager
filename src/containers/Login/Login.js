import React, { useState, useEffect } from "react";
import classes from "./Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { loginData } from "./login_data";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isformsubmitted, setUserAuth] = useState('0');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  useEffect(() => {
    if (isformsubmitted === '1') {
      props.onSubmit(isformsubmitted);
    }
  }, [isformsubmitted, error]);

  function handleSubmit(event) {

    event.preventDefault();
    if (!email) {
      return setError('Username is required');
    }

    if (!password) {
      return setError('Password is required');
    }
    let itemFound = false;
    setError('');
    loginData.map((job) => {
      if (job.user === email && job.pwd === password) {
        setError('');
        itemFound = true;
      }
    });
    if (!itemFound) {
      return setError('Invalid Username and Password!');
    }
    if (!error) {
      setUserAuth('1');
      return setError('');
    }

  }

  return (
    <div className={classes.Login}>
      <Form onSubmit={handleSubmit}>
        <div className={classes.formFields}>
          {error ?
            <Form.Group size="sm" controlId="error">
              <Form.Label><span className={classes.error}>{error}</span></Form.Label>
            </Form.Group>
            : null
          }
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button block size="lg" type="submit">
            Login
        </Button>
        </div>
      </Form>
    </div>
  );
}
export default Login