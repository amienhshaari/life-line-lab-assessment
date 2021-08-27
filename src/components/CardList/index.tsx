import React from 'react';
import './style.css';

type CardListProps = {
  children: React.ReactNode;
};

const CardList = ({ children }: CardListProps): JSX.Element => (
  <div className="card-list">{children}</div>
);

export default CardList;
