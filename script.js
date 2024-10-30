// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'Qual é o principal objetivo da higienização das mãos na prática de enfermagem?',
    answers: [
      {
        answer: 'Aumentar a eficiência do trabalho',
        correct: false,
      },
      {
        answer: 'Reduzir a transmissão de infecções',
        correct: true,
      },
      {
        answer: 'Melhorar a aparência das mãos',
        correct: false,
      },
      {
        answer: 'Proteger os equipamentos médicos',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a técnica mais eficaz para a higienização das mãos?',
    answers: [
      {
        answer: ' Lavar com água e sabão por 10 segundos',
        correct: false,
      },
      {
        answer: 'Usar apenas álcool em gel',
        correct: false,
      },
      {
        answer: 'Lavar com água e sabão por 20 a 30 segundos',
        correct: true,
      },
      {
        answer: 'Limpar com lenços umedecidos',
        correct: false,
      },
    ],
  },
  {
    question: 'Quando é essencial realizar a higienização das mãos?',
    answers: [
      {
        answer: 'Apenas antes de iniciar um procedimento',
        correct: false,
      },
      {
        answer: 'Após o uso do banheiro',
        correct: false,
      },
      {
        answer: 'Antes e após o contato com pacientes',
        correct: true,
      },
      {
        answer: 'Apenas ao final do turno de trabalho',
        correct: false,
      },
    ],
  },
];
    question: 'Qual das seguintes situações requer a lavagem das mãos com água e sabão, em vez de apenas álcool em gel?',
    answers; [
      {
        answer: 'Após tocar em objetos contaminados',
        correct: false,
      },
      {
        answer: 'Após usar o banheiro',
        correct: true,
      },
      {
        answer: 'Antes de preparar medicamentos',
        correct: false,
      },
      {
        answer: 'Após tocar em documentos',
        correct: false,
      },
    ],
    question; 'Qual é o tempo mínimo recomendado para a fricção das mãos com álcool em gel?',
    answers; [
      {
        answer: '5 Segundos',
        correct: false,
      },
      {
        answer: '10 Segundos',
        correct: false,
      },
      {
        answer: '20 Segundos',
        correct: true,
      },
      {
        answer: '30 Segundos',
        correct: false,
      },
    ],    question; 'Qual é o principal agente antimicrobiano presente nos sabonetes antibacterianos?',
    answers; [
      {
        answer: 'Álcool',
        correct: false,
      },
      {
        answer: 'Clorexidina',
        correct: false,
      },
      {
        answer: 'Triclosan',
        correct: true,
      },
      {
        answer: 'Peróxido de hidrogênio',
        correct: false,
      },
    ],

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();