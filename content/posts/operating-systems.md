---
title: "Como Sistemas Operacionais Realmente Funcionam e o Que Isso Diz Sobre Nós"
excerpt: "O que aprendi vendo um Kernel nascer: a computação não evolui, ela apenas acumula camadas."
image: "/blog/operating-systems.jpg"
category: "Arquitetura de Software"
author:
  name: "James"
  avatar: "/about-photo.jpg"
date: "12 de Dez de 2025"
readTime: "20 min de leitura"
featured: false
tags:
  - Performance
  - Backend
  - DevOps
  - Architecture
---

## Introdução

Dias atrás, eu estava na faculdade com um amigo meu que decidiu embarcar numa daquelas aventuras que fazem qualquer desenvolvedor oscilar entre a genialidade e a insanidade: **ele está escrevendo o próprio kernel**. Isso mesmo um kernel, do zero, pedindo pra máquina conversar com ele na linguagem mais primitiva possível.

Enquanto ele falava sobre filas de processos, estrutura da memória e gerenciamento de interrupções, eu só conseguia pensar em uma coisa:

> Meu Deus, eu preciso escrever sobre isso.

Então nasceu este post, dividido em duas partes.
A primeira fala sobre *como sistemas operacionais funcionam*, mas não com aquela explicação genérica de faculdade. Em vez disso, eu explico *por que um kernel existe do jeito que existe*, do ponto de vista de quem realmente já tentou criar um.

A segunda parte é um ensaio mais pessoal, quase filosófico, sobre como diferentes sistemas operacionais se relacionam com o hardware e com a nossa personalidade.

Vamos lá.

---

## Quando você liga o computador, acontece uma gambiarra histórica

No meio da explicação, meu amigo solta:

> A BIOS é o primeiro código que a CPU executa. Ela assume que a máquina é um processador dos anos 70, 16 bits, sem isolamento de memória.

Se você nunca estudou isso, parece uma pegadinha. Mas é isso mesmo.  
Todo computador, moderno não importa se é Windows, Linux, Mac, servidor ou notebook da Casas Bahia, começa sua vida achando que ainda vive na época do Intel 8086.

Isso significa:

- o processador entra no **Modo Real**,  
- só sabe trabalhar com **16 bits**,  
- acessa memória com limites ridículos,  
- e não existe proteção nenhuma.  

Se um ponteiro apontar pro lugar errado, ele lê. Ou escreve. Ou explode tudo.  
É literalmente o inferno dos bugs.

E é por isso que todo sistema operacional moderno, sem exceção, faz a mesma coreografia:

1. A CPU liga em Modo Real.  
2. O bootloader roda naquele endereço clássico: **0x7C00**.  
3. O bootloader imprime alguma mensagem na tela usando BIOS (ex: “Bootloader OK”).  
4. Ele limpa registradores, ajusta ponteiros, prepara tabelas.  
5. E então dá o pulo para o **Modo Protegido** (ou long mode, nos 64 bits).  

Esse salto, o famoso `jmp` do Assembly, é o momento em que o sistema deixa de fingir que vive em 1970.

Meu amigo descrevendo isso foi ótimo:

> Esse `jmp` faz a troca brusca pro Modo Protegido… é aqui que o sistema começa de verdade.

Enquanto isso, na sua cabeça, provavelmente ainda vive a ideia de que “computador liga → aparece o login → pronto”.  
Só que entre ligar e aparecer a tela, existe toda uma transição que parece mais ritual arcano do que tecnologia moderna.

---

## Por que existe um bootloader? Por que tudo começa em 0x7C00?

Aí vem a parte que quase ninguém conta.

A BIOS não sai por aí “procurando o Windows”. Ela só lê **o primeiro setor de 512 bytes do disco**.  
Se os últimos dois bytes forem **0xAA55**, ela pensa:

“Ok, esse disco é inicializável. Vou rodar isso.”

Por isso, no código do meu amigo, tem exatamente esses bytes no final. Não porque é bonito.  
Mas porque a BIOS só entende isso.  
É como se fosse a assinatura de um contrato de 1981 que ninguém teve coragem de atualizar.

E esse setor sempre é carregado em **0x7C00**, o endereço mais tradicional da história da computação pessoal.

Se você escrever um byte errado nesses 512 bytes, adeus sistema.  
Se colocar a assinatura errada, a BIOS te ignora.  
Se seu bootloader tiver 513 bytes… ele simplesmente não existe.

Montar um kernel não começa escrevendo “drivers”. Começa negociando com um fantasma de quarenta anos atrás.

---

## A transição do caos para a ordem

E aqui uma parte interessante da conversa:

> Esse `mov` aqui limpa os registradores. Esse `call print` é para exibir a mensagem. Esse `jmp` aqui é o que realmente faz tudo acontecer…

