// ═══════════════════════════════════════════
//  BASE DE DADOS TEMPORÁRIA (Simula um Banco de Dados)
// ═══════════════════════════════════════════
const usersDB = {
    "admin": { pass: "admin123", type: "administrador" },
    "aluno": { pass: "aluno167", type: "aluno" },
    "funcionario": { pass: "funcionario456", type: "funcionario" },
    "ex aluno": { pass: "ex aluno789", type: "ex_funcionario" }
};

// ═══════════════════════════════════════════
//  FUNÇÃO: MOSTRAR/OCULTAR SENHA
// ═══════════════════════════════════════════
function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        element.textContent = "🙈";
    } else {
        input.type = "password";
        element.textContent = "👁️";
    }
}

// ═══════════════════════════════════════════
//  FUNÇÃO: TROCAR TELA
// ═══════════════════════════════════════════
function showScreen(name) {
    // Remove classe active de todas as telas
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // Ativa a tela solicitada
    const targetScreen = document.getElementById('screen-' + name);
    if (targetScreen) targetScreen.classList.add('active');

    // Reseta estado da tela de recuperação ao entrar nela
    if (name === 'recover') {
        document.getElementById('recover-success').classList.remove('show');
        document.getElementById('form-recover').style.display = 'block';
        document.getElementById('recover-links').style.display = 'block';
        document.getElementById('rec-email').value = '';
    }

    // Limpa erros ao trocar de tela
    const passError = document.getElementById('pass-error');
    if (passError) passError.style.display = 'none';
}

// ═══════════════════════════════════════════
//  TOAST DE NOTIFICAÇÃO
// ═══════════════════════════════════════════
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = type === 'success' ? '✅' : '❌';
    
    toast.textContent = icon + '  ' + message;
    toast.className = 'toast ' + type + ' show';

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ═══════════════════════════════════════════
//  HANDLER: LOGIN (VERIFICAÇÃO DE ACESSO)
// ═══════════════════════════════════════════
function handleLogin(event) {
    event.preventDefault();

    const userValue = document.getElementById('login-user').value.trim();
    const passValue = document.getElementById('login-pass').value;
    const typeValue = document.getElementById('login-type').value;

    const userData = usersDB[userValue];

    if (userData) {
        // Importante: userData.type deve bater com o value do <select>
        if (userData.pass === passValue && userData.type === typeValue) {
            showToast(`Acesso liberado! Bem-vindo(a), ${userValue}.`);
            // Exemplo: window.location.href = 'dashboard.html';
        } else if (userData.pass !== passValue) {
            showToast('Senha incorreta!', 'error');
        } else {
            showToast('Tipo de conta não corresponde!', 'error');
        }
    } else {
        showToast('Usuário não encontrado!', 'error');
    }
}

// ═══════════════════════════════════════════
//  HANDLER: CADASTRO (SALVA NO BANCO TEMPORÁRIO)
// ═══════════════════════════════════════════
function handleRegister(event) {
    event.preventDefault();

    const user = document.getElementById('reg-user').value.trim();
    const pass = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-confirm').value;
    const type = document.getElementById('reg-type').value;

    const passError = document.getElementById('pass-error');

    if (pass !== confirm) {
        passError.style.display = 'block';
        return;
    } else {
        passError.style.display = 'none';
    }

    if (pass.length < 3) {
        showToast('Senha deve ter ao menos 3 caracteres', 'error');
        return;
    }

    // Salva o novo usuário no objeto (em memória)
    usersDB[user] = { pass: pass, type: type };

    showToast('Conta criada! Agora você pode entrar.');
    event.target.reset();

    // Volta para o login após 1.5 segundos
    setTimeout(() => showScreen('login'), 1500);
}

// ═══════════════════════════════════════════
//  HANDLER: RECUPERAR SENHA
// ═══════════════════════════════════════════
function handleRecover(event) {
    event.preventDefault();
    
    document.getElementById('form-recover').style.display = 'none';
    document.getElementById('recover-links').style.display = 'none';
    
    const successMsg = document.getElementById('recover-success');
    successMsg.textContent = 'Instruções de recuperação enviadas para seu email (simulado).';
    successMsg.classList.add('show');
}