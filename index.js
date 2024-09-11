const { select } = require('@inquirer/prompts')
// avisando acima que está função acima irá me devolver um objeto e eu quero apenas o select
//importando os módulos, assim, seguindo esse caminho:
//vai na pasata node_modules e vai procurar um @ enquire/prompts e dentro dela  extrai o código select 

//função assíncrona e Promises
const start = async () => {
    while (true) {
        // usando um promisse, com await e sempre que for usar o await a função deve ser assincrona, assim neste prompt esperamos o usuario selecionar, para que não passe diretamente para a proxima linha, assim sendo o while e executando todos os casos de uma vez 

       const opcao = await select({

        //Aqui depois de passar pelo await,ou seja, a selação do usuario e assim segue demostrando uma message e mostrar as escolhas no node.js, quando o usuario escolher uma delas, o que for escolhido vai entar na opção do switch case e executar o código dado da opção escolhida
            message: "Menu >",
            choices: [
                {
                    //name é o que aparece para o usuario
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
       })

       switch(opcao){

        case "cadastrar":
            console.log("vamos cadastrar")
            break

        case "listar":
            console.log("vamos listar")
            break

        case "sair":
            console.log("até a proxima")
            //o return signiifca que vai parar a função
            return
       }
    }
}

start()