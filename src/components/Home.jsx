import React, { useState } from "react";
import db from "../firebase";
import { Alert, Button, Form } from "react-bootstrap";
const tinyid = require("tiny-unique-id");

const Home = () => {
  const [input, setInput] = useState("");
  const [shorten, setShorten] = useState("#");
  const [shortenedLink, setShortenedLink] = useState("Enter a link to shorten");

  const handleDB = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setInput("");
      const slug = tinyid.unique();
      await db.collection("urls").add({
        url: input,
        slug: slug,
        clicks: 0,
      });
      await setShorten(`${window.location.origin}/${slug}`);
      await setShortenedLink(`${window.location.origin}/${slug}`);
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl my-4">
        <span
          onClick={() => {
            window.location.href = `${window.location.href}lists`;
          }}
          role="button"
        >
          Shrinky
        </span>
        : Cut the clutter, share the link
      </h1>
      <Form onSubmit={handleDB} className="flex flex-col my-4">
        <a href={shorten} rel="noreferrer" target="_blank">
          <Alert variant="secondary">{shortenedLink}</Alert>
        </a>
        <Form.Group className="mb-3" controlId="formLink">
          <Form.Control
            type="url"
            placeholder="Enter your link here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" style={{ width: "100%" }}>
          Shrink
        </Button>
      </Form>
      <a href={`${window.location.href}lists`}>
        <Alert variant="info" role="button">
          Check your links here <span className="text-lg">➜</span>
        </Alert>
      </a>
    </div>
  );
};

export default Home;
