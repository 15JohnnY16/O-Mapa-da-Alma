import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Lock, CalendarIcon, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/i18n";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, parse, isValid } from "date-fns";
import { ptBR, es, enUS } from "date-fns/locale";
import { PlacesAutocomplete } from "@/components/ui/places-autocomplete";

const createFormSchema = (t: typeof translations["pt"]) => z.object({
  name: z.string().trim().min(10, t.errors.nameMin).max(100, t.errors.nameMax),
  email: z.string().trim().email(t.errors.emailInvalid).max(255, t.errors.emailMax),
  phone: z.string({ required_error: t.errors.phoneInvalid }).trim()
    .refine((val) => isValidPhoneNumber(val), t.errors.phoneInvalid),
  birthDate: z.date({ required_error: t.errors.birthDateInvalid }),
  birthTime: z.string().trim().min(4, t.errors.birthTimeInvalid),
  birthCity: z.string().trim().min(3, t.errors.birthCityInvalid),
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  birthTime: string;
  birthCity: string;
};

const FormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, country, language } = useLanguage();
  const { toast } = useToast();

  // Local state for manual date input to allow typing
  const [dateInputValue, setDateInputValue] = useState("");

  const getDateLocale = () => {
    switch (language) {
      case "pt": return ptBR;
      case "es": return es;
      default: return enUS;
    }
  };

  const getDateFormat = () => {
    return language === 'en' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';
  };

  const formSchema = createFormSchema(t);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthTime: "",
      birthCity: "",
    },
  });

  // Sync date input with form value when form value changes (e.g. from calendar select)
  useEffect(() => {
    const currentDate = form.getValues("birthDate");
    if (currentDate && isValid(currentDate)) {
      setDateInputValue(format(currentDate, getDateFormat()));
    }
  }, [form.watch("birthDate"), language]);


  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (date: Date | undefined) => void) => {
    const value = e.target.value;
    setDateInputValue(value);

    // Attempt to parse
    const parsedDate = parse(value, getDateFormat(), new Date());

    if (isValid(parsedDate) && value.length >= 8) {
      // Only update form if valid and looks complete to avoid premature validation errors
      // Check if year is reasonable
      if (parsedDate.getFullYear() > 1900 && parsedDate.getFullYear() <= new Date().getFullYear()) {
        fieldChange(parsedDate);
      }
    }
  };


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: t.successTitle,
      description: t.successMessage,
    });

    form.reset();
    setDateInputValue("");
    setIsSubmitting(false);
  };

  return (
    <section id="formulario" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 constellation-pattern opacity-20" />

      <div className="container mx-auto px-4 max-w-xl relative z-10">
        {/* Form card */}
        <div className="p-8 md:p-10 rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              {t.headerTitlePrefix} <span className="text-primary">{t.headerTitleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-sm">
              {t.headerSubtitle}
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{t.nameLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.namePlaceholder}
                        className="bg-background/50 border-border focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{t.emailLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t.emailPlaceholder}
                        className="bg-background/50 border-border focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => {
                    const [day, setDay] = useState("");
                    const [month, setMonth] = useState("");
                    const [year, setYear] = useState("");

                    // Initialize generic months for dropdown
                    const months = Array.from({ length: 12 }, (_, i) => {
                      const date = new Date(2000, i, 1);
                      return {
                        value: i.toString(),
                        label: format(date, "MMMM", { locale: getDateLocale() }),
                      };
                    });

                    // Effect to update the main form field when parts change
                    useEffect(() => {
                      if (day && month && year) {
                        const d = parseInt(day);
                        const m = parseInt(month);
                        const y = parseInt(year);

                        if (!isNaN(d) && !isNaN(m) && !isNaN(y) && y > 1900 && d > 0 && d <= 31) {
                          const newDate = new Date(y, m, d);
                          if (isValid(newDate) && newDate.getDate() === d) {
                            field.onChange(newDate);
                          } else {
                            // Invalid date (e.g. 31st Feb)
                            // We don't clear the error here, Zod will handle 'invalid date' if we don't pass a valid date
                          }
                        }
                      }
                    }, [day, month, year]);

                    return (
                      <FormItem>
                        <FormLabel className="text-foreground">{t.birthDateLabel}</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              placeholder="Dia"
                              className="bg-background/50 border-border focus:border-primary w-[28%] text-center px-1"
                              value={day}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                                setDay(val);
                              }}
                              maxLength={2}
                            />
                          </FormControl>

                          <div className="flex-1 relative">
                            <select
                              className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                              value={month}
                              onChange={(e) => setMonth(e.target.value)}
                            >
                              <option value="" disabled>Mês</option>
                              {months.map((m) => (
                                <option key={m.value} value={m.value} className="bg-popover text-popover-foreground">
                                  {m.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <FormControl>
                            <Input
                              placeholder="Ano"
                              className="bg-background/50 border-border focus:border-primary w-[30%] text-center px-1"
                              value={year}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                setYear(val);
                              }}
                              maxLength={4}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="birthTime"
                  render={({ field }) => {
                    const is24Hour = country !== 'US'; // Default to 24h for everywhere except US
                    const [hours, setHours] = useState("");
                    const [minutes, setMinutes] = useState("");
                    const [period, setPeriod] = useState("AM");

                    // Sync local state when form value changes (inverse data flow)
                    useEffect(() => {
                      if (field.value) {
                        const [h, m] = field.value.split(":");
                        if (h && m) {
                          let hInt = parseInt(h);
                          if (is24Hour) {
                            setHours(h);
                          } else {
                            // Convert 24h to 12h for display
                            const p = hInt >= 12 ? "PM" : "AM";
                            const h12 = hInt % 12 || 12;
                            setHours(h12.toString().padStart(2, "0"));
                            setPeriod(p);
                          }
                          setMinutes(m);
                        }
                      }
                    }, []);

                    const updateTime = (newH: string, newM: string, newP: string) => {
                      if (newH.length > 0 && newM.length > 0) {
                        let hInt = parseInt(newH);
                        const mInt = parseInt(newM);

                        if (!isNaN(hInt) && !isNaN(mInt)) {
                          // Validation
                          if (is24Hour) {
                            hInt = Math.min(23, Math.max(0, hInt));
                          } else {
                            hInt = Math.min(12, Math.max(1, hInt));
                          }
                          const mValid = Math.min(59, Math.max(0, mInt));

                          // Format logic
                          let finalH = hInt;
                          if (!is24Hour) {
                            if (newP === "PM" && hInt < 12) finalH += 12;
                            if (newP === "AM" && hInt === 12) finalH = 0;
                          }

                          const formattedTime = `${finalH.toString().padStart(2, "0")}:${mValid.toString().padStart(2, "0")}`;
                          field.onChange(formattedTime);
                        }
                      }
                    };

                    const handleBlur = () => {
                      // Pad inputs on blur
                      if (hours.length === 1) setHours(hours.padStart(2, "0"));
                      if (minutes.length === 1) setMinutes(minutes.padStart(2, "0"));
                    };

                    return (
                      <FormItem>
                        <FormLabel className="text-foreground">{t.birthTimeLabel}</FormLabel>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <Input
                              type="text"
                              placeholder="H"
                              className="bg-background/50 border-border focus:border-primary text-center px-1"
                              value={hours}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                                setHours(val);
                                updateTime(val, minutes, period);
                              }}
                              onBlur={handleBlur}
                              maxLength={2}
                            />
                          </div>
                          <span className="text-foreground font-bold">:</span>
                          <div className="relative flex-1">
                            <Input
                              type="text"
                              placeholder="M"
                              className="bg-background/50 border-border focus:border-primary text-center px-1"
                              value={minutes}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                                setMinutes(val);
                                updateTime(hours, val, period);
                              }}
                              onBlur={handleBlur}
                              maxLength={2}
                            />
                          </div>
                          {!is24Hour && (
                            <div className="relative w-20">
                              <select
                                className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                value={period}
                                onChange={(e) => {
                                  setPeriod(e.target.value);
                                  updateTime(hours, minutes, e.target.value);
                                }}
                              >
                                <option value="AM" className="bg-popover text-popover-foreground">AM</option>
                                <option value="PM" className="bg-popover text-popover-foreground">PM</option>
                              </select>
                            </div>
                          )}
                          {is24Hour && (
                            <div className="text-muted-foreground text-xs ml-1 whitespace-nowrap">
                              (24h)
                            </div>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <FormField
                control={form.control}
                name="birthCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{t.birthCityLabel}</FormLabel>
                    <FormControl>
                      <PlacesAutocomplete
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={country === 'BR' ? "Ex: Campinas - SP" : "Ex: New York, NY"}
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{t.phoneLabel}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        key={country}
                        value={field.value as any}
                        onChange={field.onChange}
                        defaultCountry={country}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full text-lg py-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300"
              >
                {isSubmitting ? t.submitButtonLoading : t.submitButton}
              </Button>
            </form>
          </Form>

          {/* Security note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>{t.footerSecurity}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
