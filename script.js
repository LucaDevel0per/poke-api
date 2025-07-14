async function buscarPokemon() {
    const nome = document.getElementById("nome").value.toLowerCase().trim();
    const resultado = document.getElementById("resultado");
    const loading = document.getElementById("loading");
    
    // Verificar se o nome foi digitado
    if (!nome) {
        mostrarErro("Por favor, digite o nome de um Pokémon!");
        return;
    }

    // Mostrar loading
    loading.style.display = "block";
    resultado.innerHTML = "";
    resultado.classList.remove("show");

    try {
        const resposta = await fetch(`http://localhost:3001/pokemon/${nome}`);
        
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado!");
        }
        
        const data = await resposta.json();
        
        // Esconder loading
        loading.style.display = "none";
        
        // Mostrar resultado com animação
        setTimeout(() => {
            exibirPokemon(data);
        }, 100);
        
    } catch (err) {
        loading.style.display = "none";
        mostrarErro("Pokémon não encontrado! Verifique o nome e tente novamente.");
    }
}

function exibirPokemon(data) {
    const resultado = document.getElementById("resultado");
    
    // Criar os tipos como badges
    const tiposBadges = data.types.map(t => 
        `<span class="type-badge">${t.type.name}</span>`
    ).join('');
    
    resultado.innerHTML = `
        <div class="pokemon-card">
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" 
                 alt="${data.name}" 
                 onerror="this.src='https://via.placeholder.com/150x150?text=No+Image'" />
            
            <div class="pokemon-info">
                <div class="info-item">
                    <strong>ID</strong>
                    <span>#${String(data.id).padStart(3, '0')}</span>
                </div>
                <div class="info-item">
                    <strong>Altura</strong>
                    <span>${(data.height / 10).toFixed(1)} m</span>
                </div>
                <div class="info-item">
                    <strong>Peso</strong>
                    <span>${(data.weight / 10).toFixed(1)} kg</span>
                </div>
                <div class="info-item">
                    <strong>Experiência</strong>
                    <span>${data.base_experience}</span>
                </div>
            </div>
            
            <div class="types">
                <strong style="color: #3498db; display: block; margin-bottom: 10px;">
                    <i class="fas fa-tags"></i> TIPOS
                </strong>
                ${tiposBadges}
            </div>
        </div>
    `;
    
    // Adicionar animação
    resultado.classList.add("show");
}

function mostrarErro(mensagem) {
    const resultado = document.getElementById("resultado");
    
    resultado.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            ${mensagem}
        </div>
    `;
    
    resultado.classList.add("show");
}

// Permitir busca com Enter
document.getElementById("nome").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarPokemon();
    }
});

// Limpar resultado quando começar a digitar novamente
document.getElementById("nome").addEventListener("input", function() {
    const resultado = document.getElementById("resultado");
    resultado.classList.remove("show");
});