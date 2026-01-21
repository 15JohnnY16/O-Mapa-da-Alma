import React, { createContext, useContext, useEffect, useState } from "react";
import * as RPNInput from "react-phone-number-input";
import { getLanguageFromCountry, Language, translations } from "../lib/i18n";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    country: RPNInput.Country;
    setCountry: (country: RPNInput.Country) => void;
    t: typeof translations["pt"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        // Priority 1: URL Query Param
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const langParam = params.get("lang");
            if (langParam === "pt" || langParam === "es" || langParam === "en") {
                return langParam;
            }
        }

        // Priority 2: LocalStorage
        if (typeof window !== "undefined") {
            const storedLang = localStorage.getItem("soul-map-language");
            if (storedLang === "pt" || storedLang === "es" || storedLang === "en") {
                return storedLang;
            }
        }

        // Priority 3: Browser Language (Navigator)
        if (typeof window !== "undefined") {
            const navLang = navigator.language || navigator.languages?.[0];
            if (navLang) {
                if (navLang.startsWith("pt")) return "pt";
                if (navLang.startsWith("es")) return "es";
            }
        }

        // Default to English initially (will be refined by IP if needed, but usually En is safe default)
        return "en";
    });

    const [country, setCountry] = useState<RPNInput.Country>("US");

    // Persist language changes
    useEffect(() => {
        localStorage.setItem("soul-map-language", language);
    }, [language]);

    useEffect(() => {
        const detectLocation = async () => {
            // Service 1: ipapi.co (Simple text)
            try {
                const response = await fetch("https://ipapi.co/country/");
                if (response.ok) {
                    const data = await response.text();
                    const countryCode = data.trim() as RPNInput.Country;
                    if (countryCode && countryCode.length === 2) {
                        setCountry(countryCode);
                        return; // Success
                    }
                }
            } catch (e) {
                console.warn("ipapi.co failed, trying fallback 1");
            }

            // Service 2: api.country.is (Reliable, JSON)
            try {
                const response = await fetch("https://api.country.is");
                if (response.ok) {
                    const data = await response.json();
                    const countryCode = data.country as RPNInput.Country;
                    if (countryCode && countryCode.length === 2) {
                        setCountry(countryCode);
                        return; // Success
                    }
                }
            } catch (e) {
                console.warn("api.country.is failed, trying fallback 2");
            }

            // Service 3: ipwho.is (JSON, no SSL sometimes but usually ok)
            try {
                const response = await fetch("https://ipwho.is/");
                if (response.ok) {
                    const data = await response.json();
                    const countryCode = data.country_code as RPNInput.Country;
                    if (countryCode && countryCode.length === 2) {
                        setCountry(countryCode);
                        return;
                    }
                }
            } catch (e) {
                console.warn("All location services failed. Defaulting to US.");
            }
        };

        detectLocation();
    }, []);

    const value = {
        language,
        setLanguage,
        country,
        setCountry,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
