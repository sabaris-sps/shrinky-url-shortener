import React, { useState } from "react";
import db from "../firebase";
const tinyid = require("tiny-unique-id");

const Home = () => {
  const [input, setInput] = useState("");
  const [shorten, setShorten] = useState("#");
  const [shortenedLink, setShortenedLink] = useState("Enter a link to shorten");

  const handleDB = async (e) => {
    e.preventDefault();
    setInput("");
    const slug = tinyid.unique();
    await db.collection("urls").add({
      url: input,
      slug: slug,
      clicks: 0,
    });
    await setShorten(`${window.location.origin}/${slug}`);
    await setShortenedLink(`${window.location.origin}/${slug}`);
  };

  return (
    <div className="flex items-center h-screen container flex-col">
      <h1 className="text-3xl my-4">
        <span
          onClick={() => {
            window.location.href = `${window.location.href}lists`;
          }}
          class="cursor-pointer"
        >
          Shrinky
        </span>
        : Cut the clutter, share the link
      </h1>
      <form onSubmit={handleDB} className="flex flex-col my-4">
        <a
          href={shorten}
          rel="noreferrer"
          target="_blank"
          className="bg-slate-200 p-2 outline-none text-lg rounded-md w-full mb-4 text-slate-600 
          cursor-pointer"
        >
          {shortenedLink}
        </a>
        <input
          type="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your link here"
          className="border-2 border-pink-500 p-2 outline-none text-lg rounded-md w-full"
        />
        <button
          type="submit"
          className="p-2 text-lg text-white my-4 transition ease-in-out delay-150 bg-blue-500 
          hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 rounded-md"
        >
          Submit
        </button>
      </form>
      <a
        href={`${window.location.href}lists`}
        className={
          "bg-sky-200 p-2 rounded-3xl cursor-pointer " +
          (shorten === "#" ? "hidden" : "block")
        }
      >
        <svg
          class="fill-current h-6 w-6 text-teal-500 mr-2 inline"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
        </svg>
        Your link is shrinked. Check it out <span className="text-lg">➜</span>
      </a>
    </div>
  );
};

export default Home;
