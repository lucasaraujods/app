const { select,input, checkbox} = require('@inquirer/prompts')
// avisando acima que está função acima irá me devolver um objeto e eu quero apenas o select
//importando os módulos, assim, seguindo esse caminho:
//vai na pasata node_modules e vai procurar um @ enquire/prompts e dentro dela  extrai o código select e tbm do input tbm
let meta = {

    value: "tomar 3L",
    checked: false,
}

let metas= [meta]

const cadastarMeta = async () => {

    const meta = await input({message: "Digite a meta"})
    
    // se o tamanho for igual a zero, ou seja, o número de caracteres, então não há nada digitado
    if(meta.length == 0){
        console.log("A meta não pode ser vazia")
        return 
    }

    metas.push(
        {value: meta, checked: false}
    )
}

const listarMetas = async() => {

    const respostas = await checkbox({

        message: "use as setas para mudar de metas, o espaço para marcar ou desmacar e o enter para finalizar esta etapa",

        //os pontos significam que todos o itens estão la dentro do array, assim tudo o que tem dentro de metas, é como se fosse a cópia
        choices: [...metas],
        instructions: false, 
    })

    metas.forEach((m) => {

        m.checked = false
    })


    if(respostas.length == 0){
        console.log("nenhuma meta selecionada")
        return
    }

    respostas.forEach((resposta) => {

        const meta = metas.find((m) => {

            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Metas(s) marcadas como concluidas ")
}

const metasRealizadas = async () => {

    //usando uma função de array filter, ou seja, HOF, assim sempre que esta função for verdedadeira, ele vai pegar o parametro da meta dentro da função e colocar em uma nova lista
    const realizadas = metas.filter((meta) => {
        // retorna verdadeiro o checked e assim ela vai pra lista de metas realizadas
        return meta.checked
    })

    //verificar se as metas realizadas
    if(realizadas.length == 0){
        console.log("Não exitem metas realizadas")
        return
    }

    await select({

        message: "Metas Realizadas",
        //usando o spread operator: ... dessa forma ele faz um novo array e o antigo está sendo jgado dentro deste novo array
        choices: [...realizadas]
    })
}


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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
       })

       switch(opcao){

        case "cadastrar":
            await cadastarMeta()
            console.log(metas)
            break;
        case "listar":
            await listarMetas()
            console.log("vamos listar")
            break;
        case "realizadas":
            await metasRealizadas()
            break;
        case "sair":
            console.log("até a proxima")
            //o return signiifca que vai parar a função
            return
       }
    }
}

start()