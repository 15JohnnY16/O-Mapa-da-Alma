-- RPC de login por e-mail + senha (sem token na URL), usada pelo LoginModal da LP.
-- Um mesmo e-mail pode ter vários mapas (família); retorna todos cuja senha bate,
-- e o front mostra uma lista para a pessoa escolher qual mapa abrir.
-- Aplicada manualmente no projeto Supabase (aacylcifqfadayidfcio) em 2026-06-16.
-- Aditiva: não altera a verificar_login(p_email, p_senha, p_token) usada por /mapa/{token}.

CREATE OR REPLACE FUNCTION public.verificar_login_email(p_email text, p_senha text)
RETURNS TABLE(token text, nome text, status text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_bloqueado    boolean;
  v_match_count  int;
BEGIN
  -- Bloqueio: se QUALQUER mapa desse e-mail está bloqueado agora
  SELECT EXISTS (
    SELECT 1 FROM mapas m
    WHERE m.cliente_email = p_email
      AND m.bloqueado_ate IS NOT NULL
      AND m.bloqueado_ate > NOW()
  ) INTO v_bloqueado;

  IF v_bloqueado THEN
    RAISE EXCEPTION 'Conta bloqueada por excesso de tentativas. Tente novamente em 15 minutos.';
  END IF;

  -- Quantos mapas batem com a senha
  SELECT COUNT(*) INTO v_match_count
  FROM mapas m
  WHERE m.cliente_email = p_email
    AND m.senha_hash IS NOT NULL
    AND m.senha_hash = crypt(p_senha, m.senha_hash);

  IF v_match_count = 0 THEN
    -- Falhou: incrementa tentativas em todos os mapas do e-mail; bloqueia em 10
    UPDATE mapas
    SET tentativas_login = COALESCE(tentativas_login, 0) + 1,
        bloqueado_ate = CASE
          WHEN COALESCE(tentativas_login, 0) + 1 >= 10
          THEN NOW() + INTERVAL '15 minutes'
          ELSE bloqueado_ate
        END
    WHERE cliente_email = p_email;
    RETURN;
  END IF;

  -- Sucesso: zera tentativas
  UPDATE mapas
  SET tentativas_login = 0,
      bloqueado_ate = NULL
  WHERE cliente_email = p_email;

  -- Retorna todos os mapas cuja senha bate
  RETURN QUERY
  SELECT m.token, m.cliente_nome, m.status
  FROM mapas m
  WHERE m.cliente_email = p_email
    AND m.senha_hash IS NOT NULL
    AND m.senha_hash = crypt(p_senha, m.senha_hash)
  ORDER BY m.criado_em;
END;
$function$;
