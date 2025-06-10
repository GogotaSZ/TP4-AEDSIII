# Visualizador de Tabela Hash Extensível

Este projeto implementa uma visualização interativa de uma Tabela Hash Extensível, uma estrutura de dados dinâmica que se adapta automaticamente para acomodar um número crescente de elementos.

## Sobre o Projeto

A Tabela Hash Extensível é uma estrutura de dados avançada que:
- Permite inserção e busca eficientes (tempo médio O(1))
- Redimensiona dinamicamente quando necessário
- Utiliza um diretório de ponteiros para baldes (buckets)
- Diferencia entre profundidade global (diretório) e local (baldes)

## Funcionalidades

- **Inserção de valores**: Adiciona elementos à tabela, realizando split de baldes quando necessário
- **Busca de valores**: Localiza elementos na estrutura
- **Visualização em tempo real**: Exibe o estado atual do diretório e dos baldes
- **Log de operações**: Registra todas as ações realizadas na estrutura

## Como Utilizar

1. Abra o arquivo `index.html` em um navegador web
2. Digite um valor numérico no campo de entrada
3. Clique em "Inserir" para adicionar o valor à tabela
4. Clique em "Buscar" para verificar se um valor existe na tabela
5. Observe as mudanças na estrutura e o log de operações

## Implementação

A implementação baseia-se nos seguintes componentes:

- **Diretório**: Array de ponteiros para baldes, indexado pelos bits mais significativos do hash
- **Baldes (Buckets)**: Estruturas que armazenam os valores e possuem uma profundidade local
- **Profundidade Global**: Determina o número de bits utilizados para indexação no diretório
- **Profundidade Local**: Indica quantos bits são relevantes para um balde específico

### Operações Principais

- **Inserção com Split**: Quando um balde fica cheio, ele é dividido e os valores são redistribuídos
- **Expansão do Diretório**: Quando a profundidade local de um balde excede a profundidade global

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript 

## Projeto Acadêmico

Este visualizador foi desenvolvido como parte do Trabalho Prático 4 da disciplina de Algoritmos e Estruturas de Dados III (AEDSIII).