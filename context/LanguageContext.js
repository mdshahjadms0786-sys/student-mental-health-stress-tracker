import { createContext, useContext, useState, useRef } from "react";

export const LanguageContext = createContext(null);

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState("en");
  const cacheRef = useRef({});
  const langRef = useRef("en");

  async function translate(text) {
    if (!text) return text;
    const lang = langRef.current;
    if (lang === "en") return text;
    const key = lang + ":" + text;

    if (cacheRef.current[key]) {
      return cacheRef.current[key];
    }

    try {
      const url =
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(text) +
        "&langpair=en|" +
        lang;

      console.log("Translating:", text, "to", lang);

      const res = await fetch(url);
      const data = await res.json();

      console.log("API Response:", data);

      if (data.responseStatus === 200) {
        const result = data.responseData.translatedText;
        cacheRef.current[key] = result;
        return result;
      } else {
        console.log("API Error:", data.responseStatus);
        return text;
      }
    } catch (e) {
      console.log("Fetch Error:", e);
      return text;
    }
  }

  function changeLanguage(code) {
    console.log("Language changed to:", code);
    langRef.current = code;
    cacheRef.current = {};
    setCurrentLang(code);
  }

  return (
    <LanguageContext.Provider value={{
      currentLang,
      changeLanguage,
      translate,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}
