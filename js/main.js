// ── Catálogo de productos ──────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Nebulosa Violeta",
    category: "Exótica",
    emoji: "🪻",
    price: 8990,
    shortDesc: "Florece cada luna llena con pétalos que irradian luz propia.",
    desc: "La Nebulosa Violeta proviene de los cinturones de asteroides del sector Orión. Sus pétalos bioluminiscentes crean un espectáculo nocturno inigualable. Requiere exposición a la luz estelar sintética y sustrato cósmico enriquecido con polvo de meteorito.",
    care: { luz: "Alta", agua: "Mínima", dificultad: "Media" },
    stock: 12,
    featured: true
  },
  {
    id: 2,
    name: "Cactus Estelar",
    category: "Resistente",
    emoji: "🌵",
    price: 4990,
    shortDesc: "Espinas que absorben la radiación cósmica y la convierten en energía.",
    desc: "El Cactus Estelar es el compañero ideal para viajeros espaciales. Sobrevive en las condiciones más extremas del universo y acumula agua de las nubes moleculares interestelares. Sus espinas forman patrones fractales únicos en cada ejemplar.",
    care: { luz: "Media", agua: "Casi nula", dificultad: "Fácil" },
    stock: 30,
    featured: true
  },
  {
    id: 3,
    name: "Helechos de Saturno",
    category: "Tropicosmos",
    emoji: "🌿",
    price: 6490,
    shortDesc: "Frondas que despliegan mapas de constelaciones en su superficie.",
    desc: "Los Helechos de Saturno crecen en los anillos exteriores del gigante gaseoso. Sus frondas verdes vibrantes presentan patrones que replican las constelaciones visibles desde la Tierra. Se adaptan perfectamente a interiores con humedad moderada.",
    care: { luz: "Baja", agua: "Alta", dificultad: "Fácil" },
    stock: 18,
    featured: true
  },
  {
    id: 4,
    name: "Rosa Marciana",
    category: "Exótica",
    emoji: "🌹",
    price: 12990,
    shortDesc: "La flor más rara del sistema solar, con fragancia a hierro y maravilla.",
    desc: "Descubierta en los valles marcianos de Valles Marineris, esta rosa sobrevivió milenios bajo la superficie roja. Sus pétalos de color sangre oxidada desprenden un aroma mineral único mezclado con compuestos orgánicos primordiales.",
    care: { luz: "Alta", agua: "Baja", dificultad: "Difícil" },
    stock: 5,
    featured: false
  },
  {
    id: 5,
    name: "Bambú Cuántico",
    category: "Tropicosmos",
    emoji: "🎋",
    price: 5490,
    shortDesc: "Crece en múltiples dimensiones simultáneamente.",
    desc: "El Bambú Cuántico desafía la física clásica: sus nodos contienen partículas en superposición que le permiten adaptarse instantáneamente a cualquier entorno. Su crecimiento es rápido y crea divisores de espacio-tiempo perfectos para interiores.",
    care: { luz: "Media", agua: "Alta", dificultad: "Media" },
    stock: 22,
    featured: false
  },
  {
    id: 6,
    name: "Tulipán Nebuloso",
    category: "Exótica",
    emoji: "🌷",
    price: 7990,
    shortDesc: "Cambia de color según las corrientes de viento solar.",
    desc: "El Tulipán Nebuloso fue criado en las estaciones orbitales de Lagrange. Su pigmento fotocrómico reacciona al viento solar, desplegando una paleta que va del turquesa al magenta en minutos. Cada mañana ofrece una combinación de colores única.",
    care: { luz: "Alta", agua: "Media", dificultad: "Media" },
    stock: 9,
    featured: false
  },
  {
    id: 7,
    name: "Suculenta Pulsar",
    category: "Resistente",
    emoji: "🪴",
    price: 3490,
    shortDesc: "Emite pulsos de luz infrarroja que purifican el aire de tu hogar.",
    desc: "La Suculenta Pulsar es nuestra planta más accesible. Capturada cerca de un púlsar magnetar, absorbió su ritmo electromagnético. Hoy emite suaves pulsos de luz infrarroja que estudios demuestran mejoran el estado de ánimo y purifican el ambiente.",
    care: { luz: "Baja", agua: "Mínima", dificultad: "Fácil" },
    stock: 50,
    featured: true
  },
  {
    id: 8,
    name: "Orquídea Void",
    category: "Exótica",
    emoji: "🌸",
    price: 15990,
    shortDesc: "La flor del vacío interestelar. Solo 3 ejemplares disponibles.",
    desc: "La Orquídea Void florece en las regiones más oscuras del universo conocido, donde la densidad de materia oscura es máxima. Su corola absorbe la luz en ciertas longitudes de onda, creando un efecto visual que parece un agujero en el espacio.",
    care: { luz: "Ninguna", agua: "Nebulizada", dificultad: "Experto" },
    stock: 3,
    featured: false
  }
];

