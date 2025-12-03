---
title: "Boas Práticas de Segurança para APIs em 2024"
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

## Introdução

A segurança de APIs desempenha papel essencial em arquiteturas modernas. À medida que sistemas dependem cada vez mais de serviços distribuídos, proteger interfaces de comunicação torna-se um requisito crítico para garantir confidencialidade, integridade e disponibilidade dos dados. Padrões como OAuth2, OpenID Connect, JWT, TLS 1.3 e técnicas de mitigação de abuso são amplamente discutidos em pesquisas e documentações consagradas, como as diretrizes do OWASP API Security Project (2023) e da Cloud Security Alliance.

## Autenticação vs Autorização

| Conceito | Pergunta Fundamental | Exemplo |
|----------|----------------------|---------|
| **Autenticação** | Quem é você? | Login com nome de usuário e senha |
| **Autorização** | O que você pode fazer? | Permissão para acessar um recurso restrito |

A autenticação confirma a identidade de um agente; a autorização determina o conjunto de ações permitidas. São processos complementares, mas distintos, e devem ser aplicados de maneira independente.

## OAuth2 e OpenID Connect

OAuth2 consolidou-se como o padrão de mercado para delegação de acesso, enquanto o OpenID Connect adiciona uma camada de identidade estruturada. Ambos são amplamente documentados pelo IETF (RFC 6749, RFC 8252 e OpenID Foundation).

Fluxos recomendados:

- **Authorization Code**: aplicações web tradicionais com backend seguro  
- **PKCE (Proof Key for Code Exchange)**: aplicações móveis e SPAs  
- **Client Credentials**: comunicação entre serviços (machine-to-machine)  
- **Uso de escopos**: restringir privilégios de cada token emitido  

## Exemplo em Ruby: geração básica de JWT

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

## Boas Práticas para JWT

- Utilizar período curto de expiração (15–30 minutos)
- Implementar rotação de refresh tokens
- Validar todas as claims, incluindo `exp`, `iss` e `aud`
- Preferir assinaturas assimétricas (RS256)
- Evitar armazenamento inseguro em navegadores (por exemplo, `localStorage`)
- Revogar tokens comprometidos ou suspeitos
- Aplicar TLS obrigatoriamente no transporte

Essas diretrizes estão alinhadas com OWASP API Security Top 10 (2023) e NIST Recommendations for Token-Based Authentication.

## Limitação de Taxa (Rate Limiting)

A limitação de taxa é fundamental para mitigar ataques de força bruta, scraping e tentativas de negação de serviço. Implementações robustas podem ser realizadas com Redis, gateways de API e middlewares especializados.

### Exemplo em Ruby usando Rack::Attack

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

## Validação de Entrada

A ausência de validação adequada é uma das causas mais comuns de vulnerabilidades, conforme relatado por OWASP. É imprescindível validar *todos* os dados recebidos pela API.

Recomendações essenciais:

- Validar dados conforme tipo, formato e tamanho
- Utilizar consultas SQL parametrizadas
- Sanitizar saídas de acordo com o contexto (HTML, JSON, logs)
- Rejeitar entradas inesperadas, como campos adicionais não permitidos

### Exemplo em Ruby (consulta segura)

```ruby
User.where(email: params[:email]) # ActiveRecord aplica parametrização
```

Nunca interpolar entrada do usuário diretamente em consultas SQL.

## Transporte Seguro (HTTPS / TLS)

Toda comunicação deve ocorrer via TLS 1.2+ (idealmente 1.3). Isso protege a API contra interceptação, adulteração de tráfego e outras ameaças de rede. Certificados devem ser gerenciados com boas práticas de renovação automática e uso de HSTS (HTTP Strict Transport Security).

## Checklist de Segurança

```text
[ ] HTTPS (TLS) configurado
[ ] Autenticação robusta (OAuth2/OIDC)
[ ] Tokens JWT com expiração curta e assinaturas fortes
[ ] Rate limiting e detecção de abuso
[ ] Validação completa de entradas
[ ] Consultas SQL totalmente parametrizadas
[ ] Sanitização de saídas
[ ] CORS configurado adequadamente
[ ] Segurança de cabeçalhos (CSP, HSTS, X-Frame-Options)
[ ] Logs e auditoria ativos
[ ] Monitoramento de anomalias em tempo real
[ ] Dependências atualizadas
```

## Conclusão

A construção de APIs seguras exige planejamento, implementação cuidadosa e observância de padrões amplamente aceitos pela comunidade técnica. A adoção consistente das práticas aqui descritas, aliada ao monitoramento contínuo, reduz significativamente a superfície de ataque e contribui para a resiliência do sistema. Segurança não é um complemento, mas um elemento estrutural de qualquer arquitetura moderna.
