import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Disable all transitions globally
const disableTransitions = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* NUCLEAR OPTION - DISABLE ALL TRANSITIONS */
    *, *::before, *::after {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      transition-property: none !important;
      transition-duration: 0s !important;
      transition-timing-function: none !important;
      transition-delay: 0s !important;
    }
    
    /* Disable all hover effects */
    *:hover {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all focus effects */
    *:focus {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all active effects */
    *:active {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all visited effects */
    *:visited {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Override ALL Tailwind transition classes */
    .transition,
    .transition-all,
    .transition-colors,
    .transition-opacity,
    .transition-shadow,
    .transition-transform,
    .duration-75,
    .duration-100,
    .duration-150,
    .duration-200,
    .duration-300,
    .duration-500,
    .duration-700,
    .duration-1000,
    .ease-linear,
    .ease-in,
    .ease-out,
    .ease-in-out {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      transition-property: none !important;
      transition-duration: 0s !important;
      transition-timing-function: none !important;
      transition-delay: 0s !important;
    }
    
    /* Disable all button transitions */
    button,
    button:hover,
    button:focus,
    button:active {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all link transitions */
    a,
    a:hover,
    a:focus,
    a:active {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
    
    /* Disable all div transitions */
    div,
    div:hover,
    div:focus,
    div:active {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
  `;
  document.head.appendChild(style);
  
  // Also disable via JavaScript
  document.documentElement.style.setProperty('transition', 'none', 'important');
  document.documentElement.style.setProperty('animation', 'none', 'important');
  document.documentElement.style.setProperty('transform', 'none', 'important');
  
  // Disable for body too
  document.body.style.setProperty('transition', 'none', 'important');
  document.body.style.setProperty('animation', 'none', 'important');
  document.body.style.setProperty('transform', 'none', 'important');
  
  // Disable for all elements
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    (element as HTMLElement).style.setProperty('transition', 'none', 'important');
    (element as HTMLElement).style.setProperty('animation', 'none', 'important');
    (element as HTMLElement).style.setProperty('transform', 'none', 'important');
  });
};

// Run immediately
disableTransitions();

// Also run after DOM is loaded
document.addEventListener('DOMContentLoaded', disableTransitions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);