// ── Carrito (usa localStorage para persistencia) ───────────────────────────
let cart = loadCart();

function loadCart() {
  try {
    const saved = localStorage.getItem('flora_cart');
    return saved ? JSON.parse(saved) : [];
  } catch(e) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem('flora_cart', JSON.stringify(cart));
  } catch(e) { /* silent fail */ }
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }

  saveCart();
  updateCartUI();
  showToast(`${product.emoji} ${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  if (typeof renderCartPage === 'function') renderCartPage();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveCart();
  updateCartUI();
  if (typeof renderCartPage === 'function') renderCartPage();
}

function updateCartUI() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
    // Ocultar badge si carrito vacío
    badge.style.display = count === 0 ? 'none' : 'inline';
  });
}

// ── Toast notificación ─────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.innerHTML = '<span class="toast-dot"></span><span class="toast-msg"></span>';
    document.body.appendChild(toast);
  }
  clearTimeout(toastTimer);
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── Generar navbar común ───────────────────────────────────────────────────
function buildNavbar(activePage) {
  const pages = [
    { href: '../index.html',          label: 'Inicio',   key: 'home' },
    { href: '../pages/carrito.html',  label: 'Carrito',  key: 'carrito' },
    { href: '../pages/contacto.html', label: 'Contacto', key: 'contacto' }
  ];

  const navItems = pages.map(p => `
    <li class="nav-item">
      <a class="nav-link ${activePage === p.key ? 'active' : ''}" href="${p.href}">
        ${p.label}
        ${p.key === 'carrito' ? `<span class="cart-badge" style="display:${getCartCount() === 0 ? 'none' : 'inline'}">${getCartCount()}</span>` : ''}
      </a>
    </li>
  `).join('');

  return `
  <nav class="navbar navbar-flora navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="../index.html">✦ Flora Cosmica</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Menú">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto align-items-center">
          ${navItems}
        </ul>
      </div>
    </div>
  </nav>`;
}

function buildNavbarHome(activePage) {
  const pages = [
    { href: './index.html',          label: 'Inicio',   key: 'home' },
    { href: './pages/carrito.html',  label: 'Carrito',  key: 'carrito' },
    { href: './pages/contacto.html', label: 'Contacto', key: 'contacto' }
  ];

  const navItems = pages.map(p => `
    <li class="nav-item">
      <a class="nav-link ${activePage === p.key ? 'active' : ''}" href="${p.href}">
        ${p.label}
        ${p.key === 'carrito' ? `<span class="cart-badge" style="display:${getCartCount() === 0 ? 'none' : 'inline'}">${getCartCount()}</span>` : ''}
      </a>
    </li>
  `).join('');

  return `
  <nav class="navbar navbar-flora navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="./index.html">✦ Flora Cosmica</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Menú">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto align-items-center">
          ${navItems}
        </ul>
      </div>
    </div>
  </nav>`;
}

// ── Footer común ───────────────────────────────────────────────────────────
function buildFooter(basePath = '../') {
  return `
  <footer>
    <div class="container">
      <div class="row gy-4">
        <div class="col-md-4">
          <div class="footer-brand mb-2">✦ Flora Cosmica</div>
          <p style="font-size:.85rem;color:var(--text-muted);max-width:260px;">
            La primera boutique de flora interestelar del sistema solar. Enviamos a cualquier coordenada galáctica.
          </p>
        </div>
        <div class="col-md-2">
          <h5>Tienda</h5>
          <ul>
            <li><a href="${basePath}index.html">Catálogo</a></li>
            <li><a href="${basePath}pages/carrito.html">Carrito</a></li>
            <li><a href="${basePath}pages/contacto.html">Contacto</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Cuidados</h5>
          <ul>
            <li><a href="#">Guía de riego</a></li>
            <li><a href="#">Luz estelar sintética</a></li>
            <li><a href="#">Sustratos cósmicos</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Contacto</h5>
          <ul>
            <li style="color:var(--text-muted);font-size:.88rem;">📡 Estación Orbital Lagrange L4</li>
            <li style="color:var(--text-muted);font-size:.88rem;">📬 flora@cosmica.gal</li>
            <li style="color:var(--text-muted);font-size:.88rem;">☎ +56 9 8765 4321</li>
          </ul>
        </div>
      </div>
      <hr class="footer-divider">
      <p class="footer-copy text-center">© 2025 Flora Cosmica SpA · Santiago, Vía Láctea · Todos los derechos reservados</p>
    </div>
  </footer>`;
}

// ── Formatear precio ───────────────────────────────────────────────────────
function formatPrice(n) {
  return '$' + n.toLocaleString('es-CL');
}

// ── Init al cargar cualquier página ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});
