import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, type ChangeEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  Image as ImageIcon,
  LoaderCircle,
  Play,
  Sparkles,
  Upload,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

type GeneratorMode = 'prompt' | 'image' | 'script'

const modes = [
  { id: 'prompt' as const, label: 'Prompt to video', shortLabel: 'Prompt', icon: Sparkles },
  { id: 'image' as const, label: 'Image to video', shortLabel: 'Image', icon: ImageIcon },
  { id: 'script' as const, label: 'Script to video', shortLabel: 'Script', icon: FileText },
]

const featureCopy = [
  {
    number: '01',
    eyebrow: 'Prompt to video',
    title: 'Describe a moment. Watch it move.',
    body: 'Type the scene, camera movement, mood, and visual style. Vanta turns a single idea into a polished cinematic sequence.',
    example: 'A glass house above a stormy sea, slow aerial push-in, dawn light',
  },
  {
    number: '02',
    eyebrow: 'Image to video',
    title: 'Give still images a pulse.',
    body: 'Upload your keyframe and guide the motion with an optional prompt. Preserve the image while adding natural depth and movement.',
    example: 'Subtle wind through the fabric, camera arcs slowly to the right',
  },
  {
    number: '03',
    eyebrow: 'Script to video',
    title: 'Turn narrative into scenes.',
    body: 'Paste a script and let Vanta interpret pacing, visual beats, and transitions into a coherent short-form video.',
    example: 'Scene 1 — The city wakes before sunrise. Empty trains begin to move...',
  },
]

