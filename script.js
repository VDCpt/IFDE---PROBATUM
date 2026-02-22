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
        this.color = `rgba(74, 144, 226, ${Math.random() * 0.5 + 0.2})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 1000;
            this.x += Math.cos(angle) * force * 10;
            this.y += Math.sin(angle) * force * 10;
        }
        
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
    
    ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

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
        terminalLine.offsetHeight;
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
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
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
    
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        
        const dummyHash = 'SHA-256: ' + Array.from({length: 64}, () => 
            Math.floor(Math.random() * 16).toString(16)).join('');
        
        hashSimulation.textContent = dummyHash;
        dropzone.classList.add('dropped');
        
        showToast('Cadeia de custódia simulada com sucesso', 'success');
        
        dropzone.style.transform = 'scale(0.98)';
        setTimeout(() => {
            dropzone.style.transform = 'scale(1)';
        }, 200);
    });
    
    dropzone.addEventListener('click', () => {
        const dummyHash = 'SHA-256: ' + Array.from({length: 64}, () => 
            Math.floor(Math.random() * 16).toString(16)).join('');
        
        hashSimulation.textContent = dummyHash;
        dropzone.classList.add('dropped');
        showToast('Simulação de hash concluída', 'info');
    });
}

// ============================================================================
// 5. FUNÇÃO DE CÓPIA DE HASH
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
// 6. SISTEMA DE TOAST
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
// 7. EFEITO DE DIGITAÇÃO NO CONSOLE
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
// 8. SIMULAÇÃO DE QR CODE
// ============================================================================
function simulateQRCode() {
    const qrDemo = document.getElementById('qrcode-demo');
    if (!qrDemo) return;
    
    qrDemo.style.position = 'relative';
    qrDemo.style.width = '70px';
    qrDemo.style.height = '70px';
    qrDemo.style.background = '#fff';
    qrDemo.style.padding = '5px';
    qrDemo.style.borderRadius = '2px';
    
    qrDemo.innerHTML = '';
    
    const positions = [
        [0,0], [1,0], [2,0], [3,0], [4,0],
        [0,1], [4,1],
        [0,2], [4,2],
        [0,3], [4,3],
        [0,4], [1,4], [2,4], [3,4], [4,4],
        [2,2]
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
    
    qrDemo.setAttribute('data-tooltip', 'QR Code de validação SHA-256');
}

// ============================================================================
// 9. PROTOCOLOS DE CONFORMIDADE
// ============================================================================
const protocolContent = {
    privacidade: {
        title: "P001 - POLÍTICA DE PRIVACIDADE E SIGILO PERICIAL",
        body: `<h3>Dever de Sigilo Profissional · Art. 135.º CP</h3>
               <p>A IFDE - PROBATUM opera sob o princípio da <strong>inviolabilidade do segredo pericial</strong>. Todos os dados recolhidos no âmbito do Sistema VDC v12.8.3 são processados em ambientes segregados (Air-Gapped quando necessário), garantindo a confidencialidade absoluta das informações dos mandatários.</p>
               <ul>
                   <li><strong>Criptografia de nível militar AES-256</strong> para dados em repouso, com chaves geradas localmente no ambiente do cliente.</li>
                   <li><strong>Protocolo Zero-Knowledge:</strong> Não retemos chaves de desencriptação dos clientes, impossibilitando o acesso não autorizado.</li>
                   <li><strong>Eliminação certificada de provas digitais</strong> após 30 dias da sentença transitada em julgado, conforme art. 5.º, n.º 1, alínea e) do RGPD.</li>
                   <li><strong>Registo de acessos auditável</strong> com selo temporal RFC 3161 para todas as operações sobre os dados.</li>
               </ul>
               <p>O cumprimento do <strong>Decreto-Lei n.º 28/2019</strong> assegura que todos os processos de tratamento de dados são documentados e auditáveis por entidades externas.</p>`
    },
    termos: {
        title: "T002 - TERMOS LEGAIS E CONDIÇÕES DE PERITAGEM",
        body: `<h3>Enquadramento Jurídico da Peritagem</h3>
               <p>Os serviços prestados pela IFDE - PROBATUM constituem <strong>perícia técnica de assistência</strong> conforme os art. 467.º a 489.º do Código de Processo Civil e art. 151.º a 157.º do Código de Processo Penal. O Sistema VDC v12.8.3 é uma ferramenta de apoio à decisão e não substitui o juízo crítico do perito nomeado pelo tribunal.</p>
               <ul>
                   <li><strong>Propriedade Intelectual:</strong> Os algoritmos de deteção de discrepâncias (BTOR/BTF), os schemas de mapeamento e o motor de triangulação financeira são propriedade exclusiva da IFDE - PROBATUM, protegidos nos termos do Código do Direito de Autor.</li>
                   <li><strong>Validade probatória:</strong> Os relatórios são assinados digitalmente com selo temporal RFC 3161 e hash SHA-256, garantindo a integridade e não-repúdio da prova.</li>
                   <li><strong>Responsabilidade técnica:</strong> A IFDE responde pela exatidão dos algoritmos e pela integridade da cadeia de custódia, nos termos do art. 483.º do Código Civil.</li>
                   <li><strong>Imutabilidade:</strong> Qualquer tentativa de alteração dos relatórios periciais invalida automaticamente o hash SHA-256, tornando a prova nula.</li>
               </ul>`
    },
    rgpd: {
        title: "R003 - CONFORMIDADE RGPD & DATA PROTECTION",
        body: `<h3>Tratamento de Dados Sensíveis · Regulamento (UE) 2016/679</h3>
               <p>Em conformidade com o Regulamento (UE) 2016/679 (RGPD), a IFDE - PROBATUM atua como <strong>subcontratante para fins de investigação e prova judicial</strong>, ao abrigo do Art. 9.º, n.º 2, alínea f) que permite o tratamento de dados sensíveis quando necessário à declaração, exercício ou defesa de um direito num processo judicial.</p>
               <ul>
                   <li><strong>DPO Dedicado:</strong> Encarregado de Proteção de Dados exclusivo para processos forenses, com contacto direto para os mandatários.</li>
                   <li><strong>Registo de Atividades de Tratamento (RAT):</strong> Documentação completa e auditável, disponível para fiscalização pela CNPD.</li>
                   <li><strong>Direito ao Esquecimento:</strong> Aplicado mediante autorização judicial, após trânsito em julgado da decisão.</li>
                   <li><strong>Logs de Acesso Imutáveis:</strong> Registo pormenorizado de quem acedeu a cada byte de evidência, com timestamp RFC 3161.</li>
                   <li><strong>Notificação de brechas:</strong> Protocolo de comunicação em menos de 12 horas, conforme art. 33.º RGPD.</li>
               </ul>`
    },
    certificacoes: {
        title: "C004 - CERTIFICAÇÕES E NORMAS TÉCNICAS",
        body: `<h3>Standards Internacionais de Cadeia de Custódia</h3>
               <p>A metodologia PROBATUM alinha-se com os standards internacionais de excelência em computação forense e auditoria digital:</p>
               <ul>
                   <li><strong>ISO/IEC 27037:2012:</strong> Diretrizes para identificação, recolha, aquisição e preservação de evidência digital.</li>
                   <li><strong>ISO/IEC 27001:2022:</strong> Sistema de Gestão de Segurança da Informação aplicado a processos forenses.</li>
                   <li><strong>NIST SP 800-86:</strong> Guide to Integrating Forensic Techniques into Incident Response.</li>
                   <li><strong>RFC 3161:</strong> Internet X.509 Public Key Infrastructure Time-Stamp Protocol (TSP).</li>
                   <li><strong>ISO 9001:2015:</strong> Gestão de qualidade em processos de auditoria económica e financeira.</li>
                   <li><strong>Selo de Excelência VDC:</strong> Algoritmo proprietário de deteção de discrepâncias financeiras, validado por auditoria externa da Deloitte (2025).</li>
               </ul>
               <p>O motor forense VDC v12.8.3 é auditado trimestralmente por entidade independente, garantindo a conformidade com os standards internacionais e a precisão matemática dos cálculos periciais.</p>`
    }
};

function openProtocol(id) {
    const modal = document.getElementById('protocolModal');
    const title = document.getElementById('modalTitle');
    const text = document.getElementById('protocolText');
    
    if (modal && title && text && protocolContent[id]) {
        title.innerText = protocolContent[id].title;
        text.innerHTML = protocolContent[id].body;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        console.log(`%c[VDC] Protocolo aberto: ${id} - ${protocolContent[id].title}`, 'color: #c5a059; font-family: monospace;');
    }
}

function closeProtocol() {
    const modal = document.getElementById('protocolModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ============================================================================
// 10. VISUALIZADOR DE RELATÓRIO FORENSE
// ============================================================================
function openForensicReport() {
    const reportOverlay = document.getElementById('reportOverlay');
    const reportContent = document.getElementById('reportContent');
    
    if (!reportOverlay || !reportContent) return;
    
    const currentDate = new Date().toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    const reportTemplate = `
        <div class="report-header-legal">
            <div>
                <strong>IFDE - PROBATUM</strong><br>
                Investigação & Desenvolvimento Forense<br>
                Ref: PER-2026-001-VDC
            </div>
            <div style="text-align:right">
                <strong>CONFIDENCIAL</strong><br>
                Cadeia de Custódia: Ativa<br>
                Data: ${currentDate}
            </div>
        </div>

        <div class="report-body">
            <h1>Relatório de Peritagem Económico-Financeira</h1>
            
            <h2>1. OBJETO DA PERÍCIA</h2>
            <p>Análise de fluxo de ativos e auditoria algorítmica ao Sistema de Faturação da entidade sob investigação, com recurso ao protocolo <strong>VDC (Validation of Digital Consistency)</strong> v12.8.3. O perímetro de análise compreende o período fiscal de 2025, com base nos ficheiros SAF-T (PT) e extratos de plataforma fornecidos.</p>

            <h2>2. METODOLOGIA (BTOR / BTF)</h2>
            <p>Foi aplicada a técnica de <strong>Busca Técnica Financeira (BTF)</strong> sobre os ficheiros SAF-T (PT) do período Q1-Q4, em cruzamento com os extratos operacionais (BTOR). O algoritmo de triangulação financeira do sistema VDC detetou anomalias na estrutura dos registos que sugerem manipulação de dados 'a posteriori' e/ou omissão de faturação.</p>

            <h2>3. ANÁLISE DE DISCREPÂNCIAS (VDC)</h2>
            <table class="report-table">
                <thead>
                    <tr>
                        <th>Parâmetro</th>
                        <th>Valor Declarado (BTF)</th>
                        <th>Valor Forense (BTOR)</th>
                        <th>Desvio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Comissões de Intermediação</td>
                        <td>36.154,00 €</td>
                        <td>93.812,00 €</td>
                        <td style="color:red; font-weight:bold">+57.658,00 € (159%)</td>
                    </tr>
                    <tr>
                        <td>IVA 23% (Intermediação)</td>
                        <td>8.315,42 €</td>
                        <td>21.576,76 €</td>
                        <td style="color:red; font-weight:bold">+13.261,34 €</td>
                    </tr>
                    <tr>
                        <td>IVA 6% (Transporte)</td>
                        <td>0,00 €</td>
                        <td>3.459,48 €</td>
                        <td style="color:red; font-weight:bold">+3.459,48 €</td>
                    </tr>
                    <tr>
                        <td>Volume de Negócios Total</td>
                        <td>333.739,00 €</td>
                        <td>404.925,00 €</td>
                        <td style="color:orange">+71.186,00 € (21,3%)</td>
                    </tr>
                </tbody>
            </table>

            <h2>4. PROVA MATERIAL DIGITAL (BLOCKCHAIN)</h2>
            <p>Rastreio efetuado na rede Ethereum identificou a conversão de ativos em <em>Stablecoins</em> (USDT) com destino a carteiras não declaradas nos registos contabilísticos oficiais.</p>
            <p><strong>Hash de Transação suspeita:</strong> <span class="mono-hash">0x71c9f3a2b8e4d5c6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0</span></p>
            <p><strong>Endereço de destino:</strong> <span class="mono-hash">0x3f5a2b8e4d5c6a7b8c9d0e1f2a3b4c5d6e7f8a9b</span></p>
            <p><strong>Cluster detetado:</strong> 3 endereços relacionados com atividade de mixer (Tornado Cash) no período em análise.</p>

            <h2>5. CADEIA DE CUSTÓDIA</h2>
            <p>Todas as evidências processadas foram seladas com hash SHA-256 e timestamp RFC 3161, garantindo a integridade e imutabilidade da prova digital. Abaixo, os hashes dos principais ficheiros analisados:</p>
            <table class="report-table">
                <tr>
                    <td><strong>131509_202512.csv</strong></td>
                    <td class="mono-hash">d098483e91961126b532263d1c889c3197b3b1272f32ca9b46b314dba8730ab0</td>
                </tr>
                <tr>
                    <td><strong>extrato_dezembro.pdf</strong></td>
                    <td class="mono-hash">b522e2ae4377b9fd39b772aea1603882b47d16971d5e95b357</td>
                </tr>
                <tr>
                    <td><strong>fatura_PT1126-5834.pdf</strong></td>
                    <td class="mono-hash">1a65fb6fdb1782bec8c167327c5a76f6ad570b1dc7f34d349a8d96739cb1ab4</td>
                </tr>
            </table>

            <h2>6. CONCLUSÃO TÉCNICA</h2>
            <p>Com base na evidência digital recolhida e processada pelo motor forense VDC v12.8.3, conclui-se pela <strong>existência de quebra na integridade dos dados fiscais</strong>, configurando indícios de infração prevista no Regime Geral das Infrações Tributárias (RGIT), nomeadamente:</p>
            <ul style="list-style-type: disc; margin-left: 20px;">
                <li>Omissão de faturação de comissões no valor de <strong>57.658,00 €</strong></li>
                <li>Falta de liquidação de IVA (23% e 6%) no montante total de <strong>16.720,82 €</strong></li>
                <li>Discrepância entre valores declarados em DAC7 e registos SAF-T</li>
            </ul>
            <p>Recomenda-se a participação à Autoridade Tributária e a instauração de procedimento de inspeção externa.</p>
            
            <div class="report-footer-signature">
                <strong>Dr. EM Perito</strong>
                <small>Analista Forense de Auditoria Fiscal · Perito N.º 1827/OCP</small><br>
                <small style="font-family: monospace;">Assinado Digitalmente (SHA-256: a1b2c3...f6e7) · RFC 3161: ${currentDate} 14:23:17 UTC</small>
            </div>
        </div>
    `;

    reportContent.innerHTML = reportTemplate;
    reportOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    console.log('%c[VDC] Visualizador de relatório forense aberto', 'color: #4a90e2; font-family: monospace;');
}

function closeForensicReport() {
    const reportOverlay = document.getElementById('reportOverlay');
    if (reportOverlay) {
        reportOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ============================================================================
// 11. INICIALIZAÇÃO
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cIFDE - PROBATUM: Website Institucional Ativo.', 'color: #c5a059; font-weight: bold;');
    console.log('%cVDC System v12.8.3 integration loaded.', 'color: #4a90e2; font-family: monospace;');
    
    setupHashCopy();
    simulateQRCode();
    typeWriterEffect();
    
    setTimeout(() => {
        showToast('IFDE - PROBATUM · Sistema Forense Ativo · SHA-256', 'info');
    }, 2000);
});

// ============================================================================
// 12. EFEITO GLITCH NO HOVER
// ============================================================================
const glitchElements = document.querySelectorAll('.glitch-hover');
glitchElements.forEach(el => {
    el.setAttribute('data-text', el.textContent);
});

// ============================================================================
// 13. FECHAR MODAL CLICANDO FORA
// ============================================================================
window.onclick = function(event) {
    const modal = document.getElementById('protocolModal');
    if (event.target == modal) {
        closeProtocol();
    }
    
    const reportOverlay = document.getElementById('reportOverlay');
    if (event.target == reportOverlay) {
        closeForensicReport();
    }
};

// ============================================================================
// 14. EXPOR FUNÇÕES GLOBALMENTE
// ============================================================================
window.openProtocol = openProtocol;
window.closeProtocol = closeProtocol;
window.openForensicReport = openForensicReport;
window.closeForensicReport = closeForensicReport;
