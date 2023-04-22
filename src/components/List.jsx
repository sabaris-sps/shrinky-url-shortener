import React, { useState, useEffect } from "react";
import db from "../firebase";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await db.collection("urls").get();
      setData(res.docs.map((doc) => doc.data()));
    };
    fetch();
  });

  const handleBack = () => {
    window.location.href = window.location.href.slice(
      0,
      window.location.href.length - 5
    );
  };

  return (
    <div>
      <div className="cursor-pointer m-4 p-0" onClick={handleBack}>
        <span className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 512 512"
          >
            <path d="M512 256a256 256 0 10-512 0 256 256 0 10512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71 182.1.1c13.3 0 24 10.7 24 24s-10.7 24-24 24H193.9l71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"></path>
          </svg>
        </span>
      </div>
      <div className="flex flex-col items-center">
        <table className="">
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
              <th>No.of clicks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <a href={doc.url} target="_blank" rel="noreferrer">
                    {doc.url}
                  </a>
                </td>
                <td>
                  <a
                    href={`${window.location.href.slice(
                      0,
                      window.location.href.length - 5
                    )}${doc.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >{`${window.location.href.slice(
                    0,
                    window.location.href.length - 5
                  )}${doc.slug}`}</a>
                </td>
                <td>{doc.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
