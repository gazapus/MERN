import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import '../styles/GeneralMenu.css';

const Menu = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="bottonDropdown">
      <DropdownToggle className="dropdownToggleMenu" />
      <DropdownMenu right>
        <DropdownItem>
          <Link to="/" className="d-flex justify-content-center">
            Option 1
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/" className="d-flex justify-content-center">
            Option 2
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default Menu;