O código do bootloader não é “código bonito”.  
É mais ou menos:

- limpa lixo,  
- verifica se a CPU não está maluca,  
- imprime algo só pra você saber que está vivo,  
- e pula pro próximo estágio.  

É quase um “bom dia, sistema, vamos fingir que estamos organizados”.

Só depois que ele ativa o Modo Protegido é que o kernel real começa: paginamento, gerenciamento de memória, interrupções, drivers, multitarefa, tudo isso que você aprende *depois*.

O início é só sobrevivência.

---

## Uma curiosidade que sempre me intrigou: e se o mundo não tivesse escolhido o binário?

Lembra que eu falei que tudo começa em 16 bits, modo compatibilidade, essas coisas antigas?  
Isso tem raízes ainda mais profundas: a escolha do sistema binário como base da computação.

Alguns meses atrás vi um vídeo sobre computadores ternários. Sim, ternários. Onde, em vez de apenas 0 e 1, os dígitos seriam **-1, 0, 1**.  
E o mais louco: computadores ternários chegaram a existir.  
A URSS chegou a fabricar um, o **Setun**, nos anos 60.

Sabe por quê?

Porque, matematicamente, o ternário balanceado é mais eficiente que o binário em várias operações.  
É mais “entropicamente estável”, consome menos energia por operação e reduz o número de portas lógicas necessárias.

Se a indústria tivesse escolhido ternário em vez de binário, provavelmente:

- bootloaders seriam mais compactos,  
- endereçamento teria sido mais natural,  
- e muita coisa do design atual simplesmente não existiria.  

Mas não foi isso que aconteceu.  
Foi escolhido o binário porque era mais barato implementar fisicamente.

E aqui estamos, em 2025, ainda respeitando regras e limitações pensadas para transistores de 1970.

Mexe com kernel por cinco minutos e você percebe:  
o passado não morreu, ele só está disfarçado.

---

## O ponto que quero chegar

Hoje todo mundo fala de IA, nuvem, containers, microserviços, Kubernetes, Databricks…  
Mas quando você volta para o início do sistema, percebe que nada disso existe sem um ambiente extremamente rígido, arcaico e cheio de restrições.

A maneira como um sistema operacional funciona não é “o melhor design possível”.  
É o conjunto de todas as decisões históricas que **ninguém teve coragem de reescrever**.

O kernel do Linux?  
Ele ainda precisa respeitar que a CPU acorda achando que vive em 1978.

O Windows?  
Mesmo ritual. Só com mais etapas.

O Mac?  
Mesma dança, só com maquiagem diferente.

E meu amigo tentando escrever um kernel do zero me lembrou isso:

Não existe sistema operacional moderno que não passe por uma fase pré-histórica nos primeiros milissegundos de vida.

O coração da modernidade é, ironicamente, totalmente preso ao passado.

---

## Territórios, Ditaduras, Monarquias e Anarquias: Como Cada Sistema Operacional Domestica o Seu Hardware

Depois daquela conversa sobre kernels (onde meu amigo descrevia o código dele com o mesmo brilho no olhar de quem fala do primeiro filho), fiquei com uma pulga atrás da orelha. Eu percebi que *não era só sobre kernels*. Era sobre **como cada sistema operacional decide usar, ou controlar, o hardware**. Porque, no fim das contas, um SO é basicamente isso: *uma coleção de decisões políticas sobre o que você pode ou não fazer com a máquina que comprou*.

E foi aí que me dei conta de uma coisa óbvia:
**as escolhas que fazemos sobre sistemas operacionais dizem mais de nós do que gostaríamos de admitir.**

---

### Omarchy, Keyboard-First e o caminho do minimalismo não-minimalista

Eu uso **Omarchy**, a distro criada pelo DHH (o cara que inventou o Rails e já brigou com meio Twitter por esporte). E uso por dois motivos bem simples:

1. **Porque me ajuda muito no trabalho.**
   Eu abro a máquina e tudo funciona. Se eu quero configurar Ruby, Elixir, Go, Rails, Bun, Docker, ou sei lá mais o quê, Arch geralmente tem o pacote pronto e o Omarch simplifica ainda mais o processo. Um `pacman -S` resolve problemas que em outras distros exigiriam rituais de invocação.

2. **Porque eu gosto da filosofia Keyboard-First.**
   E pra quem nunca esbarrou nesse termo: filosofia *Keyboard-First* é basicamente a ideia de que **o teclado deve ser a principal interface entre você e o sistema**, não o mouse. Ou seja: menos cliques, mais comandos; menos distração, mais produtividade; menos janelas voando, mais foco.

   Parece bobeira, mas muda completamente a forma como você interage com o computador.
   É quase um estilo de vida: *a velocidade do seu pensamento não deve esperar o movimento de um ponteiro na tela.*

