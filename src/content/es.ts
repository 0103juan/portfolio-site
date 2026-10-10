import { GITHUB } from './links'
import type { Content } from './types'

export const es: Content = {
  nav: { ai: 'IA aplicada', work: 'Experiencia', fullstack: 'Full stack', product: 'Producto', stack: 'Stack', contact: 'Contacto' },
  role: 'AI Engineer · Backend · Full Stack',
  headline: { lead: 'Modelos de lenguaje en sistemas que', key: 'se pueden verificar.' },
  pitch:
    'Soy Backend Lead. Desde 2022 construyo sistemas que convierten documentos en datos para entidades financieras ' +
    'y del sector público en Colombia, de la base de datos a la pantalla.',
  facts: [
    { value: 7, unit: '', label: 'proyectos de IA propios, con pruebas y resultados medidos' },
    { value: 6, unit: 'años', label: 'desarrollando software, cuatro liderando backend para finanzas y sector público' },
    { value: 1, unit: 'producto', label: 'llevado a cuatro stacks: Node.js, Angular, Flutter y React' },
  ],
  work: {
    title: 'Trabajo con clientes',
    intro:
      'Estos sistemas son de clientes, así que aquí no hay nombres, capturas ni cifras internas: solo el problema, ' +
      'lo que construí y con qué. Los que usan modelos de lenguaje van primero y llevan la tecnología marcada. Los ' +
      'detalles que la confidencialidad permite los cuento en una entrevista.',
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
  fullstack: {
    title: 'De la base de datos a la pantalla',
    intro:
      'Mi trabajo diario es backend. Estas son las capas que he construido de punta a punta en proyectos propios, ' +
      'cada una con el repositorio que lo demuestra. No me presento como especialista en frontend: sí como alguien ' +
      'que puede llevar un producto completo hasta producción.',
    layers: [
      {
        name: 'Web',
        tech: ['Angular 22', 'React 19', 'TypeScript', 'Tailwind'],
        proof: 'Un panel en vivo con 12 pruebas unitarias y 6 de extremo a extremo que corren en cada despliegue, y este sitio.',
        project: 'secop-dashboard',
        repo: `${GITHUB}/secop-dashboard`,
      },
      {
        name: 'Móvil',
        tech: ['Flutter', 'Dart', 'Kotlin', 'Jetpack Compose'],
        proof: 'Una app en Flutter que compila para Android y web, con prueba de widgets del recorrido completo. PC Remote es una app Android nativa.',
        project: 'secop-mobile',
        repo: `${GITHUB}/secop-mobile`,
      },
      {
        name: 'API y backend',
        tech: ['Java 21', 'Spring Boot', 'Python', 'FastAPI', 'Node.js'],
        proof: 'Dos microservicios reactivos con arquitectura hexagonal y 119 pruebas, con reglas de arquitectura y pruebas de mutación.',
        project: 'crediya',
        repo: `${GITHUB}/crediya-microservice-loan`,
      },
      {
        name: 'Datos',
        tech: ['PostgreSQL', 'pgvector', 'Redis', 'MySQL'],
        proof: '35.718 contratos cargados de forma incremental; búsqueda híbrida en una sola consulta, con mediana de 15 ms.',
        project: 'secop-analyst',
        repo: `${GITHUB}/secop-analyst`,
      },
      {
        name: 'Mensajería',
        tech: ['SQS', 'Lambda', 'Pub/Sub', 'WebSocket'],
        proof: 'La decisión de un crédito viaja por una cola hasta una función que avisa por correo; CI comprueba el recorrido completo.',
        project: 'crediya',
        repo: `${GITHUB}/crediya-microservice-loan`,
      },
      {
        name: 'Infraestructura',
        tech: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions'],
        proof: 'Siete módulos de Terraform para AWS con 31 pruebas contra un proveedor simulado. No se ha aplicado en una cuenta real.',
        project: 'terraform-aws-platform',
        repo: `${GITHUB}/terraform-aws-platform`,
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
        proof: '12 pruebas locales y una contra datos.gov.co. Buscar entre 5.800 entidades pasó de 90 s a 3 ms.',
        stack: ['Node 24', 'TypeScript', 'node:test'],
        repo: `${GITHUB}/secop-api`,
        demo: 'https://secop-api-i89q.onrender.com',
      },
      {
        name: 'secop-dashboard',
        kind: 'Angular 22',
        summary:
          'Panel web que explica el año de una entidad: cuánto cambió frente al anterior, cuánto concentran los ' +
          'mayores contratistas, qué parte se adjudicó por contratación directa y cuándo se firmó. Avisa cuando un ' +
          'solo contrato mal digitado explica el total, y entonces no lo compara con otro año.',
        proof: '12 pruebas unitarias y 6 de extremo a extremo: un navegador real contra la API real, en cada despliegue. Cada frase que el panel puede decir está probada.',
        stack: ['Angular 22', 'Signals', 'Vitest', 'Playwright', 'Skiper UI portado a Angular'],
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
      dashboard: 'El panel en Angular con los datos reales de 2024 de una alcaldía: cada cifra viene con su lectura.',
      warning:
        'Un hallazgo de los datos: en 2019 un contrato digitado con un valor imposible explica el 100 % del total. ' +
        'El panel lo dice, muestra el total sin ese contrato y se niega a comparar ese año con otro.',
      mobile: 'La app en Flutter.',
    },
  },
  ai: {
    title: 'Cada número salió de una ejecución real',
    intro:
      'Siete proyectos en Python contra la API de Claude. Cinco no usan frameworks de agentes, para que el mecanismo ' +
      'se vea en el código; el agente de contratos usa LangGraph. Cada README publica solo números que salieron de ' +
      'una ejecución real, y una sección de límites.',
    items: [
      {
        name: 'secop-analyst',
        kind: 'Agente con LangGraph',
        summary:
          'Un agente que responde preguntas sobre 35.718 contratos públicos: búsqueda híbrida en PostgreSQL con ' +
          'pgvector, SQL escrito por el modelo y contenido por la base de datos, pausa para aprobación humana cuando ' +
          'una consulta es costosa, y memoria en dos niveles entre Redis y Postgres.',
        proof: '28 pruebas contra Postgres y Redis reales. En una pregunta real, 38 cifras comprobadas contra la base y todas correctas, en 33 s y unos 0,06 USD. Corre en Docker Compose y en Kubernetes local, con trazas de OpenTelemetry.',
        stack: ['Python', 'LangGraph', 'PostgreSQL', 'pgvector', 'Redis', 'FastAPI', 'OpenTelemetry', 'Kubernetes'],
        repo: `${GITHUB}/secop-analyst`,
      },
      {
        name: 'consultor-tributario',
        kind: 'RAG en español',
        summary:
          'Preguntas sobre el Estatuto Tributario con cita del artículo en cada afirmación. Incluye la ingesta: ' +
          '1.301 artículos extraídos de la compilación oficial, con tres formatos de HTML distintos.',
        proof: 'La evidencia entre los 5 primeros resultados pasó de 40 % (solo vectores) a 77 % (híbrida + reranker multilingüe). De punta a punta, 29 de 33 respuestas correctas; en las 4 que falló dijo «no lo sé» en vez de inventar.',
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
        proof: '24 pruebas, una contra la API real. Una sesión real mostró dos fallos y ambos se corrigieron en la herramienta, no en el prompt: un directorio de entidades y montos escritos por código.',
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
        proof: '18 pruebas, una con Docker real. En una sesión real, el agente revisor encontró tres defectos que las 35 pruebas del programador no cubrían.',
        stack: ['Python', 'Docker', 'Claude'],
        repo: `${GITHUB}/sandboxed-agent`,
      },
      {
        name: 'model-gateway',
        kind: 'Gateway de modelos',
        summary:
          'Un paquete que mis proyectos importan en vez de llamar al SDK: enruta cada tarea a un modelo pequeño o ' +
          'grande, cambia de modelo si uno falla, guarda las respuestas en caché, registra el costo de cada llamada y ' +
          'corta cuando una clave agota su presupuesto.',
        proof: '36 pruebas. Medido en 33 preguntas: el modelo grande acertó 28 por 0,66 USD y el pequeño 27 por 0,27 USD; repetir la corrida costó 0,00 USD desde la caché.',
        stack: ['Python', 'Claude', 'Pydantic'],
        repo: `${GITHUB}/model-gateway`,
      },
    ],
  },
  demo: {
    label: 'Demo grabada · secop-mcp',
    title: 'Una pregunta real, paso a paso',
    note:
      'Sesión del 1 de octubre de 2026 con claude-sonnet-5-5. No es una llamada en vivo: las llamadas a ' +
      'herramientas salen de la bitácora de auditoría del servidor y la respuesta es la del modelo, abreviada.',
    stats: '5 llamadas a herramientas · unos 2 minutos',
    replay: 'Repetir',
    question: '¿Cuáles fueron los cinco mayores contratistas de la Alcaldía de Medellín en 2024?',
    steps: [
      { tool: 'describe_dataset', query: 'sin argumentos', result: 'Columnas consultables y las trampas de los datos', status: 'ok' },
      {
        tool: 'query_contracts',
        query: 'nombre contiene «medell» · año 2024 · contar por entidad',
        result: 'datos.gov.co no respondió en 60 s',
        status: 'error',
      },
      {
        tool: 'query_contracts',
        query: 'nombre contiene «alcaldía de medell» · año 2024',
        result: '0 filas: SECOP II no la llama «Alcaldía»',
        status: 'empty',
      },
      {
        tool: 'query_contracts',
        query: 'nombre y ciudad contienen «medell» · año 2024',
        result: '15 entidades, entre ellas el nombre oficial',
        status: 'ok',
      },
      {
        tool: 'query_contracts',
        query:
          'entidad = «DISTRITO ESPECIAL DE CIENCIA TECNOLOGIA E INNOVACION DE MEDELLIN» · año 2024 · sin borradores ' +
          'ni cancelados · suma, máximo y conteo por contratista',
        result: '5 filas',
        status: 'ok',
      },
    ],
    answer: {
      intro: 'Los cinco mayores contratistas de la Alcaldía de Medellín en 2024, por valor total contratado, fueron los siguientes.',
      columns: ['Contratista', 'Valor total (COP)', 'Contratos', 'Contrato mayor (COP)'],
      rows: [
        ['Bancolombia', '491.372 mil millones', '1', '491.372 mil millones'],
        ['ESE Metrosalud', '342.732 mil millones', '28', '45.000 mil millones'],
        ['Institución Universitaria ITM', '283.679 mil millones', '63', '17.305 mil millones'],
        ['Empresa de Desarrollo Urbano de Medellín', '222.542 mil millones', '10', '117.733 mil millones'],
        ['Empresa para la Seguridad y Soluciones Urbanas, ESU', '162.993 mil millones', '9', '51.547 mil millones'],
      ],
      warnings: [
        'Bancolombia: su total sale de un solo contrato de unos 491 billones de pesos. Es posible que sea un error de ' +
          'digitación o un contrato atípico. Conviene verificarlo en la fuente antes de tomarlo como real.',
        'Metrosalud, ITM y las demás entidades son en su mayoría contratos interadministrativos. Si busca ' +
          'contratistas privados, el ranking sería distinto.',
        'Los datos son solo de SECOP II, así que las cifras son un piso y no el total contratado.',
      ],
    },
    findings: {
      title: 'Lo que la grabación deja ver',
      items: [
        'Acertó en lo difícil: descubrió que SECOP II registra a la Alcaldía con otro nombre, notó que el Concejo y la ' +
          'Personería comparten su NIT y filtró por el nombre exacto.',
        'Se equivocó una vez al redactar: escribió «491 billones» donde su propia tabla dice 491 mil millones, mil ' +
          'veces menos. El número que devolvió la herramienta era correcto; los montos debe formatearlos el código, no el modelo.',
        'Encontrar la entidad costó un tiempo agotado y dos llamadas de más. La búsqueda por nombre es el camino lento de estos datos.',
      ],
    },
    more: { text: 'La sesión completa, en el README', href: `${GITHUB}/secop-mcp#the-same-question-asked-through-the-model` },
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
        kind: 'Microservicios · SQS · Lambda',
        summary:
          'Dos microservicios reactivos con arquitectura hexagonal: autenticación con JWT y solicitudes de crédito. ' +
          'Cuando un asesor aprueba o rechaza una solicitud, el servicio publica la decisión en una cola SQS y una ' +
          'función Lambda le avisa al cliente por correo.',
        proof: '119 pruebas en los dos servicios, con reglas de arquitectura y pruebas de mutación. CI levanta la cola y la Lambda en LocalStack y comprueba que un mensaje termina en correo. No está desplegado en AWS.',
        stack: ['Java 21', 'Spring WebFlux', 'R2DBC', 'SQS', 'Lambda', 'LocalStack', 'ArchUnit', 'PIT'],
        repo: `${GITHUB}/crediya-microservice-loan`,
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
        name: 'IA aplicada',
        items: ['Extracción multimodal', 'RAG híbrido', 'Reranking', 'Evaluación con conjuntos dorados', 'Servidores MCP',
                'Agentes con LangGraph', 'Agentes con aprobación humana', 'API de Claude', 'API de Gemini'],
      },
      {
        name: 'Todos los días',
        items: ['Java 17–21', 'Spring Boot 3', 'Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'Flyway', 'Docker', 'GitHub Actions',
                'Cloud Run', 'Pub/Sub', 'Cloud Storage'],
      },
      {
        name: 'También construyo con',
        items: ['TypeScript', 'Node.js', 'React', 'Angular', 'Flutter', 'Kotlin', 'Redis', 'Kubernetes', 'AWS Lambda', 'Terraform', 'ANTLR4'],
      },
    ],
  },
  contact: {
    title: 'Hablemos',
    text: 'Abierto a oportunidades como AI Engineer, Backend Engineer o Full Stack Engineer. Si mi perfil se ajusta a lo que su equipo busca, con gusto agendamos una conversación.',
    email: 'Escribirme',
    github: 'GitHub',
  },
  where: 'Popayán, Cauca, Colombia · Inglés B2',
  live: 'Ver en vivo',
  code: 'Código',
  status: 'Disponible para un nuevo rol',
  credit: 'Animaciones adaptadas de Skiper UI.',
  footer: 'Hecho con React y TypeScript. Sin rastreadores.',
}
