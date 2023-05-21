import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "../components/EditProfilePopup.js";
import EditAvatarPopup from "../components/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/Auth.js";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    item: {},
  });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("Ваш email");

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardDeleteClick = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setDeletedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      item: {},
    });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };
  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistred(false);
        setSuccessMsg("Что-то пошло не так! Попробуйте ещё раз.");
        setIsTooltipPopupOpen(true);
      });
  };
  
  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  const handleRegistration = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        navigate("/sign-in", { replace: true });
        setSuccessMsg("Вы успешно зарегистрировались!");
        setIsRegistred(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistred(false);
        setSuccessMsg("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
      });
  };

  const handleAddPlace = ({ name, link }) => {
    setIsLoading(true);
    api
      .setCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.isOpen ||
    isConfirmDeletePopupOpen ||
    isTooltipPopupOpen;

  useEffect(() => {
    function closeByEsc(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }
    function closeByOverlay(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEsc);
      document.addEventListener("mousedown", closeByOverlay);
    }
    return () => {
      document.removeEventListener("keydown", closeByEsc);
      document.removeEventListener("keydown", closeByOverlay);
    };
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
                cards={cards}
                email={email}
                signOut={signOut}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register handleRegistration={handleRegistration} />}
          ></Route>
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          ></Route>
        </Routes>
        <Footer />
        <EditAvatarPopup
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmDeletePopup
          isLoading={isLoading}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          deletedCard={deletedCard}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isRegistred={isRegistred}
          isOpen={isTooltipPopupOpen}
          successMsg={successMsg}
        />
      </>
    </CurrentUserContext.Provider>
  );
};

export default App;
