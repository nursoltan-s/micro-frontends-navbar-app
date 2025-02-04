/**
 * UserMenu component.
 *
 * Shows logged-in user with user menu with options like log-out.
 */
import React, { useState, useCallback, Fragment } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { logout, getLogoutUrl } from "../../utils";
import "./styles.css";
import { useMediaQuery } from "react-responsive";

const UserMenu = ({ profile, hideSwitchTools }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpenMenu(false);
  }, [setIsOpenMenu]);

  const isMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  const toggleMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu, setIsOpenMenu]);

  const onLogoutClick = useCallback((evt) => {
    evt.preventDefault();
    logout();
  }, []);

  return (
    <OutsideClickHandler onOutsideClick={closeMenu}>
      <div className="user-menu">
        <div
          className={cn("user-menu-handler", {
            "user-menu-handler-active": isOpenMenu,
          })}
          onClick={toggleMenu}
          role="button"
          tabIndex="0"
        >
          <Avatar profile={profile} />
          {isMobile ? (
            <Fragment></Fragment>
          ) : (
            <div className="user-menu-handle">{profile.handle}</div>
          )}
        </div>

        {isOpenMenu && (
          <div className="user-menu-popover-wrapper">
            <div
              className="user-menu-popover-overlay"
              onClick={closeMenu}
              role="button"
              tabIndex="-1"
            />
            <div className="user-menu-popover">
              <div className="user-menu-popover-arrow" />
              <div className="user-menu-popover-content">
                <ul className="user-menu-list">
                  {hideSwitchTools ? null : (
                    <li>
                      <Link
                        to={`/profile/${profile.handle}`}
                        onClick={closeMenu}
                      >
                        Profile
                      </Link>
                    </li>
                  )}
                  <li>
                    <a href={getLogoutUrl()} onClick={onLogoutClick}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

UserMenu.defaultProps = {
  hideSwitchTools: false,
};

UserMenu.propTypes = {
  hideSwitchTools: PropTypes.boolean,
};

export default UserMenu;
