# Landing pages — Gabriel Saturnino

Cinco marcas fictícias, cinco direções visuais e uma vitrine central. Coleção de portfólio desenvolvida com HTML, CSS e JavaScript, sem build e sem dependências externas.

## Projetos

| Rota | Marca | Segmento | Interações |
|---|---|---|---|
| `/forma/` | Forma | Arquitetura | Filtro de projetos, detalhes em modal, formulário demonstrativo |
| `/aurora/` | Aurora | Cosméticos | Descoberta de produtos, quiz de ritual |
| `/serra/` | Serra | Hospedagem | Seleção de cabanas, simulador de noites e tarifas |
| `/fluxo/` | Fluxo | SaaS | Quadro de tarefas, alternância de preços mensais/anuais |
| `/brasa/` | Brasa | Gastronomia | Filtro de menu, carrinho com quantidades e total |

## Executar

Qualquer servidor estático na raiz do repositório. Exemplo: `python3 -m http.server 8000`.

## GitHub Pages

Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`. Os caminhos relativos funcionam sob um subdiretório de repositório.

## Conteúdo demonstrativo

Todas as marcas, projetos, produtos, preços, características e metragens são fictícios. Não representam clientes, obras executadas, reservas ou vendas reais. Não há depoimentos ou métricas de resultados inventados. Os formulários não enviam nem persistem dados; o carrinho e o quadro existem somente na memória da página. Não há analytics, cookies, APIs, pagamentos, backend ou banco de dados.

As ilustrações SVG são autorais e estão no próprio repositório. As variantes de pizzas e cabanas reutilizam ilustrações conceituais, não fotografias dos itens específicos. Fontes do sistema: Arial, Helvetica e Georgia.

## Qualidade

- Layouts responsivos e menu mobile.
- Links de pulo de conteúdo, foco visível, labels, controles com nomes acessíveis e regiões `aria-live`.
- Modais nativos com tecla Escape e navegação por teclado.
- Preferência por movimento reduzido respeitada.
- Preços anuais com total e equivalente mensal explícitos.
- Datas de estadia validadas e cálculo independente de horário de verão.
- Verificação estática: `python3 check.py`.

## Personalizar

Cada página possui `index.html`, `style.css` e `app.js`. Estilos e comportamentos comuns ficam em `assets/base.css` e `assets/base.js`. `build.py` é o gerador-fonte da coleção: ao editar arquivos gerados, atualize também o gerador para manter a reprodução consistente.

## Uso no portfólio

Apresente como **projetos conceituais/demonstrativos**, nunca como trabalhos entregues a clientes. Remova a condição de demo apenas quando os conteúdos reais e integrações estiverem implementados e validados.
