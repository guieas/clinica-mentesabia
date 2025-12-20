// Código dos Lançamentos - Formulário Único Simplificado
console.log('Script de lançamentos carregado');

// Dados dos treinamentos
const launchesData = {
    dbt: {
        title: 'Treinamento de Habilidades em DBT',
        subtitle: 'Próxima turma: 03/03/2026',
        price: 3200,
        installments: 12,
        installmentValue: 266.67, // 3200/12
        pixDiscount: 2880, // 10% desconto
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
        installmentValue: 266.67, // 3200/12
        pixDiscount: 2880, // 10% desconto
        duration: '12 semanas',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',
        instructors: [
            { name: 'César Moraes', credential: 'CRN: 43703', role: 'Nutricionista' },
            { name: 'Renata Mociaro', credential: 'CRP: 06/121565', role: 'Psicóloga' }
        ]
    }
};

// Aguardar página carregar completamente
window.addEventListener('load', function() {
    console.log('Página carregada, configurando lançamentos...');
    
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
            const launchData = launchesData[trainingType];
            
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
                        <span class="price-value pix-price" style="min-width: 120px; display: inline-block;">R$ ${launchData.pixDiscount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                        <span class="price-detail">(10% desconto)</span>
                    </div>
                    <div class="price-option">
                        <span class="price-label">Cartão</span>
                        <span class="price-value card-price" style="min-width: 120px; display: inline-block;">R$ ${launchData.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                        <span class="price-detail">em até 12x</span>
                    </div>
                </div>
            `;
            
            // Atualizar opções de pagamento
            document.getElementById('pixDiscount').textContent = `R$ ${launchData.pixDiscount.toFixed(2).replace('.', ',')} (10% desc.)`;
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
    
    // Processar formulário de inscrição (ÚNICO PASSO)
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
            
            const userData = { nome, email, whatsapp, cpf, motivacao };
            
            // Fechar modal
            launchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            launchForm.reset();
            
            if (pagamento === 'pix' || pagamento === 'cartao') {
                // Redirecionar para link de pagamento do Mercado Pago
                const paymentLink = PAYMENT_LINKS[trainingType]?.link;
                
                if (paymentLink && !paymentLink.includes('SEU_LINK')) {
                    // Link configurado - redirecionar para Mercado Pago
                    window.open(paymentLink, '_blank');
                } else {
                    // Link não configurado - fallback para WhatsApp
                    const preco = pagamento === 'pix' ? launchData.pixDiscount : launchData.price;
                    const descricaoPagamento = pagamento === 'pix' ? 'PIX à vista (10% desconto)' : 'Cartão de crédito (parcelamento disponível)';
                    
                    const mensagem = `🎯 *INSCRIÇÃO - ${pagamento.toUpperCase()}*

*TREINAMENTO:* ${launchData.title}
*VALOR:* R$ ${preco.toFixed(2).replace('.', ',')}
*PAGAMENTO:* ${descricaoPagamento}

*DADOS:*
👤 ${nome}
📧 ${email}
📱 ${whatsapp}
🆔 ${cpf}

${motivacao ? `*MOTIVAÇÃO:* ${motivacao}\n\n` : ''}Gostaria de finalizar minha inscrição!`;

                    const whatsappUrl = `https://wa.me/5519991309355?text=${encodeURIComponent(mensagem)}`;
                    window.open(whatsappUrl, '_blank');
                }
            }
📧 E-mail: ${email}
📱 WhatsApp: ${whatsapp}
🆔 CPF: ${cpf}

*PAGAMENTO ESCOLHIDO:*
💳 ${formaPagamento}
💰 Taxa de parcelamento repassada para o cliente via Mercado Pago

${motivacao ? `*MOTIVAÇÃO:*\n${motivacao}\n\n` : ''}*PRÓXIMOS PASSOS:*
✅ Inscrição realizada com sucesso
💳 Aguardando link do Mercado Pago para pagamento
📚 Material será enviado após confirmação

Obrigado pela confiança! 🚀`;

                // Redirecionar para WhatsApp
                const whatsappUrl = `https://wa.me/5519991309355?text=${encodeURIComponent(mensagem)}`;
                window.open(whatsappUrl, '_blank');
                
                alert('Inscrição realizada com sucesso! Você será redirecionado para o WhatsApp para receber o link de pagamento do Mercado Pago.');
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
        launchModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Pagamento simplificado - sem JavaScript adicional necessário
    
    // Fechar ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === launchModal) {
            launchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    console.log('Lançamentos configurados com sucesso!');
});


