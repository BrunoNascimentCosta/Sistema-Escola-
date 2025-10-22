let alunos = [];

function menu() {
  while (true) {
    console.log('\n--- MENU ACADÊMICO ---');
    console.log('1. Cadastrar aluno');
    console.log('2. Inserir notas');
    console.log('3. Calcular média e situação');
    console.log('4. Relatórios');
    console.log('5. Editar aluno');
    console.log('6. Remover aluno');
    console.log('7. Sair');

    const opcao = readline.question('Escolha uma opção: ');

    if (opcao === '1') {
      cadastrarAluno();
    } else if (opcao === '2') {
      inserirNotas();
    } else if (opcao === '3') {
      calcularSituacao();
    } else if (opcao === '4') {
      gerarRelatorios();
    } else if (opcao === '5') {
      editarAluno();
    } else if (opcao === '6') {
      removerAluno();
    } else if (opcao === '7') {
      console.log('Encerrando...');
      break;
    } else {
      console.log('Opção inválida.');
    }
  }
}

function cadastrarAluno() {
  const nome = readline.question('Nome do aluno: ');
  if (alunos.find(a => a.nome === nome)) {
    console.log('Erro: nome duplicado.');
    return;
  }

  let qtdNotas;
  do {
    qtdNotas = parseInt(readline.question('Quantas notas deseja cadastrar? (mínimo 3): '));
    if (qtdNotas < 3) console.log('Você precisa cadastrar pelo menos 3 notas.');
  } while (qtdNotas < 3);

  let notas = [];
  let i = 0;

  do {
    let nota = parseFloat(readline.question(`Nota ${i + 1} (0 a 10): `));
    if (nota >= 0 && nota <= 10) {
      notas.push(nota);
      i++;
    } else {
      console.log('Nota inválida. Digite novamente.');
    }
  } while (i < qtdNotas);

  alunos.push({ nome, notas });
  console.log('Aluno cadastrado com sucesso!');
}

function inserirNotas() {
  if (alunos.length === 0) {
    console.log('Nenhum aluno cadastrado.');
    return;
  }

  const nome = readline.question('Nome do aluno: ');
  const aluno = alunos.find(a => a.nome === nome);
  if (!aluno) {
    console.log('Aluno não encontrado.');
    return;
  }

  const qtd = parseInt(readline.question('Quantas notas deseja adicionar? '));
  let i = 0;

  do {
    let nota = parseFloat(readline.question(`Nota ${i + 1} (0 a 10): `));
    if (nota >= 0 && nota <= 10) {
      aluno.notas.push(nota);
      i++;
    } else {
      console.log('Nota inválida. Digite novamente.');
    }
  } while (i < qtd);

  console.log('Notas adicionadas com sucesso!');
}

function calcularSituacao() {
  if (alunos.length === 0) {
    console.log('Nenhum aluno cadastrado.');
    return;
  }

  for (const aluno of alunos) {
    const media = calcularMedia(aluno.notas);
    const situacao = media >= 7 ? 'Aprovado' : 'Reprovado';
    console.log(`${aluno.nome} - Média: ${media.toFixed(2)} - ${situacao}`);
  }
}

function gerarRelatorios() {
  if (alunos.length === 0) {
    console.log('Nenhum aluno cadastrado.');
    return;
  }

  const aprovados = alunos.filter(a => calcularMedia(a.notas) >= 7);
  const reprovados = alunos.filter(a => calcularMedia(a.notas) < 7);
  const melhor = alunos.reduce((melhor, atual) =>
    calcularMedia(atual.notas) > calcularMedia(melhor.notas) ? atual : melhor
  );

  console.log('\n--- Aprovados ---');
  for (const a of aprovados) {
    console.log(`${a.nome} - Média: ${calcularMedia(a.notas).toFixed(2)}`);
  }

  console.log('\n--- Reprovados ---');
  for (const a of reprovados) {
    console.log(`${a.nome} - Média: ${calcularMedia(a.notas).toFixed(2)}`);
  }

  console.log('\n--- Melhor Aluno ---');
  console.log(`${melhor.nome} - Média: ${calcularMedia(melhor.notas).toFixed(2)}`);
}

function editarAluno() {
  if (alunos.length === 0) {
    console.log('Nenhum aluno cadastrado.');
    return;
  }

  const nome = readline.question('Nome do aluno a editar: ');
  const aluno = alunos.find(a => a.nome === nome);
  if (!aluno) {
    console.log('Aluno não encontrado.');
    return;
  }

  const novoNome = readline.question('Novo nome: ');
  if (alunos.find(a => a.nome === novoNome)) {
    console.log('Erro: nome duplicado.');
    return;
  }

  aluno.nome = novoNome;
  console.log('Nome atualizado.');
}

function removerAluno() {
  if (alunos.length === 0) {
    console.log('Nenhum aluno cadastrado.');
    return;
  }

  const nome = readline.question('Nome do aluno a remover: ');
  const index = alunos.findIndex(a => a.nome === nome);
  if (index === -1) {
    console.log('Aluno não encontrado.');
    return;
  }

  alunos.splice(index, 1);
  console.log('Aluno removido com sucesso!');
}

function calcularMedia(notas) {
  return notas.reduce((a, b) => a + b, 0) / notas.length || 0;
}

menu();