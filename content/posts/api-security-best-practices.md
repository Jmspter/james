---
title: "Segurança de APIs: o básico que todo mundo deveria saber (mas não sabe)"
excerpt: "Protegendo APIs contra vulnerabilidades comuns. OAuth2, JWT, rate limiting e padrões modernos de segurança aplicados."
image: "/blog/api-security.jpg"
category: "Segurança"
author:
  name: "James"
  avatar: "/about-photo.jpg"
date: "28 Out 2024"
readTime: "9 min read"
featured: true
tags:
  - Segurança
  - API
  - OAuth2
  - JWT
---

Se tem uma coisa que sempre me surpreende é como, em 2025, ainda preciso repetir conceitos fundamentais de segurança de APIs. A gente vive num mundo onde microserviços conversam com outros microserviços, que falam com gateways externos, que acionam filas, que chamam funções serverless espalhadas em cinco provedores. E, mesmo assim, ainda tem desenvolvedor enviando token JWT pelo `localStorage` ou expondo endpoint de login sem rate limit.

Pois é. Então vamos organizar a bagunça.

Tudo o que vou explicar aqui não é opinião minha — está em documentos extremamente consolidados como **OWASP API Security Top 10**, as recomendações do **NIST**, RFCs do IETF e livros clássicos sobre arquitetura segura. Mas vou apresentar no tom direto que eu gostaria que alguém tivesse usado comigo 20 anos atrás.

---

## Autenticação vs Autorização: o arroz com feijão que muita gente confunde

Toda vez que alguém diz “minha API usa JWT então está segura”, eu já sei que tem problema. Antes de falar de token, vamos recapitular dois conceitos que deveriam vir tatuados na tela do VSCode:

| Termo            | Pergunta               | O que significa na prática  |
| ---------------- | ---------------------- | --------------------------- |
| **Autenticação** | Quem é você?           | Login, senha, PKCE, SSO     |
| **Autorização**  | O que você pode fazer? | Permissões, escopos, papéis |

Autenticação identifica.
Autorização limita.

Um não substitui o outro. Muita API desastrosa nasce justamente da confusão entre esses dois mundos.

---

## OAuth2 e OpenID Connect: a dupla que virou padrão de mercado

OAuth2 não é exatamente simples — e não foi feito pra ser. Ele nasceu para resolver problemas de delegação de acesso entre serviços, quando ninguém queria entregar login e senha pra terceiros. Em cima disso, veio o **OpenID Connect**, que adicionou o elemento que faltava: identidade estruturada, assinada, validada.

É daqui que vem os fluxos que vemos por aí:

* **Authorization Code**: o fluxo clássico para backends que sabem guardar segredo.
* **PKCE**: a versão moderna e segura para SPAs e apps mobile.
* **Client Credentials**: microserviço falando com microserviço — sem usuários humanos por perto.
* **Escopos bem definidos**: o equivalente a não dar a chave mestra da empresa só pra quem quer usar a impressora.

Se você hoje está construindo uma API pública e não está usando OAuth2/ OIDC, provavelmente está reinventando uma roda que já veio redonda há mais de 10 anos.

---

## JWT em Ruby: simples, direto e sem firulas

Nada mais básico que gerar um JWT. Mas, como sempre, o diabo mora nos detalhes.

```ruby
require 'jwt'

payload = {
  sub: user.id,
  role: user.role,
  exp: Time.now.to_i + 15 * 60 # expira em 15 minutos
}

secret_key = ENV['JWT_SECRET']

token = JWT.encode(payload, secret_key, 'HS256')
puts token
```

Até aqui tudo parece tranquilo. Mas o problema não é gerar o token — é **como** você trata ele depois.

---

## Boas práticas de JWT que não deveriam ser opcionais

Aqui vai o checklist que separa APIs profissionais de experimentos perigosos:

* JWT com vida curta. **15 minutos** é o sweet spot.
* Refresh tokens rotativos. Sempre.
* Tokens sempre assinados com chave assimétrica (RS256).
* Verificar **todas** as claims. Nada de confiar só no `sub`.
* **Nunca**, em hipótese alguma, guardar token sensível em `localStorage`.
* TLS obrigatório — token sem HTTPS é carta aberta pra roubo.
* Revogação ativa. Se houve vazamento, mate o token sem dó.

Tudo isso está literalmente descrito no OWASP API Security Top 10 (2023). E ainda assim, todo ano vemos incidentes causados por práticas ruins com tokens.

---

## Rate Limiting: ou você coloca, ou alguém coloca pra você

Toda API exposta ao mundo precisa ser capaz de dizer “calma, respira”.
Se você não faz isso, alguém vai te derrubar com 3 linhas de curl.

O jeito tradicional é usar Redis, gateways, proxies. Mas se você está num projeto Ruby usando Rack, o **Rack::Attack** já salva a sua vida:

```ruby
# config/initializers/rack_attack.rb

class Rack::Attack
  throttle("requests/by_ip", limit: 100, period: 15.minutes) do |req|
    req.ip
  end

  self.throttled_response = lambda do |_env|
    [429, { "Content-Type" => "text/plain" }, ["Muitas requisições. Tente novamente mais tarde."]]
  end
end
```

Isso aqui evita desde brute force até clientes mal comportados.

---

## Validação de Entrada: a causa número 1 de problemas (desde sempre)

Se existe um pecado capital em APIs, é confiar no input.

OWASP repete isso há mais de uma década e, mesmo assim, tem aplicação séria que não valida nem o tamanho dos campos.

As regras básicas:

* Validar tudo: tipo, formato, tamanho, range.
* Nunca concatenar SQL — use sempre consultas parametrizadas.
* Sanitizar saídas dependendo do contexto (HTML ≠ JSON ≠ logs).
* Rejeitar campos extras. Payloads devem ser sempre estritamente definidos.

Exemplo:

```ruby
User.where(email: params[:email]) # ActiveRecord já faz o escape pra você
```

Mas se você escrever:

```ruby
User.where("email = '#{params[:email]}'")
```

Você acabou de abrir um portal direto pro inferno.

---

## TLS e Transporte Seguro: nada menos que obrigatório

Hoje, API sem TLS 1.3 é igual fechar a porta da frente e deixar a janela aberta.
HTTPS não é opcional. Certificado expirado não é aceitável.

Ative HSTS. Renove certificados automaticamente. E monitore.

---

## Checklist final (pra ninguém dizer que esqueceu)

```text
[ ] HTTPS/TLS ativo e configurado
[ ] Autenticação sólida (OAuth2/OIDC)
[ ] JWT com expiração curta e assinatura forte
[ ] Refresh tokens rotativos
[ ] Rate limiting funcional
[ ] Validação de entrada obrigatória
[ ] Consultas SQL parametrizadas
[ ] Sanitização de respostas
[ ] CORS configurado
[ ] Segurança de cabeçalhos (CSP, HSTS, X-Frame-Options)
[ ] Logs e auditoria em tempo real
[ ] Dependências sempre atualizadas
```

---

## Conclusão

Segurança de API não é recurso extra, não é add-on, não é plugin.
É arquitetura.

E arquitetura ruim não se conserta colocando um JWT e um proxy na frente.
Ela nasce segura — ou nasce com problemas.

Seguir essas práticas não vai “blindar” sua aplicação, mas vai te colocar muito acima da média. E, honestamente, em 2025, isso já deveria ser padrão, não diferencial.
