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
import { Sparkles, Lock, Fingerprint, ShieldCheck, Zap, User, Baby, ExternalLink, Infinity, Scroll } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations as t } from "@/lib/i18n";
import { format, isValid, differenceInYears } from "date-fns";
import { PlacesAutocomplete } from "@/components/ui/places-autocomplete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Translations = typeof t;

interface FormProps {
  tipo?: 'venda' | 'gratis';
  publico?: 'adulto' | 'jovem';
  titulo?: string;
}

// 1. SCHEMA ATUALIZADO (SEM CPF)
const createFormSchema = (t: Translations, tipo: string = 'venda', publico: string = 'adulto') => z.object({
  name: z.string().trim().min(5, t.errors.nameMin).max(100, t.errors.nameMax),
  // Se for jovem, exigimos o nome da criança. Se for adulto, é opcional.
  childName: publico === 'jovem'
    ? z.string().trim().min(2, "Nome da criança é obrigatório")
    : z.string().optional(),
  email: z.string().trim().email(t.errors.emailInvalid).max(255, t.errors.emailMax),
  gender: z.string({ required_error: (t.errors as any).genderInvalid }).min(1, (t.errors as any).genderInvalid),
  phone: z.string({ required_error: t.errors.phoneInvalid }).trim()
    .refine((val) => isValidPhoneNumber(val), t.errors.phoneInvalid),

  // CPF REMOVIDO DAQUI

  birthDate: z.date({ required_error: t.errors.birthDateInvalid }),
  birthTime: z.string().trim().min(4, t.errors.birthTimeInvalid),
  birthCity: z.string().trim().min(3, t.errors.birthCityInvalid),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

// 2. TIPO ATUALIZADO (SEM CPF)
type FormData = {
  name: string;
  childName?: string;
  email: string;
  gender: string;
  phone: string;
  // cpf removido
  birthDate: Date;
  birthTime: string;
  birthCity: string;
  latitude?: string;
  longitude?: string;
};

// --- COMPONENTE DE HORA (MANTIDO IGUAL) ---
const BirthTimeInput = ({ value, onChange, hourRef, minuteRef, nextRef }: any) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const valuesRef = useRef({ hours: "", minutes: "" });

  useEffect(() => { valuesRef.current = { hours, minutes }; }, [hours, minutes]);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      if (h && m) {
        setHours(h);
        setMinutes(m);
      }
    } else { setHours(""); setMinutes(""); }
  }, [value]);

  const updateTime = (newH: string, newM: string) => {
    if (newH.length > 0 && newM.length > 0) {
      let hInt = parseInt(newH);
      const mInt = parseInt(newM);
      if (!isNaN(hInt) && !isNaN(mInt)) {
        hInt = Math.min(23, Math.max(0, hInt));
        const mValid = Math.min(59, Math.max(0, mInt));

        const finalH = hInt.toString().padStart(2, "0");
        const finalM = mValid.toString().padStart(2, "0");

        setHours(finalH);
        setMinutes(finalM);
        onChange(`${finalH}:${finalM}`);
      }
    }
  };

  const handleBlur = () => {
    let currentH = valuesRef.current.hours;
    let currentM = valuesRef.current.minutes;

    if (currentH.length === 1) {
      currentH = currentH.padStart(2, "0");
      setHours(currentH);
      valuesRef.current.hours = currentH;
    }
    if (currentM.length === 1) {
      currentM = currentM.padStart(2, "0");
      setMinutes(currentM);
      valuesRef.current.minutes = currentM;
    }

    if (currentH && currentM) { updateTime(currentH, currentM); }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val.length === 2) {
      let num = parseInt(val);
      if (num > 23) val = "23";
    }
    setHours(val);
    valuesRef.current.hours = val;
    if (val.length === 2) {
      minuteRef.current?.focus();
    }
    if (val.length === 2 && valuesRef.current.minutes.length === 2) {
      updateTime(val, valuesRef.current.minutes);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val.length === 2) {
      let num = parseInt(val);
      if (num > 59) val = "59";
      nextRef.current?.focus();
    }
    setMinutes(val);
    valuesRef.current.minutes = val;
    if (val.length === 2) {
      updateTime(valuesRef.current.hours, val);
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
          onChange={handleHourChange}
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
          onChange={handleMinuteChange}
          onBlur={handleBlur}
          ref={minuteRef}
          maxLength={2}
        />
      </div>
    </div>
  );
};

