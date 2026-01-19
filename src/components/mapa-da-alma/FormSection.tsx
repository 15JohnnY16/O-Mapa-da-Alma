import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Lock } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().trim().min(10, "Telefone deve ter pelo menos 10 dígitos").max(20, "Telefone muito longo")
    .regex(/^[\d\s()+-]+$/, "Formato de telefone inválido"),
});

type FormData = z.infer<typeof formSchema>;

const FormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Dados recebidos com sucesso! ✨",
      description: "Em breve você receberá as instruções para o pagamento no seu email.",
    });
    
    form.reset();
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
              Decodifique Seu <span className="text-primary">Mapa da Alma</span>
            </h2>
            <p className="text-muted-foreground text-sm">
              Preencha seus dados para receber as instruções de pagamento e agendar sua análise.
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
                    <FormLabel className="text-foreground">Nome completo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Seu nome" 
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
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="seu@email.com" 
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">WhatsApp</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="(00) 00000-0000" 
                        className="bg-background/50 border-border focus:border-primary"
                        {...field} 
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
                {isSubmitting ? "Enviando..." : "Quero Decodificar Meu Mapa"}
              </Button>
            </form>
          </Form>

          {/* Security note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Seus dados estão seguros e não serão compartilhados.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
