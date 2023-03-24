# ecomm

Projeto de Ecommerce criando durante o programa LevelUp da Alura.

# The Twelve-Factor of an App

Através das seguintes marcações, procurei discutir e identificar quais dos 12 fatores respeitei durante a execução deste projeto.

## I - Codebase

Durante a execução de todo este projeto foi utilizado o Git para gerenciar o histórico de alterações do código-fonte, parte essencial do primeiro fator. 


## II - Dependencies

O segundo fator também foi atendido, uma vez que foi utilizado o npm (Node Package Manager) para o gerenciamento das depêndencias do projeto. O npm permite que todas as depêndencias do projeto e suas respectivas versões sejam explicitamente listadas em um arquivo chamado 'package.json' que é utilizado também para referência na hora da instalação de depêndencias pelo próprio npm, que por sua vez as instala localmente em um diretório isolado, independente do sistema operacional, respeitando assim todos os requisitos descritos neste fator. 


## III - Config

Acredito que este fator foi parcialmente atendido, visto que foram sim utilizadas variáveis de ambiente para algumas funcionalidades da aplicação, porém não todas. De qualquer forma, a aplicação se encontra funcionando em qualquer ambiente visto que foi contruída inteiramente utilizando-se de containers Docker.

## IV - Backing services

Esta aplicação não armazena informações em arquivos locais. Todas os dados são salvos em bancos de dados específicos que se encontram rodando em containers Docker individuais. Assim, esta aplicação respeita este fator.


## V - Build, release, run

Como a aplicação se encontra dockerizada, o docker acaba por garantir que este fator seja aplicado.


## VI - Processes

Este fator diz que os processos da aplicação devem ser "stateless" e portando, foi um fator atendido durante a execução do projeto, visto que para os casos em que era necessário a persistência de informações, foram utilizados serviços externos de apoio.

## VII - Port Binding

Este projeto respeita o sétimo fator, visto que sua aplicação é independente e auto contida. Todas as portas necessárias para o funcionamento estão explicitamente expostas para que ocorra a comunicação entre os containers na rede.

## VIII - Concurrency

Por não ser um projeto monolítico, acredito que este fator esteja sendo respeitado uma vez que existe a possibilidade de escalonamento horizontal.

## IX - Disposability

Outro fator que é respeitado graças ao uso de componentes conteinarizados pelo uso do Docker. Desta maneira, a aplicação pode ser executada e parada a qualquer momento.

## X - Dev/prod parity

A implementação desta aplicação já pensando na utilização do docker acabou por atender este requisito uma vez que tudo é orquestrado pelo Docker, sendo o mais semelhante possível.

## XI - Logs

Todos os logs da aplicação são direcionados para o console, seja aquele que roda no terminal quando local, ou dentro de containers quando utilizado o Docker. 

## XII - Admin processes

Entendo que este fator não foi respeitado pois não foram utilizados gerenciadores de processos para garantir que o aplicativo esteja sempre disponível e funcionando corretamente.


# Microservices

## Serviços de domínio

Padrão utilizado uma vez que nossa aplicação está divida em pequenos contextos específicos e foi modelada levando-os em consideração ( products, accounts, etc...) levando em consideração o padrão REST.

## Serviços de negócio

Foi utilizado no projeto. Contempla operaçoes mais complexas e podem encapsular domínios que se relacionam. Um exemplo claro disso foi a implementação da confirmação de um pagamento, que envolvia mais de um serviço.

## API Gateway

Não foi implementado no projeto uma api de gateway. Caso o projeto se torna-se maior, acredito que seria necessária esta aplicação para melhor organização e manutenção do código.

## Agregador de processos

Como citado no tópico de serviços de negócio, houveram oprações mais complexas onde foi necessário chamar mais de um serviço ao mesmo tempo durante um processo.

## Edge pattern

Não foi utilizado neste projeto. Caso muitas chamadas fossem distintas entre uma role de admin e uma de user, acredito que seria necessária a utilização deste tipo de padrão.

## Bancos diferentes

Neste projeto foram utilizados bancos especificos para cada contexto da aplicação.

## Eventos assíncronos

Foram utilizados nesse projeto eventos síncronos e assíncronos, como por exemplo algumas consultas nos bancos ou em outros serviços.

## Agregação de logs e métricas

Não foram aplicados neste projeto.

## Padronização das stacks de serviço

Em todos os serviços utilizados neste projeto, foram utilizados Node e express, o que se configura como uma padronização de stacks.

## Solução para service discovery

Como utilizamos docker, ele ficou responsável por nomear todos os serviços, permitindo a comunicação entre eles.

## Aspectos de segurança

Alguns aspectos de segurança foram implementados nesse projeto, como por exemplo o uso de criptografia de senhas (segurança em repouso) e autenticação e autorização atráves de tokens JWT (segurança da aplicação).

## Tecnologias a adotar para deploy e build

Não foi adotado neste projeto. O ideal seria a utilização de, por exemplo, as github actions para automatização e implementação de CI/CD.

## Lidar com tolerância a falhas em aplicações síncronas

Soluções como circuit break não foram implementadas. É importante que essa solução seja utilizada quando falamos em microserviços, uma vez que ela impede que as falhas de operações síncronas se propagem pela aplicação, o que permite que elas sejam tratadas de forma mais eficiente.

## Quando usar comunicação assíncrona

Quando a resposta não precisa ser obtida imediatamente a comunicação assíncrona acaba sendo ideal. Dessa maneira, o processamento pode acontecer no background sem interromper o fluxo da aplicação.
