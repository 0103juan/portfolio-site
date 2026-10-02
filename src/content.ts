// Everything the site says, in both languages. The types make the two versions keep the same shape.
//
// Client work is described by sector on purpose: no client or employer names, no screenshots,
// no schemas and no internal figures. Keep it that way when editing.

export type Lang = 'es' | 'en'

type Work = { sector: string; period: string; title: string; summary: string; points: string[]; stack: string[] }
type Project = { name: string; kind: string; summary: string; proof: string; stack: string[]; repo?: string; demo?: string }

export type Content = {
  nav: { work: string; product: string; ai: string; stack: string; contact: string }
  role: string
  pitch: string
  facts: { value: string; label: string }[]
  work: { title: string; intro: string; items: Work[] }
  product: {
    title: string
    intro: string
    parts: Project[]
    captions: { dashboard: string; warning: string; mobile: string }
  }
  ai: { title: string; intro: string; items: Project[] }
  personal: { title: string; items: Project[] }
  stack: { title: string; note: string; groups: { name: string; items: string[] }[] }
  contact: { title: string; text: string; email: string; github: string }
  live: string
  code: string
  status: string
  credit: string
  footer: string
}

export const GITHUB = 'https://github.com/0103juan'
export const EMAIL = '0103juan@gmail.com'

