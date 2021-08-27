import './style.css';

type LoaderProps = { show: boolean };

const Loader = ({ show }: LoaderProps): JSX.Element => {
  return (
    <div className="loader" style={{ display: show ? 'flex' : 'none' }}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
