import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/GeneralMenu.css';

const Menu = props => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className='bottonDropdown'
    >
      <DropdownToggle className='dropdownToggleMenu' />
      <DropdownMenu right>
        <DropdownItem>
          <Link to='/cities' className='d-flex justify-content-center'>
            cities
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to='/' className='d-flex justify-content-center'>
            home
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default Menu;
