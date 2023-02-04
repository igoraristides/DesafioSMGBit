# Desafio SMGBit
### Documentação:

Este documento tem como objetivo disponibilizar um passo a passo de como baixar e executar a aplicação, assim como algumas obersevações. 


### Tecnologias

Foram utilizadas para o desenvolvimento desse pequeno projeto, as tecnologias a seguir:
- SQL SERVER (Banco de dados);
- C#/ .NET 6 (Back-End);
- TypeScript com FluentUI(Front-End);
- Node.
### IDE's utilizadas:
- Visual Studio Code para front-end;
- Visual Studio Community para o back-end
OBS: Vale ressaltar que há a necessidade deter dessas IDE para não ter problemas com a execução do projeto. Além desta que já citei, há necessidade de acesso instancia de banco sql server, dado isso, recomenda-se o download do MSSQL.

### Passo a passo (clonagem a execução)

- Primeiramente clona-se o projeto localizado nesta url;
- Após a clonagem, deve-se instalar as dependências do fron-end, para isso navegue até (...caminho da clonagem) + DesafioSMGBit\smgbit-front e execute  o comando npm i.
- Em seguida, navegue até a pasta (...caminho da clonagem) + DesafioSMGBit\SMGBIT_API\WebApi\appsettings.json e altere os dados de conexão do banco para o seu banco, ou a intancia desejada.
- Como orientado, recomenda-se a instalação do MSSQL, para que seja possível a importação do arquivo localizado [aqui](https://1drv.ms/u/s!Ak09YU0NDHQthLsmAnq7TN7uszGHpg?e=Kaaw7U). Este arquivodetém como objetivo facilitar, contendo a base já criada e os dois arquivos já persistidos no banco. Mas caso queira executar em uma base vazia localizada na sua instancia, só há a necessidade de atualizar o banco no appsettings.json como já comentado e executar esse comando no Console do gerenciador de pacotes dentro do projeto de infraestrutura (pode ser encontrado no visual studio em Ferramentas-> Gerenciador de pacotes Nuget->Console do gerenciador de pacotes): Update-Database -Context Contexto;
- Caso esteja tudo configurado o back-end e front-end estarão aptos para execução.
- Primeiramente execute na pasta do front-end o comando npm-start;
- Após isso execute na pasta do projeto WebApi do backend : dotnet run, ou é possível executar via IDE Visual Studio Community;
- Assim finalizando esse passo a passo.


### Algumas observações:
- Foi criado no banco a tabela de viagens e frete, entretanto esta tabela de frete guarda o frete de cada uma das viagens, se conectando via Id, ou seja, para cada viagem, existe um linha na tabela frete, detendo todas as informações da tabela frete passada, entretanto vinculada aquela viagem.
- Foi criado um filtro na hora de salvar o processamento no banco para que não houvesse como dar upload em arquivos iguais, entretanto verifiquei que duas propriedades possuiam no arquivo a função de geração de dado randomico chamada RANDBETWEEN, assim como toda ves que é lido o arquivo existem dados diferentes, considerei que cada upload fossem novos dados, assim persistindo-os no banco.
- Tanto o back-end quanto fron-end foram escritos em português dado que o modelo de retorno solicitado se encontrava em português, assim mantendo um certo padrão.
- Qualquer dúvida referente a processo de clonagem e execução, por favor entre em contato.
