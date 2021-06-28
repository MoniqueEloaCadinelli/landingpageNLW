// DOM Document Object Model -  O mapeamento da DOM é transformar tudo o que é HTML em objeto!
//document.body.style.background = 'red' - isso quer dizer documento(que é a modelagem do html) acha a tag html e aplica um style nela (que é uma propriedade) e aplica o background como vermelho.

/* Abre e fecha o menu quando clicar no ícone: 'hamburguer' e 'x' */
const nav = document.querySelector('#header nav') //document tem uma funcionalidade chamada querySelector, que espera receber um argumento em forma de string, nesse caso uma sting que tenha semelhança com os seletores(Selector) CSS (#header nav). Ou seja, aqui no JS eu preciso fazer o objeto(document) procurar(query) pelo seletor(Selector) header nav, feito isso coloque ele na constante(const nav).
const toggle = document.querySelectorAll('nav .toggle') // pegar todos(all) os toggle
//console.log(toggle) //Ao fazer isso ele registra automaticamente o log no console(F12)

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
} // Esse for habilita os elementos icon.menu e icon.close através do registro de argumentos,sendo o primeiro o clique(click) e o segundo a execução de uma função, no caso anônima(). Essa função vai pegar o nav, na lista de classes do nav e fazer uma troca(toggle) da classe show, ou seja, se tiver a classe show vc tira, se não tiver vc cola. Mas pra isso o toggle, classList e nav já devem existir no mapeamento do documento da DOM.

/* Quando clicar em um ítem do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a') //Ou seja, pesquisar no documento por todos os seletores que estejam em (nav, ul, li, a), então atribui a 'links'

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
} /* Então são 5 links( Início, sobre, serviços, Depoimentos e Contato ) */

/* Colocar sombra abaixo do header quando o scrool passar da altura do header */
const header = document.querySelector('#header') /* pega o header */
const navHeight = header.offsetHeight
/* pega o deslocamento da altura do header */
/* a constante fica para fora da função para que ela seja somente executada, sem ter que ficar buscando os elementos novamente, mas isso depende da lógica que vc está usando. */
function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // se o deslocamento da janela no eixo vertical é maior ou igual a altura da navegação
    header.classList.add('scroll')
  } else {
    //senão é menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* TESTIMONIALS CAROUSEL / SLIDER / SWIPER */
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

/* ScrollReveal: mostra elementos quando der scrool na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card, 
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* BACK TO TOP BUTTON */
/* pegue (nome da variável), no documento pesquise pelo seletor (back-to-top) */
/* depois pegamos a janela e adicionamos um evento de scroll, nesse evento temos uma função, se o scroll Y da janela estiver maior ou igual a 560 pegue o botão "backtotopbutton" na lista de class dele adicione o show, mas se for menor remova o show  */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* MEDIA QUERIES CSS EXTRA LARGE DEVICES: > 1200 */
/* DEIXAR BOTÃO DO MENU DESTACADO CONFORME A SEÇÃO VISÍVEL NA PÁGINA */
/* função ativar o menu na seção do momento, corrente. */
const sections = document.querySelectorAll('main section[id]')
/* selecionar todas as seções que contenham um atributo id dentro do main */
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4
  /* verifica e pega na página o deslocamento vertical(Y). Pegue todo o tamanho da janela e divida em 8, desses 8 pedaços pegue 4 e some ao deslocamento do eixo Y */
  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* WHEN SCROLL */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
