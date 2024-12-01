// src/components/MiseEnPage.js
import React from 'react';
import PropTypes from 'prop-types'; // Importation de PropTypes
import '../styles/MiseEnPage.css'; // Fichier CSS pour les deux composants

// Composant Title
export const Title = ({ text }) => {
  return <h1 className="title">{text}</h1>;
};

// Validation des props pour Title
Title.propTypes = {
  text: PropTypes.string.isRequired, // 'text' doit être une chaîne de caractères et est obligatoire
};

// Composant Subtitle
export const Subtitle = ({ text }) => {
  return <p className="subtitle">{text}</p>;
};

// Validation des props pour Subtitle
Subtitle.propTypes = {
  text: PropTypes.string.isRequired, // 'text' doit être une chaîne de caractères et est obligatoire
};

// Composant TitleSection
export const TitleSection = ({ text }) => {
  return <p className="titlesection">{text}</p>;
};

// Validation des props pour Subtitle
TitleSection.propTypes = {
  text: PropTypes.string.isRequired, // 'text' doit être une chaîne de caractères et est obligatoire
};
