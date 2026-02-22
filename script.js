'use strict';

// ============================================================================
// 1. ANIMAÇÃO DE DATA TRACKING (HERO CANVAS) - MELHORADA
// ============================================================================
const canvas = document.getElementById('trackingCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouseX = 0, mouseY = 0;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(74, 144, 226, ${Math.random() * 0.5 + 0.2})`; // Cyan Glacial
    }
    
    update() {
        // Movimento normal
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Interação com rato (efeito de repulsão suave)
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 1000;
            this.x += Math.cos(angle) * force * 10;
            this.y += Math.sin(angle) * force * 10;
        }
        
        // Boundary wrapping
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Desenhar linhas entre partículas próximas (simulando conexões de dados)
        particles.forEach(p => {
            const dx = this.x - p.x;
            const dy = this.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 50 && p !== this) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(74, 144, 226, ${0.1 * (1 - distance/50)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        });
    }
}

function createParticles() {
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar overlay sutil
    ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}

// Rastrear posição do rato
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Inicialização
window.addEventListener('resize', initCanvas);
initCanvas();
createParticles();
animate();

// ============================================================================
// 2. EFEITO DE REVELAÇÃO DE TEXTO (SCROLL REVEAL)
// ============================================================================
const revealElements = document.querySelectorAll('.reveal-text, h2, .stat-card, .vdc-feature');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
    });
};

// Adicionar estilos iniciais
revealElements.forEach(el => {
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================================================
// 3. TERMINAL DINÂMICO (LOGS FORENSES)
// ============================================================================
const forensicActions = [
    '[RUNNING] HEURISTIC_FINANCIAL_ANALYSIS',
    '[MATCHING] SAF-T vs EXTRATOS',
    '[PROCESSING] BTOR / BTF discrepancy',
    '[CALCULATING] IVA 23% on commissions',
    '[DETECTED] Smoking Gun: 57.658,00 €',
    '[VERIFYING] SHA-256 chain of custody',
    '[COMPLETE] RFC 3161 timestamp applied'
];

let actionIndex = 0;
const terminalLine = document.getElementById('terminalDynamic');

if (terminalLine) {
    setInterval(() => {
        terminalLine.textContent = forensicActions[actionIndex];
        terminalLine.style.animation = 'none';
        terminalLine.offsetHeight; // trigger reflow
        terminalLine.style.animation = 'fadeIn 0.5s';
        
        actionIndex = (actionIndex + 1) % forensicActions.length;
    }, 2000);
}

// ============================================================================
// 4. DROPZONE SIMULADO (CADEIA DE CUSTÓDIA)
// ============================================================================
const dropzone = document.getElementById('evidenceDropzone');
const hashSimulation = document.getElementById('hashSimulation');

if (dropzone) {
    // Prevenir comportamento padrão de drag
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Highlight no drag
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.style.borderColor = 'var(--gold)';
            dropzone.style.background = 'rgba(197, 160, 89, 0.1)';
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.style.borderColor = 'var(--cyan-glacial)';
            dropzone.style.background = 'rgba(74, 144, 226, 0.05)';
        }, false);
    });
    
    // Simular hash ao soltar ficheiro
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        
        // Simular geração de hash SHA-256
        const dummyHash = 'SHA-256: ' + Array.from({length: 64}, () => 
            Math.floor(Math.random() * 16).toString(16)).join('');
        
        hashSimulation.textContent = dummyHash;
        dropzone.classList.add('dropped');
        
        // Mostrar toast de confirmação
        showToast('Cadeia de custódia simulada com sucesso', 'success');
        
        // Efeito visual
        dropzone.style.transform = 'scale(0.98)';
        setTimeout(() => {
            dropzone.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Também permite clique para simular
    dropzone.addEventListener('click', () => {
        const dummyHash = 'SHA-256: ' + Array.from({length: 64}, () => 
            Math.floor(Math.random() * 16).toString(16)).join('');
        
        hashSimulation.textContent = dummyHash;
        dropzone.classList.add('dropped');
        showToast('Simulação de hash concluída', 'info');
    });
}

// ============================================================================
// 5. FUNÇÃO DE CÓPIA DE HASH (INTEGRAÇÃO VDC)
// ============================================================================
function setupHashCopy() {
    const copyBtn = document.getElementById('copyHashBtn');
    const hashElement = document.getElementById('master-hash');
    
    if (!copyBtn || !hashElement) return;
    
    copyBtn.addEventListener('click', async () => {
        const hash = hashElement.textContent.trim();
        
        try {
            await navigator.clipboard.writeText(hash);
            showToast('Hash SHA-256 copiado para área de transferência', 'success');
            
            // Feedback visual
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
            
        } catch (err) {
            showToast('Erro ao copiar hash', 'error');
        }
    });
}

// ============================================================================
// 6. SISTEMA DE TOAST (NOTIFICAÇÕES)
// ============================================================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><p>${message}</p>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================================================
// 7. EFEITO DE DIGITAÇÃO NO CONSOLE (SIMULAÇÃO VDC)
// ============================================================================
function typeWriterEffect() {
    const messages = [
        'VDC System v12.8.3 initializing...',
        'Loading forensic modules...',
        'SHA-256: d10c29fc8cd9a1f73483718b3b86545c',
        'Chain of custody established',
        'Smoking Gun detected: 57.658,00 € (61.46%)',
        'BTOR vs BTF discrepancy calculated',
        'IFDE - PROBATUM · Court Ready · Gold'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < messages.length) {
            console.log(`%c[VDC] ${messages[i]}`, 'color: #4a90e2; font-family: monospace; font-weight: bold;');
            i++;
        } else {
            clearInterval(interval);
            console.log('%c[VDC] System ready. Waiting for evidence...', 'color: #c5a059; font-family: monospace;');
        }
    }, 800);
}

