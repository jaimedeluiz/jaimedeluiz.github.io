import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Jaime de Luiz García',
    title: {
      en: 'Software Engineer',
      es: 'Ingeniero de Software',
    },
    tagline: {
      en: 'Building clean architecture & modern full-stack products',
      es: 'Construyendo arquitectura limpia y productos full-stack modernos',
    },
    heroHighlight: {
      en: {
        prefix: 'Software engineer building ',
        highlight1: 'clean systems',
        middle: ' and ',
        highlight2: 'full-stack products',
        suffix: '.',
      },
      es: {
        prefix: 'Ingeniero de software creando ',
        highlight1: 'sistemas limpios',
        middle: ' y ',
        highlight2: 'productos full-stack',
        suffix: '.',
      },
    },
    summary: {
      en: 'Driven Software Engineering student focused on full-stack development and building innovative, production-ready applications. Bilingual (English/Spanish) with international exchange experience, adaptable to global teams, and fully willing to relocate.',
      es: 'Estudiante de Ingeniería de Software enfocado en desarrollo full-stack y en crear aplicaciones innovadoras listas para producción. Bilingüe (inglés/español) con experiencia académica internacional, adaptable a equipos globales y con total disponibilidad para reubicación.',
    },
    status: {
      en: 'Open to Opportunities',
      es: 'Disponible para Oportunidades',
    },
    email: 'jaime.deluiz@gmail.com',
    phone: '+34 640 7932 89',
    github: 'https://github.com/jaimedeluiz',
    githubUsername: 'jaimedeluiz',
    linkedin: 'https://linkedin.com/in/jaimedeluiz',
    location: 'Málaga, Spain (Willing to relocate)',
    willingToRelocate: true,
  },

  skills: [
    {
      category: {
        en: 'Languages',
        es: 'Lenguajes',
      },
      skills: ['Java', 'C++20', 'Python', 'SQL', 'TypeScript', 'HTML/CSS', 'C', 'R', 'Scala'],
    },
    {
      category: {
        en: 'Frameworks & Tools',
        es: 'Frameworks y Herramientas',
      },
      skills: ['Spring Boot 3', 'FastAPI', 'React 18', 'HTMX', 'Redis', 'Git', 'WebSockets', 'REST APIs', 'Docker'],
    },
    {
      category: {
        en: 'Core Concepts',
        es: 'Conceptos Clave',
      },
      skills: [
        'Distributed Systems',
        'Low-Latency Engineering',
        'Object-Oriented Programming (OOP)',
        'Concurrency & Multithreading',
        'API Design & Microservices',
        'Zero-Allocation Patterns',
      ],
    },
  ],

  projects: [
    {
      id: 'matching-engine',
      featured: true,
      category: {
        en: 'Systems & High-Frequency Trading',
        es: 'Sistemas y Trading de Alta Frecuencia',
      },
      title: 'Real-Time Order Matching Engine',
      subtitle: {
        en: 'Ultra-low-latency deterministic FIFO matching venue with zero hot-path heap allocations.',
        es: 'Motor de casación determinista FIFO de ultra baja latencia sin reservas en el heap en la ruta crítica.',
      },
      summary: {
        en: 'Engineered an ultra-low-latency, price-time priority (FIFO) order matching engine in modern C++20 achieving a throughput of 2.75M+ orders/sec and 167ns median latency with zero hot-path allocations.',
        es: 'Diseñado en C++20 moderno bajo prioridad precio-tiempo (FIFO), alcanzando un throughput de 2.75M+ órdenes/seg y 167ns de latencia mediana sin reservas en memoria en la ruta crítica.',
      },
      badge: {
        text: '2.75M+ ops/s',
        subtext: '167ns median latency',
      },
      tags: ['C++20', 'Low-Latency', 'Lock-Free SPSC', 'Memory Arena', 'Zero-Allocation', 'Financial Systems'],
      metrics: [
        { value: '2.75M+', label: 'Orders/Sec Throughput' },
        { value: '167 ns', label: 'Median Latency (p50)' },
        { value: '0', label: 'Hot-Path Allocations' },
        { value: 'O(1)', label: 'Order Cancellation' },
      ],
      githubUrl: 'https://github.com/jaimedeluiz/real-time-order-matching-engine',
      demoUrl: '#demo-matching-engine',
      interactiveDemo: 'matching-engine',
      caseStudy: {
        problem: {
          en: 'Electronic exchanges demand deterministic sub-microsecond trade execution. In standard implementations, dynamic heap allocations (`malloc`/`new`), lock contention, and unbounded pointer chasing introduce devastating jitter, memory fragmentation, and cache invalidation under burst volume.',
          es: 'Los mercados electrónicos demandan una ejecución determinista en submiserosegundos. En sistemas convencionales, las reservas dinámicas (`malloc`/`new`), la contención por bloqueos y el salto de punteros introducen jitter severo, fragmentación de memoria e invalidación de caché bajo ráfagas intensas.',
        },
        architecture: {
          en: 'Single-threaded deterministic core decoupled from network ingress by a lock-free single-producer single-consumer (SPSC) ring buffer. The order book isolates Bids in descending std::map and Asks in ascending std::map, while price levels manage resting volume using doubly-linked FIFO queues. Direct iterator indexing in a hash map guarantees true O(1) order cancellation without tree traversal.',
          es: 'Núcleo determinista monohilo desacoplado de la entrada de red mediante un buffer circular lock-free SPSC (Single-Producer Single-Consumer). El libro de órdenes mantiene las órdenes de compra (Bids) ordenadas descendentes y las de venta (Asks) ascendentes en `std::map`, con niveles de precio que gestionan el volumen en colas FIFO doblemente enlazadas. Un índice hash con iteradores directos garantiza cancelaciones en tiempo O(1) estricto.',
          steps: [
            {
              name: 'Lock-Free SPSC Ingest',
              detail: 'Decouples order ingestion from matching core with zero mutex lock contention.',
              subtext: 'Ring buffer ring topology',
            },
            {
              name: 'Dual-Sided OrderBook',
              detail: 'Bid side descending, Ask side ascending for immediate O(1) best-price query.',
              subtext: 'Top-of-book at begin()',
            },
            {
              name: 'FIFO Price Levels',
              detail: 'Strict price-time priority queues. Tail appends in O(1), earliest arrival matched first.',
              subtext: 'Zero dynamic reallocation',
            },
            {
              name: 'O(1) Cancellation Index',
              detail: 'Direct pointer hash map avoids traversing price ladders during critical cancellations.',
              subtext: 'O(1) unordered_map lookup',
            },
          ],
        },
        keyDecisions: {
          en: [
            {
              title: 'Single-Threaded Execution vs Multithreaded Locks',
              reason: 'Eliminates mutex locks, cache ping-pong, and race conditions, ensuring 100% deterministic execution order identical to LMAX and top HFT venues.',
            },
            {
              title: 'Zero Heap Allocations on Hot Path',
              reason: 'Replaces generic dynamic allocation with preallocated memory structures, preventing OS allocator stalls and TLB thrashing.',
            },
            {
              title: 'Direct Node Iterator Caching',
              reason: 'Stored list iterators in the ID hash map provide instantaneous O(1) arbitrary cancels without scanning the book.',
            },
          ],
          es: [
            {
              title: 'Ejecución Monohilo vs Bloqueos Multihilo',
              reason: 'Elimina bloqueos mutex, cache ping-pong y condiciones de carrera, garantizando un determinismo del 100% como en LMAX y venues HFT líderes.',
            },
            {
              title: 'Cero Reservas en el Heap en la Ruta Crítica',
              reason: 'Reemplaza reservas dinámicas con estructuras preasignadas, previniendo paradas del gestor de memoria del SO y vaciados de TLB.',
            },
            {
              title: 'Cacheo de Iteradores de Nodo Directos',
              reason: 'Almacenar iteradores de lista en el hash map de ID permite cancelaciones arbitrarias instantáneas en O(1) sin escanear el libro.',
            },
          ],
        },
        results: {
          en: [
            'Sustained throughput of over 2,750,000 orders/sec on commodity hardware.',
            'Median end-to-end execution latency of 167 nanoseconds (p50).',
            'Full suite of invariant and stress tests validating self-trade prevention (STP), partial fills, and price-time priority.',
          ],
          es: [
            'Throughput sostenido superior a 2.750.000 órdenes/seg en hardware estándar.',
            'Latencia mediana de ejecución de extremo a extremo de 167 nanosegundos (p50).',
            'Batería completa de pruebas de estrés e invariantes validando prevención de auto-negociación (STP), ejecuciones parciales y prioridad precio-tiempo.',
          ],
        },
        links: [
          { label: 'GitHub Repository', url: 'https://github.com/jaimedeluiz/real-time-order-matching-engine' },
          { label: 'Live WASM Demo', url: '#demo-matching-engine' },
        ],
      },
    },
    {
      id: 'distributed-rate-limiter',
      featured: false,
      category: {
        en: 'Distributed Systems & Cloud',
        es: 'Sistemas Distribuidos y Cloud',
      },
      title: 'Distributed Rate Limiter',
      subtitle: {
        en: 'Production-ready rate-limiting middleware using Redis Lua scripts & Token Bucket.',
        es: 'Middleware distribuido de limitación de tasa con scripts Lua en Redis y Token Bucket.',
      },
      summary: {
        en: 'Designed and deployed a production-ready distributed rate-limiting API utilizing the Token Bucket algorithm and atomic Redis Lua scripts to eliminate race conditions under high concurrent traffic.',
        es: 'Diseñada y desplegada una API de rate-limiting distribuida con algoritmo Token Bucket y scripts Lua atómicos en Redis para eliminar condiciones de carrera bajo alto tráfico concurrente.',
      },
      badge: {
        text: 'Atomic Lua',
        subtext: 'Token Bucket',
      },
      tags: ['Java 17', 'Spring Boot 3', 'Redis', 'Docker', 'Lua', 'Concurrency', 'REST API'],
      metrics: [
        { value: '100%', label: 'Atomicity with Lua' },
        { value: '429', label: 'HTTP Standard Status' },
        { value: 'Docker', label: 'Containerized Setup' },
      ],
      githubUrl: 'https://github.com/jaimedeluiz/distributed-rate-limiter',
      demoUrl: '#demo-rate-limiter',
      interactiveDemo: 'token-bucket',
      caseStudy: {
        problem: {
          en: 'In horizontally scaled microservices clusters, localized in-memory rate limiters fail because request counts are not shared across server instances. Naive multi-step Redis commands (GET followed by SET) suffer from severe read-modify-write race conditions when multiple instances receive requests simultaneously.',
          es: 'En clústeres de microservicios con escalado horizontal, los limitadores en memoria local fallan porque el conteo de peticiones no se comparte entre réplicas. El uso ingenuo de Redis con comandos separados (GET y SET) genera graves condiciones de carrera de lectura-modificación-escritura.',
        },
        architecture: {
          en: 'A Spring Boot interceptor extracts client identifiers (IP address or API keys) and triggers an atomic Lua script executed directly inside Redis. The script calculates token replenishment based on elapsed milliseconds, deducts available tokens, updates state, and sets TTL memory eviction atomically in a single network round-trip.',
          es: 'Un interceptor Spring Boot extrae el identificador del cliente (IP o API Key) y ejecuta un script atómico Lua directamente en Redis. El script calcula el reabastecimiento de tokens según los milisegundos transcurridos, deduce tokens, actualiza el estado y configura TTL para desahucio de memoria en un único viaje de red.',
          steps: [
            {
              name: 'Request Interception',
              detail: 'Extracts Client IP / X-API-Key and inspects @RateLimited route annotations.',
            },
            {
              name: 'Atomic Lua Execution',
              detail: 'HMGET tokens and last_refreshed timestamp directly on Redis instance.',
            },
            {
              name: 'Dynamic Token Refill',
              detail: 'Replenishes tokens based on precise time delta since previous request.',
            },
            {
              name: 'Rate Enforcement',
              detail: 'Yields 200 OK with X-RateLimit headers if tokens >= 1, otherwise 429 Too Many Requests.',
            },
          ],
        },
        keyDecisions: {
          en: [
            {
              title: 'Atomic Redis Lua Scripting',
              reason: 'Executes entire Token Bucket evaluation as an atomic unit, preventing concurrency anomalies without external distributed locks.',
            },
            {
              title: 'Lazy Token Replenishment',
              reason: 'Calculates replenished tokens mathematically on request arrival rather than running expensive background cron timers.',
            },
          ],
          es: [
            {
              title: 'Scripts Lua Atómicos en Redis',
              reason: 'Ejecuta toda la evaluación del Token Bucket como una unidad atómica sin necesidad de bloqueos distribuidos pesados.',
            },
            {
              title: 'Reabastecimiento Perezoso (Lazy Refill)',
              reason: 'Calcula matemáticamente los tokens reabastecidos al llegar la petición en vez de mantener cron jobs periódicos.',
            },
          ],
        },
        results: {
          en: [
            'Zero race conditions validated under parallel concurrent load testing.',
            'Strict adherence to RFC HTTP 429 rate limit error responses and rate limit headers.',
          ],
          es: [
            'Cero condiciones de carrera validadas bajo pruebas de carga concurrentes paralelas.',
            'Adhesión rigurosa al estándar RFC HTTP 429 con cabeceras de límite de tasa.',
          ],
        },
        links: [
          { label: 'GitHub Repository', url: 'https://github.com/jaimedeluiz/distributed-rate-limiter' },
          { label: 'Interactive Token Bucket Playground', url: '#demo-rate-limiter' },
        ],
      },
    },
    {
      id: 'fairshare',
      featured: false,
      category: {
        en: 'Full-Stack & Real-Time AI',
        es: 'Full-Stack e IA en Tiempo Real',
      },
      title: 'FairShare Bill Splitter',
      subtitle: {
        en: 'Mobile-first real-time bill-splitting platform with AI receipt parsing and WebSockets.',
        es: 'Plataforma mobile-first para dividir cuentas en tiempo real con IA y WebSockets.',
      },
      summary: {
        en: 'Built a mobile-first, real-time bill-splitting platform featuring instant multi-device collaboration via WebSockets and multimodal AI receipt extraction.',
        es: 'Creada una plataforma web mobile-first colaborativa en tiempo real mediante WebSockets con extracción multimodal de tickets mediante IA.',
      },
      badge: {
        text: 'FastAPI + HTMX',
        subtext: 'Gemini Vision AI',
      },
      tags: ['Python 3.11', 'FastAPI', 'HTMX', 'WebSockets', 'Tailwind CSS', 'Gemini AI', 'SQLite'],
      metrics: [
        { value: '0¢', label: 'Rounding Drift (Exact Math)' },
        { value: 'Live', label: 'WebSocket Sync' },
        { value: 'Zero', label: 'App Install Friction' },
      ],
      githubUrl: 'https://github.com/jaimedeluiz/fairshare-bill-splitter',
      caseStudy: {
        problem: {
          en: 'Splitting group expenses at restaurants is notoriously chaotic: traditional apps require every participant to download apps and create accounts. Moreover, uneven distribution of discounts, tips, and taxes frequently suffers from floating-point rounding errors where shares do not sum to the total.',
          es: 'Dividir gastos de grupo en restaurantes suele ser caótico: las aplicaciones tradicionales obligan a descargar apps y registrarse. Además, la distribución de propinas, descuentos e impuestos suele generar errores de redondeo donde las partes no suman el total.',
        },
        architecture: {
          en: 'FastAPI backend utilizing Google Gemini Vision for structured JSON receipt extraction (`response_schema`). Real-time WebSocket mesh syncs claimed items across all participating devices instantly without page refreshes, styled with HTMX and Tailwind CSS. Employs the Hamilton-Hare Largest Remainder Method in integer cents to ensure mathematically exact tax and tip distribution.',
          es: 'Backend en FastAPI con Google Gemini Vision para extracción estructurada en JSON (`response_schema`). Una malla en tiempo real por WebSockets sincroniza los platos asignados entre dispositivos al instante sin recargas, estilizado con HTMX y Tailwind CSS. Utiliza el método del resto mayor de Hamilton-Hare en céntimos enteros para una división matemáticamente perfecta.',
          steps: [
            {
              name: 'Multimodal AI Vision',
              detail: 'Gemini Flash extracts itemized lines, discounts, taxes, and service charges as JSON.',
            },
            {
              name: 'Frictionless Share Link',
              detail: 'Instantly generates clean unique URL without user login or app installation.',
            },
            {
              name: 'Real-Time WebSocket Mesh',
              detail: 'Item assignments and badge states broadcast instantaneously to all joined phones.',
            },
            {
              name: 'Hamilton-Hare Math',
              detail: 'Calculates tax and tip distribution in integer cents with 0.00¢ rounding drift.',
            },
          ],
        },
        keyDecisions: {
          en: [
            {
              title: 'HTMX + WebSockets over Heavy SPA',
              reason: 'Eliminated client bundle bloat, delivering near-instant mobile page load times on spotty cellular connections in restaurants.',
            },
            {
              title: 'Largest Remainder Method (Hamilton-Hare)',
              reason: 'Replaces standard floating-point math with integer cent distribution so shares strictly sum to the receipt total.',
            },
          ],
          es: [
            {
              title: 'HTMX + WebSockets sobre SPA Pesada',
              reason: 'Eliminó el exceso de bundle JavaScript del cliente, ofreciendo carga inmediata en conexiones móviles en restaurantes.',
            },
            {
              title: 'Método del Resto Mayor (Hamilton-Hare)',
              reason: 'Sustituye la aritmética de punto flotante por cálculo en céntimos enteros para que la suma cuadre al céntimo exacto.',
            },
          ],
        },
        results: {
          en: [
            'Seamless mobile collaboration tested across multi-user dining sessions.',
            'Instant item assignment and total computation with zero rounding discrepancy.',
          ],
          es: [
            'Colaboración móvil fluida comprobada en múltiples sesiones gastronómicas reales.',
            'Asignación instantánea de consumiciones y cálculo sin descuadres de céntimos.',
          ],
        },
        links: [
          { label: 'GitHub Repository', url: 'https://github.com/jaimedeluiz/fairshare' },
        ],
      },
    },
    {
      id: 'outfeed',
      featured: false,
      category: {
        en: 'AI Vision & Enterprise Java',
        es: 'Visión por Computador y Java Enterprise',
      },
      title: 'Outfeed Virtual Wardrobe',
      subtitle: {
        en: 'Full-stack AI wardrobe platform integrating multimodal computer vision & weather rule engine.',
        es: 'Plataforma de armario inteligente con visión por computador y motor de reglas climáticas.',
      },
      summary: {
        en: 'Developed a full-stack AI wardrobe platform integrating multimodal computer vision and a custom weather-aware rule engine to automate weekly outfit scheduling.',
        es: 'Desarrollada una plataforma full-stack de armario inteligente integrando visión multimodal y motor de reglas meteorológicas para programar conjuntos semanales.',
      },
      badge: {
        text: 'Spring Boot + AI',
        subtext: 'Weather-Aware',
      },
      tags: ['Java', 'Spring Boot', 'Computer Vision', 'Rule Engine', 'REST API', 'PostgreSQL'],
      metrics: [
        { value: 'AI Vision', label: 'Multimodal Classification' },
        { value: 'Weather', label: 'Live Weather Integration' },
        { value: '7-Day', label: 'Automated Outfit Schedule' },
      ],
      githubUrl: 'https://github.com/jaimedeluiz/Outfeed-Virtual-Wardrobe',
      caseStudy: {
        problem: {
          en: 'Managing personal wardrobes and selecting appropriate daily outfits considering personal aesthetics, dress codes, laundry cycles, and fluctuating weather forecasts is time-consuming and fragmented across disparate apps.',
          es: 'Organizar el guardarropa y elegir conjuntos adecuados teniendo en cuenta estilo, código de vestimenta, ciclos de colada y el clima cambiante suele requerir tiempo y herramientas inconexas.',
        },
        architecture: {
          en: 'Enterprise Java Spring Boot architecture with an image processing pipeline for clothing categorization and palette tagging, combined with a weather-aware decision engine that generates cohesive outfit recommendations based on live meteorological data.',
          es: 'Arquitectura empresarial en Java Spring Boot con pipeline de procesamiento visual para categorización y etiquetado cromático, junto con un motor de decisiones adaptado al clima meteorológico en tiempo real.',
          steps: [
            {
              name: 'Multimodal Ingestion',
              detail: 'Uploaded clothing photos are classified by garment type, color palette, and season.',
            },
            {
              name: 'Live Weather Aggregation',
              detail: 'Pulls current and multi-day meteorological forecasts for the user location.',
            },
            {
              name: 'Constraint-Based Scheduling',
              detail: 'Evaluates style rules, garment wear frequency, and weather parameters to compose outfits.',
            },
          ],
        },
        keyDecisions: {
          en: [
            {
              title: 'Weather-Driven Constraint Solver',
              reason: 'Separates visual garment analysis from meteorological business logic, allowing dynamic threshold rebalancing.',
            },
          ],
          es: [
            {
              title: 'Motor de Restricciones Basado en Clima',
              reason: 'Separa el análisis visual de las prendas de la lógica de negocio meteorológica, permitiendo recalibrar umbrales.',
            },
          ],
        },
        results: {
          en: [
            'End-to-end automated 7-day outfit scheduler adapting seamlessly to sudden temperature shifts.',
            'Robust Spring Boot backend adhering strictly to clean layered architecture.',
          ],
          es: [
            'Planificador de conjuntos para 7 días adaptado automáticamente a variaciones térmicas imprevistas.',
            'Backend robusto en Spring Boot respetando principios de arquitectura limpia por capas.',
          ],
        },
        links: [
          { label: 'GitHub Repository (TODO)', url: 'https://github.com/jaimedeluiz/outfeed', isPlaceholder: true },
        ],
      },
    },
    {
      id: 'checkstyle',
      featured: false,
      category: {
        en: 'Open Source Contribution',
        es: 'Contribución Open Source',
      },
      title: 'Open Source: Checkstyle',
      subtitle: {
        en: 'Contributions to core codebase of industry-standard Java static analysis tool.',
        es: 'Contribuciones al núcleo de la herramienta estándar de análisis estático en Java.',
      },
      summary: {
        en: 'Contributed to the core codebase of Checkstyle, a widely used open-source development tool that enforces Java coding standards, by refactoring annotation processing and resolving warning suppressions in the magicnumber module.',
        es: 'Contribución al repositorio central de Checkstyle, herramienta estándar para auditoría de código Java, refactorizando el procesamiento de anotaciones y resolviendo supresión de advertencias en el módulo magicnumber.',
      },
      badge: {
        text: 'Merged PRs',
        subtext: 'Java AST / Core',
      },
      tags: ['Java', 'Open Source', 'Static Analysis', 'AST', 'JUnit', 'Checkstyle'],
      metrics: [
        { value: 'Merged', label: 'Core Contributions' },
        { value: 'AST', label: 'Abstract Syntax Trees' },
        { value: '100%', label: 'Strict Style & Mutation Tests' },
      ],
      githubUrl: 'https://github.com/checkstyle/checkstyle',
      caseStudy: {
        problem: {
          en: 'Checkstyle enforces Java coding standards on millions of builds worldwide. Certain AST inspection modules (specifically around MagicNumberCheck) generated false positives on modern annotation suppressions and required architectural cleanup to align with strict code quality invariants.',
          es: 'Checkstyle audita estándares de código Java en millones de compilaciones en todo el mundo. Algunos módulos de inspección de AST (en especial MagicNumberCheck) producían falsos positivos con anotaciones modernas y requerían refactorización profunda para cumplir invariantes estrictos.',
        },
        architecture: {
          en: 'Traversed Java Abstract Syntax Tree (AST) tokens to inspect `ANNOTATION` and `ANNOTATION_MEMBER_VALUE_PAIR` nodes, verifying proper constant suppression rules without regression.',
          es: 'Inspección de tokens del Árbol de Sintaxis Abstracta (AST) de Java en nodos `ANNOTATION` y `ANNOTATION_MEMBER_VALUE_PAIR`, validando reglas de supresión de constantes sin regresiones.',
          steps: [
            {
              name: 'AST Grammar Analysis',
              detail: 'Navigated detailed Java syntax nodes to detect literal constants within complex annotations.',
            },
            {
              name: 'Suppression Rule Refinement',
              detail: 'Refactored MagicNumberCheck suppression logic to prevent false positives.',
            },
            {
              name: 'Pitest Mutation Testing',
              detail: 'Ensured 100% test coverage and mutation score compliance across all changes.',
            },
          ],
        },
        keyDecisions: {
          en: [
            {
              title: 'Strict Mutation Testing Adherence',
              reason: 'Checkstyle maintains exceptional quality gates; every edge case was validated against extensive Pitest mutation testing.',
            },
          ],
          es: [
            {
              title: 'Cumplimiento Riguroso de Mutation Testing',
              reason: 'Checkstyle exige controles de calidad de primer nivel; cada caso de uso se verificó con pruebas de mutación exhaustivas con Pitest.',
            },
          ],
        },
        results: {
          en: [
            'Contributions merged into official Checkstyle releases.',
            'Resolved false warning suppressions in annotation processing modules.',
          ],
          es: [
            'Contribuciones incorporadas a las versiones oficiales de Checkstyle.',
            'Eliminación de falsos positivos en el módulo de supresión de advertencias.',
          ],
        },
        links: [
          { label: 'Checkstyle Fork', url: 'https://github.com/jaimedeluiz/checkstyle' },
          { label: 'Merged Pull Request #22944', url: 'https://github.com/checkstyle/checkstyle/pull/22944' },
          { label: 'Upstream Repository', url: 'https://github.com/checkstyle/checkstyle' },
        ],
      },
    },
  ],

  experience: [
    {
      role: {
        en: 'Research Assistant',
        es: 'Investigador Asistente',
      },
      company: 'University of Málaga',
      location: 'Málaga, Spain',
      period: 'Feb 2026 – Jun 2026',
      achievements: {
        en: [
          'Collaborated directly with senior professors on academic research.',
          'Engineered a Python-based data parsing utility to automate the extraction and formatting of large datasets for the research team.',
        ],
        es: [
          'Colaboración directa con profesores senior en proyectos de investigación académica.',
          'Desarrollada una herramienta en Python para automatizar la extracción y formateo de grandes conjuntos de datos para el equipo investigador.',
        ],
      },
    },
    {
      role: {
        en: 'Technology Sales Specialist',
        es: 'Especialista en Ventas de Tecnología',
      },
      company: 'FNAC',
      location: 'Málaga, Spain',
      period: 'Sep 2025 – Mar 2026',
      highlight: {
        en: '#1 in Spain for tech product insurance sales across all FNAC stores',
        es: '#1 de España en ventas de seguros tecnológicos en todas las tiendas FNAC',
      },
      achievements: {
        en: [
          'Translated complex technical specifications into accessible, compelling benefits for non-technical users.',
          'Helped secure the #1 ranking across all FNAC stores in Spain for tech product insurance sales.',
        ],
        es: [
          'Traducción de especificaciones técnicas complejas en beneficios claros y tangibles para usuarios sin perfil técnico.',
          'Alcanzado el puesto nº 1 nacional entre todas las tiendas FNAC de España en ventas de seguros de productos tecnológicos.',
        ],
      },
    },
  ],

  education: [
    {
      degree: {
        en: 'Bachelor of Science in Software Engineering',
        es: 'Grado en Ingeniería del Software',
      },
      institution: 'University of Málaga',
      location: 'Málaga, Spain',
      period: 'Sep 2024 – Jun 2028',
      notes: {
        en: [
          'Exchange Semester at Vilnius University, Lithuania (Sep 2026 – Feb 2027).',
          'Focus on low-latency systems, distributed architectures, algorithms and high-performance computing.',
        ],
        es: [
          'Semestre de intercambio en Vilnius University, Lituania (Sep 2026 – Feb 2027).',
          'Especialización en sistemas de baja latencia, arquitecturas distribuidas, algoritmia y computación de alto rendimiento.',
        ],
      },
    },
    {
      degree: {
        en: 'Bachillerato of Science and Technology',
        es: 'Bachillerato de Ciencias y Tecnología',
      },
      institution: 'Santa Rosa de Lima',
      location: 'Málaga, Spain',
      period: 'Sep 2022 – Jun 2024',
      awardBadge: {
        en: 'Best Academic Record Award in Málaga City',
        es: 'Premio al Mejor Expediente Académico de la Ciudad de Málaga',
      },
      notes: {
        en: [
          'Graduated with highest honors: 100/100 average in every subject.',
          'Ranked 1st of 152 students (1/152).',
          'Received the prestigious Award for the Best Academic Record in the city of Málaga.',
        ],
        es: [
          'Graduado con matrícula de honor: promedio de 100/100 en todas las asignaturas.',
          '1º de 152 alumnos (1/152).',
          'Galardonado con el Premio al Mejor Expediente Académico de la ciudad de Málaga.',
        ],
      },
    },
  ],

  achievements: [
    {
      stat: '100/100',
      label: {
        en: 'Academic Average',
        es: 'Promedio Académico',
      },
      context: {
        en: 'Every subject in Bachillerato of Science & Technology',
        es: 'En todas las asignaturas de Bachillerato Tecnológico',
      },
    },
    {
      stat: '1st / 152',
      label: {
        en: 'Class Rank',
        es: 'Posición de Promoción',
      },
      context: {
        en: 'Graduated top of cohort with highest honors',
        es: 'Primer puesto de la promoción con matrícula de honor',
      },
    },
    {
      stat: 'Premio Ciudad',
      label: {
        en: 'Best Record Award',
        es: 'Mejor Expediente',
      },
      context: {
        en: 'Award for the best academic record in Málaga city',
        es: 'Premio al mejor expediente académico de la ciudad de Málaga',
      },
    },
    {
      stat: '#1 in Spain',
      label: {
        en: 'FNAC National Sales',
        es: 'Ventas Nacionales FNAC',
      },
      context: {
        en: 'Top performer across all store locations in Spain',
        es: 'Líder en ventas entre todas las tiendas de España',
      },
    },
  ],
};

