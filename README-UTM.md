# 🎯 Sistema de Captura de UTMs - MedGM

## ✅ Instalação Concluída

O script de captura de UTMs foi adicionado à página com sucesso!

## 📋 O que foi implementado

### Arquivos criados/modificados:
- ✅ `utm-tracker.js` - Script de captura e rastreamento
- ✅ `index.html` - Adicionado script no final da página
- ✅ Backup criado: `index.html.backup-utm-[timestamp]`

## 🔧 Como funciona

### 1. Captura automática de UTMs
O script detecta automaticamente os seguintes parâmetros na URL:
- `utm_source` (ex: facebook, google, instagram)
- `utm_medium` (ex: cpc, social, email)
- `utm_campaign` (ex: lancamento-2024)
- `utm_content` (ex: variacao-a, video-1)
- `utm_term` (ex: medico-faturamento)

### 2. Persistência
- UTMs são salvos no **localStorage** do navegador
- Duram **30 dias** (configurable)
- Sobrevivem a navegação entre páginas

### 3. Adição automática aos links
- Todos os links para `pay.hub.la` recebem os UTMs automaticamente
- Funciona para links existentes e dinâmicos
- Atualização em tempo real

## 🧪 Como testar

### Teste 1: Captura básica
Acesse a página com UTMs na URL:
```
https://scriptsecretaria.medgm.com.br/?utm_source=facebook&utm_medium=cpc&utm_campaign=teste
```

**Resultado esperado:**
- Abra o Console (F12 > Console)
- Você verá: `✅ UTMs capturados: {...}`

### Teste 2: Verificar links
No Console, digite:
```javascript
document.querySelectorAll('a[href*="pay.hub.la"]').forEach(link => console.log(link.href))
```

**Resultado esperado:**
- O link deve incluir os UTMs:
```
https://pay.hub.la/U6njY8xKZqJTZ03ehhOu?utm_source=facebook&utm_medium=cpc&utm_campaign=teste
```

### Teste 3: Persistência
1. Acesse a página com UTMs
2. Feche e abra o navegador
3. Volte para a página (sem UTMs na URL)
4. Verifique os links - ainda devem ter UTMs

### Teste 4: Debug manual
No Console, você pode usar:
```javascript
// Ver UTMs salvos
MedGMUTMTracker.getUTMs()

// Limpar UTMs
MedGMUTMTracker.clearUTMs()

// Forçar atualização dos links
MedGMUTMTracker.updateLinks()
```

## 🎨 Exemplo de URL de campanha

### Facebook Ads
```
https://scriptsecretaria.medgm.com.br/?utm_source=facebook&utm_medium=cpc&utm_campaign=secretarias-jan-2024&utm_content=video-dra-maria&utm_term=agenda-medica
```

### Instagram Story
```
https://scriptsecretaria.medgm.com.br/?utm_source=instagram&utm_medium=story&utm_campaign=secretarias-jan-2024&utm_content=carrossel-1
```

### Email Marketing
```
https://scriptsecretaria.medgm.com.br/?utm_source=email&utm_medium=newsletter&utm_campaign=secretarias-jan-2024&utm_content=email-boas-vindas
```

### Google Ads
```
https://scriptsecretaria.medgm.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=secretarias-jan-2024&utm_term=curso-secretaria-medica
```

## 📊 Como usar no Vercel

Certifique-se de que ambos os arquivos estão no repositório:
```bash
git add index.html utm-tracker.js
git commit -m "Adiciona sistema de captura de UTMs"
git push
```

O Vercel irá fazer o deploy automaticamente.

## ⚙️ Configurações avançadas

Para modificar o comportamento, edite `utm-tracker.js`:

```javascript
const CONFIG = {
    checkoutDomain: 'pay.hub.la',        // Domínio do checkout
    storageKey: 'medgm_utm_params',      // Chave no localStorage
    utmParams: [...],                     // Parâmetros a capturar
    expirationDays: 30                    // Dias até expirar
};
```

## 🐛 Troubleshooting

### Os UTMs não aparecem nos links
1. Abra o Console (F12)
2. Verifique se há erros
3. Digite `MedGMUTMTracker.getUTMs()` para ver se há UTMs salvos

### Os UTMs não estão sendo salvos
1. Verifique se o navegador permite localStorage
2. Tente em modo anônimo
3. Limpe o cache e cookies

### O script não carrega
1. Verifique se `utm-tracker.js` está no mesmo diretório que `index.html`
2. Verifique permissões do arquivo
3. Veja se há erros 404 no Network tab (F12 > Network)

## 📱 Suporte

O script funciona em:
- ✅ Chrome/Edge (todos)
- ✅ Firefox (todos)
- ✅ Safari (desktop e mobile)
- ✅ Mobile browsers

## 🚀 Próximos passos

1. **Deploy no Vercel** - Push para produção
2. **Teste com tráfego real** - Use URLs com UTMs em anúncios
3. **Monitore conversões** - Verifique no Hubla se os UTMs estão chegando
4. **Analytics** - Configure eventos no Meta Pixel/Google Analytics

---

**Desenvolvido para MedGM**
Data: 2024-02-16
