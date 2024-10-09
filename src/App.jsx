import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const ssData = sessionStorage.getItem("_tstFormData");
    console.log("sessionData", ssData);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormItem) => ({
      ...prevFormItem,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    sessionStorage.setItem(
      "_tstFormData",
      JSON.stringify({
        username: formData.username,
        password: formData.password,
      })
    );

    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });

    setSuccess(true);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="header">TST User Registration Form</h1>
        <form onSubmit={handleSubmit} className="form-signIn">
          <div>
            <label htmlFor="username" className="form-signIn__label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-signIn__input"
            />
          </div>
          <div>
            <label htmlFor="password" className="form-signIn__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-signIn__input"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="form-signIn__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-signIn__input"
            />
          </div>
          {error && (
            <p className="form-signIn__message form-signIn__message--error">
              ❌ {error}
            </p>
          )}
          {success && (
            <p className="form-signIn__message form-signIn__message--info">
              ✅ Form data persisted to session storage!
            </p>
          )}
          <button type="submit" className="form-signIn__submit">
            💾 Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
