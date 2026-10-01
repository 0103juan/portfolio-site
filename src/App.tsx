import { useEffect, useState } from 'react'
import { content, EMAIL, GITHUB, type Content, type Lang } from './content'

const isLang = (value: string | null): value is Lang => value === 'es' || value === 'en'

/** ?lang= in the URL wins (so a link can be sent in one language), then the last choice, then the browser. */
function initialLang(): Lang {
  const asked = new URLSearchParams(location.search).get('lang')
  if (isLang(asked)) return asked
  try {
    const saved = localStorage.getItem('lang')
    if (isLang(saved)) return saved
  } catch {
    // storage can be blocked; the browser language is a fine fallback
  }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

const shot = (name: string) => `${import.meta.env.BASE_URL}shots/${name}.png`

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ProjectCard({ project }: { project: Content['ai']['items'][number] }) {
  return (
    <article className="card">
      <p className="eyebrow">{project.kind}</p>
      <h3>{project.repo ? <a href={project.repo}>{project.name}</a> : project.name}</h3>
      <p>{project.summary}</p>
      <p className="proof">{project.proof}</p>
      <Chips items={project.stack} />
    </article>
  )
}

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const t = content[lang]
  const other: Lang = lang === 'es' ? 'en' : 'es'

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `Juan Pablo Cuervo · ${t.role}`
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // not being able to remember the language is harmless
    }
  }, [lang, t.role])

  return (
    <>
      <header className="nav">
        <a className="brand" href="#top">Juan Pablo Cuervo</a>
        <nav>
          <a href="#work">{t.nav.work}</a>
          <a href="#product">{t.nav.product}</a>
          <a href="#ai">{t.nav.ai}</a>
          <a href="#stack">{t.nav.stack}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <button type="button" className="lang" onClick={() => setLang(other)} lang={other}
                aria-label={other === 'en' ? 'Read this page in English' : 'Leer esta página en español'}>
          {other.toUpperCase()}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">{t.role}</p>
          <h1>Juan Pablo Cuervo</h1>
          <p className="pitch">{t.pitch}</p>
          <p className="actions">
            <a className="button primary" href={`mailto:${EMAIL}`}>{t.contact.email}</a>
            <a className="button" href={GITHUB}>{t.contact.github}</a>
          </p>
          <dl className="facts">
            {t.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="work">
          <h2>{t.work.title}</h2>
          <p className="intro">{t.work.intro}</p>
          <div className="grid two">
            {t.work.items.map((item) => (
              <article className="card" key={item.title}>
                <p className="eyebrow">
                  {item.sector} <span>{item.period}</span>
                </p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <ul className="points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Chips items={item.stack} />
              </article>
            ))}
          </div>
        </section>

        <section id="product">
          <h2>{t.product.title}</h2>
          <p className="intro">{t.product.intro}</p>
          <div className="showcase">
            <figure className="browser">
              <img src={shot('dashboard')} width={1920} height={1350} alt={t.product.captions.dashboard} />
              <figcaption>{t.product.captions.dashboard}</figcaption>
            </figure>
            <figure className="phone">
              <img src={shot('mobile')} width={780} height={1688} alt={t.product.captions.mobile} loading="lazy" />
              <figcaption>{t.product.captions.mobile}</figcaption>
            </figure>
          </div>
          <figure className="browser finding">
            <img src={shot('warning')} width={1920} height={712} alt={t.product.captions.warning} loading="lazy" />
            <figcaption>{t.product.captions.warning}</figcaption>
          </figure>
          <div className="grid two">
            {t.product.parts.map((part) => (
              <ProjectCard project={part} key={part.name} />
            ))}
          </div>
        </section>

        <section id="ai">
          <h2>{t.ai.title}</h2>
          <p className="intro">{t.ai.intro}</p>
          <div className="grid two">
            {t.ai.items.map((item) => (
              <ProjectCard project={item} key={item.name} />
            ))}
          </div>
          <h2 className="minor">{t.personal.title}</h2>
          <div className="grid two">
            {t.personal.items.map((item) => (
              <ProjectCard project={item} key={item.name} />
            ))}
          </div>
        </section>

        <section id="stack">
          <h2>{t.stack.title}</h2>
          <p className="intro">{t.stack.note}</p>
          <div className="grid three">
            {t.stack.groups.map((group) => (
              <div key={group.name}>
                <h3 className="group">{group.name}</h3>
                <Chips items={group.items} />
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>{t.contact.title}</h2>
          <p className="intro">{t.contact.text}</p>
          <p className="actions">
            <a className="button primary" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a className="button" href={GITHUB}>github.com/0103juan</a>
          </p>
        </section>
      </main>

      <footer>{t.footer}</footer>
    </>
  )
}
