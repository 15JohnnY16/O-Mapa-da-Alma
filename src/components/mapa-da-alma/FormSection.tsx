import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Lock, CalendarIcon, Clock, MapPin, ShieldCheck, Zap } from "lucide-react";
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
  gender: z.string({ required_error: (t.errors as any).genderInvalid }).min(1, (t.errors as any).genderInvalid),
  phone: z.string({ required_error: t.errors.phoneInvalid }).trim()
    .refine((val) => isValidPhoneNumber(val), t.errors.phoneInvalid),
  birthDate: z.date({ required_error: t.errors.birthDateInvalid }),
  birthTime: z.string().trim().min(4, t.errors.birthTimeInvalid),
  birthCity: z.string().trim().min(3, t.errors.birthCityInvalid),
});

type FormData = {
  name: string;
  email: string;
  gender: string;
  phone: string;
  birthDate: Date;
  birthTime: string;
  birthCity: string;
};

// Extracted component to ensure stable hooks and state
const BirthTimeInput = ({
  value,
  onChange,
  hourRef,
  minuteRef,
  nextRef,
  is24Hour
}: {
  value: string;
  onChange: (val: string) => void;
  hourRef: React.RefObject<HTMLInputElement>;
  minuteRef: React.RefObject<HTMLInputElement>;
  nextRef: React.RefObject<HTMLElement>;
  is24Hour: boolean;
}) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [period, setPeriod] = useState("AM");

  // Refs to hold current values for synchronous access in onBlur/onChange
  const valuesRef = useRef({ hours: "", minutes: "", period: "AM" });

  // Update refs whenever state changes
  useEffect(() => {
    valuesRef.current = { hours, minutes, period };
  }, [hours, minutes, period]);

  // Sync local state when value changes (e.g. initial load or reset)
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      if (h && m) {
        let hInt = parseInt(h);
        if (is24Hour) {
          setHours(h);
        } else {
          const p = hInt >= 12 ? "PM" : "AM";
          const h12 = hInt % 12 || 12;
          setHours(h12.toString().padStart(2, "0"));
          setPeriod(p);
        }
        setMinutes(m);
      }
    } else {
      // Only reset if we truly believe it's a reset (e.g. both empty).
      // If we are just mounting, we might want to respect empty.
      // But to avoid the "async country load wipes partial input" bug, we can check if we have nothing yet?
      // Actually, the cleanest way: if value is "", force clear.
      // The bug happens because is24Hour changes, triggering this effect while value is still "".
      // WE MUST SPLIT THE EFFECT.
      setHours("");
      setMinutes("");
    }
  }, [value]); // Removed is24Hour dependency to prevent reset on mode switch

  // Effect to handle mode switching (e.g. US -> BR)
  // If we have a value and mode changes, we want to re-render it in new format?
  // Current logic: we only store "hours" (display). form value is "HH:mm" (24h always?).
  // Wait, if form value is ALWAYS 24h (which it is, e.g. "14:00"), then [value] dependency handles it?
  // If is24Hour changes, value doesn't change. We need to re-parse value.
  // BUT we should not execute the 'else' block (reset) just because is24Hour changed.
  useEffect(() => {
    if (value) {
      // Re-run parse because format needs to change
      const [h, m] = value.split(":");
      if (h && m) {
        let hInt = parseInt(h);
        if (is24Hour) {
          setHours(h);
        } else {
          const p = hInt >= 12 ? "PM" : "AM";
          const h12 = hInt % 12 || 12;
          setHours(h12.toString().padStart(2, "0"));
          setPeriod(p);
        }
        setMinutes(m);
      }
    }
    // logic for "if value is empty, do nothing" is implicitly safe here.
  }, [is24Hour, value]);


  const updateTime = (newH: string, newM: string, newP: string) => {
    if (newH.length > 0 && newM.length > 0) {
      let hInt = parseInt(newH);
      const mInt = parseInt(newM);

      if (!isNaN(hInt) && !isNaN(mInt)) {
        if (is24Hour) {
          // Strict 0-23
          hInt = Math.min(23, Math.max(0, hInt));
        } else {
          // Strict 1-12
          // If user types '0', it becomes 1? Or 12? usually 12h clock has no 0.
          if (hInt === 0) hInt = 12;
          hInt = Math.min(12, Math.max(1, hInt));
        }
        const mValid = Math.min(59, Math.max(0, mInt));

        let finalH = hInt;
        if (!is24Hour) {
          if (newP === "PM" && hInt < 12) finalH += 12;
          if (newP === "AM" && hInt === 12) finalH = 0;
        }

        const formattedTime = `${finalH.toString().padStart(2, "0")}:${mValid.toString().padStart(2, "0")}`;

        // Update local display to match clamped values immediately?
        // If we don't, user sees "99" but saves "23".
        // Let's update local display too.
        if (is24Hour) {
          setHours(finalH.toString().padStart(2, "0"));
        } else {
          // If 12h, we need to show the 12h version
          // finalH is 24h.
          // But hInt is already the 12h version we want to show?
          // Yes, hInt was clamped to 1-12.
          setHours(hInt.toString().padStart(2, "0"));
        }
        setMinutes(mValid.toString().padStart(2, "0"));

        onChange(formattedTime);
      }
    }
  };

  const handleBlur = () => {
    // Use refs to get the LATEST value, because onBlur might fire 
    // immediately after onChange (before state update) if we auto-focused.
    // actually, wait. if we update state in onChange, then calling focus() sync:
    // React state updates are batched/async. 
    // So 'hours' variable in this closure is STALE. 'valuesRef.current' might also be STALE if effect hasn't run!
    // BETTER: Update the ref manually in onChange BEFORE focusing.

    let currentH = valuesRef.current.hours;
    let currentM = valuesRef.current.minutes;

    if (currentH.length === 1) {
      currentH = currentH.padStart(2, "0");
      setHours(currentH);
      valuesRef.current.hours = currentH; // Sync ref
    }
    if (currentM.length === 1) {
      currentM = currentM.padStart(2, "0");
      setMinutes(currentM);
      valuesRef.current.minutes = currentM; // Sync ref
    }

    if (currentH && currentM) {
      updateTime(currentH, currentM, valuesRef.current.period);
    }
  };

  return (
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
            // Manually update ref specifically for the auto-focus race condition
            valuesRef.current.hours = val;

            // Validating/Updating on blur gives a better UX (no fighting the user)
            // But we do auto-focus the next field for convenience
            if (val.length === 2) {
              minuteRef.current?.focus();
            }
          }}
          onBlur={handleBlur}
          ref={hourRef}
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
            valuesRef.current.minutes = val; // Sync ref

            if (val.length === 2 && hours) {
              // We can commit here or wait for blur of this field. 
              // Committing here enables the "nextRef" focus to carry the valid state?
              // Actually, let's defer to blur for consistency, OR keep it here but ensure clamp doesn't bite.
              // If we defer to blur, the user might hit "Next" (city) and form state is not updated yet?
              // Blur happens when focus leaves, so form state WILL update before next field interaction implies data usage.
              nextRef.current?.focus();
            }
          }}
          onBlur={handleBlur}
          ref={minuteRef}
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
  );
};

const FormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, country, language } = useLanguage();
  const { toast } = useToast();

  // Local state for manual date input to allow typing
  const [dateInputValue, setDateInputValue] = useState("");

  // Refs for auto-focus
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  // Using a class based selector or just assuming it's the next focusable might be tricky for PhoneInput
  // But we can try to focus the container or find the input inside.
  // PhoneInput doesn't easily expose a ref to the input element directly in a way we control easily without wrapper changes.
  // We will assume focusing the container or a specific class.
  // Actually, ShadCN PhoneInput forwards ref to the underlying RPNInput.
  const phoneRef = useRef<any>(null);

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
      gender: "",
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

    try {
      // 1. Formatar a data para o padrão do MySQL (YYYY-MM-DD)
      // Estamos usando a função 'format' do date-fns que você já importou
      const formattedDate = format(data.birthDate, 'yyyy-MM-dd');

      // 2. Preparar o objeto para envio
      const payload = {
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        birthDate: formattedDate, // Data formatada
        birthTime: data.birthTime,
        birthCity: data.birthCity
      };

      // 3. Enviar para a HostGator
      // IMPORTANTE: Troque 'omapadaalma.com' pelo seu domínio real se for diferente
      const response = await fetch('https://omapadaalma.com/api/salvar.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === 'success') {
        toast({
          title: t.successTitle, // "Sucesso!"
          description: t.successMessage, // "Seus dados foram enviados."
        });

        // Limpar formulário apenas se deu certo
        form.reset();
        setDateInputValue("");
      } else {
        throw new Error(result.message || "Erro no servidor");
      }

    } catch (error) {
      console.error("Erro de envio:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Não foi possível salvar seus dados. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            emailRef.current?.focus();
                          }
                        }}
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
                        ref={emailRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            genderRef.current?.focus();
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{(t as any).genderLabel}</FormLabel>
                    <div className="relative">
                      <select
                        className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-foreground"
                        value={field.value}
                        ref={genderRef}
                        onChange={(e) => {
                          field.onChange(e);
                          // Auto focus next
                          if (e.target.value) {
                            dayRef.current?.focus();
                          }
                        }}
                      >
                        <option value="" disabled>{(t as any).genderPlaceholder}</option>
                        <option value="female" className="bg-popover text-popover-foreground">{(t as any).genderFemale}</option>
                        <option value="male" className="bg-popover text-popover-foreground">{(t as any).genderMale}</option>
                        <option value="other" className="bg-popover text-popover-foreground">{(t as any).genderOther}</option>
                      </select>
                    </div>
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

                        if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
                          // Validate Day immediately if possible (visual feedback mostly handled by Zod, 
                          // but blocking invalid input prevents bad state)
                          // However, we just need to ensure valid object creation.

                          // Check for future date
                          const now = new Date();
                          const currentYear = now.getFullYear();
                          const currentMonth = now.getMonth();
                          const currentDay = now.getDate();

                          let isValidDate = true;

                          if (y > currentYear) isValidDate = false;
                          if (y === currentYear && m > currentMonth) isValidDate = false;
                          if (y === currentYear && m === currentMonth && d > currentDay) isValidDate = false;

                          // Basic ranges
                          if (d < 1 || d > 31) isValidDate = false;
                          if (m < 0 || m > 11) isValidDate = false; // Month is 0-indexed in JS Date and our options
                          if (y < 1900) isValidDate = false;

                          if (isValidDate) {
                            const newDate = new Date(y, m, d);
                            // Verify JS date validity (e.g. Feb 31 -> Mar 3)
                            // We want to REJECT if JS rolled it over.
                            if (isValid(newDate) && newDate.getDate() === d && newDate.getMonth() === m && newDate.getFullYear() === y) {
                              field.onChange(newDate);
                            } else {
                              // Invalid date (e.g. 31st Feb), don't set form value (or set null/error?)
                              // If we don't set it, Zod validation won't clear until it's valid.
                            }
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
                                let val = e.target.value.replace(/\D/g, '').slice(0, 2);
                                // Strict day limit 31
                                if (parseInt(val) > 31) val = "31";
                                setDay(val);
                                if (val.length === 2) {
                                  monthRef.current?.focus();
                                }
                              }}
                              ref={dayRef}
                              maxLength={2}
                            />
                          </FormControl>

                          <div className="flex-1 relative">
                            <select
                              className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                              value={month}
                              ref={monthRef}
                              onChange={(e) => {
                                setMonth(e.target.value);
                                if (e.target.value) {
                                  yearRef.current?.focus();
                                }
                              }}
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
                                let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                // Prevent future year immediately if 4 chars?
                                // Hard to do without context of month/day, but we can stop obvious ones
                                const limitYear = new Date().getFullYear();
                                if (val.length === 4 && parseInt(val) > limitYear) {
                                  val = limitYear.toString();
                                }
                                setYear(val);
                                if (val.length === 4) {
                                  hourRef.current?.focus();
                                }
                              }}
                              ref={yearRef}
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
                    const is24Hour = country !== 'US';
                    return (
                      <FormItem>
                        <FormLabel className="text-foreground">{t.birthTimeLabel}</FormLabel>
                        <FormControl>
                          <BirthTimeInput
                            value={field.value}
                            onChange={field.onChange}
                            hourRef={hourRef}
                            minuteRef={minuteRef}
                            nextRef={cityRef as any}
                            is24Hour={is24Hour}
                          />
                        </FormControl>
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
                        ref={cityRef}
                        onPlaceSelect={() => {
                          // Try to focus phone input
                          if (phoneRef.current) {
                            phoneRef.current.focus();
                          }
                        }}
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
                        ref={phoneRef}
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

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="grid grid-cols-3 gap-4">
              {/* Badge 1: Guarantee */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-[10px] md:text-xs text-green-500 font-semibold leading-tight">{(t.offer as any).badges?.badge1Title}</h4>
                  <p className="text-[10px] text-muted-foreground hidden md:block">{(t.offer as any).badges?.badge1Sub}</p>
                </div>
              </div>

              {/* Badge 2: Security */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-[10px] md:text-xs text-blue-500 font-semibold leading-tight">{(t.offer as any).badges?.badge2Title}</h4>
                  <p className="text-[10px] text-muted-foreground hidden md:block">{(t.offer as any).badges?.badge2Sub}</p>
                </div>
              </div>

              {/* Badge 3: Delivery */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-[10px] md:text-xs text-purple-500 font-semibold leading-tight">{(t.offer as any).badges?.badge3Title}</h4>
                  <p className="text-[10px] text-muted-foreground hidden md:block">{(t.offer as any).badges?.badge3Sub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
