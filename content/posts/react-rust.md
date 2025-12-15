---
title: "React, Rust e o Futuro da Programação"
excerpt: "Uma reflexão honesta sobre segurança, performance e por que estamos repensando React enquanto Rust ganha espaço no futuro da engenharia de software."
image: "/blog/react-rust.webp"
category: "Mercado e Tecnologia"
author:
  name: "James"
  avatar: "/about-photo.jpg"
date: "14 Dez 2025"
readTime: "9 min read"
featured: false
tags:
  - Segurança
  - API
  - JavaScript Runtime
  - Performance
---

Outro dia, acompanhando notícias de tecnologia, me deparei com algo que deveria ter causado um choque de realidade em muita gente da comunidade JavaScript. Uma falha crítica foi descoberta no React. Não foi um bug qualquer, foi daquelas vulnerabilidades que viram manchete, recebem CVE próprio e começam a ser exploradas em produção antes mesmo de todo mundo conseguir atualizar.

A falha ficou conhecida como React2Shell, catalogada como CVE-2025-55182. Em termos simples, um problema nos React Server Components que permite execução remota de código sem autenticação, apenas com uma requisição HTTP maliciosa. Isso significa que aplicações modernas, rodando React no backend via Next.js ou arquiteturas similares, podiam dar controle total do servidor a um invasor porque o runtime confiou em dados vindos da rede.

Antes que alguém diga “é só atualizar”, vale respirar fundo. O ponto não é o patch em si. O ponto é perceber como uma biblioteca de interface, que começou resolvendo problemas de renderização de UI, hoje é capaz de comprometer infraestrutura inteira. Isso diz muito sobre o caminho que seguimos como indústria.

---

## Como o React chegou até aqui

React nasceu como uma ideia simples e poderosa. Interfaces declarativas, baseadas em componentes, com estado previsível. Foi revolucionário. Influenciou tudo. Vue, Svelte, Solid, até frameworks que juram não ser React no fundo carregam DNA dele.

O problema é que o sucesso trouxe um ecossistema que cresceu para todos os lados ao mesmo tempo. Hoje não existe “React”. Existe React com Next.js, React com Server Components, SSR, SSG, ISR, App Router, bundlers experimentais, plugins que se acoplam ao runtime, soluções híbridas de frontend e backend que borram completamente a fronteira entre UI e servidor.

A comunidade se fragmentou. Cada abordagem tenta resolver um problema real, mas o conjunto virou um sistema extremamente complexo, interdependente e difícil de auditar. Quando uma falha aparece em um ponto central, o impacto não é local. Ele é sistêmico.

E foi exatamente isso que aconteceu.

---

## A pergunta que ficou na minha cabeça

Quando li sobre essa vulnerabilidade, minha reação não foi “React é ruim” ou “JavaScript acabou”. Foi uma pergunta muito mais incômoda.

Quem está realmente no controle da execução do meu código?

Quem decide o que roda no servidor, quando roda, como roda e com que garantias?

Essa pergunta me levou a rever algumas decisões técnicas, especialmente em projetos privados e de médio prazo. Foi aí que comecei a mover parte deles para o ecossistema Rust, com foco especial em interfaces nativas usando iced.rs.

---

## Por que Rust começou a fazer mais sentido

Rust não é uma linguagem nova surgindo do nada. Ele vem sendo desenvolvido desde a década passada, mas só agora atingiu maturidade suficiente para ser adotado em larga escala fora do mundo de sistemas embarcados.

O que diferencia Rust não é marketing. É filosofia aplicada no compilador.

Rust elimina classes inteiras de bugs antes do código rodar. Erros de memória, uso após free, data races, concorrência mal resolvida. Tudo isso vira erro de compilação. Não é elegante no começo. É até frustrante. Mas depois você percebe que está escrevendo código que não te trai em produção.

Além disso, Rust não depende de garbage collector. A performance é previsível. A latência é estável. Isso importa muito mais do que benchmarks bonitos quando você começa a falar de sistemas reais.

---

## Iced.rs e o retorno ao controle

