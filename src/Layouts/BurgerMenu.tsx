import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './BurgerMenuStyles.css';

export default function BurgerMenu(links: any) {
  return (
    // Pass on our props
    <Menu {...links}>
      <a className="menu-item" href="/">
        Dashboard
      </a>

      <a className="menu-item" href="/reservations">
        Reservations
      </a>

      <a className="menu-item" href="/seating">
        Seating
      </a>

      <a className="menu-item" href="/orders">
        Orders
      </a>

      <a className="menu-item" href="/tables">
        Tables
      </a>

      <a className="menu-item" href="/calendar">
        Calendar
      </a>

      <a className="menu-item" href="/areas">
        Areas
      </a>
    </Menu>
  );
}
