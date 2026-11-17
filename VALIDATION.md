# Verificação de entrega

Data: 17/11/2026.

## Verificações estáticas

`python3 check.py` passou para a vitrine, cinco páginas e página 404: existência de arquivos e links relativos, âncoras, IDs únicos, idioma pt-BR, imagens com texto alternativo e sintaxe dos scripts JavaScript.

## Verificações no Chrome, sobre o GitHub Pages publicado

- Vitrine: imagens principais carregadas e sem excesso de largura no desktop.
- Forma: filtro de interiores mostrou apenas Refúgio urbano; modal abriu com conteúdo correto; menu mobile abriu e o link Projetos respondeu.
- Aurora: quiz noturno mudou para Sua pausa à noite; modal de produto abriu com o preço e aviso conceitual.
- Serra: 10 a 13/12/2026, 4 hóspedes → 3 noites em Neblina, R$ 1.560,00.
- Fluxo: tarefas avançaram para Em andamento no desktop e no mobile; plano anual mostrou R$ 23,20/mês (R$ 278,40/ano) e R$ 39,20/mês (R$ 470,40/ano).
- Brasa: Margherita + Pepperoni → R$ 108,00; finalização exibiu aviso de demonstração sem envio.
- Vitrine, Forma, Aurora, Serra e Fluxo: largura do conteúdo não excedeu a viewport móvel observada (375 CSS px).
- Brasa: encontrado e corrigido transbordamento da ilustração rotacionada, com recorte no contêiner.

## Limites

Não foi realizada auditoria WCAG completa, medição de Core Web Vitals ou matriz de dispositivos/navegadores. As páginas possuem estrutura semântica, controles com labels, foco visível, modais nativos e respeito a movimento reduzido. Não há backend nem envio real de formulários/pedidos.

## Segunda edição — identidades e jornadas distintas

- Forma: navegação da capa mudou de Casa Horizonte para Refúgio urbano; menu mobile abriu.
- Aurora: fluxo de três preferências chegou ao resultado, reinício retornou a 01/03 e painel lateral do produto abriu no mobile.
- Serra: guia noturno exibiu seu conteúdo; Horizonte por três noites calculou R$ 1.770,00 para duas pessoas.
- Fluxo: modo Lista manteve as ações das tarefas; ao concluir a segunda tarefa, Resumo atualizou de 25% para 50%.
- Brasa: barra permanente sincronizou quantidade 2 e total R$ 108,00; abriu o pedido correto.
- Todas as cinco páginas: conteúdo sem excesso de largura na viewport móvel observada de 375 CSS px.
- Inspeção visual no Chrome das cinco aberturas no desktop e do cardápio mobile.
- Ajustado fechamento de contêiner na seção de experiências da Serra após verificação de aninhamento HTML.
