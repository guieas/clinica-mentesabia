// Código dos Lançamentos - Formulário Único Simplificado
console.log('Script de lançamentos carregado');

// Links de pagamento do Mercado Pago
const PAYMENT_LINKS = {
    dbt: {
        link: 'https://mpago.la/2Vr37Xo'  // DBT - Treinamento de Habilidades
    },
    eating: {
        link: 'https://mpago.la/316ii7v'  // Comer Emocional e Compulsivo
    }
};

// Dados dos treinamentos
const launchesData = {
    dbt: {
        title: 'Treinamento de Habilidades em DBT',
        subtitle: 'Próxima turma: 03/03/2026',
        price: 3200,
        installments: 12,
        installmentValue: 266.67,
        pixDiscount: 2880,
        duration: '16 semanas',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg>',
        instructors: [
            { name: 'Gabriela Bueno', credential: 'CRP: 06/179325', role: 'Psicóloga' },
            { name: 'Giovanna Schiavinato', credential: 'CRP: 06/154598', role: 'Psicóloga' }
        ]
    },
    eating: {
        title: 'Programa para o Comer Emocional e Compulsivo',
        subtitle: 'Próxima turma: 05/03/2026',
        price: 3200,
        installments: 12,
        installmentValue: 266.67,
        pixDiscount: 2880,
        duration: '12 semanas',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',
        instructors: [
            { name: 'César Moraes', credential: 'CRN: 43703', role: 'Nutricionista' },
            { name: 'Renata Mociaro', credential: 'CRP: 06/121565', role: 'Psicóloga' }
        ]
    }
};

// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, configurando lançamentos...');
    
    // Elementos do DOM
    const launchModal = document.getElementById('launchModal');
    const launchForm = document.getElementById('launchForm');
    
    // Configurar botões de participação
    const buttons = document.querySelectorAll('.btn-launch-interest');
    console.log('Botões encontrados:', buttons.length);
    
    buttons.forEach(function(button, index) {
        console.log('Configurando botão', index + 1);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botão clicado!');
            
            const trainingType = this.getAttribute('data-training');
            console.log('Training type:', trainingType);
            const launchData = launchesData[trainingType];
            
            if (!launchData) {
                console.error('Dados do treinamento não encontrados:', trainingType);
                return;
            }
            
            // Preencher dados do modal
            document.getElementById('launchTitle').textContent = launchData.title;
            document.getElementById('launchSubtitle').textContent = launchData.subtitle;
            
            // Preencher resumo do produto
            document.getElementById('trainingProductSummary').innerHTML = `
                <div class="product-info">
                    <span class="product-icon">${launchData.icon}</span>
                    <div class="product-details">
                        <h3>${launchData.title}</h3>
                        <p>${launchData.duration} • 100% Online</p>
                    </div>
                </div>
                <div class="pricing-highlight">
                    <div class="price-option">
                        <span class="price-label">PIX à vista</span>
                        <span class="price-value pix-price">R$ ${launchData.pixDiscount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                        <span class="price-detail">(10% desconto)</span>
                    </div>
                    <div class="price-option">
                        <span class="price-label">Cartão</span>
                        <span class="price-value card-price">R$ ${launchData.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                        <span class="price-detail">em até 12x</span>
                    </div>
                </div>
            `;
            
            // Atualizar opções de pagamento
            document.getElementById('pixDiscount').textContent = `R$ ${launchData.pixDiscount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} (10% desc.)`;
            document.getElementById('cardInstallments').textContent = `R$ ${launchData.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} em até ${launchData.installments}x`;
            
            // Armazenar tipo de treinamento
            launchForm.setAttribute('data-training', trainingType);
            
            if (launchModal) {
                console.log('Abrindo modal de inscrição...');
                launchModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Processar formulário de inscrição
    if (launchForm) {
        launchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulário de inscrição enviado');
            
            const trainingType = this.getAttribute('data-training');
            const launchData = launchesData[trainingType];
            
            // Coletar dados do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const cpf = document.getElementById('cpf').value;
            const motivacao = document.getElementById('motivacao').value;
            const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
            
            // Fechar modal
            launchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            launchForm.reset();
            
            if (pagamento === 'pix') {
                // PIX: Redirecionar para página de confirmação (fluxo original)
                const userDataEncoded = encodeURIComponent(JSON.stringify({
                    nome, email, whatsapp, cpf, motivacao
                }));
                window.location.href = `confirmacao-pix.html?training=${trainingType}&data=${userDataEncoded}`;
                
            } else if (pagamento === 'cartao') {
                // CARTÃO: Redirecionar para Mercado Pago
                const paymentLink = PAYMENT_LINKS[trainingType]?.link;
                
                if (paymentLink) {
                    console.log('Redirecionando para Mercado Pago:', paymentLink);
                    window.open(paymentLink, '_blank');
                } else {
                    console.error('Link de pagamento não encontrado para:', trainingType);
                    alert('Erro: Link de pagamento não configurado. Entre em contato conosco.');
                }
            }
        });
    }
    
    // Máscaras de input
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
                e.target.value = value;
            }
        });
    }
    
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
                e.target.value = value;
            }
        });
    }
    
    // Fechar modal
    document.querySelector('.close-launch-modal')?.addEventListener('click', function() {
        if (launchModal) {
            launchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fechar ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === launchModal) {
            launchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    console.log('Lançamentos configurados com sucesso!');
});