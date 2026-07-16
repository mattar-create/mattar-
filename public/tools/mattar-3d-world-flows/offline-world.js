(() => {
  const svg = document.getElementById('map');
  const wrap = document.getElementById('mapWrap');
  const tooltip = document.getElementById('tooltip');
  const selectionTitle = document.getElementById('selectionTitle');
  const selectionText = document.getElementById('selectionText');
  const selectionImage = document.getElementById('selectionImage');
  const speedInput = document.getElementById('speed');
  const speedLabel = document.getElementById('speedLabel');
  const rotateButton = document.getElementById('rotate');
  const resetButton = document.getElementById('reset');

  const W = 1100;
  const H = 880;
  const CX = W / 2;
  const CY = H / 2;
  const R = 360;
  const DEG = Math.PI / 180;

  const state = {
    rotation: [-48, -12, 0],
    autoRotate: true,
    dragging: false,
    dragStart: null,
    rotStart: null,
    activeId: '',
    lockedId: '',
    lastTime: performance.now()
  };

  const flows = [
    { id: 'sao-paulo', from: 'São Paulo', to: 'São Paulo', coords: [[-46.6333, -23.5505], [-46.6333, -23.5505]], label: 'Manifesto Como Penso Como', detail: 'São Paulo, Brasil. Projeto identificado nos destaques da gastroperformance.', image: '../../../assets/image/projetos/1 - Esculturas Comestíveis/3 Fome Come/imageye___-_imgi_3_fc_30bienal_05-copia.jpg' },
    { id: 'colombia-agua', from: 'São Paulo', to: 'Colômbia', coords: [[-46.6333, -23.5505], [-74.2973, 4.5709]], label: 'Mercado clandestino de conhecimento', detail: 'Colômbia. Relatos em torno da água e do conhecimento útil.', image: '../../../assets/image/projetos/2 - Instalações Desgustativas/7 Mulher, Vida, Liberdade/imageye___-_imgi_2_Migraflix-Overview-v-2.00_00_01_20.Quadro003.jpg' },
    { id: 'londres', from: 'São Paulo', to: 'Londres', coords: [[-46.6333, -23.5505], [-0.1276, 51.5072]], label: 'Soviet Roulette', detail: 'Londres, Reino Unido. Incerteza, contaminação e alimento como experiência crítica.', image: '../../../assets/image/projetos/1 - Esculturas Comestíveis/4 Soviet Roulette/imageye___-_imgi_1_bc6bb143-76b8-4163-9425-6a29743deeb4.jpg' },
    { id: 'toquio', from: 'São Paulo', to: 'Tóquio', coords: [[-46.6333, -23.5505], [139.6917, 35.6895]], label: 'Parallaxe', detail: 'Tóquio, Japão. Projeto internacional presente no mapa de destaques.', image: '../../../assets/image/JG0A0408 1.png' },
    { id: 'madrid', from: 'São Paulo', to: 'Madrid', coords: [[-46.6333, -23.5505], [-3.7038, 40.4168]], label: '35 Fragmentos', detail: 'Madrid, Espanha. Projeto de presença internacional da gastroperformance.', image: '../../../assets/image/_DSF6711 1.png' },
    { id: 'bogota', from: 'São Paulo', to: 'Bogotá', coords: [[-46.6333, -23.5505], [-74.0721, 4.7110]], label: 'Lo Come Lo Cura', detail: 'Bogotá, Colômbia. Experiência entre comida, cuidado e contexto social.', image: '../../../assets/image/projetos/2 - Instalações Desgustativas/7 Mulher, Vida, Liberdade/imageye___-_imgi_4_Migraflix-Overview-v-2.00_00_21_18.Quadro008.jpg' },
    { id: 'colonia', from: 'São Paulo', to: 'Colônia', coords: [[-46.6333, -23.5505], [6.9603, 50.9375]], label: 'Concreto Efêmero', detail: 'Colônia, Alemanha. Instalação comestível em diálogo com arte concreta brasileira.', image: '../../../assets/image/projetos/2 - Instalações Desgustativas/5 Concreto Efêmero/imageye___-_imgi_34_Captura-de-Tela-2023-12-21-as-08.26.56-copia-1024x700.png' },
    { id: 'mexico', from: 'São Paulo', to: 'Cidade do México', coords: [[-46.6333, -23.5505], [-99.1332, 19.4326]], label: 'Insect Flesh', detail: 'Cidade do México, México. Projeto citado na página de destaques.', image: '../../../assets/image/213__DSF2886 1.png' },
    { id: 'kiev-madrid', from: 'São Paulo', to: 'Kiev', coords: [[-46.6333, -23.5505], [30.5234, 50.4501]], label: 'Clouded Lands / Nuvem Negra', detail: 'Ucrânia e Espanha. Projetos ligados a território, memória e contaminação invisível.', image: '../../../assets/image/projetos/2 - Instalações Desgustativas/8 Nuvem Negra/imageye___-_imgi_2_IMG_5728-scaled.jpg' }
  ];

  const hubs = [
    { name: 'São Paulo', coords: [-46.6333, -23.5505], detail: 'Origem e eixo central da pesquisa de Simone Mattar.' },
    { name: 'Londres', coords: [-0.1276, 51.5072], detail: 'Soviet Roulette.' },
    { name: 'Tóquio', coords: [139.6917, 35.6895], detail: 'Parallaxe.' },
    { name: 'Madrid', coords: [-3.7038, 40.4168], detail: '35 Fragmentos.' },
    { name: 'Bogotá', coords: [-74.0721, 4.7110], detail: 'Lo Come Lo Cura.' },
    { name: 'Colônia', coords: [6.9603, 50.9375], detail: 'Concreto Efêmero.' },
    { name: 'Cidade do México', coords: [-99.1332, 19.4326], detail: 'Insect Flesh.' },
    { name: 'Kiev', coords: [30.5234, 50.4501], detail: 'Clouded Lands / Nuvem Negra.' }
  ];

  const def = svg.appendChild(el('defs'));
  def.innerHTML = `
    <radialGradient id="sphereFill" cx="36%" cy="30%" r="74%">
      <stop offset="0%" stop-color="#fff7ee"></stop>
      <stop offset="48%" stop-color="#eee7dd"></stop>
      <stop offset="100%" stop-color="#d6cdc1"></stop>
    </radialGradient>
    <clipPath id="globeClip"><circle cx="${CX}" cy="${CY}" r="${R}"></circle></clipPath>
  `;

  svg.appendChild(el('path', { class: 'glow', d: circlePath(CX, CY, R + 4) }));
  svg.appendChild(el('circle', { class: 'sphere', cx: CX, cy: CY, r: R }));
  svg.appendChild(el('ellipse', { cx: CX - 92, cy: CY - 122, rx: 150, ry: 118, fill: 'rgba(255,255,255,0.18)', transform: 'rotate(-24 458 318)' }));

  const landLayer = svg.appendChild(el('g', { clipPath: 'url(#globeClip)' }));
  const gridLayer = svg.appendChild(el('g', { clipPath: 'url(#globeClip)' }));
  const routeLayer = svg.appendChild(el('g', { clipPath: 'url(#globeClip)' }));
  const particleLayer = svg.appendChild(el('g', { clipPath: 'url(#globeClip)' }));
  const cityLayer = svg.appendChild(el('g', { clipPath: 'url(#globeClip)' }));
  svg.appendChild(el('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: 'rgba(33,27,25,0.16)', 'stroke-width': '1.2' }));

  landLayer.innerHTML = `
    <path class="country" d="M206 279C228 245 265 224 304 221C348 218 390 234 421 260C445 280 471 292 499 296C522 299 533 314 528 334C521 358 498 370 475 380C448 392 423 410 401 435C379 459 347 473 311 470C270 466 235 447 219 417C201 384 188 316 206 279Z"></path>
    <path class="country" d="M331 521C352 500 380 487 410 488C439 489 464 501 477 520C489 539 488 561 475 580C461 599 438 614 414 617C384 621 354 610 333 591C312 573 305 545 331 521Z"></path>
    <path class="country back" d="M472 242C511 210 560 198 607 207C652 216 687 242 708 274C728 306 742 324 768 336C795 348 818 366 826 392C834 420 823 446 803 465C780 487 745 492 713 486C681 480 654 463 637 441C622 422 598 408 566 401C529 393 499 372 491 339C485 315 458 290 472 242Z"></path>
    <path class="country back" d="M728 492C761 476 796 474 825 487C852 499 874 523 883 550C891 576 886 604 868 624C848 646 819 657 790 656C757 655 728 640 713 615C699 591 704 506 728 492Z"></path>
    <path class="country" d="M620 451C642 438 670 439 691 454C711 468 722 489 722 511C722 535 710 557 689 571C668 585 640 588 617 579C595 570 579 551 575 528C571 503 589 464 620 451Z"></path>
  `;

  const routeNodes = flows.map((flow) => {
    const node = el('path', { class: 'route', tabindex: 0, role: 'button', 'aria-label': flow.label });
    node.addEventListener('pointerenter', (event) => showFlow(flow, event, false));
    node.addEventListener('focus', (event) => showFlow(flow, event, false));
    node.addEventListener('pointerleave', () => {
      if (!state.lockedId) clearSelection();
    });
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      showFlow(flow, event, true);
    });
    routeLayer.appendChild(node);
    return node;
  });

  const cityNodes = hubs.map((hub) => {
    const node = el('circle', { class: 'city', r: 4.8, tabindex: 0, role: 'button', 'aria-label': hub.name });
    node.addEventListener('pointerenter', (event) => showHub(hub, event, false));
    node.addEventListener('focus', (event) => showHub(hub, event, false));
    node.addEventListener('pointerleave', () => {
      if (!state.lockedId) clearSelection();
    });
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      showHub(hub, event, true);
    });
    cityLayer.appendChild(node);
    return node;
  });

  const particleNodes = flows.map((flow) => {
    const node = el('g', { role: 'button', tabindex: 0, 'aria-label': flow.label });
    node.appendChild(el('circle', { class: 'particle-ring', r: 12 }));
    node.appendChild(el('circle', { class: 'particle', r: 5.8 }));
    node.addEventListener('pointerenter', (event) => showFlow(flow, event, false));
    node.addEventListener('focus', (event) => showFlow(flow, event, false));
    node.addEventListener('pointerleave', () => {
      if (!state.lockedId) clearSelection();
    });
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      showFlow(flow, event, true);
    });
    particleLayer.appendChild(node);
    return node;
  });

  svg.addEventListener('click', clearSelection);
  svg.addEventListener('pointerdown', (event) => {
    state.dragging = true;
    state.autoRotate = false;
    state.dragStart = { x: event.clientX, y: event.clientY };
    state.rotStart = [...state.rotation];
    svg.setPointerCapture(event.pointerId);
    syncRotate();
  });
  svg.addEventListener('pointermove', (event) => {
    if (!state.dragging || !state.dragStart || !state.rotStart) return;
    const dx = event.clientX - state.dragStart.x;
    const dy = event.clientY - state.dragStart.y;
    state.rotation[0] = state.rotStart[0] - dx * 0.28;
    state.rotation[1] = clamp(state.rotStart[1] + dy * 0.22, -70, 70);
  });
  svg.addEventListener('pointerup', endDrag);
  svg.addEventListener('pointercancel', endDrag);
  svg.addEventListener('pointerleave', () => {
    if (!state.dragging) {
      state.autoRotate = true;
      syncRotate();
    }
  });

  rotateButton.addEventListener('click', () => {
    state.autoRotate = !state.autoRotate;
    syncRotate();
  });
  resetButton.addEventListener('click', () => {
    state.rotation = [-48, -12, 0];
    draw(performance.now());
  });
  speedInput.addEventListener('input', () => {
    speedLabel.textContent = `${(Number(speedInput.value) / 100).toFixed(1)}x`;
  });

  window.addEventListener('resize', () => draw(performance.now()));

  function draw(now) {
    const dt = now - state.lastTime;
    state.lastTime = now;

    if (state.autoRotate && !state.dragging) {
      state.rotation[0] += dt * 0.0041 * (Number(speedInput.value) / 100);
    }

    gridLayer.replaceChildren(...buildGrid(state.rotation));

    routeNodes.forEach((node, index) => {
      node.setAttribute('d', routePath(flows[index], state.rotation));
    });

    cityNodes.forEach((node, index) => {
      const p = project(hubs[index].coords, state.rotation);
      if (p) {
        node.style.display = '';
        node.setAttribute('cx', p.x.toFixed(2));
        node.setAttribute('cy', p.y.toFixed(2));
      } else {
        node.style.display = 'none';
      }
    });

    particleNodes.forEach((node, index) => {
      const flow = flows[index];
      const phase = ((now * 0.00012 * ((Number(speedInput.value) / 100) + 0.18)) + index * 0.17) % 1;
      const p = project(greatCircle(flow.coords[0], flow.coords[1], phase), state.rotation);
      if (p) {
        node.style.display = '';
        node.setAttribute('transform', `translate(${p.x.toFixed(2)},${p.y.toFixed(2)})`);
      } else {
        node.style.display = 'none';
      }
    });

    if (state.lockedId) {
      const locked = flows.find((flow) => flow.id === state.lockedId) || hubs.find((hub) => `hub-${hub.name}` === state.lockedId);
      if (locked) {
        const coords = Array.isArray(locked.coords?.[0]) ? greatCircle(locked.coords[0], locked.coords[1], 0.5) : locked.coords;
        const p = project(coords, state.rotation);
        if (p) placeTooltip([p.x, p.y]);
      }
    }

    updateActiveStyles();
    requestAnimationFrame(draw);
  }

  function buildGrid(rotation) {
    const nodes = [];
    [-60, -30, 0, 30, 60].forEach((lat) => nodes.push(el('path', { class: 'graticule', d: polyPath(parallel(lat), rotation) })));
    [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].forEach((lon) => nodes.push(el('path', { class: 'graticule', d: polyPath(meridian(lon), rotation) })));
    return nodes;
  }

  function showFlow(flow, event, shouldLock) {
    state.activeId = flow.id;
    state.lockedId = shouldLock ? flow.id : '';
    tooltip.hidden = false;
    tooltip.innerHTML = `<strong>${escapeHtml(flow.label)}</strong><span>${escapeHtml(flow.detail)}</span><small>Clique para fixar, clique fora para limpar.</small>`;
    placeTooltip(pointerPoint(event));
    setSelection(flow.label, flow.detail, flow.image);
    emit({ id: flow.id, project: flow.label, title: flow.label, city: flow.to, place: flow.to, description: flow.detail, text: flow.detail, image: flow.image });
    updateActiveStyles();
  }

  function showHub(hub, event, shouldLock) {
    const related = flows.find((flow) => flow.to === hub.name || flow.detail.includes(hub.name) || flow.label.includes(hub.name));
    const title = related?.label || hub.name;
    const detail = related?.detail || hub.detail;
    state.activeId = related?.id || `hub-${hub.name}`;
    state.lockedId = shouldLock ? (related?.id || `hub-${hub.name}`) : '';
    tooltip.hidden = false;
    tooltip.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span><small>Clique para fixar, clique fora para limpar.</small>`;
    placeTooltip(pointerPoint(event));
    setSelection(title, detail, related?.image || '');
    emit({ id: related?.id || `hub-${hub.name}`, project: title, title, city: hub.name, place: hub.name, description: detail, text: detail, image: related?.image || '' });
    updateActiveStyles();
  }

  function clearSelection() {
    if (state.lockedId) return;
    state.activeId = '';
    tooltip.hidden = true;
    setSelection('Destaques internacionais', 'Passe o mouse ou clique em um fluxo, hub ou bolinha para abrir o detalhe.');
    updateActiveStyles();
  }

  function updateActiveStyles() {
    routeNodes.forEach((node, index) => {
      const active = state.activeId === flows[index].id;
      node.classList.toggle('is-active', active);
      node.classList.toggle('is-muted', Boolean(state.activeId) && !active);
    });
    particleNodes.forEach((node, index) => {
      node.style.opacity = !state.activeId || state.activeId === flows[index].id ? '1' : '0.34';
    });
    cityNodes.forEach((node, index) => {
      const hub = hubs[index];
      const active = state.activeId === `hub-${hub.name}` || state.activeId === flows.find((flow) => flow.coords[1][0] === hub.coords[0] && flow.coords[1][1] === hub.coords[1])?.id;
      node.style.opacity = !state.activeId || active ? '1' : '0.52';
    });
  }

  function syncRotate() {
    rotateButton.setAttribute('aria-pressed', String(state.autoRotate));
  }

  function endDrag(event) {
    state.dragging = false;
    state.autoRotate = true;
    state.dragStart = null;
    state.rotStart = null;
    syncRotate();
    try {
      svg.releasePointerCapture(event.pointerId);
    } catch (_) {}
  }

  function emit(payload) {
    if (window.parent !== window) window.parent.postMessage({ type: 'mattar-world-point', payload }, '*');
  }

  function setSelection(title, text, image = '') {
    selectionTitle.textContent = title;
    selectionText.textContent = text;
    if (image) {
      selectionImage.hidden = false;
      selectionImage.src = image;
    } else {
      selectionImage.hidden = true;
      selectionImage.removeAttribute('src');
    }
  }

  function placeTooltip(point) {
    const rect = wrap.getBoundingClientRect();
    const x = clamp(point[0], 130, rect.width - 130);
    const y = clamp(point[1], 80, rect.height - 14);
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  function pointerPoint(event) {
    const rect = wrap.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
  }

  function routePath(flow, rotation) {
    const pieces = [];
    let open = false;
    for (let i = 0; i <= 90; i++) {
      const p = project(greatCircle(flow.coords[0], flow.coords[1], i / 90), rotation);
      if (p) {
        pieces.push(`${open ? 'L' : 'M'}${p.x.toFixed(2)},${p.y.toFixed(2)}`);
        open = true;
      } else {
        open = false;
      }
    }
    return pieces.join('');
  }

  function greatCircle(a, b, t) {
    const A = toVec(a);
    const B = toVec(b);
    const dot = clamp(A[0] * B[0] + A[1] * B[1] + A[2] * B[2], -1, 1);
    const omega = Math.acos(dot);
    if (omega < 1e-6) return [...a];
    const sin = Math.sin(omega);
    const k0 = Math.sin((1 - t) * omega) / sin;
    const k1 = Math.sin(t * omega) / sin;
    return fromVec([A[0] * k0 + B[0] * k1, A[1] * k0 + B[1] * k1, A[2] * k0 + B[2] * k1]);
  }

  function toVec([lon, lat]) {
    const L = lon * DEG;
    const P = lat * DEG;
    return [Math.cos(P) * Math.cos(L), Math.cos(P) * Math.sin(L), Math.sin(P)];
  }

  function fromVec([x, y, z]) {
    return [Math.atan2(y, x) / DEG, Math.atan2(z, Math.sqrt(x * x + y * y)) / DEG];
  }

  function project([lon, lat], rotation = state.rotation) {
    const L = (lon - rotation[0]) * DEG;
    const P = lat * DEG;
    const T = rotation[1] * DEG;
    const cp = Math.cos(P);
    const x = cp * Math.sin(L);
    const y = Math.sin(P) * Math.cos(T) - cp * Math.cos(L) * Math.sin(T);
    const z = Math.sin(P) * Math.sin(T) + cp * Math.cos(L) * Math.cos(T);
    if (z <= 0) return null;
    return { x: CX + R * x, y: CY - R * y, z };
  }

  function polyPath(points, rotation) {
    let d = '';
    let open = false;
    points.forEach((point) => {
      const p = project(point, rotation);
      if (p) {
        d += `${open ? 'L' : 'M'}${p.x.toFixed(2)},${p.y.toFixed(2)}`;
        open = true;
      } else {
        open = false;
      }
    });
    return d;
  }

  function parallel(lat) {
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 3) pts.push([lon, lat]);
    return pts;
  }

  function meridian(lon) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 3) pts.push([lon, lat]);
    return pts;
  }

  function circlePath(cx, cy, r) {
    return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy}`;
  }

  function el(tag, attrs = {}) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value != null) node.setAttribute(key, String(value));
    }
    return node;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function escapeHtml(value = '') {
    return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  }

  function tick(now) {
    draw(now);
  }

  syncRotate();
  setSelection('Destaques internacionais', 'Passe o mouse ou clique em um fluxo, hub ou bolinha para abrir o detalhe.');
  requestAnimationFrame(tick);
})();

window.addEventListener('wheel', (event) => {
  if (window.parent === window) return;
  window.parent.postMessage({ type: event.deltaY > 0 ? 'mattar-next' : 'mattar-prev' }, '*');
}, { passive: true });



