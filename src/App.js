import React from "react";
import "./App.css";
import ScrollToTop from "./components/views/ScrollToTop";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import MainPage from "./components/views/MainPage/MainPage";
import Footer from "./components/views/Footer/Footer";
import WritePage from "./components/views/WritePage/WritePage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import DetailPage from "./components/views/DetailPage/DetailPage";
import ChattingPage from "./components/views/ChattingPage/ChattingPage";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/main" component={MainPage} />
      <Route exact path="/write" component={WritePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/post/:id" component={DetailPage} />
      <Route exact path="/chat" component={ChattingPage} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
