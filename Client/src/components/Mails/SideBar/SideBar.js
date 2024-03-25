import { Col, Button } from "react-bootstrap";
import { useHistory, Link, useLocation } from "react-router-dom";

import sideBar from "./SideBar.module.css";
import { useState } from "react";

const SideBar = () => {
  const history = useHistory();
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path ? sideBar.active : "";
  };

  return (
    <Col xs={2} id="sidebar" className={sideBar.col}>
      <Button
        className={sideBar.composeButton}
        variant="info"
        onClick={() => history.replace("/mail/compose")}
      >
        Compose Mail
      </Button>
      <div className={sideBar.sidebarContent}>
        <Link
          to="/mail/inbox"
          className={`nav-link ${isActivePath("/mail/inbox")}`}
        >
          InBox
        </Link>
        <Link
          to="/mail/unread"
          className={`nav-link ${isActivePath("/mail/unread")}`}
        >
          Unread
        </Link>
        <Link
          to="/mail/starred"
          className={`nav-link ${isActivePath("/mail/starred")}`}
        >
          Starred
        </Link>
        <Link
          to="/mail/draft"
          className={`nav-link ${isActivePath("/mail/draft")}`}
        >
          Draft
        </Link>
        <Link
          to="/mail/sent"
          className={`nav-link ${isActivePath("/mail/sent")}`}
        >
          Sent
        </Link>
        <Link
          to="/mail/archive"
          className={`nav-link ${isActivePath("/mail/archive")}`}
        >
          Archive
        </Link>
        <Link
          to="/mail/spam"
          className={`nav-link ${isActivePath("/mail/spam")}`}
        >
          Spam
        </Link>
        <Link
          to="/mail/deleted"
          className={`nav-link ${isActivePath("/mail/deleted")}`}
        >
          Deleted Items
        </Link>
      </div>
    </Col>
  );
};

export default SideBar;