O iced.rs entrou nessa história quase como consequência natural. Eu não estava procurando “o React do Rust”. Estava procurando uma forma de construir interfaces que não dependessem de um runtime gigante, de uma cadeia infinita de dependências ou de abstrações que escondem demais o que está acontecendo.

Iced é reativo, mas de forma explícita. Tipos fortes, fluxo de eventos claro, menos magia. Você escreve menos código, mas entende mais do que está acontecendo.

O mais importante é que a interface é nativa. Não tem DOM. Não tem browser. Não tem camada extra só para exibir pixels na tela. O custo computacional é real, mensurável e previsível.

Essa previsibilidade muda completamente a forma como você pensa software.

---

## HPC e por que isso importa agora

Outro fator que pesou muito nessa transição foi o crescimento do mercado de HPC, High Performance Computing. E aqui é importante esclarecer uma coisa.

HPC não é subir um cluster na nuvem e rodar código lento em várias máquinas. HPC é pensar em paralelismo real, uso eficiente de cache, controle de memória, latência mínima, throughput máximo. É código que conversa diretamente com o hardware.

JavaScript nunca foi feito para isso. Nem o runtime, nem o modelo de execução, nem o ecossistema. Dá para fazer algumas coisas? Dá. Mas sempre lutando contra a ferramenta.

Rust, por outro lado, está se tornando presença constante em ambientes que antes eram exclusivos de C, C++ e Fortran. Isso não acontece por acaso. A linguagem entrega segurança sem sacrificar performance.

Para quem quer entrar nesse mercado ou pelo menos se aproximar dele, Rust deixa de ser curiosidade e passa a ser estratégia.

---

## E onde Ruby entra nessa história

Minha linguagem principal para projetos pessoais e MVPs ainda é Ruby. E isso não é contradição nenhuma.

Ruby me permite construir rápido. Validar ideias. Criar produtos funcionais sem sofrimento. Para esse tipo de problema, Ruby continua sendo excelente.

Mas quando projetos crescem, quando performance começa a importar, quando latência vira problema real e custo de infraestrutura começa a doer, Ruby mostra seus limites. Assim como qualquer linguagem interpretada com garbage collector.

Isso não invalida Ruby. Só coloca cada ferramenta no lugar certo.

Nos últimos tempos, tenho migrado projetos de clientes para linguagens mais rápidas exatamente com esse objetivo. Me aproximar do mercado de sistemas de alto desempenho, sem abrir mão da produtividade onde ela faz sentido.

---

## React não acabou, mas não pode ser resposta para tudo

É importante dizer isso claramente. React não acabou. Não vai acabar tão cedo. Ele continua sendo uma ferramenta extremamente relevante para interfaces web.

O problema não é React existir. O problema é a ideia de que ele serve para tudo.

Quando uma biblioteca de UI passa a ter impacto direto na segurança do servidor, algo saiu do eixo. Isso é sinal de que o ecossistema cresceu além do que consegue controlar com segurança.

Reduzir o uso não significa abandonar. Significa usar com critério.

---

## O futuro da engenharia de software

Três movimentos estão cada vez mais claros.

Segurança deixou de ser detalhe e virou requisito de base. Linguagens que eliminam problemas em tempo de compilação ganham espaço.

Performance real voltou a importar. Com IA, dados massivos e serviços globais, abstrações caras começam a cobrar seu preço.

E talvez o mais importante. Desenvolvedores querem voltar a entender o que está acontecendo por baixo do código.

Rust está exatamente no centro disso tudo.

Iced.rs é só uma peça desse quebra-cabeça. Mas aponta para um futuro onde produtividade e controle não são opostos.

---

## Conclusão

React vai continuar existindo. Ruby também. Cada um no seu espaço.

Mas o futuro da engenharia, especialmente para quem quer trabalhar com sistemas críticos, HPC, infraestrutura e aplicações de alta performance, está cada vez mais próximo de linguagens que oferecem controle real sobre execução, memória e hardware.

Rust não é hype. É consequência.

E quanto mais cedo a gente entender isso, menos refém ficamos de ferramentas que prometem facilidade, mas cobram caro quando algo dá errado.

No fim das contas, quem controla a execução, controla o futuro do software.