// ============================================================================
// 8. SIMULAÇÃO DE QR CODE DINÂMICO
// ============================================================================
function simulateQRCode() {
    const qrDemo = document.getElementById('qrcode-demo');
    if (!qrDemo) return;
    
    // Criar um QR Code simulado com div (efeito visual melhorado)
    qrDemo.style.position = 'relative';
    qrDemo.style.width = '70px';
    qrDemo.style.height = '70px';
    qrDemo.style.background = '#fff';
    qrDemo.style.padding = '5px';
    qrDemo.style.borderRadius = '2px';
    
    // Limpar conteúdo anterior
    qrDemo.innerHTML = '';
    
    // Padrão mais elaborado simulando QR code
    const positions = [
        [0,0], [1,0], [2,0], [3,0], [4,0],
        [0,1], [4,1],
        [0,2], [4,2],
        [0,3], [4,3],
        [0,4], [1,4], [2,4], [3,4], [4,4],
        [2,2] // centro
    ];
    
    positions.forEach(([x, y]) => {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.background = '#000';
        dot.style.top = `${8 + y * 12}px`;
        dot.style.left = `${8 + x * 12}px`;
        qrDemo.appendChild(dot);
    });
    
    // Adicionar tooltip
    qrDemo.setAttribute('data-tooltip', 'QR Code de validação SHA-256');
}

