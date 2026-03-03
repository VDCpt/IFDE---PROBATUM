/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * UNIFED – PROBATUM v13.1.7-GOLD · DORA COMPLIANT · COURT READY
 * Sistema de Tradução Dinâmica PT/EN
 * ═══════════════════════════════════════════════════════════════════════════════
 */

'use strict';

console.log('[UNIFED-PROBATUM] v13.1.7-GOLD · Inicializado');

// ═══════════════════════════════════════════════════════════════════════════════
// SISTEMA DE TRADUÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

const translations = {
    pt: {
        // Navegação
        navAudit: 'Auditoria',
        navBlockchain: 'Blockchain',
        navSystem: 'Sistema',
        navConsulting: 'Consultoria',
        
        // Hero
        heroProof: 'PROVA DIGITAL MATERIAL · SMOKING GUN',
        heroTitle: 'A Verdade Material Através do Facto.',
        heroSubtitle: 'Especialização em Peritagem Forense e Inteligência Económico-Financeira para o Setor Jurídico de Elite.',
        dropzoneText: 'Arraste ficheiro para simular cadeia de custódia',
        
        // Stats
        statEvidence: 'Evidências Processadas',
        statValue: 'Valor em Análise',
        statCustody: 'Cadeia de Custódia',
        scrollText: 'DISCREPÂNCIA DETETADA',
        
        // Terminal
        terminalLoad: '[LOAD] Módulo de triangulação financeira',
        
        // Secções
        sec1Title: 'Auditoria Fiscal & Compliance',
        sec1Text: 'Processamento de estruturas SAF-T e conformidade DAC7 com precisão pericial. Identificação de anomalias fiscais através do motor forense UNIFED – PROBATUM v13.1.7-GOLD.',
        
        sec2Title: 'Blockchain Deep Trace',
        sec2Text: 'Rastreio de ativos em ambientes descentralizados com validação SHA-256 e cadeia de custódia forense.',
        
        // CTA
        ctaTitle: 'Detém a Smoking Gun?',
        ctaText: 'Consultoria estratégica para Sociedades de Advogados.',
        ctaButton: 'APRESENTAR PROVA',
        
        // Footer
        footerTagline: 'Unidade Independente de Inteligência Forense Económica e Digital',
        footerValidation: 'VALIDAÇÃO TÉCNICA INDEPENDENTE',
        footerAnalyst: 'Analista e Consultor Forense Independente'
    },
    
    en: {
        // Navigation
        navAudit: 'Audit',
        navBlockchain: 'Blockchain',
        navSystem: 'System',
        navConsulting: 'Consulting',
        
        // Hero
        heroProof: 'MATERIAL DIGITAL EVIDENCE · SMOKING GUN',
        heroTitle: 'Material Truth Through Fact.',
        heroSubtitle: 'Specialization in Forensic Analysis and Economic-Financial Intelligence for Elite Legal Sector.',
        dropzoneText: 'Drag file to simulate chain of custody',
        
        // Stats
        statEvidence: 'Evidence Processed',
        statValue: 'Value Under Analysis',
        statCustody: 'Chain of Custody',
        scrollText: 'DISCREPANCY DETECTED',
        
        // Terminal
        terminalLoad: '[LOAD] Financial triangulation module',
        
        // Sections
        sec1Title: 'Tax Audit & Compliance',
        sec1Text: 'Processing of SAF-T structures and DAC7 compliance with expert precision. Identification of fiscal anomalies through UNIFED – PROBATUM v13.1.7-GOLD forensic engine.',
        
        sec2Title: 'Blockchain Deep Trace',
        sec2Text: 'Asset tracking in decentralized environments with SHA-256 validation and forensic chain of custody.',
        
        // CTA
        ctaTitle: 'Have the Smoking Gun?',
        ctaText: 'Strategic consulting for Law Firms.',
        ctaButton: 'SUBMIT EVIDENCE',
        
        // Footer
        footerTagline: 'Independent Unit of Forensic Economic and Digital Intelligence',
        footerValidation: 'INDEPENDENT TECHNICAL VALIDATION',
        footerAnalyst: 'Independent Forensic Analyst and Consultant'
    }
};

// Idioma atual (padrão: PT)
let currentLanguage = 'pt';

// ═══════════════════════════════════════════════════════════════════════════════
// FUNÇÃO DE TROCA DE IDIOMA
// ═══════════════════════════════════════════════════════════════════════════════

function switchLanguage() {
    // Alternar idioma
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    
    // Atualizar HTML lang
    document.getElementById('htmlRoot').setAttribute('lang', currentLanguage === 'pt' ? 'pt-PT' : 'en-US');
    
    // Atualizar todos os textos
    const lang = translations[currentLanguage];
    
    Object.keys(lang).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = lang[key];
        }
    });
    
    // Atualizar estado visual do botão
    updateLangToggleState();
    
    // Log
    console.log(`[UNIFED-LANG] Idioma alterado para: ${currentLanguage.toUpperCase()}`);
    
    // Animação de confirmação
    showLangChangeNotification();
}

// ═══════════════════════════════════════════════════════════════════════════════
// ATUALIZAR ESTADO VISUAL DO BOTÃO
// ═══════════════════════════════════════════════════════════════════════════════

function updateLangToggleState() {
    const ptOption = document.querySelector('.lang-option[data-lang="pt"]');
    const enOption = document.querySelector('.lang-option[data-lang="en"]');
    
    if (currentLanguage === 'pt') {
        ptOption.classList.add('active');
        enOption.classList.remove('active');
    } else {
        enOption.classList.add('active');
        ptOption.classList.remove('active');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICAÇÃO DE TROCA DE IDIOMA
// ═══════════════════════════════════════════════════════════════════════════════

function showLangChangeNotification() {
    const notification = document.createElement('div');
    notification.className = 'lang-notification';
    notification.innerHTML = `
        <i class="fas fa-language"></i>
        <span>${currentLanguage === 'pt' ? 'Português' : 'English'}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remover após 2 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS DE TRACKING (Efeito Visual)
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('trackingCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.5 + 0.5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.8)';
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('[UNIFED-PROBATUM] Sistema inicializado · Idioma: PT');
    updateLangToggleState();
});

console.log('[UNIFED-PROBATUM] Script carregado com sucesso');
