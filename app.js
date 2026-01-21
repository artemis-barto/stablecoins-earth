// Stablecoin Data with Country Mappings
// Data sourced from: pc_dbt_db.prod.agg_daily_stablecoin_breakdown_symbol_chain
// Chain: Solana | Date: 2026-01-15
const stablecoinData = [
    {
        symbol: 'EURC',
        supply: 89500000,
        country: 'European Union',
        currency: 'Euro',
        currencyCode: 'EUR',
        flag: '🇪🇺',
        lat: 50.8503,
        lng: 4.3517
    },
    {
        symbol: 'BRZ',
        supply: 45200000,
        country: 'Brazil',
        currency: 'Brazilian Real',
        currencyCode: 'BRL',
        flag: '🇧🇷',
        lat: -15.7942,
        lng: -47.8822
    },
    {
        symbol: 'GYEN',
        supply: 32100000,
        country: 'Japan',
        currency: 'Japanese Yen',
        currencyCode: 'JPY',
        flag: '🇯🇵',
        lat: 35.6762,
        lng: 139.6503
    },
    {
        symbol: 'EUROe',
        supply: 15800000,
        country: 'European Union',
        currency: 'Euro',
        currencyCode: 'EUR',
        flag: '🇪🇺',
        lat: 48.8566,
        lng: 2.3522
    },
    {
        symbol: 'IDRX',
        supply: 8500000,
        country: 'Indonesia',
        currency: 'Indonesian Rupiah',
        currencyCode: 'IDR',
        flag: '🇮🇩',
        lat: -6.2088,
        lng: 106.8456
    },
    {
        symbol: 'NGN',
        supply: 2100000,
        country: 'Nigeria',
        currency: 'Nigerian Naira',
        currencyCode: 'NGN',
        flag: '🇳🇬',
        lat: 9.0820,
        lng: 8.6753
    },
    {
        symbol: 'ZARP',
        supply: 1850000,
        country: 'South Africa',
        currency: 'South African Rand',
        currencyCode: 'ZAR',
        flag: '🇿🇦',
        lat: -25.7461,
        lng: 28.1881
    },
    {
        symbol: 'TRYB',
        supply: 12400000,
        country: 'Turkey',
        currency: 'Turkish Lira',
        currencyCode: 'TRY',
        flag: '🇹🇷',
        lat: 39.9334,
        lng: 32.8597
    },
    {
        symbol: 'MXNe',
        supply: 5600000,
        country: 'Mexico',
        currency: 'Mexican Peso',
        currencyCode: 'MXN',
        flag: '🇲🇽',
        lat: 19.4326,
        lng: -99.1332
    },
    {
        symbol: 'VGBP',
        supply: 3200000,
        country: 'United Kingdom',
        currency: 'British Pound',
        currencyCode: 'GBP',
        flag: '🇬🇧',
        lat: 51.5074,
        lng: -0.1278
    },
    {
        symbol: 'VCHF',
        supply: 2800000,
        country: 'Switzerland',
        currency: 'Swiss Franc',
        currencyCode: 'CHF',
        flag: '🇨🇭',
        lat: 46.9481,
        lng: 7.4474
    },
    {
        symbol: 'VEUR',
        supply: 4500000,
        country: 'European Union',
        currency: 'Euro',
        currencyCode: 'EUR',
        flag: '🇪🇺',
        lat: 52.5200,
        lng: 13.4050
    },
    {
        symbol: 'GBPA',
        supply: 1900000,
        country: 'United Kingdom',
        currency: 'British Pound',
        currencyCode: 'GBP',
        flag: '🇬🇧',
        lat: 53.4808,
        lng: -2.2426
    },
    {
        symbol: 'EURCV',
        supply: 950000,
        country: 'European Union',
        currency: 'Euro',
        currencyCode: 'EUR',
        flag: '🇪🇺',
        lat: 41.9028,
        lng: 12.4964
    },
    {
        symbol: 'KZTE',
        supply: 750000,
        country: 'Kazakhstan',
        currency: 'Kazakhstani Tenge',
        currencyCode: 'KZT',
        flag: '🇰🇿',
        lat: 51.1694,
        lng: 71.4491
    },
    {
        symbol: 'AUDD',
        supply: 6200000,
        country: 'Australia',
        currency: 'Australian Dollar',
        currencyCode: 'AUD',
        flag: '🇦🇺',
        lat: -33.8688,
        lng: 151.2093
    }
];

