// User Form = Pega os dados do formulário e envia para o Banco de Dados
const userForm = document.getElementById('user-form')

// User List = Mostra os dados do Banco de Dados
const userList = document.getElementById('user-list')

function listJogadores() {
    fetch('http://localhost:3000/usuarios')
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = '';
            data.forEach(jogadores => {
                const li = document.createElement('li');
                li.innerHTML =`<img src="${user.image}"> </img>
                <p>ID: ${jogadores.id} - Nome: ${jogadores.nome} Posicao - : ${jogadores.posicao} - Contrato: ${jogadores.contrato}</p>`;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro:', error));
}

//MODAIS

function adicionarModal(){
    const modal = document.getElementById("dialogAdd")
    modal.showModal()
}

function sairModal(){
    const modal = document.getElementById("dialogAdd")
    modal.close()
}




userForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenção padrão de erros

    try {
        const userId = await getNextUserId(); // Obtém o próximo ID disponível
        const nome = document.getElementById('nome').value;
        const posicao = document.getElementById('posicao').value;
        const contrato = document.getElementById('contarto').value;
        const url = document.getElementById('url').value;

        // Enviando os dados para o servidor
        fetch('http://localhost:3000/jogadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userId,
                    nome: nome,
                    posicao: posicao,
                    contrato: contrato,
                    url : url
                }),
            })
            .then(response => response.json())
            .then(() => {
                listJogadores();
                userForm.reset();
            })
            .catch(error => console.error('Erro:', error));
    } catch (error) {
        // Trata o erro ao obter o próximo ID disponível
        console.error('Erro ao obter o próximo ID:', error);
    }
});



const deleteUserForm = document.getElementById('delete-user-form');

deleteUserForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenção padrão de envio do formulário

    const userId = document.getElementById('user-id').value;

    fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Usuário excluído com sucesso!');
                listUsers(); // Atualiza a lista de usuários após a exclusão
            } else {
                alert('Erro ao excluir usuário.');
            }
        })
        .catch(error => console.error('Erro:', error));
});

async function getNextUserId() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        const data = await response.json();
        const numberOfJogadores = data.length;
        const nextJogadorId = numberOfJogadores + 1;
        return nextJogadorId;
    } catch (error) {
        console.error('Erro ao contar usuários:', error);
        throw error; // Você pode querer propagar o erro para que ele seja tratado fora dessa função.
    }
}

// Adicionando evento de envio para o formulário de edição
const editUserForm = document.getElementById('edit-jogadores-form');

editUserForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenção padrão de envio do formulário

    const userId = document.getElementById('id').value;
    const newNome = document.getElementById('nome').value;
    const newPosicao = document.getElementById('posicao').value;
    const newContrato = document.getElementById('contrato').value;
    const newUrl = document.getElementById('url').value;

    // Enviando os dados atualizados para o servidor
    fetch(`http://localhost:3000/jogadores/${jogadoresId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: newNome,
                posicao: newPosicao,
                contrato: newContrato,
                url: newUrl
            }),
        })
        .then(response => response.json())
        .then(() => {
            listUsers(); // Atualiza a lista de usuários após a edição
            editUserForm.reset(); // Limpa o formulário de edição
        })
        .catch(error => console.error('Erro:', error));
});
listJogadores()