export function FormSection({ tipo = 'venda', publico = 'adulto', titulo }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { country } = useLanguage();
  const { toast } = useToast();

  const [dateInputValue, setDateInputValue] = useState("");
  const [showAgeModal, setShowAgeModal] = useState(false);

  // Refs
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  // cpfRef REMOVIDO
  const phoneRef = useRef<any>(null);
  const childNameRef = useRef<HTMLInputElement>(null);

  const formSchema = createFormSchema(t, tipo, publico);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", 
      childName: "", 
      email: "", 
      gender: "", 
      phone: "", 
      // cpf: "", REMOVIDO
      birthTime: "", 
      birthCity: "", 
      latitude: "", 
      longitude: "",
    },
  });

  useEffect(() => {
    const currentDate = form.getValues("birthDate");
    if (currentDate && isValid(currentDate)) {
      setDateInputValue(format(currentDate, 'dd/MM/yyyy'));
      // Age Check
      if (publico !== 'jovem') {
        const age = differenceInYears(new Date(), currentDate);
        if (age < 18) {
          setShowAgeModal(true);
        }
      }
    }
  }, [form.watch("birthDate")]);

  // Função auxiliar para renderizar os campos de data
  const renderDateFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <FormField control={form.control} name="birthDate" render={({ field }) => {
        const [day, setDay] = useState("");
        const [monthInput, setMonthInput] = useState("");
        const [monthVal, setMonthVal] = useState<number | null>(null);
        const [year, setYear] = useState("");

        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        useEffect(() => {
          if (field.value) {
            setDay(format(field.value, "dd"));
            const m = field.value.getMonth();
            setMonthVal(m);
            setMonthInput(months[m]);
            setYear(format(field.value, "yyyy"));
          }
        }, []);

        const tryUpdateDate = (d: string, m: number | null, y: string) => {
          if (d && m !== null && y && y.length === 4) {
            const date = new Date(parseInt(y), m, parseInt(d));
            if (isValid(date)) field.onChange(date);
          }
        };

        const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;
          if (!val) { setMonthInput(""); setMonthVal(null); return; }
          const digits = val.replace(/\D/g, '').slice(0, 2);
          if (!digits) return;
          const num = parseInt(digits);
          const len = digits.length;

          if (len === 2) {
            if (num >= 1 && num <= 12) {
              const mIdx = num - 1;
              setMonthInput(months[mIdx]);
              setMonthVal(mIdx);
              yearRef.current?.focus();
              tryUpdateDate(day, mIdx, year);
            }
          } else {
            if (num >= 2 && num <= 9) {
              const mIdx = num - 1;
              setMonthInput(months[mIdx]);
              setMonthVal(mIdx);
              yearRef.current?.focus();
              tryUpdateDate(day, mIdx, year);
            } else {
              setMonthInput(digits);
              setMonthVal(null);
            }
          }
        };

        const handleMonthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          const val = e.target.value;
          if (val === "1" || val === "01") {
            setMonthInput("Janeiro");
            setMonthVal(0);
            tryUpdateDate(day, 0, year);
          }
        };

        return (
          <FormItem>
            <FormLabel className="text-foreground">{t.birthDateLabel}</FormLabel>
            <div className="flex gap-2">
              <Input placeholder="Dia" className="bg-background/50 border-border focus:border-primary w-[28%] text-center px-1" value={day}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, '').slice(0, 2);
                  if (parseInt(val) > 31) val = "31";
                  setDay(val);
                  if (val.length === 2) monthRef.current?.focus();
                  tryUpdateDate(val, monthVal, year);
                }}
                ref={dayRef} maxLength={2}
              />
              <div className="flex-1 relative">
                <Input
                  placeholder="Mês"
                  className="bg-background/50 border-border focus:border-primary text-center px-1"
                  value={monthInput}
                  onChange={handleMonthChange}
                  onBlur={handleMonthBlur}
                  onFocus={(e) => e.target.select()}
                  ref={monthRef}
                />
              </div>
              <Input placeholder="Ano" className="bg-background/50 border-border focus:border-primary w-[30%] text-center px-1" value={year}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setYear(val);
                  if (val.length === 4) hourRef.current?.focus();
                  tryUpdateDate(day, monthVal, val);
                }}
                ref={yearRef} maxLength={4}
              />
            </div>
            <FormMessage />
          </FormItem>
        )
      }} />

      <FormField control={form.control} name="birthTime" render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-foreground">{t.birthTimeLabel}</FormLabel>
            <FormControl>
              <BirthTimeInput value={field.value} onChange={field.onChange} hourRef={hourRef} minuteRef={minuteRef} nextRef={cityRef as any} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }} />
    </div>
  );

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formattedDate = format(data.birthDate, 'yyyy-MM-dd');

      const payload = {
        name: data.name,
        childName: data.childName,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        // cpf REMOVIDO DO PAYLOAD
        birthDate: formattedDate,
        birthTime: data.birthTime,
        birthCity: data.birthCity,
        latitude: data.latitude,
        longitude: data.longitude,
        tipo_lead: tipo,
        publico_alvo: publico
      };

      const endpoint = tipo === 'venda'
        ? 'https://omapadaalma.com/api/salvar.php'
        : 'https://omapadaalma.com/api/salvar_lead.php';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === 'success') {
        toast({ title: t.successTitle, description: tipo === 'venda' ? "Redirecionando..." : "Solicitação recebida!" });
        if (tipo === 'venda' && result.paymentUrl) {
          setTimeout(() => { window.location.href = result.paymentUrl; }, 1500);
        } else {
          setTimeout(() => { window.location.href = "https://omapadaalma.com/obrigado-amostra"; }, 1500);
        }
        form.reset();
        setDateInputValue("");
      } else {
        throw new Error(result.message || "Erro no servidor");
      }
    } catch (error: any) {
      console.error("Erro:", error);
      toast({ variant: "destructive", title: "Erro ao enviar", description: "Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario" className="py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 constellation-pattern opacity-20" />
      <div className="container mx-auto px-4 max-w-xl relative z-10">
        
        <div className="p-5 md:p-10 rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-sm shadow-2xl">

          <div className="text-center mb-6 md:mb-8 space-y-3 md:space-y-4">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              {titulo ? <span className="text-primary">{titulo}</span> : <>{t.headerTitlePrefix}</>}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {publico === 'jovem'
                ? "Preencha os dados do responsável e da criança."
                : tipo === 'gratis'
                  ? "Preencha seus dados para receber sua amostra gratuita diretamente no seu e-mail ou WhatsApp."
                  : t.headerSubtitle
              }
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">

              {/* === LAYOUT PARA JOVEM === */}
              {publico === 'jovem' ? (
                <>
                  {/* 1. DADOS DO RESPONSÁVEL */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 text-primary font-semibold text-sm">
                      <User className="w-4 h-4" /> Dados do Responsável (Adulto)
                    </div>

                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Nome Completo (Adulto)</FormLabel>
                        <FormControl><Input placeholder="Nome do Pai/Mãe" className="h-11 md:h-12 text-base md:text-sm bg-background/50 border-border focus:border-primary" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email (Adulto)</FormLabel>
                        <FormControl><Input type="email" placeholder="seu@email.com" className="h-11 md:h-12 text-base md:text-sm bg-background/50 border-border focus:border-primary" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">WhatsApp (Adulto)</FormLabel>
                        <FormControl><PhoneInput defaultCountry={country} value={field.value as any} onChange={field.onChange} className="h-11 md:h-12 text-base md:text-sm" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    {/* CPF REMOVIDO AQUI */}
                  </div>

                  {/* SEPARADOR */}
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-primary/30"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-primary font-bold">De quem é o mapa?</span></div>
                  </div>

                  {/* 2. DADOS DA CRIANÇA */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 text-primary font-semibold text-sm">
                      <Baby className="w-4 h-4" /> Dados da Criança
                    </div>

                    <FormField control={form.control} name="childName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Nome da Criança</FormLabel>
                        <FormControl><Input placeholder="Nome completo do filho(a)" className="h-11 md:h-12 text-base md:text-sm bg-background/50 border-border focus:border-primary" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="gender" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Gênero</FormLabel>
                        <div className="relative">
                          <select className="flex h-11 md:h-12 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-base md:text-sm appearance-none text-foreground focus:border-primary" value={field.value} onChange={field.onChange}>
                            <option value="" disabled>Selecione</option>
                            <option value="female" className="bg-popover text-popover-foreground">Feminino</option>
                            <option value="male" className="bg-popover text-popover-foreground">Masculino</option>
                            <option value="other" className="bg-popover text-popover-foreground">Outro</option>
                          </select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* DATA E HORA DA CRIANÇA */}
                    {renderDateFields()}

                    <FormField control={form.control} name="birthCity" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Cidade de Nascimento</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <PlacesAutocomplete ref={cityRef} value={field.value} onChange={field.onChange} placeholder="Ex: Campinas - SP" className="h-11 md:h-12 text-base md:text-sm bg-background/50 border-border focus:border-primary" onPlaceSelect={(place) => { const loc = place.details?.geometry?.location; if (loc) { const lat = typeof loc.lat === 'function' ? loc.lat() : loc.lat; const lng = typeof loc.lng === 'function' ? loc.lng() : loc.lng; form.setValue('latitude', String(lat)); form.setValue('longitude', String(lng)); } }} />
                            <input type="hidden" {...form.register('latitude')} /><input type="hidden" {...form.register('longitude')} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </>
              ) : (
                // === LAYOUT PARA ADULTO (PADRÃO) ===
                <>
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t.nameLabel}</FormLabel>
                      <FormControl><Input placeholder={t.namePlaceholder} className="h-11 md:h-12 text-base md:text-sm bg-background/50 border-border focus:border-primary" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t.emailLabel}</FormLabel>
                      <FormControl><Input type="email" placeholder={t.emailPlaceholder} className="h-11 md:h-12 text-base md:text-sm bg-background/50 border-border focus:border-primary" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{(t as any).genderLabel}</FormLabel>
                      <div className="relative">
                        <select className="flex h-11 md:h-12 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-base md:text-sm appearance-none text-foreground focus:border-primary" value={field.value} onChange={field.onChange}>
                          <option value="" disabled>{(t as any).genderPlaceholder}</option>
                          <option value="female" className="bg-popover text-popover-foreground">{(t as any).genderFemale}</option>
                          <option value="male" className="bg-popover text-popover-foreground">{(t as any).genderMale}</option>
                          <option value="other" className="bg-popover text-popover-foreground">{(t as any).genderOther}</option>
                        </select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {renderDateFields()}

                  <FormField control={form.control} name="birthCity" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t.birthCityLabel}</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <PlacesAutocomplete ref={cityRef} value={field.value} onChange={field.onChange} placeholder="Ex: Campinas - SP" className="h-11 md:h-12 text-base md:text-sm bg-background/50 border-border focus:border-primary" onPlaceSelect={(place) => { const loc = place.details?.geometry?.location; if (loc) { const lat = typeof loc.lat === 'function' ? loc.lat() : loc.lat; const lng = typeof loc.lng === 'function' ? loc.lng() : loc.lng; form.setValue('latitude', String(lat)); form.setValue('longitude', String(lng)); } }} />
                          <input type="hidden" {...form.register('latitude')} /><input type="hidden" {...form.register('longitude')} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t.phoneLabel}</FormLabel>
                      <FormControl><PhoneInput defaultCountry={country} value={field.value as any} onChange={field.onChange} className="h-11 md:h-12 text-base md:text-sm" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* CPF REMOVIDO AQUI TAMBÉM */}
                </>
              )}

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 md:h-auto text-lg md:py-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300 rounded-xl md:rounded-lg mt-6">
                {isSubmitting ? t.submitButtonLoading : t.submitButton}
              </Button>
            </form>
          </Form>

          {tipo === 'venda' && (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground opacity-80">
              <ExternalLink className="w-3 h-3 text-blue-500" />
              <span>{t.footerText}</span>
            </div>
          )}

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground opacity-80">
            <Lock className="w-3 h-3 text-green-500" />
            <span className="text-green-500">{t.footerSecurity}</span>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground opacity-80">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>{t.footerConfirm}</span>
          </div>

          {/* === BADGES INTELIGENTES === */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {/* 1. BADGE DE RISCO (Verde) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-[10px] md:text-xs text-green-500 font-semibold leading-tight">
                    {tipo === 'venda' ? "Risco Zero" : "100% Gratuito"}
                  </h4>
                  <p className="text-[10px] text-muted-foreground hidden md:block mt-1">
                    {tipo === 'venda' ? "Garantia total de 7 dias" : "Sem custo nenhum"}
                  </p>
                </div>
              </div>

              {/* 2. BADGE DE ARTESANAL (Azul) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Fingerprint className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-[10px] md:text-xs text-blue-500 font-semibold leading-tight">
                    {tipo === 'venda' ? "Análise Personalizada" : "Análise Personalizada"}
                  </h4>
                  <p className="text-[10px] text-muted-foreground hidden md:block mt-1">
                    {tipo === 'venda' ? "Entrega em até 5 dias úteis" : "Entrega em até 5 dias úteis"}
                  </p>
                </div>
              </div>

              {/* 3. BADGE DE DIFERENCIAL (Roxo) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  {tipo === 'venda' ? <Infinity className="w-4 h-4 text-purple-500" /> : <Scroll className="w-4 h-4 text-purple-500" />}
                </div>
                <div className="text-center">
                  <h4 className="text-[10px] md:text-xs text-purple-500 font-semibold leading-tight">
                    {tipo === 'venda' ? "Acesso Vitalício" : "Sua Carta Presente"}
                  </h4>
                  <p className="text-[10px] text-muted-foreground hidden md:block mt-1">
                    {publico === 'jovem'
                      ? "Identidade da Criança"
                      : (tipo === 'venda' ? "Acesse sempre que quiser" : "Um resumo exclusivo para você")
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AlertDialog open={showAgeModal} onOpenChange={setShowAgeModal}>
          <AlertDialogContent className="w-[90%] max-w-md rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Atenção</AlertDialogTitle>
              <AlertDialogDescription>
                Identificamos que você tem menos de 18 anos. Para realizar o mapa astral, precisamos dos dados do seu responsável.
                <br /><br />
                Você será redirecionado para a página correta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => {
                const url = tipo === 'venda' ? '/jovem' : '/jovem-amostra';
                window.location.href = url;
              }}>
                Entendi, me leve para lá
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section >
  );
}

export default FormSection;