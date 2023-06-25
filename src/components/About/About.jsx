import React, { useEffect, useState } from "react";
import "./About.css";

export const About = () => {
  return (
    <div className="About">
      <div className="about-title">About the game</div>
      <div className="about-body">
        <div className="about-section">
          <div className="about-section-title">What is Escape Room?</div>
          An escape room, also known as an escape game, puzzle room, exit game,
          or riddle room is a game in which a team of players discover clues,
          solve puzzles, and accomplish tasks in one or more rooms in order to
          accomplish a specific goal in a limited amount of time. The goal is
          often to escape from the site of the game. Most escape games are
          cooperative but competitive variants exist. Escape rooms became
          popular in North America, Europe, and East Asia in the 2010s.
          Permanent escape rooms in fixed locations were first opened in Asia
          and followed later in Hungary, Serbia, Australia, New Zealand, Russia,
          and South America.
        </div>
        <div className="about-section">
          <div className="about-section-title">Who can play?</div>
          The Game can be entered by anyone with a team and adventurous spirit
          who wants to experience and share with his team the challenges we have
          prepared... Young adventurers under 14 need to be accompanied.Аnd even
          younger ones ( under 7 years old), for whom we will soon have a room,
          participate completely free of charge in our Game...
        </div>
        <div className="about-section">
          <div className="about-section-title">How long is one game?</div>
          The game requires between 30-60 minutes. We recommend that you arrive
          10 minutes before your reserved time so that our team can familiarize
          you with the guidelines and basic rules of the Game.
        </div>
        <div className="about-section">
          <div className="about-section-title">
            What should I do when I cannot find the answer?
          </div>
          Your game is monitored by our team and in case of difficulty you will
          be given hints to help you continue playing and enjoy the experience
          to the fullest.
        </div>

        <div className="about-section">
          <div className="about-section-title">
            Do I need preparation before the game?
          </div>
          The game challenges your creative thinking, logical approach and
          teamwork. But most of all, it is designed for your entertainment and
          does not require any special skills or physical effort.
        </div>

        <div className="about-section">
          <div className="about-section-title">Is it save?</div>
          The game and all interactions with objects in the room are completely
          safe.
        </div>
      </div>
    </div>
  );
};
