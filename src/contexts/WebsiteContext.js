import React, { createContext, useState, useContext } from 'react';

const WebsiteContext = createContext();

export const useWebsite = () => useContext(WebsiteContext);

export const WebsiteProvider = ({ children }) => {
  const [website, setWebsite] = useState({
    designType: '',
    colors: {
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#cccccc',
    },
    heroImageUrl: '',
    additionalImages: [],
    productDescription: '',
    generatedHtml: '',
  });

  const updateWebsite = (updates) => {
    setWebsite((prevWebsite) => ({
      ...prevWebsite,
      ...updates,
    }));
  };

  const resetWebsite = () => {
    setWebsite({
      designType: '',
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        accent: '#cccccc',
      },
      heroImageUrl: '',
      additionalImages: [],
      productDescription: '',
      generatedHtml: '',
    });
  };

  return (
    <WebsiteContext.Provider
      value={{
        website,
        updateWebsite,
        resetWebsite,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};