      
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll para os links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Seleciona os elementos que terão fade-in
    const elements = document.querySelectorAll('.product-card, .reel-card');

    // Observador para verificar a interseção dos elementos com rootMargin
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');

                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1; // Animação de fade-in

                    // Reproduz o vídeo e ativa o som ao entrar na área visível
                    if (video) {
                        video.muted = false; // Som ativo
                        video.play(); // Reproduz o vídeo
                        const audioIcon = entry.target.querySelector('.audio-toggle i');
                        if (audioIcon) updateAudioIcon(video, audioIcon);
                    }
                } else {
                    // Pausa e silencia o vídeo ao sair da área configurada
                    if (video) {
                        video.pause();
                        video.muted = true; // Silenciar
                        const audioIcon = entry.target.querySelector('.audio-toggle i');
                        if (audioIcon) updateAudioIcon(video, audioIcon);
                    }
                }
            });
        },
        {
            rootMargin: '-180px 0px -100px 0px' // Ajusta quando o vídeo será ativado/desativado
        }
    );

    // Configurações iniciais para os elementos observados
    elements.forEach(element => {
        element.style.opacity = 0; // Inicialmente invisível
        element.style.transition = 'opacity 0.5s ease-in'; // Transição suave
        observer.observe(element); // Observar elemento
    });

    // Alterna o áudio quando o botão de som é clicado
    document.querySelectorAll('.audio-toggle').forEach(button => {
        button.addEventListener('click', function () {
            const video = this.closest('.reel-card').querySelector('video');
            if (video) {
                video.muted = !video.muted; // Alterna o estado do som
                const audioIcon = this.querySelector('i');
                if (audioIcon) updateAudioIcon(video, audioIcon); // Atualiza o ícone
            }
        });
    });

    // Função para atualizar o ícone de áudio
    function updateAudioIcon(video, iconElement) {
        if (video.muted) {
            iconElement.classList.remove('fa-volume-up');
            iconElement.classList.add('fa-volume-mute');
        } else {
            iconElement.classList.remove('fa-volume-mute');
            iconElement.classList.add('fa-volume-up');
        }
    }

    // Remove a opção de download dos vídeos ao carregar a página e ativa loop
    document.querySelectorAll('video').forEach(video => {
        video.setAttribute('controlsList', 'nodownload');
        video.setAttribute('loop', ''); // Ativa o loop
        video.play(); // Inicia a reprodução ao carregar a página
    });
});








document.addEventListener('DOMContentLoaded', () => {
    const cartToggle = document.querySelector('.cart-toggle');
    const productsSection = document.getElementById('products');

    // Oculta o botão inicialmente
    cartToggle.style.display = 'none';

    // Função para verificar a visibilidade da seção e mostrar/ocultar o botão
    const toggleCartButtonVisibility = () => {
        const sectionRect = productsSection.getBoundingClientRect();

        const isSectionVisible =
            sectionRect.top <= window.innerHeight - 200 &&
            sectionRect.bottom >= 200;

        cartToggle.style.display = isSectionVisible ? 'block' : 'none';
    };

    // Verifica a visibilidade inicial ao carregar a página
    toggleCartButtonVisibility();

    // Adiciona o evento de scroll para continuar verificando
    window.addEventListener('scroll', toggleCartButtonVisibility);
});



// Inicialização do carrinho
const cart = [];
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');
const cartCountElement = document.querySelector('.cart-count');
const cartToggle = document.getElementById('cart');

// Função para adicionar produto ao carrinho com opções específicas
function addToCart(title, price, idPrefix) {
    const size = document.getElementById(`size-${idPrefix}`).value;
    const quantity = parseInt(document.getElementById(`qty-${idPrefix}`).value);

    const product = { title, price, size, quantity };
    cart.push(product);
    updateCartDisplay();
}

// Atualiza a exibição do carrinho e o total
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <span>${item.title} - ${item.size} - Quantidade: ${item.quantity}</span> 
                - R$${itemTotal.toFixed(2)}
            </div>
            <span class="cart-item-remove" onclick="removeFromCart(${index})">X</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.innerText = `Total: R$ ${total.toFixed(2)}`;
    cartCountElement.innerText = cart.length;
}

// Alterna a exibição do carrinho
function toggleCart() {
    cartToggle.classList.toggle('active');
}

// Remove um item específico do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Limpa todo o carrinho
function clearCart() {
    cart.length = 0;
    updateCartDisplay();
}