const es: Content = {
  nav: { work: 'Experiencia', product: 'Producto', ai: 'IA', stack: 'Stack', contact: 'Contacto' },
  role: 'Ingeniero de software · backend e IA aplicada',
  pitch:
    'Desde 2022 construyo backends que convierten documentos en datos verificables para entidades financieras y del ' +
    'sector público en Colombia: extracción con modelos de lenguaje, validación con reglas de negocio e integración ' +
    'con los sistemas que ya existen.',
  facts: [
    { value: '4+ años', label: 'de backend en producción para finanzas y sector público' },
    { value: '5', label: 'proyectos de IA propios, con pruebas y resultados medidos' },
    { value: '1 producto', label: 'llevado a cuatro stacks: Node.js, Angular, Flutter y React' },
  ],
  work: {
    title: 'Trabajo con clientes',
    intro:
      'Estos sistemas son de clientes, así que aquí no hay nombres, capturas ni cifras internas: solo el problema, ' +
      'lo que construí y con qué. Los detalles que la confidencialidad permite los cuento en una entrevista.',
    items: [
      {
        sector: 'Sector financiero',
        period: '2022 – 2026',
        title: 'Extracción de pólizas y documentos de identidad',
        summary:
          'Un backend que lee pólizas de seguros y documentos de identidad, extrae sus campos y los valida contra las ' +
          'reglas de negocio de la entidad.',
        points: [
          'Empezó con plantillas por formato de aseguradora; después sumé extracción con un modelo multimodal detrás de un servicio propio en FastAPI.',
          'Separé la comunicación con el modelo en tres piezas: mapeo de datos, orquestación de validaciones y una fachada ligera.',
          'Procesamiento por lotes, caché de resultados en almacenamiento de objetos e infraestructura como código.',
        ],
        stack: ['Java 17', 'Spring Boot', 'Python', 'FastAPI', 'Gemini', 'Pub/Sub', 'Cloud Storage', 'MySQL', 'Terraform'],
      },
      {
        sector: 'Banca',
        period: '2022 – 2026',
        title: 'Automatización de oficios de embargo',
        summary:
          'Los bancos reciben órdenes de embargo en PDF. El sistema las lee, identifica a los demandados y los datos ' +
          'del proceso, y se integra con el core bancario.',
        points: [
          'Gramáticas ANTLR4 para sacar campos de textos jurídicos que cada juzgado redacta distinto.',
          'Segunda versión con arquitectura limpia en módulos Gradle, extracción con LLM y esquemas de campos configurables.',
          'Reportes de inconsistencias navegables, URLs firmadas para los documentos y autenticación con token de acceso y de refresco.',
        ],
        stack: ['Java', 'Spring Boot', 'ANTLR4', 'Python', 'LLM', 'Cloud Run', 'Flyway', 'GitHub Actions'],
      },
      {
        sector: 'Gobierno departamental',
        period: '2024 – 2026',
        title: 'Recaudo y conciliación del impuesto vehicular',
        summary:
          'Tres sistemas para la misma entidad: validación de pagos masivos, verificación de actos ' +
          'administrativos y seguimiento de las cuentas bancarias de recaudo.',
        points: [
          'Carga masiva de pagos desde Excel, cruce contra notas crédito y reportes de dispersión entre departamento y municipios.',
          'Extracción de actos administrativos en PDF y cruce contra la información bancaria, con gestión de inconsistencias.',
          'Ingesta por SFTP de extractos de varios bancos, indicadores para el tablero y reportes exportables.',
        ],
        stack: ['Java 17', 'Spring Boot 3', 'Spring Security', 'Python', 'FastAPI', 'MySQL', 'Alembic', 'Apache POI'],
      },
      {
        sector: 'Registro empresarial',
        period: '2025 – 2026',
        title: 'Lectura de actas societarias con LLM',
        summary:
          'Microservicios que reciben actas de asambleas y juntas, extraen nombramientos, quórum y votaciones, y ' +
          'devuelven un resumen estructurado para quien las revisa.',
        points: [
          'Procesamiento asíncrono con colas y reintentos que no bloquean, y avance en tiempo real por WebSocket.',
          'Afinamiento de prompts sobre casos reales: quórum con personas sin acciones, nombramientos descritos en texto libre.',
          'Inicio de sesión con código de un solo uso y despliegue continuo con GitHub Actions.',
        ],
        stack: ['Java', 'Spring Boot', 'Python', 'LLM', 'Pub/Sub', 'WebSocket', 'Docker', 'GitHub Actions'],
      },
      {
        sector: 'Pagos',
        period: '2026',
        title: 'Middleware para pagos inmediatos (Bre-B)',
        summary:
          'El puente entre un portal empresarial y el sistema de pagos inmediatos de Colombia: registro, modificación, ' +
          'bloqueo y consulta de llaves.',
        points: [
          'Java 21 con hilos virtuales; hacia afuera, OAuth2 con credenciales de cliente y mTLS; hacia adentro, JWT con roles.',
          'Modo de simulación completo para que el equipo de frontend avanzara sin depender del proveedor.',
          'Bitácora de auditoría con las marcas de tiempo que exige la norma, pensada para la conciliación.',
        ],
        stack: ['Java 21', 'Spring Boot 3.4', 'Spring Security', 'OAuth2', 'mTLS', 'OpenAPI', 'Cloud Run'],
      },
      {
        sector: 'Crédito de libranza',
        period: '2022 – 2025',
        title: 'Verificación de soportes de nómina y pensión',
        summary:
          'Valida los desprendibles que un solicitante presenta: extrae sus campos según el formato de cada pagador y ' +
          'los contrasta con la fuente.',
        points: [
          'Extractores y validadores por formato, incluida la lectura de códigos QR.',
          'Robots que consultan el portal de verificación de la entidad emisora y comparan el resultado.',
        ],
        stack: ['Java', 'Spring Boot', 'Python', 'Node.js', 'Puppeteer'],
      },
      {
        sector: 'Publicidad exterior',
        period: '2026',
        title: 'Backend de operación de activos',
        summary:
          'Monolito modular para operar un inventario georreferenciado: contratos, obligaciones legales, órdenes de ' +
          'trabajo y notificaciones.',
        points: [
          'Búsqueda y filtrado sobre mapa con caché, y archivos servidos con URL firmada.',
          'Roles y permisos, migraciones versionadas y documentación OpenAPI de toda la API.',
        ],
        stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Flyway', 'JWT', 'Cloud Run'],
      },
      {
        sector: 'SaaS documental',
        period: '2023',
        title: 'Plataforma serverless de plantillas y extracción',
        summary:
          'API sin servidores para que cada empresa defina sus plantillas de documento y procese archivos por lotes.',
        points: [
          'Carga de múltiples archivos con URL prefirmada, OCR administrado y control de procesos huérfanos.',
          'Usuarios, roles y empresas sobre un proveedor de identidad administrado.',
        ],
        stack: ['Python', 'Flask', 'AWS Lambda', 'Cognito', 'Textract', 'S3', 'Serverless Framework'],
      },
    ],
  },
  product: {
    title: 'Contratos a la vista',
    intro:
      'Un producto propio sobre datos públicos: cuánto contrata cada entidad del Estado colombiano, con quién y cómo. ' +
      'Usa los seis millones de contratos de SECOP II en datos.gov.co. Lo construí en cuatro piezas para mostrar el ' +
      'mismo producto de la base de datos a la pantalla.',
    parts: [
      {
        name: 'secop-api',
        kind: 'Node.js · TypeScript',
        summary:
          'API HTTP sin dependencias en producción. Ninguna entrada del cliente llega a la consulta sin validar, los ' +
          'documentos de identidad de los contratistas no salen nunca, y una caché evita repetir consultas lentas.',
        proof: '10 pruebas locales y una contra datos.gov.co. Buscar entre 5.800 entidades pasó de 90 s a 3 ms.',
        stack: ['Node 24', 'TypeScript', 'node:test'],
        repo: `${GITHUB}/secop-api`,
        demo: 'https://secop-api-i89q.onrender.com',
      },
      {
        name: 'secop-dashboard',
        kind: 'Angular 22',
        summary:
          'Panel web: selector de años, indicadores, mayores contratistas, modalidades, meses y la tabla de contratos ' +
          'con enlace al expediente. Avisa cuando un solo contrato mal digitado explica el total del año.',
        proof: 'Componentes autónomos, signals y httpResource; 3 pruebas.',
        stack: ['Angular 22', 'Signals', 'Vitest'],
        repo: `${GITHUB}/secop-dashboard`,
        demo: 'https://0103juan.github.io/secop-dashboard/#/entidad/890905211?year=2024',
      },
      {
        name: 'secop-mobile',
        kind: 'Flutter',
        summary:
          'La misma consulta en el teléfono: búsqueda, resumen del año, contratistas y contratos con paginación. ' +
          'Compila para Android y para web.',
        proof: 'Prueba de widgets del recorrido completo con una API simulada.',
        stack: ['Flutter 3', 'Dart', 'Material 3'],
        repo: `${GITHUB}/secop-mobile`,
      },
      {
        name: 'portfolio-site',
        kind: 'React',
        summary: 'Este sitio: React, TypeScript y Tailwind, con componentes animados de Skiper UI y contenido tipado en dos idiomas.',
        proof: 'El compilador verifica que el español y el inglés tengan la misma estructura.',
        stack: ['React 19', 'TypeScript', 'Tailwind', 'Skiper UI', 'Vite'],
        repo: `${GITHUB}/portfolio-site`,
      },
    ],
    captions: {
      dashboard: 'El panel en Angular con los datos reales de 2024 de una alcaldía.',
      warning:
        'Un hallazgo de los datos: en 2019 un contrato digitado con un valor imposible explica el 100 % del total. ' +
        'El panel lo dice en vez de mostrar la cifra como un hecho.',
      mobile: 'La app en Flutter.',
    },
  },
  ai: {
    title: 'Proyectos de IA',
    intro:
      'Cinco proyectos en Python contra la API de Claude, sin frameworks de agentes, para que el mecanismo se vea en ' +
      'el código. Cada README publica solo números que salieron de una ejecución real, y una sección de límites.',
    items: [
      {
        name: 'consultor-tributario',
        kind: 'RAG en español',
        summary:
          'Preguntas sobre el Estatuto Tributario con cita del artículo en cada afirmación. Incluye la ingesta: ' +
          '1.301 artículos extraídos de la compilación oficial, con tres formatos de HTML distintos.',
        proof: 'La evidencia entre los 5 primeros resultados pasó de 40 % (solo vectores) a 77 % (híbrida + reranker multilingüe).',
        stack: ['Python', 'BM25', 'Embeddings', 'Reranking', 'Claude'],
        repo: `${GITHUB}/consultor-tributario`,
      },
      {
        name: 'enterprise-rag',
        kind: 'RAG con evaluación',
        summary:
          'Reescritura de la pregunta, recuperación híbrida, reordenamiento y un juez que comprueba cada afirmación ' +
          'contra las fuentes antes de responder. La evaluación corre en CI y frena las regresiones; cada pregunta ' +
          'deja una traza con su costo por etapa.',
        proof: '88 % de respuestas correctas y 100 % de afirmaciones respaldadas en 33 preguntas; ninguno de los 4 fallos fue un dato inventado.',
        stack: ['Python', 'RRF', 'Cross-encoder', 'Claude'],
        repo: `${GITHUB}/enterprise-rag`,
      },
      {
        name: 'secop-mcp',
        kind: 'Servidor MCP',
        summary:
          'Conecta un LLM con la contratación pública colombiana. El modelo no escribe consultas: llena una consulta ' +
          'tipada, y las columnas con datos personales son inalcanzables.',
        proof: '17 pruebas, una contra la API real de datos.gov.co.',
        stack: ['Python', 'MCP', 'Socrata', 'Pydantic'],
        repo: `${GITHUB}/secop-mcp`,
      },
      {
        name: 'legacy-db-mcp',
        kind: 'Servidor MCP',
        summary:
          'Un LLM consulta en lenguaje natural una base de datos heredada. El motor de la base, y no un prompt, ' +
          'decide qué puede tocar: solo lectura, columnas sensibles enmascaradas, tiempo límite.',
        proof: '16 pruebas y tres sesiones verificadas contra el modelo real.',
        stack: ['Python', 'MCP', 'SQLite authorizer'],
        repo: `${GITHUB}/legacy-db-mcp`,
      },
      {
        name: 'sandboxed-agent',
        kind: 'Agente autónomo',
        summary:
          'Un orquestador delega en agentes especialistas, se detiene a pedir aprobación humana en las decisiones que ' +
          'importan y solo puede actuar dentro de un contenedor sin red.',
        proof: '18 pruebas, incluida una que verifica el aislamiento con Docker real.',
        stack: ['Python', 'Docker', 'Claude'],
        repo: `${GITHUB}/sandboxed-agent`,
      },
    ],
  },
  personal: {
    title: 'Otros proyectos propios',
    items: [
      {
        name: 'PC Remote',
        kind: 'Python · Kotlin',
        summary:
          'Control remoto del PC desde el teléfono: un servidor en la bandeja de Windows y una app Android nativa que ' +
          'hablan por WebSocket cifrado, con la huella del certificado fijada al emparejar.',
        proof: 'Más de 200 commits.',
        stack: ['Python', 'Kotlin', 'Jetpack Compose', 'WebSocket', 'TLS'],
      },
      {
        name: 'ERP de bolsillo para agricultores',
        kind: 'En desarrollo · Java',
        summary:
          'Un pequeño agricultor le cuenta por WhatsApp lo que hizo en su finca ("compré 4 bultos de abono a 170 mil") ' +
          'y el sistema lleva las cuentas: gastos, jornales, cosechas, ventas y balance por cultivo.',
        proof: 'En desarrollo: hoy se prueba contra un simulador de WhatsApp propio; falta la integración real y bastante más.',
        stack: ['Java 21', 'Spring Boot', 'Gemini', 'PostgreSQL', 'Flyway'],
      },
      {
        name: 'CrediYa',
        kind: 'Microservicios reactivos',
        summary:
          'Autenticación y solicitudes de crédito como dos microservicios reactivos con arquitectura limpia, ' +
          'contrato OpenAPI y pruebas unitarias.',
        proof: 'Código público.',
        stack: ['Java', 'Spring WebFlux', 'R2DBC', 'JWT', 'Docker'],
        repo: `${GITHUB}/crediya-microservice-auth`,
      },
    ],
  },
  stack: {
    title: 'Con qué trabajo',
    note:
      'Mi trabajo diario es backend. React, Angular y Flutter los uso para llevar un producto hasta la pantalla; ' +
      'los proyectos de arriba muestran hasta dónde.',
    groups: [
      {
        name: 'Todos los días',
        items: ['Java 17–21', 'Spring Boot 3', 'Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'Flyway', 'Docker', 'GitHub Actions',
                'Cloud Run', 'Pub/Sub', 'Cloud Storage'],
      },
      {
        name: 'IA aplicada',
        items: ['Extracción multimodal', 'RAG híbrido', 'Reranking', 'Evaluación con conjuntos dorados', 'Servidores MCP',
                'Agentes con aprobación humana', 'API de Claude', 'API de Gemini'],
      },
      {
        name: 'También construyo con',
        items: ['TypeScript', 'Node.js', 'React', 'Angular', 'Flutter', 'Kotlin', 'AWS Lambda', 'Terraform', 'ANTLR4'],
      },
    ],
  },
  contact: {
    title: 'Hablemos',
    text: 'Busco un rol de AI engineer o product engineer. Escríbeme y te cuento el detalle de cualquiera de estos proyectos.',
    email: 'Escribirme',
    github: 'GitHub',
  },
  live: 'Ver en vivo',
  code: 'Código',
  status: 'Disponible para un nuevo rol',
  credit: 'Animaciones adaptadas de Skiper UI.',
  footer: 'Hecho con React y TypeScript. Sin rastreadores.',
}

