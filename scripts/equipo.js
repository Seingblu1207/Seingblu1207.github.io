const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const cloneButton = document.getElementById('boton_añadir');
const cloneContainer = document.getElementById('poke-card-team');
const clearButton = document.createElement('boton_borrar');

window.addEventListener('load', () => {
    loadClonedCards();
});

// Restaurar el contador de clonaciones permitidas al cargar la página
const maxClones = 6; // Máximo de clonaciones permitidas
let cloneCounter = Math.min(parseInt(localStorage.getItem('cloneCounter')) || 0, maxClones);

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FF005E',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    fairy: '#F0B6D5',
    default: '#2A1A1F',
};

const loadClonedCards = () => {
    for (let i = 1; i <= cloneCounter; i++) {
        const clonedCardData = JSON.parse(localStorage.getItem(`clonedCard${i}`));
        if (clonedCardData) {
            const clonedCard = pokeCard.cloneNode(true);
            clonedCard.setAttribute('poke-card-team', ''); // Cambiamos el atributo
            pokeName.textContent = clonedCardData.name;
            pokeImg.setAttribute('src', clonedCardData.image);
            pokeId.textContent = clonedCardData.id;
            renderPokemonTypes(clonedCardData.types);
            cloneContainer.appendChild(clonedCard);
        }
    }
};


// Event listener para clonar tarjetas
cloneButton.addEventListener('click', () => {
    if (cloneCounter < 6) {
        const clonedCard = pokeCard.cloneNode(true);
        clonedCard.setAttribute('poke-card-team', ''); // Cambiamos el atributo
        cloneContainer.appendChild(clonedCard);
        cloneCounter++;

        // Guardar datos de la tarjeta clonada en localStorage
        const clonedCardData = {
            name: pokeName.textContent,
            image: pokeImg.getAttribute('src'),
            id: pokeId.textContent,
            types: Array.from(pokeTypes.children).map(type => type.textContent)
        };
        localStorage.setItem(`clonedCard${cloneCounter}`, JSON.stringify(clonedCardData));
    }
});

// Event listener para borrar todas las tarjetas clonadas
clearButton.addEventListener('click', () => {
    // Eliminar todas las tarjetas clonadas del DOM
    cloneContainer.innerHTML = '';
    // Limpiar el localStorage
    for (let i = 1; i <= cloneCounter; i++) {
        localStorage.removeItem(`clonedCard${i}`);
    }
    // Restablecer el contador
    cloneCounter = 0;
});

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'images/poke-shadow.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}