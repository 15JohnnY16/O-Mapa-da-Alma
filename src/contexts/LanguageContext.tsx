import React, { createContext, useContext, useEffect, useState } from "react";
import * as RPNInput from "react-phone-number-input";

type LanguageContextType = {
    country: RPNInput.Country;
    setCountry: (country: RPNInput.Country) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [country, setCountry] = useState<RPNInput.Country>("BR");

    useEffect(() => {
        const detectLocation = async () => {
            try {
                const response = await fetch("https://ipapi.co/country/");
                if (response.ok) {
                    const data = await response.text();
                    const countryCode = data.trim() as RPNInput.Country;
                    if (countryCode && countryCode.length === 2) {
                        setCountry(countryCode);
                        return;
                    }
                }
            } catch (e) {
                console.warn("ipapi.co failed, trying fallback 1");
            }

            try {
                const response = await fetch("https://api.country.is");
                if (response.ok) {
                    const data = await response.json();
                    const countryCode = data.country as RPNInput.Country;
                    if (countryCode && countryCode.length === 2) {
                        setCountry(countryCode);
                        return;
                    }
                }
            } catch (e) {
                console.warn("api.country.is failed, trying fallback 2");
            }

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
        country,
        setCountry,
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
