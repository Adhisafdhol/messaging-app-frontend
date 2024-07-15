import styles from "./HomePage.module.css";
import Loader from "../loader/Loader";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/images/logout.svg";
import logoutIconHover from "../../assets/images/logout_hover.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  const logout = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/logout`, {
        credentials: "include",
      });

      const resData = res.json();

      if (resData.error) {
        console.log(resData.error);
      } else {
        window.localStorage.removeItem("user");
        setUserData(null);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const checkLogin = async () => {
      if (!user) {
        navigate("/login");
      } else {
        console.log(user);
        try {
          const id = user._id;

          const res = await fetch(`http://localhost:3000/user/${id}`, {
            credentials: "include",
          });
          const resData = await res.json();

          if (resData.error) {
            if (resData.error.status >= 400 && resData.error.status < 500) {
              window.localStorage.removeItem("user");
              setUser(null);
              navigate("/login");
            }

            console.log("server error");
          } else {
            setUserData(resData.data.user);
          }
        } catch (err) {
          navigate("/error");
        }
      }

      setIsMounted(true);
      setIsLoading(false);
    };

    checkLogin();
  }, [user]);

  return (
    <>
      {isLoading && <Loader />}
      {isMounted && (
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1 className={styles.logo}>
              <a className={styles.logoLink} href="/">
                msg<span className={styles.logoTxt}>Chat</span>
              </a>
            </h1>
            <nav>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <a className={styles.navItemLink} href="/profile">
                    {userData && userData.username}
                  </a>
                </li>
                <li className={styles.navItem}>
                  <a
                    className={styles.navItemLink}
                    href="/logout"
                    onClick={logout}
                  >
                    <img
                      onMouseEnter={(e) => (e.target.src = logoutIconHover)}
                      onMouseLeave={(e) => (e.target.src = logoutIcon)}
                      className={styles.logoutIcon}
                      src={logoutIcon}
                      alt="logout"
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <main className={styles.home}>
            <h2 className={styles.chatHeader}>
              Welcome {userData && userData.username}, start chatting here
            </h2>
          </main>
        </div>
      )}
    </>
  );
};

export default HomePage;
