import React, { useEffect } from "react";
import db from "../firebase";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { slug } = useParams();
  useEffect(() => {
    db.collection("urls")
      .where("slug", "==", slug)
      .get()
      .then((query) =>
        query.forEach((doc) => {
          db.collection("urls")
            .doc(doc.id)
            .update({ clicks: doc.data().clicks + 1 })
            .then(() => console.log("Updated"))
            .catch((error) => console.error("ERROR: " + error));
          window.location.href = doc.data().url;
        })
      )
      .catch((error) => {
        console.log(error);
        alert("URL not found");
        window.location.href = window.location.href.slice(
          0,
          window.location.href.length - slug.length
        );
      });
  }, [slug]);
  return <div>Redirecting...</div>;
};

export default Redirect;