function Home() {
  const [mode, setMode] = useState<GeneratorMode>('prompt')
  const [prompt, setPrompt] = useState('')
  const [script, setScript] = useState('')
  const [imageName, setImageName] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [status, setStatus] = useState<'idle' | 'generating' | 'ready'>('idle')

  useEffect(() => {
    if (status !== 'generating') return
    const timer = window.setTimeout(() => setStatus('ready'), 1800)
    return () => window.clearTimeout(timer)
  }, [status])

  function selectMode(nextMode: GeneratorMode) {
    setMode(nextMode)
    setStatus('idle')
    document.querySelector('#create')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setImageName(file.name)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(String(reader.result))
    reader.readAsDataURL(file)
    setStatus('idle')
  }

  const canGenerate =
    mode === 'prompt' ? prompt.trim().length > 0 : mode === 'script' ? script.trim().length > 0 : Boolean(imagePreview)

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Vanta home">
          <span className="brand-mark"><span /></span>
          VANTA
        </a>
        <nav aria-label="Primary navigation">
          <a href="#create">Create</a>
          <a href="#features">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="header-cta" href="#create">Start creating <ArrowRight size={15} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> AI VIDEO, WITHOUT THE COMPLEXITY</p>
          <h1>Create AI Videos From <em>Text, Images</em> and Scripts</h1>
          <p className="hero-intro">One focused studio for turning ideas into cinematic motion. No timeline, no learning curve — just describe what you want to see.</p>
          <a className="primary-button" href="#create">Create your first video <ArrowDown size={17} /></a>
          <div className="hero-proof">
            <div className="avatar-stack"><span>AK</span><span>MS</span><span>JL</span></div>
            <p><strong>Made for visual thinkers</strong><br />From first thought to first frame.</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Abstract video frame preview">
          <div className="frame-label"><span>VANTA / 001</span><span>00:08</span></div>
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="horizon" />
          <button className="play-button" type="button" aria-label="Play preview"><Play size={24} fill="currentColor" /></button>
          <p className="visual-caption">“A quiet world, somewhere between memory and tomorrow.”</p>
        </div>
      </section>

      <section className="studio-section" id="create">
        <div className="section-heading">
          <p className="eyebrow"><span /> THE STUDIO</p>
          <h2>Start with what you have.</h2>
          <p>Words, an image, or a complete story.</p>
        </div>

        <div className="studio-shell">
          <div className="mode-tabs" role="tablist" aria-label="Video generator type">
            {modes.map((item) => {
              const Icon = item.icon
              return (
                <button key={item.id} className={mode === item.id ? 'active' : ''} onClick={() => selectMode(item.id)} role="tab" aria-selected={mode === item.id}>
                  <Icon size={17} /> <span className="wide-label">{item.label}</span><span className="short-label">{item.shortLabel}</span>
                </button>
              )
            })}
          </div>

          <div className="generator-panel">
            <div className="input-area">
              <div className="input-heading">
                <div>
                  <span>INPUT / {modes.find((item) => item.id === mode)?.shortLabel.toUpperCase()}</span>
                  <h3>{mode === 'prompt' ? 'What do you imagine?' : mode === 'image' ? 'Choose your opening frame.' : 'Paste your story.'}</h3>
                </div>
                <span className="plan-pill">FREE · 8 SEC</span>
              </div>

              {mode === 'image' ? (
                <>
                  <label className={`upload-zone ${imagePreview ? 'has-image' : ''}`}>
                    {imagePreview ? <img src={imagePreview} alt="Uploaded source preview" /> : <><Upload size={25} /><strong>Drop an image or browse</strong><small>JPG, PNG or WEBP · 10MB max</small></>}
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage} />
                  </label>
                  {imageName && <p className="file-name">Source: {imageName}</p>}
                  <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Optional: describe the movement, camera, or atmosphere..." rows={3} />
                </>
              ) : mode === 'script' ? (
                <textarea className="main-textarea" value={script} onChange={(event) => setScript(event.target.value)} placeholder={'Scene 1 — A lone cyclist crosses the city at dawn...\n\nScene 2 — The streets begin to fill with light...'} rows={9} />
              ) : (
                <textarea className="main-textarea" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="A surreal desert where enormous translucent flowers bloom under two moons, slow cinematic tracking shot..." rows={9} />
              )}

              <div className="generation-controls">
                <div className="control-meta"><span>16:9</span><span>1080p</span><span>8 sec</span></div>
                <button className="generate-button" disabled={!canGenerate || status === 'generating'} onClick={() => setStatus('generating')}>
                  {status === 'generating' ? <><LoaderCircle className="spin" size={17} /> Creating frames</> : <><Sparkles size={17} /> Generate video</>}
                </button>
              </div>
            </div>

            <div className={`output-area ${status}`}>
              {status === 'ready' ? (
                <div className="result-card">
                  <div className="result-art"><div className="result-sun" /><div className="result-land" /><button aria-label="Play generated preview"><Play size={20} fill="currentColor" /></button></div>
                  <div className="result-meta"><span>VANTA_OUTPUT_001.MP4</span><span>00:08</span></div>
                </div>
              ) : status === 'generating' ? (
                <div className="generating-state"><div className="scan-frame"><span /></div><strong>Composing motion</strong><p>Translating your input into frames...</p></div>
              ) : (
                <div className="empty-state"><div className="frame-corners"><Play size={18} /></div><strong>Your video appears here</strong><p>Enter your idea, then generate.</p></div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="feature-intro">
          <p className="eyebrow"><span /> THREE WAYS IN</p>
          <h2>Every idea has<br />a starting point.</h2>
        </div>
        <div className="feature-list">
          {featureCopy.map((feature, index) => (
            <article className="feature-row" key={feature.number}>
              <span className="feature-number">{feature.number}</span>
              <div className={`feature-art art-${index + 1}`}><span /><i /></div>
              <div className="feature-content">
                <p>{feature.eyebrow}</p>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <blockquote>“{feature.example}”</blockquote>
                <button onClick={() => selectMode(modes[index].id)}>Try {feature.eyebrow.toLowerCase()} <ArrowRight size={15} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="pricing-heading">
          <p className="eyebrow"><span /> SIMPLE PRICING</p>
          <h2>More time for bigger ideas.</h2>
          <p>Start free. Upgrade when your story needs more room.</p>
        </div>
        <div className="pricing-grid">
          <article className="price-card">
            <div><p>FREE</p><h3>$0</h3><span>Forever</span></div>
            <p>For exploring ideas and creating quick visual moments.</p>
            <ul><li><Check size={16} /> Videos up to 8 seconds</li><li><Check size={16} /> All three creation modes</li><li><Check size={16} /> 1080p exports</li></ul>
            <a href="#create">Start creating <ArrowRight size={16} /></a>
          </article>
          <article className="price-card premium">
            <span className="popular-label">FOR STORYTELLERS</span>
            <div><p>PREMIUM</p><h3>$24</h3><span>per month</span></div>
            <p>For longer scenes, richer stories, and more ambitious work.</p>
            <ul><li><Check size={16} /> Videos up to 25 seconds</li><li><Check size={16} /> All three creation modes</li><li><Check size={16} /> Priority generation</li><li><Check size={16} /> 4K exports</li></ul>
            <a href="#create">Choose Premium <ArrowRight size={16} /></a>
          </article>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark"><span /></span>VANTA</a>
        <p>Ideas become motion.</p>
        <span>© 2026 Vanta Studio</span>
      </footer>
    </main>
  )
}
