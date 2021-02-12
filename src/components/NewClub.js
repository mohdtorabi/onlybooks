import { useState } from 'react';
import axios from 'axios';
import './NewClub.scss';

export default function NewClub() {
  const [club, setClub] = useState({
    club_name: '',
    image_url: '',
    private: false,
  });

  const nameOnChange = (event) => {
    setClub({
      ...club,
      club_name: event.target.value,
    });
  };

  const imageUrlOnChange = (event) => {
    setClub({
      ...club,
      image_url: event.target.value,
    });
  };

  const privateOnChange = (event) => {
    setClub({
      ...club,
      private: event.target.value,
    });
  };

  const save = (event) => {
    event.preventDefault();

    const URL = `/api/club`;

    const data = {
      club_name: club.club_name,
      image_url: club.image_url,
      private: club.private,
    };
    console.log(data);
    const promise = axios
      .post(URL, data)
      .then((response) => {
        console.log(response);
        setClub({
          ...club,
          club_name: '',
          image_url: '',
          private: false,
        });
      })
      .catch(console.log('error'));
    return promise;
  };

  return (
    <section>
      <form className="club-form" method="POST" action="/login">
        <h2 id="club-title">New Book Club</h2>
        <h3>Name:</h3>
        <input
          type="text"
          className="club-name"
          required
          name="name"
          onChange={nameOnChange}
        />
        <h3>Image URL:</h3>
        <input
          type="text"
          className="club-image-url"
          required
          name="club-image-url"
          onChange={imageUrlOnChange}
        />
        <h3>Private:</h3>
        <select
          onChange={privateOnChange}
          name="private"
          className="club-private"
        >
          <option value={false}>false</option>
          <option value={true}>true</option>
        </select>

        <button onClick={save} type="submit" className="login-button">
          Update
        </button>
      </form>
      {/* {props.error ? <div id="error">{props.error}</div> : null} */}
    </section>
  );
}
