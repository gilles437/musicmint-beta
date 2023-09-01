import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import navbarScrollEffect from "@common/navbarScrollEffect";
import ConnectContainer from "./ConnectContainer";
import { Account } from "@polkadot-onboard/core";
import DropDown from "./DropDown";
interface ParentProps {
  accountArray: Account[];
  current: string | null;
}

const Navbar = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const props: ParentProps = {
    accountArray: accounts,
    current: currentAccount,
  };

  useEffect(() => {
    const handleGetData = () => {
      const savedAccounts = localStorage.getItem("accounts");
      if (savedAccounts) {
        try {
          const parsedAccounts = JSON.parse(savedAccounts);
          if (parsedAccounts.key.length) {
            setAccounts(parsedAccounts.key);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }

      const savedAccount = localStorage.getItem("currentAccount");
      if (savedAccount) {
        try {
          const parsedAccount = JSON.parse(savedAccount);
          setCurrentAccount(parsedAccount);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else if (accounts.length) {
        setCurrentAccount(accounts[0].address);
      } else {
        setCurrentAccount(null);
        setAccounts([]);
      }
    };
    handleGetData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark style-12">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/assets/image/navbar-logo.png" alt="" />
        </a>
        <div className="nav-search d-none d-lg-block">
          <div className="form-group">
            <button className="icon" type="submit">
              {" "}
              <i className="fal fa-search"></i>{" "}
            </button>
            <input
              type="text"
              className="form-control"
              placeholder="Search NFT"
            />
          </div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse align-items-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav m-auto">
            {/* <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link active" href="/" id="navbarDropdown1" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Home
              </a>
            </li> */}
            <li className="nav-item">
              <Link href="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/blog" className="nav-link">
                Magazine
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/discover" className="nav-link">
                Discover NFTs
              </Link>
            </li>
            <li className="nav-item">
              <Link href="https://stream.mintedwaves.com/" className="nav-link">
                Music Streaming
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="https://ntcyxvznpe4.typeform.com/to/rJQQSxIa"
                className="nav-link"
              >
                Join us
              </Link>
            </li>
          </ul>
          <div className="nav-side mt-3 mt-lg-0">
            <div className="d-lg-flex align-items-center d-block">
              <div className="ms-lg-4 mt-3 mt-lg-0">
                {accounts.length ? (
                  <DropDown {...props} setAccounts={setAccounts} />
                ) : (
                  <ConnectContainer />
                )}
              </div>
            </div>
          </div>
          <div className="nav-search d-block d-lg-none">
            <div className="form-group">
              <button className="icon" type="submit">
                {" "}
                <i className="fal fa-search"></i>{" "}
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search NFT"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
