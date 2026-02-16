/**
 * MedGM - Script de Captura e Rastreamento de UTMs
 * Captura UTMs da URL e adiciona automaticamente aos links de checkout
 */

(function() {
    'use strict';

    // Configurações
    const CONFIG = {
        checkoutDomain: 'pay.hub.la',
        storageKey: 'medgm_utm_params',
        utmParams: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'],
        expirationDays: 30
    };

    /**
     * Captura parâmetros UTM da URL atual
     */
    function captureUTMs() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmData = {};
        let hasUTMs = false;

        CONFIG.utmParams.forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                utmData[param] = value;
                hasUTMs = true;
            }
        });

        if (hasUTMs) {
            // Adiciona timestamp para expiração
            utmData.timestamp = new Date().getTime();

            // Salva no localStorage
            try {
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(utmData));
                console.log('✅ UTMs capturados:', utmData);
            } catch (e) {
                console.error('❌ Erro ao salvar UTMs:', e);
            }
        }

        return utmData;
    }

    /**
     * Recupera UTMs salvos (se não estiverem expirados)
     */
    function getSavedUTMs() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (!saved) return null;

            const data = JSON.parse(saved);
            const now = new Date().getTime();
            const expirationTime = CONFIG.expirationDays * 24 * 60 * 60 * 1000;

            // Verifica se expirou
            if (data.timestamp && (now - data.timestamp > expirationTime)) {
                localStorage.removeItem(CONFIG.storageKey);
                console.log('⏰ UTMs expiraram e foram removidos');
                return null;
            }

            return data;
        } catch (e) {
            console.error('❌ Erro ao recuperar UTMs:', e);
            return null;
        }
    }

    /**
     * Adiciona UTMs a uma URL
     */
    function addUTMsToURL(url, utmData) {
        if (!utmData || Object.keys(utmData).length === 0) {
            return url;
        }

        try {
            const urlObj = new URL(url);

            // Adiciona cada UTM como parâmetro
            CONFIG.utmParams.forEach(param => {
                if (utmData[param]) {
                    urlObj.searchParams.set(param, utmData[param]);
                }
            });

            return urlObj.toString();
        } catch (e) {
            console.error('❌ Erro ao adicionar UTMs à URL:', e);
            return url;
        }
    }

    /**
     * Atualiza todos os links de checkout com UTMs
     */
    function updateCheckoutLinks(utmData) {
        if (!utmData) return;

        // Seleciona todos os links que apontam para o checkout
        const checkoutLinks = document.querySelectorAll(`a[href*="${CONFIG.checkoutDomain}"]`);

        checkoutLinks.forEach(link => {
            const originalHref = link.getAttribute('href');
            const newHref = addUTMsToURL(originalHref, utmData);

            if (originalHref !== newHref) {
                link.setAttribute('href', newHref);
                console.log('🔗 Link atualizado:', {
                    original: originalHref,
                    updated: newHref
                });
            }
        });

        console.log(`✅ ${checkoutLinks.length} link(s) de checkout atualizado(s) com UTMs`);
    }

    /**
     * Monitora mudanças no DOM para capturar links adicionados dinamicamente
     */
    function observeDOMChanges(utmData) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            // Verifica se o próprio node é um link
                            if (node.tagName === 'A' && node.href && node.href.includes(CONFIG.checkoutDomain)) {
                                const newHref = addUTMsToURL(node.href, utmData);
                                node.setAttribute('href', newHref);
                            }

                            // Verifica links dentro do node
                            const links = node.querySelectorAll ? node.querySelectorAll(`a[href*="${CONFIG.checkoutDomain}"]`) : [];
                            links.forEach(link => {
                                const newHref = addUTMsToURL(link.href, utmData);
                                link.setAttribute('href', newHref);
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('👁️ Observador de DOM ativado para links dinâmicos');
    }

    /**
     * Inicialização
     */
    function init() {
        console.log('🚀 Script de rastreamento UTM iniciado');

        // Captura UTMs da URL atual
        const newUTMs = captureUTMs();

        // Pega UTMs salvos (usa os novos se existirem, senão usa os salvos)
        const utmData = Object.keys(newUTMs).length > 0 ? newUTMs : getSavedUTMs();

        if (utmData) {
            console.log('📊 UTMs ativos:', utmData);

            // Atualiza links existentes
            updateCheckoutLinks(utmData);

            // Monitora mudanças no DOM
            observeDOMChanges(utmData);
        } else {
            console.log('ℹ️ Nenhum UTM encontrado');
        }
    }

    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expõe funções globalmente para debug (opcional)
    window.MedGMUTMTracker = {
        getUTMs: getSavedUTMs,
        clearUTMs: () => {
            localStorage.removeItem(CONFIG.storageKey);
            console.log('🗑️ UTMs limpos');
        },
        updateLinks: () => {
            const utmData = getSavedUTMs();
            updateCheckoutLinks(utmData);
        }
    };

})();
