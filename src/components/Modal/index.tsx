import { useRef } from 'react';
import './style.css';

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

type ModalProps = {
  show: boolean;
  userData?: UserData;
  onClickBackground?: () => void;
};

const Modal = ({
  show,
  userData,
  onClickBackground = () => {},
}: ModalProps): JSX.Element => {
  const backgroundRef = useRef(null);

  return (
    <div
      className="modal"
      ref={backgroundRef}
      style={{ display: show ? 'block' : 'none' }}
      onClick={function (event) {
        if (event.target !== backgroundRef.current) return;
        else onClickBackground();
      }}
    >
      <div className="modal-content" onClick={() => {}}>
        <img
          className="picture"
          src={userData?.picture.large}
          alt="The user's profile"
        />
        <div className="information">
          <table>
            <tr>
              <th>first name</th>
              <td>{userData?.name.first}</td>
            </tr>
            <tr>
              <th>last name</th>
              <td>{userData?.name.last}</td>
            </tr>
            <tr>
              <th>email</th>
              <td>{userData?.email}</td>
            </tr>
            <tr>
              <th>date of birth</th>
              <td>
                {userData?.dob.date &&
                  new Date(userData?.dob.date).toDateString()}
              </td>
            </tr>
            <tr>
              <th>address</th>
              <td>
                {`${userData?.location.street.number}, ` +
                  `${userData?.location.street.name}, ` +
                  `${userData?.location.city}, ` +
                  `${userData?.location.state}, ` +
                  `${userData?.location.postcode}, ` +
                  `${userData?.location.country}`}
              </td>
            </tr>
            <tr>
              <th>phone number</th>
              <td>{userData?.phone}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