// ============================================================================
// 9. PROTOCOLOS LEGAIS (MODAIS)
// ============================================================================
const protocols = {
    privacidade: `
        <h3>POLÍTICA DE PRIVACIDADE E SIGILO PERICIAL</h3>
        <p>A IFDE - PROBATUM opera sob o princípio do <strong>Privilégio Profissional</strong> e da confidencialidade absoluta. Todos os dados processados pelo motor VDC v12.8.3 são sujeitos a:</p>
        <ul>
            <li><strong>Criptografia AES-256</strong> em repouso e <strong>TLS 1.3</strong> em trânsito, garantindo a inviolabilidade dos dados durante todo o processo pericial.</li>
            <li><strong>Eliminação definitiva de metadados</strong> após a entrega do relatório pericial final, conforme o princípio da minimização de dados (art. 5.º RGPD).</li>
            <li><strong>Acesso restrito baseado no princípio 'Need-to-Know'</strong>, com registo de acessos auditável e selo temporal RFC 3161.</li>
            <li><strong>Segregação funcional</strong> entre a equipa de análise forense e a equipa de consultoria jurídica.</li>
        </ul>
        <p>O sigilo profissional é garantido pelo <strong>Decreto-Lei n.º 28/2019</strong> e pelas normas ISO/IEC 27037, assegurando que toda a comunicação com os mandatários é protegida por privilégio legal.</p>`,
    
    termos: `
        <h3>TERMOS LEGAIS E CONDIÇÕES DE PERITAGEM</h3>
        <p>Os pareceres emitidos pela IFDE - PROBATUM constituem <strong>prova técnica material</strong> nos termos do art. 163.º do Código de Processo Civil. A responsabilidade da consultoria limita-se à integridade dos dados extraídos e analisados conforme o <strong>Decreto-Lei n.º 28/2019</strong> e a norma <strong>ISO/IEC 27037</strong>.</p>
        <p><strong>Condições específicas:</strong></p>
        <ul>
            <li>A integridade dos dados é garantida pelo <strong>Master Hash SHA-256</strong> constante no rodapé de cada relatório.</li>
            <li>A cadeia de custódia é documentada com <strong>timestamps RFC 3161</strong> e hashes individuais de cada evidência.</li>
            <li>Qualquer tentativa de engenharia reversa no sistema VDC v12.8.3 será objeto de ação judicial imediata ao abrigo do <strong>art. 6.º da Lei do Cibercrime (Lei n.º 109/2009)</strong>.</li>
            <li>Os relatórios periciais são válidos por tempo indeterminado, sendo a sua integridade verificável através do QR Code anexo.</li>
        </ul>`,
    
    rgpd: `
        <h3>CONFORMIDADE RGPD (REGULAMENTO 2016/679)</h3>
        <p>Como subcontratante de dados para efeitos judiciais (alínea h) do n.º 1 do art. 9.º RGPD), a IFDE - PROBATUM garante:</p>
        <ul>
            <li><strong>DPO (Data Protection Officer)</strong> dedicado a processos forenses, com contacto direto para os mandatários.</li>
            <li><strong>Registo de Atividades de Tratamento (RAT)</strong> auditável e disponível para fiscalização pela CNPD.</li>
            <li><strong>Protocolos de notificação de brechas</strong> em menos de 12 horas, conforme art. 33.º RGPD.</li>
            <li><strong>Anonimização de dados</strong> em demonstrações e casos simulados, com eliminação de identificadores diretos (NIF, nome, morada).</li>
        </ul>
        <p>O tratamento de dados é limitado ao estritamente necessário para a produção da prova pericial, sendo os dados eliminados no prazo máximo de 60 dias após a conclusão do processo.</p>`,
    
    certificacoes: `
        <h3>CERTIFICAÇÕES E STANDARDS TÉCNICOS</h3>
        <p>A nossa metodologia segue rigorosamente os padrões internacionais de computação forense e auditoria digital:</p>
        <ul>
            <li><strong>ISO/IEC 27037:</strong> Linhas de orientação para identificação, recolha, aquisição e preservação de prova digital.</li>
            <li><strong>ISO/IEC 27001:</strong> Sistema de Gestão de Segurança da Informação (SGSI) aplicado a processos forenses.</li>
            <li><strong>RFC 3161:</strong> Protocolo de selo temporal para validade jurídica (Internet X.509 Public Key Infrastructure Time-Stamp Protocol).</li>
            <li><strong>NIST SP 800-86:</strong> Guide to Integrating Forensic Techniques into Incident Response.</li>
            <li><strong>Selo de Excelência VDC:</strong> Algoritmo proprietário de deteção de discrepâncias financeiras, validado por auditoria externa.</li>
        </ul>
        <p>O motor forense VDC v12.8.3 é auditado trimestralmente por entidade independente, garantindo a conformidade com os standards internacionais.</p>`
};

// Função para abrir modal de protocolo
function openProtocol(id) {
    const modal = document.getElementById('protocolModal');
    const textZone = document.getElementById('protocolText');
    
    if (modal && textZone && protocols[id]) {
        textZone.innerHTML = protocols[id];
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Impede scroll
        
        // Log para console (simulação de auditoria)
        console.log(`%c[VDC] Protocolo aberto: ${id}`, 'color: #c5a059; font-family: monospace;');
    }
}

// Função para fechar modal de protocolo
function closeProtocol() {
    const modal = document.getElementById('protocolModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura scroll
    }
}

// Fechar ao clicar fora do modal
window.onclick = function(event) {
    const modal = document.getElementById('protocolModal');
    if (event.target == modal) {
        closeProtocol();
    }
};

// ============================================================================
// 10. INICIALIZAÇÃO
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cIFDE - PROBATUM: Website Institucional Ativo.', 'color: #c5a059; font-weight: bold;');
    console.log('%cVDC System v12.8.3 integration loaded.', 'color: #4a90e2; font-family: monospace;');
    
    setupHashCopy();
    simulateQRCode();
    typeWriterEffect();
    
    // Mostrar toast de boas-vindas após 2 segundos
    setTimeout(() => {
        showToast('IFDE - PROBATUM · Sistema Forense Ativo · SHA-256', 'info');
    }, 2000);
});

// ============================================================================
// 11. EFEITO GLITCH NO HOVER (SEGURANÇA)
// ============================================================================
const glitchElements = document.querySelectorAll('.glitch-hover');
glitchElements.forEach(el => {
    el.setAttribute('data-text', el.textContent);
});

// ============================================================================
// 12. EXPOR FUNÇÕES GLOBALMENTE (PARA ONCLICK NO HTML)
// ============================================================================
window.openProtocol = openProtocol;
window.closeProtocol = closeProtocol;
