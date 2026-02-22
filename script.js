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
        this.color = `rgba(197, 160, 89, ${Math.random() * 0.5 + 0.2})`;
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
        
        // Ocasionalmente desenhar linhas entre partículas próximas
        particles.forEach(p => {
            const dx = this.x - p.x;
            const dy = this.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 50 && p !== this) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(197, 160, 89, ${0.1 * (1 - distance/50)})`;
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
const revealElements = document.querySelectorAll('.reveal-text, h2, .stat-card');

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
// 3. FUNÇÃO DE CÓPIA DE HASH (INTEGRAÇÃO VDC)
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
// 4. SISTEMA DE TOAST (NOTIFICAÇÕES)
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
// 5. EFEITO DE DIGITAÇÃO NO CONSOLE (SIMULAÇÃO VDC)
// ============================================================================
function typeWriterEffect() {
    const messages = [
        'VDC System v12.8.3 initializing...',
        'Loading forensic modules...',
        'SHA-256: d10c29fc8cd9a1f73483718b3b86545c',
        'Chain of custody established',
        'Smoking Gun detected: 57.658,00 € (61.46%)',
        'IFDE - PROBATUM · Court Ready · Gold'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < messages.length) {
            console.log(`%c[VDC] ${messages[i]}`, 'color: #c5a059; font-family: monospace;');
            i++;
        } else {
            clearInterval(interval);
            console.log('%c[VDC] System ready. Waiting for evidence...', 'color: #00e5ff; font-family: monospace; font-weight: bold;');
        }
    }, 800);
}

// ============================================================================
// 6. SIMULAÇÃO DE QR CODE DINÂMICO (OPCIONAL)
// ============================================================================
function simulateQRCode() {
    const qrDemo = document.getElementById('qrcode-demo');
    if (!qrDemo) return;
    
    // Criar um QR Code simulado com div (efeito visual)
    qrDemo.style.position = 'relative';
    qrDemo.style.width = '60px';
    qrDemo.style.height = '60px';
    qrDemo.style.background = '#fff';
    qrDemo.style.padding = '4px';
    
    // Adicionar padrão simples de QR
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if ((i + j) % 2 === 0) {
                const dot = document.createElement('div');
                dot.style.position = 'absolute';
                dot.style.width = '8px';
                dot.style.height = '8px';
                dot.style.background = '#000';
                dot.style.top = `${8 + i * 10}px`;
                dot.style.left = `${8 + j * 10}px`;
                qrDemo.appendChild(dot);
            }
        }
    }
}

// ============================================================================
// 7. INICIALIZAÇÃO
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('IFDE - PROBATUM: Website Institucional Ativo.');
    console.log('VDC System v12.8.3 integration loaded.');
    
    setupHashCopy();
    simulateQRCode();
    typeWriterEffect();
    
    // Mostrar toast de boas-vindas após 2 segundos
    setTimeout(() => {
        showToast('IFDE - PROBATUM · Sistema Forense Ativo', 'info');
    }, 2000);
});

// ============================================================================
// 8. ANIMAÇÃO CONTÍNUA DO LASER (JÁ EXISTE NO CSS)
// ============================================================================
// (mantido apenas para referência)