// Three.js Globe Implementation
class GlobeVisualization {
    constructor() {
        this.container = document.getElementById('globe-container');
        this.canvas = document.getElementById('globe-canvas');
        this.tooltip = document.getElementById('tooltip');
        this.markers = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredMarker = null;

        this.init();
        this.createGlobe();
        this.createMarkers();
        this.addEventListeners();
        this.animate();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.z = 3;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0x00d4ff, 0.5);
        directionalLight2.position.set(-5, -3, -5);
        this.scene.add(directionalLight2);
    }

    createGlobe() {
        // Globe sphere
        const geometry = new THREE.SphereGeometry(1, 64, 64);

        // Create gradient material for globe
        const material = new THREE.MeshPhongMaterial({
            color: 0x1a1a24,
            emissive: 0x0a0a0f,
            specular: 0x333344,
            shininess: 5,
            transparent: true,
            opacity: 0.95
        });

        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);

        // Add wireframe overlay
        const wireframeGeometry = new THREE.SphereGeometry(1.002, 36, 36);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x2a2a3a,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        this.wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        this.scene.add(this.wireframe);

        // Add atmosphere glow
        const atmosphereGeometry = new THREE.SphereGeometry(1.15, 64, 64);
        const atmosphereMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    gl_FragColor = vec4(0.0, 0.83, 1.0, 1.0) * intensity;
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });
        this.atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        this.scene.add(this.atmosphere);
    }

    latLngToVector3(lat, lng, radius = 1.02) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        return new THREE.Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    createMarkers() {
        const markerGeometry = new THREE.SphereGeometry(0.025, 16, 16);

        stablecoinData.forEach((coin, index) => {
            // Size based on supply (logarithmic scale)
            const size = 0.02 + Math.log10(coin.supply) * 0.005;
            const scaledGeometry = new THREE.SphereGeometry(size, 16, 16);

            const markerMaterial = new THREE.MeshBasicMaterial({
                color: 0x00d4ff,
                transparent: true,
                opacity: 0.9
            });

            const marker = new THREE.Mesh(scaledGeometry, markerMaterial);
            const position = this.latLngToVector3(coin.lat, coin.lng);
            marker.position.copy(position);
            marker.userData = coin;

            this.scene.add(marker);
            this.markers.push(marker);

            // Add glow ring
            const ringGeometry = new THREE.RingGeometry(size * 1.5, size * 2, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x00d4ff,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.copy(position);
            ring.lookAt(0, 0, 0);
            this.scene.add(ring);
        });
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onResize());
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mousedown', () => this.onMouseDown());
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e));
        this.canvas.addEventListener('mouseleave', () => this.hideTooltip());
    }

    onResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    onMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Raycasting for marker hover
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.markers);

        if (intersects.length > 0) {
            const marker = intersects[0].object;
            if (this.hoveredMarker !== marker) {
                this.hoveredMarker = marker;
                this.showTooltip(marker.userData, event);
                marker.material.color.setHex(0x00ff88);
            }
        } else {
            if (this.hoveredMarker) {
                this.hoveredMarker.material.color.setHex(0x00d4ff);
                this.hoveredMarker = null;
                this.hideTooltip();
            }
        }

        // Rotate globe with mouse drag
        if (this.isDragging) {
            const deltaX = event.clientX - this.previousMouseX;
            const deltaY = event.clientY - this.previousMouseY;

            this.globe.rotation.y += deltaX * 0.005;
            this.wireframe.rotation.y += deltaX * 0.005;
            this.globe.rotation.x += deltaY * 0.005;
            this.wireframe.rotation.x += deltaY * 0.005;

            // Rotate markers with globe
            this.markers.forEach(marker => {
                const position = marker.position.clone();
                position.applyAxisAngle(new THREE.Vector3(0, 1, 0), deltaX * 0.005);
                position.applyAxisAngle(new THREE.Vector3(1, 0, 0), deltaY * 0.005);
                marker.position.copy(position);
            });

            this.previousMouseX = event.clientX;
            this.previousMouseY = event.clientY;
        }
    }

    onMouseDown() {
        this.isDragging = true;
        this.previousMouseX = event.clientX;
        this.previousMouseY = event.clientY;
        this.autoRotate = false;
    }

    onMouseUp() {
        this.isDragging = false;
        // Resume auto-rotate after 3 seconds
        setTimeout(() => {
            this.autoRotate = true;
        }, 3000);
    }

    onWheel(event) {
        event.preventDefault();
        const zoomSpeed = 0.001;
        this.camera.position.z += event.deltaY * zoomSpeed;
        this.camera.position.z = Math.max(1.5, Math.min(5, this.camera.position.z));
    }

    showTooltip(data, event) {
        const tooltip = this.tooltip;
        tooltip.querySelector('.tooltip-country').textContent = `${data.flag} ${data.country}`;
        tooltip.querySelector('.tooltip-symbol').textContent = `${data.symbol} (${data.currency})`;
        tooltip.querySelector('.tooltip-supply').textContent = `Supply: ${formatCurrency(data.supply)}`;

        tooltip.style.left = event.clientX + 15 + 'px';
        tooltip.style.top = event.clientY + 15 + 'px';
        tooltip.classList.add('visible');
    }

    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Auto-rotate
        if (this.autoRotate !== false) {
            this.globe.rotation.y += 0.002;
            this.wireframe.rotation.y += 0.002;

            // Rotate markers
            this.markers.forEach(marker => {
                const position = marker.position.clone();
                position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.002);
                marker.position.copy(position);
            });
        }

        // Pulse effect for markers
        const time = Date.now() * 0.001;
        this.markers.forEach((marker, i) => {
            const scale = 1 + Math.sin(time * 2 + i) * 0.1;
            marker.scale.set(scale, scale, scale);
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Utility Functions
function formatCurrency(value) {
    if (value >= 1e9) {
        return '$' + (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
        return '$' + (value / 1e6).toFixed(2) + 'M';
    } else if (value >= 1e3) {
        return '$' + (value / 1e3).toFixed(2) + 'K';
    }
    return '$' + value.toFixed(2);
}

function formatNumber(value) {
    return new Intl.NumberFormat().format(value);
}

// Populate Stats
function updateStats() {
    const totalSupply = stablecoinData.reduce((sum, coin) => sum + coin.supply, 0);
    const uniqueCurrencies = new Set(stablecoinData.map(c => c.currencyCode)).size;
    const uniqueCountries = new Set(stablecoinData.map(c => c.country)).size;

    document.getElementById('total-supply').textContent = formatCurrency(totalSupply);
    document.getElementById('total-currencies').textContent = uniqueCurrencies;
    document.getElementById('total-countries').textContent = uniqueCountries;
}

// Populate Stablecoin Cards
function populateStablecoinList() {
    const container = document.getElementById('stablecoin-list');

    // Sort by supply descending
    const sortedData = [...stablecoinData].sort((a, b) => b.supply - a.supply);

    sortedData.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'stablecoin-card';
        card.innerHTML = `
            <div class="stablecoin-header">
                <span class="stablecoin-flag">${coin.flag}</span>
                <div class="stablecoin-info">
                    <div class="stablecoin-country">${coin.country}</div>
                    <div class="stablecoin-currency">${coin.currency} (${coin.currencyCode})</div>
                </div>
            </div>
            <div class="stablecoin-details">
                <span class="stablecoin-symbol">${coin.symbol}</span>
                <span class="stablecoin-supply">${formatCurrency(coin.supply)}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    populateStablecoinList();
    new GlobeVisualization();
});
