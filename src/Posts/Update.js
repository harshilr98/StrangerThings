import React, { useState,} from 'react';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDg1MTdlMDBkYWI1ZjAwMTRmNDMwMGYiLCJ1c2VybmFtZSI6IlRyaXBvbGFySFoiLCJpYXQiOjE2ODY0OTI0MzR9.7rQXtP8Nd39yFogmbmpKB-rdA2PbTZB7mp5Ldfa_23w";


const Update = ({postId, setPostId}) => {
    const [title,setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [price,setPrice] = useState([]);
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);

    const handleSubmit = async (ev) => {
      ev.preventDefault();
      try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            post: {
              title: title,
              description: description,
              price: price,
              location: (location==="")?"[On Request]":location,
              willDeliver: willDeliver
            }
          })
        });
        const result = await response.json();
        console.log(result);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);
        setPostId(null);

      } catch (err) {
        console.error(err);
      }
    }

    return <>
        <h1>Update a Post</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Title*' value={title} onChange=
            {(ev) => setTitle(ev.target.value)}></input>
            <input type='text' placeholder='Description*' value={description} onChange=
            {(ev) => setDescription(ev.target.value)}></input>
            <input type='text' placeholder='Price*' value={price} onChange=
            {(ev) => setPrice(ev.target.value)}></input>
            <input type='text' placeholder='Location' value={location} onChange=
            {(ev) => setLocation(ev.target.value)}></input>
            <input type='checkbox' value={willDeliver} onClick=
            {() => setWillDeliver(true)} /><label>Willing to Deliver?</label>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
    </>
}

export default Update;