/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { useState } from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/projectCard";
import { cards, projects } from "../../assets/Data/data";
import VideoURL from "../../assets/icon/Ak.mp4";
import Category from "../../components/trustedBy/Category";

function Home() {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 5) + 1
  );

  useEffect(() => {
    // Generate a random number every 1.5 seconds
    const interval = setInterval(() => {
      const newRandomNumber = Math.floor(Math.random() * 5) + 1;
      setRandomNumber(newRandomNumber);
    }, 1500);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="item">
            <video src={VideoURL} alt="default" controls autoPlay muted loop />
          </div>
        </div>
      </div>

      <div className="explore">
        <div className="container">
          <h1>Explore The Skillify Marketplace</h1>
          <Category />
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              Skillify <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Skillify Business</button>
          </div>
          <div className="item">
            <img src={`./img/a8.png`} alt="" />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