const en: Content = {
  nav: { work: 'Experience', product: 'Product', ai: 'AI', stack: 'Stack', contact: 'Contact' },
  role: 'Software engineer · backend and applied AI',
  pitch:
    'Since 2022 I have been building backends that turn documents into data you can verify, for financial and ' +
    'public-sector organisations in Colombia: extraction with language models, validation with business rules, and ' +
    'integration with the systems already in place.',
  facts: [
    { value: '4+ years', label: 'of production backend for finance and the public sector' },
    { value: '5', label: 'AI projects of my own, with tests and measured results' },
    { value: '1 product', label: 'taken to four stacks: Node.js, Angular, Flutter and React' },
  ],
  work: {
    title: 'Client work',
    intro:
      'These systems belong to clients, so there are no names, screenshots or internal figures here: only the ' +
      'problem, what I built and with what. I can go into what confidentiality allows in an interview.',
    items: [
      {
        sector: 'Financial services',
        period: '2022 – 2026',
        title: 'Extraction of insurance policies and identity documents',
        summary:
          'A backend that reads insurance policies and identity documents, extracts their fields and validates them ' +
          "against the organisation's business rules.",
        points: [
          'It began with one template per insurer format; I later added extraction with a multimodal model behind our own FastAPI service.',
          'I split the communication with the model into three parts: data mapping, validation orchestration and a thin facade.',
          'Batch processing, a result cache in object storage, and infrastructure as code.',
        ],
        stack: ['Java 17', 'Spring Boot', 'Python', 'FastAPI', 'Gemini', 'Pub/Sub', 'Cloud Storage', 'MySQL', 'Terraform'],
      },
      {
        sector: 'Banking',
        period: '2022 – 2026',
        title: 'Automation of garnishment orders',
        summary:
          'Banks receive garnishment orders as PDFs. The system reads them, identifies the defendants and the case ' +
          'data, and integrates with the core banking system.',
        points: [
          'ANTLR4 grammars to pull fields out of legal text that every court words differently.',
          'A second version with clean architecture in Gradle modules, LLM extraction and configurable field schemas.',
          'Browsable inconsistency reports, signed URLs for documents, and access plus refresh token authentication.',
        ],
        stack: ['Java', 'Spring Boot', 'ANTLR4', 'Python', 'LLM', 'Cloud Run', 'Flyway', 'GitHub Actions'],
      },
      {
        sector: 'Regional government',
        period: '2024 – 2026',
        title: 'Vehicle tax collection and reconciliation',
        summary:
          'Three systems for the same organisation: validation of bulk payments, verification of ' +
          'administrative acts, and monitoring of the collection bank accounts.',
        points: [
          'Bulk payment uploads from Excel, matching against credit notes, and reports that split revenue between the region and its municipalities.',
          'Extraction of administrative acts from PDF and matching against bank data, with inconsistency management.',
          'SFTP ingestion of statements from several banks, indicators for the dashboard and exportable reports.',
        ],
        stack: ['Java 17', 'Spring Boot 3', 'Spring Security', 'Python', 'FastAPI', 'MySQL', 'Alembic', 'Apache POI'],
      },
      {
        sector: 'Business registry',
        period: '2025 – 2026',
        title: 'Reading corporate minutes with an LLM',
        summary:
          'Microservices that receive minutes of shareholder and board meetings, extract appointments, quorum and ' +
          'votes, and return a structured summary for the reviewer.',
        points: [
          'Asynchronous processing with queues and non-blocking retries, and live progress over WebSocket.',
          'Prompt tuning on real cases: quorum with attendees who hold no shares, appointments described in free text.',
          'One-time-code login and continuous deployment with GitHub Actions.',
        ],
        stack: ['Java', 'Spring Boot', 'Python', 'LLM', 'Pub/Sub', 'WebSocket', 'Docker', 'GitHub Actions'],
      },
      {
        sector: 'Payments',
        period: '2026',
        title: 'Middleware for instant payments (Bre-B)',
        summary:
          "The bridge between a business portal and Colombia's instant payment system: registering, changing, " +
          'blocking and looking up payment keys.',
        points: [
          'Java 21 with virtual threads; outbound, OAuth2 client credentials and mTLS; inbound, JWT with roles.',
          'A complete simulation mode, so the frontend team could move without depending on the provider.',
          'An audit log with the timestamps the regulation requires, designed for reconciliation.',
        ],
        stack: ['Java 21', 'Spring Boot 3.4', 'Spring Security', 'OAuth2', 'mTLS', 'OpenAPI', 'Cloud Run'],
      },
      {
        sector: 'Payroll lending',
        period: '2022 – 2025',
        title: 'Verification of payslips and pension statements',
        summary:
          'Validates the payslips an applicant submits: extracts their fields according to each payer\'s format and ' +
          'checks them against the source.',
        points: [
          'Extractors and validators per format, including QR code reading.',
          "Robots that query the issuer's verification portal and compare the result.",
        ],
        stack: ['Java', 'Spring Boot', 'Python', 'Node.js', 'Puppeteer'],
      },
      {
        sector: 'Outdoor advertising',
        period: '2026',
        title: 'Asset operations backend',
        summary:
          'A modular monolith to operate a georeferenced inventory: contracts, legal obligations, work orders and ' +
          'notifications.',
        points: [
          'Map search and filtering with a cache, and files served through signed URLs.',
          'Roles and permissions, versioned migrations and OpenAPI documentation for the whole API.',
        ],
        stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Flyway', 'JWT', 'Cloud Run'],
      },
      {
        sector: 'Document SaaS',
        period: '2023',
        title: 'Serverless platform for templates and extraction',
        summary: 'A serverless API where each company defines its document templates and processes files in batches.',
        points: [
          'Multi-file upload with presigned URLs, managed OCR and control of orphaned processes.',
          'Users, roles and companies on a managed identity provider.',
        ],
        stack: ['Python', 'Flask', 'AWS Lambda', 'Cognito', 'Textract', 'S3', 'Serverless Framework'],
      },
    ],
  },
  product: {
    title: 'Contratos a la vista',
    intro:
      'A product of my own on public data: how much each Colombian state entity contracts, with whom and how. It ' +
      'uses the six million contracts of SECOP II on datos.gov.co. I built it in four pieces to show one product ' +
      'from the database to the screen.',
    parts: [
      {
        name: 'secop-api',
        kind: 'Node.js · TypeScript',
        summary:
          'An HTTP API with no production dependencies. No client input reaches a query unvalidated, suppliers\' ' +
          'identity numbers never leave it, and a cache avoids repeating slow queries.',
        proof: '10 local tests and one against datos.gov.co. Searching 5,800 entities went from 90 s to 3 ms.',
        stack: ['Node 24', 'TypeScript', 'node:test'],
        repo: `${GITHUB}/secop-api`,
        demo: 'https://secop-api-i89q.onrender.com',
      },
      {
        name: 'secop-dashboard',
        kind: 'Angular 22',
        summary:
          'Web dashboard: year selector, indicators, top suppliers, modalities, months and the contract table with a ' +
          'link to each file. It warns when a single mistyped contract explains the year\'s total.',
        proof: 'Standalone components, signals and httpResource; 3 tests.',
        stack: ['Angular 22', 'Signals', 'Vitest'],
        repo: `${GITHUB}/secop-dashboard`,
        demo: 'https://0103juan.github.io/secop-dashboard/#/entidad/890905211?year=2024',
      },
      {
        name: 'secop-mobile',
        kind: 'Flutter',
        summary:
          'The same question on a phone: search, the year at a glance, suppliers, and contracts with pagination. ' +
          'It builds for Android and for the web.',
        proof: 'A widget test of the whole journey against a fake API.',
        stack: ['Flutter 3', 'Dart', 'Material 3'],
        repo: `${GITHUB}/secop-mobile`,
      },
      {
        name: 'portfolio-site',
        kind: 'React',
        summary: 'This site: React, TypeScript and Tailwind, with animated components from Skiper UI and typed content in two languages.',
        proof: 'The compiler checks that the Spanish and English versions have the same structure.',
        stack: ['React 19', 'TypeScript', 'Tailwind', 'Skiper UI', 'Vite'],
        repo: `${GITHUB}/portfolio-site`,
      },
    ],
    captions: {
      dashboard: "The Angular dashboard with a city government's real 2024 data.",
      warning:
        'A finding in the data: in 2019 one contract typed with an impossible value explains 100% of the total. ' +
        'The dashboard says so instead of presenting the figure as a fact.',
      mobile: 'The Flutter app.',
    },
  },
  ai: {
    title: 'AI projects',
    intro:
      'Five Python projects written directly against the Claude API, with no agent framework, so the mechanism is ' +
      'visible in the code. Each README publishes only numbers that came from a real run, and a section on limits.',
    items: [
      {
        name: 'consultor-tributario',
        kind: 'RAG in Spanish',
        summary:
          "Questions about Colombia's tax code, with the article cited in every statement. It includes the " +
          'ingestion: 1,301 articles parsed from the official compilation, across three different HTML layouts.',
        proof: 'Evidence in the top 5 results went from 40% (vectors only) to 77% (hybrid + multilingual reranker).',
        stack: ['Python', 'BM25', 'Embeddings', 'Reranking', 'Claude'],
        repo: `${GITHUB}/consultor-tributario`,
      },
      {
        name: 'enterprise-rag',
        kind: 'RAG with evaluation',
        summary:
          'Query rewriting, hybrid retrieval, reranking, and a judge that checks every claim against the sources ' +
          'before answering. The evaluation runs in CI and stops regressions; every question leaves a trace with ' +
          'its cost per stage.',
        proof: '88% correct answers and 100% supported claims on 33 questions; none of the 4 misses was a made-up fact.',
        stack: ['Python', 'RRF', 'Cross-encoder', 'Claude'],
        repo: `${GITHUB}/enterprise-rag`,
      },
      {
        name: 'secop-mcp',
        kind: 'MCP server',
        summary:
          'Connects an LLM to Colombian public procurement. The model writes no queries: it fills in a typed query, ' +
          'and the columns with personal data cannot be reached.',
        proof: '17 tests, one against the real datos.gov.co API.',
        stack: ['Python', 'MCP', 'Socrata', 'Pydantic'],
        repo: `${GITHUB}/secop-mcp`,
      },
      {
        name: 'legacy-db-mcp',
        kind: 'MCP server',
        summary:
          'An LLM queries a legacy database in plain language. The database engine, not a prompt, decides what it ' +
          'may touch: read-only, sensitive columns masked, a time limit.',
        proof: '16 tests and three sessions checked against the live model.',
        stack: ['Python', 'MCP', 'SQLite authorizer'],
        repo: `${GITHUB}/legacy-db-mcp`,
      },
      {
        name: 'sandboxed-agent',
        kind: 'Autonomous agent',
        summary:
          'An orchestrator delegates to specialist agents, stops for human approval at the decisions that matter, ' +
          'and can only act inside a container with no network.',
        proof: '18 tests, including one that verifies the isolation with real Docker.',
        stack: ['Python', 'Docker', 'Claude'],
        repo: `${GITHUB}/sandboxed-agent`,
      },
    ],
  },
  personal: {
    title: 'Other projects of my own',
    items: [
      {
        name: 'PC Remote',
        kind: 'Python · Kotlin',
        summary:
          'Remote control of a PC from a phone: a Windows tray server and a native Android app that talk over an ' +
          'encrypted WebSocket, with the certificate fingerprint pinned at pairing.',
        proof: 'More than 200 commits.',
        stack: ['Python', 'Kotlin', 'Jetpack Compose', 'WebSocket', 'TLS'],
      },
      {
        name: 'Pocket ERP for small farmers',
        kind: 'In development · Java',
        summary:
          'A small farmer tells WhatsApp what happened on the farm ("I bought 4 sacks of fertiliser at 170 thousand") ' +
          'and the system keeps the books: expenses, day labour, harvests, sales and a balance per crop.',
        proof: 'In development: today it is exercised against its own WhatsApp simulator; the real integration and a good deal more are still to come.',
        stack: ['Java 21', 'Spring Boot', 'Gemini', 'PostgreSQL', 'Flyway'],
      },
      {
        name: 'CrediYa',
        kind: 'Reactive microservices',
        summary:
          'Authentication and loan applications as two reactive microservices with clean architecture, an OpenAPI ' +
          'contract and unit tests.',
        proof: 'Public code.',
        stack: ['Java', 'Spring WebFlux', 'R2DBC', 'JWT', 'Docker'],
        repo: `${GITHUB}/crediya-microservice-auth`,
      },
    ],
  },
  stack: {
    title: 'What I work with',
    note:
      'My daily work is backend. I use React, Angular and Flutter to take a product all the way to the screen; ' +
      'the projects above show how far.',
    groups: [
      {
        name: 'Every day',
        items: ['Java 17–21', 'Spring Boot 3', 'Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'Flyway', 'Docker', 'GitHub Actions',
                'Cloud Run', 'Pub/Sub', 'Cloud Storage'],
      },
      {
        name: 'Applied AI',
        items: ['Multimodal extraction', 'Hybrid RAG', 'Reranking', 'Evaluation with golden sets', 'MCP servers',
                'Agents with human approval', 'Claude API', 'Gemini API'],
      },
      {
        name: 'I also build with',
        items: ['TypeScript', 'Node.js', 'React', 'Angular', 'Flutter', 'Kotlin', 'AWS Lambda', 'Terraform', 'ANTLR4'],
      },
    ],
  },
  contact: {
    title: "Let's talk",
    text: 'I am looking for an AI engineer or product engineer role. Write to me and I will walk you through any of these projects.',
    email: 'Email me',
    github: 'GitHub',
  },
  live: 'See it live',
  code: 'Code',
  status: 'Available for a new role',
  credit: 'Animations adapted from Skiper UI.',
  footer: 'Built with React and TypeScript. No trackers.',
}

export const content: Record<Lang, Content> = { es, en }
