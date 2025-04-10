import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";

const Navbar = ({authenticate, setAuthenticate}) => {
    const menuList = ['여성', 'Divided', '남성', '아동', '홈', 'Sale', '지속가능성'];
    let [width, setWidth] = useState(0);
    const navigate = useNavigate();

    const goToLink = () => {
      // console.log(link);
      navigate('/login');
    }

    const search = (event) => {
      const searchValue = event.target.value;
      if (event.key === 'Enter') {
        navigate(`?q=${searchValue}`);
      }
    }
    return (
      <div>
        {authenticate ? (
          <div className="login-button" onClick={() => setAuthenticate(false)}>
            <FontAwesomeIcon icon={faUser} />
            <span>로그아웃</span>
          </div>
        ) : (
          <div className="login-button" onClick={() => navigate("/login")}>
            <FontAwesomeIcon icon={faUser} />
            <span>로그인</span>
          </div>
        )}
        <div className="logo-section">
          <Link to="/">
            <img
              width={100}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/800px-H%26M-Logo.svg.png"
              alt="로고"
            />
          </Link>
        </div>
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>
        <div className="side-menu" style={{ width: width }}>
          <button className="closebtn" onClick={() => setWidth(0)}>
            &times;
          </button>
          <div className="side-menu-list" id="menu-list">
            {menuList.map((menu, index) => (
              <button key={index}>{menu}</button>
            ))}
          </div>
        </div>
        <div className="menu-area">
          <ul className="menu-list">
              {menuList.map((menu, index) => (
                  <li key={index}>{menu}</li>
              ))}
          </ul>
          <div className="search-area">
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="검색" className="search-input" onKeyDown={(event) => search(event)}/>
          </div>
        </div>
      </div>
    );
};

export default Navbar;
