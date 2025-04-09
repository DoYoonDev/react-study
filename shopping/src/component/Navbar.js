import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const menuList = ['여성', 'Divided', '남성', '아동', '홈', 'Sale', '지속가능성'];
  return (
    <div>
      <div className="login-button">
        <FontAwesomeIcon icon={faUser} />
        <div>로그인</div>
      </div>
      <div className="logo-section">
        <img
          width={100}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/800px-H%26M-Logo.svg.png"
          alt="로고"
        />
      </div>
      <div className="menu-area">
        <ul className="menu-list">
            {menuList.map((menu) => (
                <li>{menu}</li>
            ))}
        </ul>
        <div className="search-area">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="검색" className="search-input" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
