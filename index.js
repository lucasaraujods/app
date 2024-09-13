const { select,input, checkbox} = require('@inquirer/prompts')
// avisando acima que está função acima irá me devolver um objeto e eu quero apenas o select
//importando os módulos, assim, seguindo esse caminho:
//vai na pasata node_modules e vai procurar um @ enquire/prompts e dentro dela  extrai o código select e tbm do input tbm

let mensagem ="em vindo ao app de metas"

let meta = {

    value: "tomar 3L",
    checked: false,
}

let metas= [meta]

const cadastarMeta = async () => {

    const meta = await input({message: "Digite a meta"})
    
    // se o tamanho for igual a zero, ou seja, o número de caracteres, então não há nada digitado
    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia"
        return 
    }

    metas.push(
        {value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"
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
        mensagem = "nenhuma meta selecionada"
        return
    }

    respostas.forEach((resposta) => {

        const meta = metas.find((m) => {

            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Metas(s) marcada(s) como concluidas"
}

const metasRealizadas = async () => {

    //usando uma função de array filter, ou seja, HOF, assim sempre que esta função for verdedadeira, ele vai pegar o parametro da meta dentro da função e colocar em uma nova lista
    const realizadas = metas.filter((meta) => {
        // retorna verdadeiro o checked e assim ela vai pra lista de metas realizadas
        return meta.checked
    })

    //verificar se as metas realizadas
    if(realizadas.length == 0){
        mensagem = "Não existem metas realizadas"
        return
    }

    await select({

        message: "Metas Realizadas: " + realizadas.length,
        //usando o spread operator: ... dessa forma ele faz um novo array e o antigo está sendo jgado dentro deste novo array
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {

    const abertas = metas.filter((meta) => {

        //se for falso, ira retornar a cfunção metasAbertas verdadeiro
        return meta.checked != true
    })

    if(abertas.length == 0){

        mensagem = "Não existem metas abertas!"
        return
    }

    await select({

        //colocando o abertas. lenght para mostar o tamnho, ou seja, o total de metas abertas
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    // usamos uma HOF novamente, executa para cada emta e precisa retornar o que vai ser mapeado, modificado
    const metasDesmarcadas = metas.map((meta) => {
        
        return {value: meta.value, checked: false}
    })

    const itemsADeletar = await checkbox({

        message: "selecione item para deletar",

        //os pontos significam que todos o itens estão la dentro do array, assim tudo o que tem dentro de metas, é como se fosse a cópia
        choices: [...metasDesmarcadas],
        instructions: false, 
    })

    console.log(itemsADeletar)

    if(itemsADeletar.length == 0){

        mensagem = "Nenhum item para deletar"
        return
    }

    itemsADeletar.forEach((item) => {

        metas = metas.filter((meta) => {
            //fica somente na nova lista de metas aquilo que não for marcado 
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}

const mostrarMenssagem = () => {

    console.clear();

    if(mensagem != ""){

        console.log(mensagem)
        console.log("")
        mensagem =""
    }

}


//função assíncrona e Promises
const start = async () => {
    while (true) {
        mostrarMenssagem()
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
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
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
            break;
        case "listar":
            await listarMetas()
            console.log("vamos listar")
            break;
        case "realizadas":
            await metasRealizadas()
            break;
        case "abertas":
            await metasAbertas()
            break;
        case "deletar":
                await deletarMetas()
                break;
        case "sair":
            console.log("até a proxima")
            //o return signiifca que vai parar a função
            return
       }
    }
}

start()