---

## **O Fedora Workstation do meu amigo (ou a busca secreta pelo MacBook espiritual)**

Meu amigo, por outro lado, usa **Fedora Workstation**, aquele que vem com o **GNOME** puro, polido, alinhado e cheio de jeitinho minimalista.

Ele jura que é porque o Fedora é “mais moderno”, “mais alinhado às tecnologias de ponta”, “mais avançado”, “mais corporativo”, “mais preparado para o futuro” — e toda semana inventa um adjetivo novo.

Mas eu tenho quase certeza, e digo isso com todo carinho do mundo:

**ele só quer deixar o PC dele o mais parecido possível com um MacBook.**

(GNOME é *perigosamente* bom nisso.)

E veja, eu não estou julgando.
Pelo contrário: faz total sentido.

O GNOME tem aquela vibe limpa, aquelas transições suaves, gestos de trackpad que te fazem pensar *“cara… este computador acabou de evoluir espiritualmente”*.
Minimalista, elegante, opinado: ele dá a sensação de que o sistema finalmente encontrou seu propósito na vida.

E honestamente?
Se eu quisesse transformar meu notebook num Mac filosófico de baixo orçamento, eu provavelmente faria a mesma coisa.

---

### A minha grande analogia (que talvez seja genial, ou talvez seja só uma piada que fui longe demais)

No meio dessa reflexão, fiz uma comparação que gostei tanto que decidi trazer pra cá.

#### Windows: a Ditadura Benevolente (ou nem tão benevolente assim)

No Windows, você vive sob um governo forte.
Ele decide o que é melhor pra você:

- "Essa atualização vai rodar AGORA."
- "Esse driver eu escolho por você."
- "Esse programa que você nunca pediu agora faz parte da sua vida."

É como viver numa ditadura que diz:
**“Confia. Eu sei o que é bom pra você.”**

E, de vez em quando, realmente sabe, afinal, é o sistema mais compatível do planeta.
Mas quando dá errado… bem… todo mundo já viu uma tela azul.

#### MacOS: a Monarquia Iluminada

Aqui, você vive numa monarquia.
Elegante. Estável. Bonita. Estruturada.
Você tem direitos… mas não muitos.

A Apple te dá um reino perfeito, desde que você aceite viver do jeito deles:

- Quer personalizar demais? Não pode.
- Quer fuçar onde não deve? Não pode.
- Quer usar hardware que não seja "abençoado"? Boa sorte.

Mas, convenhamos:
**é tudo tão confortável que você até esquece que vive sob um rei.**

#### Linux: uma grande anarquia funcional

E aí chegamos ao Linux:
**uma terra sem dono, sem reis, sem ditadores, onde cada cidadão pode construir a sua própria casa e escrever a própria constituição.**

Quer compilar seu próprio kernel?
Vai fundo.

Quer usar um desktop minimalista que parece um terminal com autoestima?
Tem.

Quer uma distro que parece uma nave espacial?
Também tem.

O lado bom da anarquia: **liberdade total.**

O lado ruim da anarquia: **liberdade total.**

Sim: com grandes poderes vêm grandes chances de quebrar o sistema às 2 da manhã porque decidiu trocar o gerenciador de janelas “só pra ver como ficava”.

---

### E o hardware nisso tudo?

Cada sistema operacional extrai algo diferente do mesmo hardware.

- **Windows** usa tudo para tentar equilibrar compatibilidade e desempenho.
  Ele tenta ser bom o suficiente para todos, o que significa ser perfeito para quase ninguém, mas funcional para milhões.

- **MacOS** usa o hardware como uma orquestra.
  É tudo ensaiado, calibrado, projetado para funcionar em harmonia.
  É lindo, e caro, como toda monarquia bem administrada.

- **Linux** deixa você pilotar a sua própria nave.
  Você escolhe o motor, o painel, os protocolos, o combustível e a cor das luzes internas.
  E se explodir, olha… talvez a culpa seja sua mesmo.

---

### No fim das contas…

Cada sistema operacional é uma ideologia.
Um estilo de vida.
Uma interpretação do que significa usar um computador.

Eu escolho o Omarchy por causa da velocidade, simplicidade e filosofia.
Meu amigo escolhe o Fedora por causa da modernidade e do Plasma estiloso.
Outros escolhem Windows porque o trabalho exige.
Outros escolhem MacOS porque querem estabilidade e sofisticação.

No fim, todo mundo está procurando a mesma coisa:

**um lugar onde o computador pareça mais aliado do que obstáculo.**

Mas cada caminho leva por um território político diferente,
de ditaduras a monarquias, de anarquias a pequenas aldeias pacíficas de entusiastas.

E está tudo bem.

por favor microsoft e apple não me processem é so resenha.