// Envia o pedido para o WhatsApp
function sendOrderToWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let message = "Pedido:\n";
    let total = 0;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `\n• ${item.title} - ${item.size} - Quantidade: ${item.quantity} - R$${itemTotal.toFixed(2)}`;
    });

    message += `\n\nTotal: R$${total.toFixed(2)}`;
    
    const whatsappNumber = "55219750122580"; // Coloque o número de telefone com DDD
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}




document.addEventListener('DOMContentLoaded', function () {
  let currentSlide = 0; // Índice do slide atual
  const slides = document.querySelectorAll('.carousel-item'); // Todos os slides do carrossel
  const carouselText = document.getElementById('carousel-text'); // Elemento para o texto descritivo

  // Descrições dos produtos no carrossel
  const productDescriptions = [
    'Colar delicado em prata 925 com design sofisticado.',
    'Anel em prata 925 com zircônia, perfeito para ocasiões especiais.',
    'Pulseira charmosa em prata 925, ideal para todos os estilos.',
    'Pingente elegante em prata 925, para dar um toque especial.',
    // Adicione mais descrições de produtos conforme necessário
  ];

  // Mapeamento entre os IDs dos produtos no carrossel e os IDs na seção de produtos
  const productMap = {
    'colar-elegance': 'colar-elegance',
    'anel-solitario': 'anel-solitario',
    'pulseira-charm': 'pulseira-charm',
    'pingente-elegante': 'pingente-elegante',
    // Adicione mais mapeamentos para novos produtos aqui
  };

  /**
   * Função para rolar até a seção de um produto específico
   * @param {string} productId - O ID do produto no carrossel
   */
  function goToProduct(productId) {
    const targetElement = document.getElementById(productMap[productId]);
    if (targetElement) {
      // Rola suavemente até o produto correspondente
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Função para ir ao slide anterior
   */
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Gira para o último slide se ultrapassar o primeiro
    updateCarousel();
  }

  /**
   * Função para ir ao próximo slide
   */
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Gira para o primeiro slide se ultrapassar o último
    updateCarousel();
  }

  /**
   * Atualiza o carrossel: move os slides e altera o texto descritivo
   */
  function updateCarousel() {
    // Move os slides usando o transform: translateX
    const offset = -currentSlide * 100; // Calcula o deslocamento com base no slide atual
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

    // Atualiza o texto com a descrição do produto correspondente
    carouselText.textContent = productDescriptions[currentSlide];
  }

  // Inicializa o carrossel ao carregar a página
  updateCarousel();

  // Adiciona eventos de clique para os botões de navegação do carrossel
  const prevButton = document.querySelector('.carousel-control.prev');
  const nextButton = document.querySelector('.carousel-control.next');

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Adiciona eventos de clique aos botões "Adquirir Agora"
  const acquireButtons = document.querySelectorAll('.acquire-btn');
  acquireButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const productId = this.getAttribute('onclick').match(/'(.*?)'/)[1]; // Extrai o ID do produto do atributo onclick
      goToProduct(productId);
    });
  });
});




const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Função para fechar o menu
    function closeMenu() {
      mobileMenu.classList.remove('active');
    }

    // Toggle do menu ao clicar no hamburger
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Fechar menu ao rolar a página
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        closeMenu();
      }
      lastScrollTop = scrollTop;
    });

    // Fechar menu quando a orientação da tela mudar
    window.addEventListener('orientationchange', closeMenu);

    // Fechar menu quando a janela for redimensionada
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });

    // Fechar menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });




    (function () {
  function toggleDropdown() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Abre e fecha o dropdown ao clicar no botão
    dropdownBtn.addEventListener('click', function (event) {
      event.stopPropagation(); // Impede que o clique no botão feche o menu
      dropdownContent.classList.toggle('show');
      dropdownBtn.classList.toggle('active');
    });

    // Fecha o dropdown ao clicar fora
    document.addEventListener('click', function () {
      dropdownContent.classList.remove('show');
      dropdownBtn.classList.remove('active');
    });

    // Fecha o dropdown ao rolar a página
    document.addEventListener('scroll', function () {
      dropdownContent.classList.remove('show');
      dropdownBtn.classList.remove('active');
    });
  }

  // Executa a função toggleDropdown quando o DOM estiver carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', toggleDropdown);
  } else {
    toggleDropdown();
  }
})();
