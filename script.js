// Botão Voltar ao Topo
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Menu toggle para mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal de Checkout Marsha
const modalMarsha = document.getElementById('checkoutModalMarsha');
const openCheckoutMarshaBtn = document.getElementById('openCheckoutMarsha');
const closeModalMarsha = document.querySelector('.close-modal-marsha');
const confirmationModal = document.getElementById('confirmationModal');

// Abrir modal Marsha
if (openCheckoutMarshaBtn) {
    openCheckoutMarshaBtn.addEventListener('click', () => {
        modalMarsha.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Fechar modal Marsha
if (closeModalMarsha) {
    closeModalMarsha.addEventListener('click', () => {
        modalMarsha.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Fechar ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === modalMarsha) {
        modalMarsha.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === confirmationModal) {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Máscaras de input Marsha
const telefoneMarsha = document.getElementById('telefoneMarsha');
const cpfMarsha = document.getElementById('cpfMarsha');

if (telefoneMarsha) {
    telefoneMarsha.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            e.target.value = value;
        }
    });
}

if (cpfMarsha) {
    cpfMarsha.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
            e.target.value = value;
        }
    });
}

// Processar pagamento Marsha (SIMULADO)
const checkoutFormMarsha = document.getElementById('checkoutFormMarsha');
if (checkoutFormMarsha) {
    checkoutFormMarsha.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nomeMarsha').value;
        const email = document.getElementById('emailMarsha').value;
        const telefone = document.getElementById('telefoneMarsha').value;
        const cpf = document.getElementById('cpfMarsha').value;
        
        // SIMULAÇÃO: Em produção, aqui vai a integração real com Mercado Pago
        // Por enquanto, simula um pagamento bem-sucedido
        
        console.log('Dados do cliente:', { nome, email, telefone, cpf });
        
        // Simula processamento
        const btnSubmit = checkoutFormMarsha.querySelector('.btn-submit');
        btnSubmit.textContent = 'Processando pagamento...';
        btnSubmit.disabled = true;
        
        setTimeout(() => {
            // Fecha modal de checkout
            modalMarsha.style.display = 'none';
            
            // Abre modal de confirmação
            confirmationModal.style.display = 'block';
            
            // Reset form
            checkoutFormMarsha.reset();
            btnSubmit.innerHTML = '<span>Pagar com Mercado Pago</span><span class="mp-icon">💳</span>';
            btnSubmit.disabled = false;
            
            // TODO: Aqui você vai adicionar o código para enviar email para a secretária
            // com os dados do cliente para criar o acesso no Amazon QuickSight
            
        }, 2000);
    });
}

// Fechar modal de confirmação
const btnCloseConfirmation = document.querySelector('.btn-close-confirmation');
if (btnCloseConfirmation) {
    btnCloseConfirmation.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Modal de Checkout Original
const modal = document.getElementById('checkoutModal');
const openCheckoutBtn = document.getElementById('openCheckout');
const closeModal = document.querySelector('.close-modal');

// Abrir modal
openCheckoutBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Fechar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Máscaras de input
document.getElementById('telefone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        e.target.value = value;
    }
});

document.getElementById('cpf').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
        e.target.value = value;
    }
});

// Enviar formulário via WhatsApp
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
    
    // Número de WhatsApp da clínica
    const numeroWhatsApp = '5519991309355';
    
    const mensagem = `
🤖 *PEDIDO - Agente de IA MS Psicologia*

*Produto:* Assistente MS - Agente de IA
*Valor:* R$ 97,00/mês

*DADOS DO CLIENTE:*
👤 Nome: ${nome}
📧 E-mail: ${email}
📱 WhatsApp: ${telefone}
🆔 CPF: ${cpf}
💳 Forma de Pagamento: ${pagamento.toUpperCase()}

Aguardo instruções para pagamento!
    `.trim();
    
    const mensagemEncoded = encodeURIComponent(mensagem);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemEncoded}`;
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    // Fechar modal e resetar formulário
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('checkoutForm').reset();
        alert('Pedido enviado! Você será redirecionado para o WhatsApp.');
    }, 500);
});
