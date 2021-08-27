import React, { useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
import CardList from './components/CardList';
import './App.css';
import Pagination from './components/Pagination';
import Modal from './components/Modal';

type UserData = {
  dob: {
    date: string;
    age: number;
  };
  email: string;
  location: {
    city: string;
    country: string;
    postcode: string;
    state: string;
    street: {
      name: string;
      number: number;
    };
  };
  name: {
    first: string;
    last: string;
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  id: {
    name: string;
    value: string;
  };
};

const fetchUsers = (page: number) => {
  let url =
    `https://randomuser.me/api/` +
    `?seed=lifelinelab` +
    `&results=10` +
    `&nat=GB` +
    `&page=${page}` +
    `&inc=name,picture,email,dob,location,phone,id`;
  return fetch(url);
};

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<Array<UserData>>();
  const [goTo, setGoTo] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData>();

  const onClickFetchUsers = () => {
    setPage(1);
    setLoading(true);
    fetchUsers(1)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setUsers(data.results);
        setGoTo('1');
      });
  };

  const onClickNext = () => {
    setLoading(true);
    fetchUsers(page + 1)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setUsers(data.results);
        setPage(page + 1);
        setGoTo((page + 1).toString());
        window.scroll(0, 0);
      });
  };

  const onClickPrevious = () => {
    const previousPage = Math.max(1, page - 1);

    if (previousPage !== page) {
      setLoading(true);
      fetchUsers(previousPage)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setUsers(data.results);
          setPage(previousPage);
          setGoTo(previousPage.toString());
          window.scroll(0, 0);
        });
    }
  };

  const onChangeGoTo = (value: string) => {
    setGoTo(value);
  };

  const onClickGo = () => {
    const toPage = Math.max(1, parseInt(goTo));

    setLoading(true);
    fetchUsers(toPage)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setUsers(data.results);
        setPage(toPage);
        setGoTo(toPage.toString());
        window.scroll(0, 0);
      });
  };

  const onClickCard = (index: number) => {
    if (users) {
      const user = JSON.parse(JSON.stringify(users[index]));
      setCurrentUser(user);
      setShowModal(true);
    }
  };

  const onClickModalBackground = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <Button onClick={onClickFetchUsers} disabled={loading}>
        fetch some users.
      </Button>
      {users ? (
        <CardList>
          {users.map((user, index) => {
            const fullName = user.name.first + ' ' + user.name.last;
            return (
              <Card
                headerText={fullName}
                imageSource={user.picture.large}
                imageAlt={`${fullName}'s profile picture.`}
                index={index}
                onClick={onClickCard}
                key={user.id.name + user.id.value}
              />
            );
          })}
          <Pagination
            currentPage={page}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
            goToValue={goTo}
            onChangeGoTo={onChangeGoTo}
            loading={loading}
            onClickGo={onClickGo}
          />
        </CardList>
      ) : (
        <div>no users fetched yet.</div>
      )}
      <Modal
        show={showModal}
        userData={currentUser}
        onClickBackground={onClickModalBackground}
      />
    </div>
  );
};

export default App;
