import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import {
  ArrowUpRight,
  ChevronRight,
  Circle,
  Code2,
  Cpu,
  ExternalLink,
  Menu,
  Network,
  Server,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'

type Project = {
  title: string
  category: string
  description: string
  technologies: string[]
  detail: string
  accent: string
}

const projects: Project[] = [
  {
    title: 'LokaNode',
    category: 'Infrastructure & Hosting',
    description:
      'A Minecraft hosting platform focused on infrastructure management, server administration, and hosting technology.',
    technologies: ['Linux', 'Docker', 'Pterodactyl', 'Node.js', 'PHP'],
    detail:
      'An ongoing exploration of the systems behind game hosting: server orchestration, administration workflows, and the tooling that keeps a hosted environment understandable.',
    accent: 'teal',
  },
  {
    title: 'AltivonLabs',
    category: 'Development & Automation',
    description:
      'A personal technology initiative for web development, automation scripts, and software tooling.',
    technologies: ['TypeScript', 'JavaScript', 'React', 'Node.js'],
    detail:
      'A place to turn small technical ideas into working experiments, with an emphasis on reusable tools and learning by shipping.',
    accent: 'amber',
  },
  {
    title: 'Titik Temu',
    category: 'Community Platform',
    description:
      'A digital space designed to bring people together through social interaction and community activities.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    detail:
      'A frontend-focused project exploring how a simple interface can make community participation feel clear and welcoming.',
    accent: 'rose',
  },
  {
    title: 'Smart Security Locker',
    category: 'IoT & Embedded Systems',
    description:
      'An experimental smart locker using an ESP32 and electronic components to explore IoT-based security systems.',
    technologies: ['ESP32', 'Arduino', 'C++', 'HC-SR04', 'OLED'],
    detail:
      'A hands-on hardware experiment connecting sensors, a microcontroller, and a small display into one physical security concept.',
    accent: 'violet',
  },
]

const skillGroups = [
  { title: 'Languages', items: ['TypeScript', 'JavaScript', 'PHP', 'C++'] },
  { title: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS'] },
  { title: 'Systems', items: ['Linux', 'Docker', 'Pterodactyl', 'Node.js'] },
  { title: 'Hardware', items: ['ESP32', 'Arduino', 'HC-SR04', 'OLED'] },
]

const navItems = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Journey', 'journey'],
  ['Contact', 'contact'],
]

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.4, 0.7] },
    )
    sections.forEach((section) => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedProject ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, selectedProject])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={() => scrollTo('top')} aria-label="imrenn home">
          imrenn<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a className={activeSection === id ? 'active' : ''} href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          Say hello <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navItems.map(([label, id], index) => (
              <a href={`#${id}`} key={id} onClick={() => scrollTo(id)}>
                <span>0{index + 1}</span> {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <motion.p className="eyebrow" initial="hidden" animate="show" variants={reveal}>
              <Circle size={8} fill="currentColor" aria-hidden="true" /> Personal lab / open to learning
            </motion.p>
            <motion.h1 id="hero-title" initial="hidden" animate="show" variants={reveal}>
              Hi, I&apos;m <em>Rendra</em>.
              <br />
              I build and explore
              <br />
              <span>useful systems.</span>
            </motion.h1>
            <motion.p className="hero-intro" initial="hidden" animate="show" variants={reveal}>
              Developer and technology enthusiast interested in web development, automation,
              infrastructure, and the space where software meets hardware.
            </motion.p>
            <motion.div className="hero-actions" initial="hidden" animate="show" variants={reveal}>
              <a className="button button-primary" href="#projects">
                See selected work <ChevronRight size={17} aria-hidden="true" />
              </a>
              <a className="button button-quiet" href="#contact">
                Get in touch
              </a>
            </motion.div>
          </div>
          <motion.div
            className="hero-index"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <span>01</span>
            <div className="index-line" />
            <span>2026</span>
          </motion.div>
        </section>

        <section className="section-wrap split-section" id="about" aria-labelledby="about-title">
          <div className="section-label"><span>01</span> About</div>
          <div className="about-content">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={reveal}>
              <h2 id="about-title">Curiosity is the<br /><em>common thread.</em></h2>
              <p className="large-copy">
                I like understanding how things work, then making them a little more useful.
                My interests move between interfaces, backend tooling, servers, and small
                experiments with physical components.
              </p>
            </motion.div>
            <div className="about-notes">
              <div><span>Now learning</span><strong>Modern web development</strong></div>
              <div><span>Working style</span><strong>Small experiments, clear systems</strong></div>
              <div><span>Based around</span><strong>Software, Linux, and IoT</strong></div>
            </div>
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-label"><span>02</span> Toolkit</div>
          <div className="skills-content">
            <div className="section-heading-row">
              <h2 id="skills-title">Tools I reach for.</h2>
              <p>These are areas I use or actively explore, not a ranking of expertise.</p>
            </div>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}><Code2 size={15} aria-hidden="true" />{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-label"><span>03</span> Selected work</div>
          <div className="projects-content">
            <div className="section-heading-row">
              <h2 id="projects-title">Built to learn.<br /><em>Made to last.</em></h2>
              <p>A few projects and experiments that reflect how I think through technology.</p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.article
                  className={`project-card ${index === 0 ? 'featured' : ''}`}
                  key={project.title}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  onPointerMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect()
                    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
                    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
                  }}
                >
                  <div className={`project-art ${project.accent}`} aria-hidden="true">
                    {index === 0 ? <Server size={42} strokeWidth={1.2} /> : index === 1 ? <Code2 size={42} strokeWidth={1.2} /> : index === 2 ? <Network size={42} strokeWidth={1.2} /> : <Cpu size={42} strokeWidth={1.2} />}
                    <span>0{index + 1}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-meta"><span>{project.category}</span><span>0{index + 1}</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className="tag-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                    <button className="text-button" type="button" onClick={() => setSelectedProject(project)}>
                      Read project note <ArrowUpRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap split-section journey-section" id="journey" aria-labelledby="journey-title">
          <div className="section-label"><span>04</span> Journey</div>
          <div className="journey-content">
            <h2 id="journey-title">Still becoming<br /><em>more capable.</em></h2>
            <div className="timeline">
              <div className="timeline-item"><span>Current</span><div><h3>Exploring full-stack web development</h3><p>Building stronger foundations across interfaces, APIs, and the systems around them.</p></div></div>
              <div className="timeline-item"><span>Recent focus</span><div><h3>Infrastructure and automation</h3><p>Learning through hosting projects, Linux environments, and scripts that remove repetition.</p></div></div>
              <div className="timeline-item placeholder-item"><span>Next note</span><div><h3>Informatics competition</h3><p>Preparing for and participating in the Informatics competition to challenge myself and grow as a developer.</p></div></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-wrap contact-inner">
            <div className="section-label"><span>05</span> Contact</div>
            <div>
              <h2 id="contact-title">Let&apos;s keep<br /><em>the conversation open.</em></h2>
              <p>For a thoughtful hello, a technical exchange, or just a good question.</p>
              {/* TODO: replace the placeholder with the owner's real email address. */}
              <a className="button button-primary" href="mailto:pandhu.rendra@proton.me">Send an email<ArrowUpRight size={17} aria-hidden="true" /></a>
              <div className="contact-links">
                <a href="https://github.com/pandhu-rendra" target="_blank" rel="noreferrer"><Code2 size={17} aria-hidden="true" /> GitHub <ExternalLink size={13} aria-hidden="true" /></a>
                <span><Circle size={7} fill="currentColor" aria-hidden="true" /> Discord: moss.you</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark" href="#top">imrenn<span>.</span></a>
        <p>Made with curiosity, one experiment at a time.</p>
        <a className="back-top" href="#top">Back to top <ArrowUpRight size={15} aria-hidden="true" /></a>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.dialog className="project-modal" open initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" type="button" aria-label="Close project note" onClick={() => setSelectedProject(null)}><X size={20} /></button>
              <p className="eyebrow">Project note / {selectedProject.category}</p>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.detail}</p>
              <ul className="tag-list">{selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
              <p className="modal-placeholder">Live and source links will be added when the real project URLs are available.</p>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
