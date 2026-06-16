import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { LogIn, Eye, EyeOff, Loader2, ChevronRight } from "lucide-react";

type Mapa = { token: string; nome: string; status: string };

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [mapas, setMapas] = useState<Mapa[]>([]);

  const irParaMapa = (token: string) => {
    window.location.href = `https://omapadaalma.com/mapa/${token}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const { data, error } = await supabase.rpc("verificar_login_email", {
        p_email: email.trim().toLowerCase(),
        p_senha: senha,
      });

      if (error) {
        // RAISE EXCEPTION (ex: conta bloqueada) chega aqui
        setErro(error.message?.includes("bloqueada")
          ? "Conta bloqueada por excesso de tentativas. Tente novamente em 15 minutos."
          : "Erro ao conectar. Tente novamente.");
        return;
      }

      const resultados = (data as Mapa[]) ?? [];

      if (resultados.length === 0) {
        setErro("E-mail ou senha incorretos.");
        return;
      }

      if (resultados.length === 1) {
        irParaMapa(resultados[0].token);
        return;
      }

      // Vários mapas para o mesmo e-mail/senha: deixa escolher
      setMapas(resultados);
    } catch {
      setErro("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setEmail("");
    setSenha("");
    setErro("");
    setMapas([]);
    setShowSenha(false);
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) resetState();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary text-xs gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            Já tenho acesso
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              {mapas.length > 1 ? "Qual mapa você quer abrir?" : "Acessar meu Mapa"}
            </DialogTitle>
          </DialogHeader>

          {mapas.length > 1 ? (
            // Lista de mapas para escolher
            <div className="space-y-2 pt-2">
              <p className="text-sm text-muted-foreground text-center">
                Encontramos mais de um mapa para este e-mail.
              </p>
              {mapas.map((m) => (
                <button
                  key={m.token}
                  onClick={() => irParaMapa(m.token)}
                  className="w-full flex items-center justify-between gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-left text-foreground hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  <span className="font-medium">{m.nome || "Meu Mapa"}</span>
                  <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                </button>
              ))}
              <button
                type="button"
                onClick={resetState}
                className="w-full text-xs text-muted-foreground hover:text-foreground pt-2"
              >
                Voltar
              </button>
            </div>
          ) : (
            // Formulário de login
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="login-email">E-mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-senha">Senha</Label>
                <div className="relative">
                  <Input
                    id="login-senha"
                    type={showSenha ? "text" : "password"}
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenha((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showSenha ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {erro && (
                <p className="text-sm text-destructive text-center">{erro}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
