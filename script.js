'use strict';

const IFDE_PROBATUM = {
    init() {
        this.startAnalysis();
        console.log("IFDE - PROBATUM: Sistema de Peritagem Forense Ativado.");
    },

    startAnalysis() {
        const terminal = document.getElementById('output-stream');
        const sequences = [
            "> Acedendo a ficheiros SAFT-T...",
            "> Mapeando discrepâncias de IVA...",
            "> Rastreando endereço Blockchain...",
            "> Prova consolidada com Master Hash."
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if(i < sequences.length) {
                terminal.innerHTML += `<br>${sequences[i]}`;
                i++;
            } else {
                clearInterval(interval);
            }
        }, 1500);
    }
};

document.addEventListener('DOMContentLoaded', () => IFDE_PROBATUM.init());
