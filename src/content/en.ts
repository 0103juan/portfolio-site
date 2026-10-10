import { GITHUB } from './links'
import type { Content } from './types'

export const en: Content = {
  nav: { work: 'Experience', product: 'Product', ai: 'Applied AI', stack: 'Stack', contact: 'Contact' },
  role: 'AI Engineer · Backend',
  pitch:
    'I put language models into systems you can verify. Since 2022 I have been building backends that turn ' +
    'documents into data for financial and public-sector organisations in Colombia: extraction with LLMs, validation ' +
    'with business rules, and integration with the systems already in place.',
  facts: [
    { value: '5', label: 'AI projects of my own, with tests and measured results' },
    { value: '4+ years', label: 'of production backend for finance and the public sector' },
    { value: '1 product', label: 'taken to four stacks: Node.js, Angular, Flutter and React' },
  ],
  work: {
    title: 'Client work',
    intro:
      'These systems belong to clients, so there are no names, screenshots or internal figures here: only the ' +
      'problem, what I built and with what. The ones that use language models come first, with that technology ' +
      'marked. I can go into what confidentiality allows in an interview.',
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
        proof: '12 local tests and one against datos.gov.co. Searching 5,800 entities went from 90 s to 3 ms.',
        stack: ['Node 24', 'TypeScript', 'node:test'],
        repo: `${GITHUB}/secop-api`,
        demo: 'https://secop-api-i89q.onrender.com',
      },
      {
        name: 'secop-dashboard',
        kind: 'Angular 22',
        summary:
          'A web dashboard that explains an entity\'s year: how it changed against the previous one, how much the ' +
          'largest suppliers hold, how much was awarded without competition and when it was signed. It warns when a ' +
          'single mistyped contract explains the total, and then refuses to compare that year with another.',
        proof: '12 unit tests and 6 end-to-end tests: a real browser against the real API, on every deployment. Every sentence the dashboard can say is tested.',
        stack: ['Angular 22', 'Signals', 'Vitest', 'Playwright', 'Skiper UI ported to Angular'],
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
      dashboard: "The Angular dashboard with a city government's real 2024 data: every figure comes with its reading.",
      warning:
        'A finding in the data: in 2019 one contract typed with an impossible value explains 100% of the total. ' +
        'The dashboard says so, shows the total without that contract and refuses to compare that year with another.',
      mobile: 'The Flutter app.',
    },
  },
  ai: {
    title: 'Applied AI',
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
        proof: 'Evidence in the top 5 results went from 40% (vectors only) to 77% (hybrid + multilingual reranker). End to end, 29 of 33 answers correct; on the 4 it missed it said "I don\'t know" instead of making something up.',
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
        proof: '24 tests, one against the real API. One real session showed two failures and both were fixed in the tool, not in the prompt: an entity directory, and amounts written out by code.',
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
        proof: "18 tests, one with real Docker. In a real session the reviewer agent found three defects that the coder's 35 tests did not cover.",
        stack: ['Python', 'Docker', 'Claude'],
        repo: `${GITHUB}/sandboxed-agent`,
      },
    ],
  },
  demo: {
    label: 'Recorded demo · secop-mcp',
    title: 'One real question, step by step',
    note:
      'A session from 1 October 2026 with claude-sonnet-5-5. It is not a live call: the tool calls come from the ' +
      "server's audit log and the answer is the model's, shortened. The session ran in Spanish; this is a translation.",
    stats: '5 tool calls · about 2 minutes',
    replay: 'Replay',
    question: 'Who were the five largest suppliers of the Medellín city government in 2024?',
    steps: [
      { tool: 'describe_dataset', query: 'no arguments', result: 'The columns it may query and the traps in the data', status: 'ok' },
      {
        tool: 'query_contracts',
        query: 'name contains "medell" · year 2024 · count by entity',
        result: 'datos.gov.co did not answer within 60 s',
        status: 'error',
      },
      {
        tool: 'query_contracts',
        query: 'name contains "alcaldía de medell" · year 2024',
        result: '0 rows: SECOP II does not call it "Alcaldía"',
        status: 'empty',
      },
      {
        tool: 'query_contracts',
        query: 'name and city contain "medell" · year 2024',
        result: '15 entities, the official name among them',
        status: 'ok',
      },
      {
        tool: 'query_contracts',
        query:
          'entity = "DISTRITO ESPECIAL DE CIENCIA TECNOLOGIA E INNOVACION DE MEDELLIN" · year 2024 · no drafts or ' +
          'cancellations · sum, max and count by supplier',
        result: '5 rows',
        status: 'ok',
      },
    ],
    answer: {
      intro: 'The five largest suppliers of the Medellín city government in 2024, by total contracted value, were these.',
      columns: ['Supplier', 'Total (COP)', 'Contracts', 'Largest contract (COP)'],
      rows: [
        ['Bancolombia', '491.37 billion', '1', '491.37 billion'],
        ['ESE Metrosalud', '342.73 billion', '28', '45.00 billion'],
        ['Institución Universitaria ITM', '283.68 billion', '63', '17.31 billion'],
        ['Empresa de Desarrollo Urbano de Medellín', '222.54 billion', '10', '117.73 billion'],
        ['Empresa para la Seguridad y Soluciones Urbanas, ESU', '162.99 billion', '9', '51.55 billion'],
      ],
      warnings: [
        'Bancolombia: its total comes from a single contract of about 491 trillion pesos. It may be a typing error ' +
          'or an unusual contract. It should be checked at the source before being taken as real.',
        'Metrosalud, ITM and the other entities are mostly contracts between public bodies. A ranking of private ' +
          'suppliers would look different.',
        'The data covers SECOP II only, so the figures are a floor, not the total contracted.',
      ],
    },
    findings: {
      title: 'What the recording shows',
      items: [
        'It got the hard part right: it found that SECOP II lists the city government under another name, noticed ' +
          'that the city council and the ombudsman share its tax ID, and filtered by the exact name.',
        'It slipped once while writing: it wrote "491 billones" (trillion) where its own table says 491 billion, a ' +
          'thousand times less. The number the tool returned was right; amounts should be formatted by code, not by the model.',
        'Finding the entity cost a timeout and two extra calls. Name search is the slow path on this dataset.',
      ],
    },
    more: { text: 'The full session, in the README', href: `${GITHUB}/secop-mcp#the-same-question-asked-through-the-model` },
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
        kind: 'Microservices · SQS · Lambda',
        summary:
          'Two reactive microservices with a hexagonal architecture: authentication with JWT, and loan requests. ' +
          'When an adviser approves or rejects a request, the service puts the decision on an SQS queue and a ' +
          'Lambda function emails the client.',
        proof: '119 tests across the two services, with architecture rules and mutation testing. CI starts the queue and the Lambda on LocalStack and checks that a message ends up as an email. It is not deployed to AWS.',
        stack: ['Java 21', 'Spring WebFlux', 'R2DBC', 'SQS', 'Lambda', 'LocalStack', 'ArchUnit', 'PIT'],
        repo: `${GITHUB}/crediya-microservice-loan`,
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
        name: 'Applied AI',
        items: ['Multimodal extraction', 'Hybrid RAG', 'Reranking', 'Evaluation with golden sets', 'MCP servers',
                'Agents with human approval', 'Claude API', 'Gemini API'],
      },
      {
        name: 'Every day',
        items: ['Java 17–21', 'Spring Boot 3', 'Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'Flyway', 'Docker', 'GitHub Actions',
                'Cloud Run', 'Pub/Sub', 'Cloud Storage'],
      },
      {
        name: 'I also build with',
        items: ['TypeScript', 'Node.js', 'React', 'Angular', 'Flutter', 'Kotlin', 'AWS Lambda', 'Terraform', 'ANTLR4'],
      },
    ],
  },
  contact: {
    title: "Let's talk",
    text: 'Open to opportunities as an AI Engineer, Backend Engineer or Full-Stack Engineer. If my profile matches what your team is looking for, I would be glad to set up a conversation.',
    email: 'Email me',
    github: 'GitHub',
  },
  where: 'Popayán, Cauca, Colombia · English B2',
  live: 'See it live',
  code: 'Code',
  status: 'Available for a new role',
  credit: 'Animations adapted from Skiper UI.',
  footer: 'Built with React and TypeScript. No trackers.',
}
