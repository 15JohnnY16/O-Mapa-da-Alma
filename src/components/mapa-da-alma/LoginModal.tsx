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
import { LogIn, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const { data, error } = await supabase.rpc("verificar_login", {
        p_email: email.trim().toLowerCase(),
        p_senha: senha,
        p_token: "",
      });

      if (error) {
        setErro("Erro ao conectar. Tente novamente.");
        return;
      }

      const resultado = Array.isArray(data) ? data[0] : data;

      if (!resultado || resultado.status !== "ok") {
        setErro("E-mail ou senha incorretos.");
        return;
      }

      window.location.href = `https://omapadaalma.com/mapa/${resultado.token}`;
    } catch {
      setErro("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      setEmail("");
      setSenha("");
      setErro("");
    }
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
              Acessar meu Mapa
            </DialogTitle>
          </DialogHeader>

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
        </DialogContent>
      </Dialog>
    </div>
  );
}
