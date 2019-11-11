import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import '../styles/AccountMenu.css';

const AccountMenu = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="bottonDropdown">
      <DropdownToggle className="dropdownToggleLogIn" />
      <DropdownMenu>
        <DropdownItem>
          <Link to="/LogIn" className="d-flex justify-content-center">
            Log in
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/SignIn" className="d-flex justify-content-center">
            Create Account
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default AccountMenu;