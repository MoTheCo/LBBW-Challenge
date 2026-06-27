import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import {
  Heart, HeartOff, ArrowRight, ArrowLeft, Check, ChevronDown, ChevronUp,
  Copy, Share2, Mail, Phone, Calendar, Award, TrendingUp, Users, Globe,
  Droplets, BookOpen, Home, BarChart3, Star, Zap, Shield, Target,
  Sparkles, TreePine, Building2, HandHeart, Landmark, Clock, Lock,
  Bell, Wifi, Battery, Signal, Eye, Layers, Network, MapPin
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

// ═══════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════
const DS = {
  ink: '#061319', stone: '#0B2A3A', stone2: '#0F3543',
  teal: '#3E8E8A', tealhi: '#5BB8B1',
  gold: '#B08D57', goldhi: '#D2B07A',
  sand: '#E8E1D5', paper: '#FBFAF7', graphit: '#2B2B2B',
  quelle_teal: '#2a6b6b', quelle_gold: '#c4a882', quelle_sand: '#e8d5b5',
  quelle_amber: '#d4860a', quelle_earth: '#8b6a3e', quelle_deep: '#051520',
  catalyst: { main: '#3E8E8A', hi: '#5BB8B1', faint: 'rgba(62,142,138,.15)' },
  builder: { main: '#B08D57', hi: '#D2B07A', faint: 'rgba(176,141,87,.15)' },
  visionary: { main: '#a78cbf', hi: '#c4a8d9', faint: 'rgba(167,140,191,.15)' },
  grad: {
    page: 'linear-gradient(160deg, #061319 0%, #0B2A3A 50%, #061319 100%)',
    splash: 'linear-gradient(160deg, #051520 0%, #061319 40%, #0B2A3A 100%)',
    cta: 'radial-gradient(120% 80% at 50% 0%, #123038 0%, #061319 55%, #05090c 100%)',
    tealCard: 'linear-gradient(150deg, #0B2A3A, #16524e)',
    goldCard: 'linear-gradient(155deg, #15252c, #0d1a20)',
    lightCard: 'linear-gradient(150deg, #f3f1ea, #ece8df)',
    darkPhone: 'linear-gradient(160deg, #0a151b, #05090c)',
    tealFull: 'linear-gradient(140deg, #3E8E8A, #1c5e63)',
    goldFull: 'linear-gradient(140deg, #B08D57, #8a6d40)',
    tealGold: 'linear-gradient(90deg, #5BB8B1, #B08D57)',
  },
}

const C = {
  h1: 'font-display font-light text-4xl md:text-5xl leading-tight tracking-tight',
  h2: 'font-display font-light text-3xl md:text-4xl leading-snug',
  h3: 'font-display text-2xl font-normal leading-snug',
  label: 'text-xs font-semibold tracking-widest uppercase',
  body: 'text-sm leading-relaxed',
  bodyMd: 'text-base leading-relaxed',
  pageWrap: 'max-w-2xl mx-auto px-4 py-8 relative z-10',
  card: 'rounded-2xl border border-white/[.08] backdrop-blur-sm',
  btnPrimary: 'rounded-full font-semibold px-8 py-4 transition-all cursor-pointer',
  btnGhost: 'rounded-full border font-medium px-6 py-3 transition-all cursor-pointer',
  btnSmall: 'rounded-full border font-medium px-4 py-2 text-sm transition-all cursor-pointer',
  chip: 'rounded-full px-3 py-1 text-xs font-medium tracking-wide',
  chipGold: 'rounded-full px-4 py-1.5 text-xs font-medium tracking-wide border',
}

// ═══════════════════════════════════════════════════
// DATA CONSTANTS
// ═══════════════════════════════════════════════════
const IDENTITY_DATA = {
  catalyst: {
    emoji: '🌱', name: 'The Catalyst', nameDE: 'Der Impulsgeber',
    trackColor: DS.teal, trackHi: DS.tealhi, trackFaint: DS.catalyst.faint,
    desc: 'Du willst sofortige, spürbare Wirkung – ohne dich in Verwaltung zu verlieren. Flexibilität ist dein Prinzip.',
    tags: ['Flexibel', 'Schnell wirkend', 'Unkompliziert'],
    recommendedProduct: 'fonds',
    letterSalutation: 'Liebe Impulsgeberin, lieber Impulsgeber,',
    letterOpener: 'Du hast gelernt, den richtigen Moment selbst zu erschaffen. Was du mitbringst, ist mehr als Kapital — es ist die Haltung, die Wirkung erzeugt.',
    closingStatement: 'Du hast nicht gespendet.\nDu hast bewegt.',
    heroTagline: 'Immediate impact, zero overhead.',
    forwardMessage: 'Starte mit deinem persönlichen Stiftungsfonds – ab €100.000, vollständig von LBBW verwaltet.',
  },
  builder: {
    emoji: '🏗️', name: 'The Builder', nameDE: 'Der Gestalter',
    trackColor: DS.gold, trackHi: DS.goldhi, trackFaint: DS.builder.faint,
    desc: 'Du willst nicht nur zahlen, sondern mitgestalten. Projekte aktiv begleiten, Netzwerke einbringen, echte Veränderung anstoßen.',
    tags: ['Gestaltend', 'Projektbezogen', 'Netzwerkorientiert'],
    recommendedProduct: 'treuhand_classic',
    letterSalutation: 'Liebe Gestalterin, lieber Gestalter,',
    letterOpener: 'Du willst nicht nur geben. Du willst verstehen, wohin dein Kapital fließt — und mitentscheiden, was damit entsteht.',
    closingStatement: 'Du hast nicht gespendet.\nDu hast gegründet.',
    heroTagline: 'Your capital, made visible.',
    forwardMessage: 'Deine Treuhandstiftung Classic kann innerhalb von 30 Tagen gegründet sein. LBBW übernimmt alles Administrative.',
  },
  visionary: {
    emoji: '🔭', name: 'The Visionary', nameDE: 'Der Visionär',
    trackColor: DS.visionary.main, trackHi: DS.visionary.hi, trackFaint: DS.visionary.faint,
    desc: 'Du denkst in Jahrzehnten. Dein Engagement soll deinen Namen tragen und Generationen nach dir prägen.',
    tags: ['Langfristig', 'Eigenständig', 'Vermächtnisbildend'],
    recommendedProduct: 'legal',
    letterSalutation: 'Liebe Visionärin, lieber Visionär,',
    letterOpener: 'Du denkst in Jahrzehnten. Wirkung entsteht nicht durch eine Geste, sondern durch eine Struktur, die trägt.',
    closingStatement: 'Du hast nicht gespendet.\nDu hast ein Vermächtnis geschaffen.',
    heroTagline: 'A legacy that outlasts you.',
    forwardMessage: 'Eine rechtsfähige Stiftung unter deinem Namen – LBBW begleitet dich von der Gründung bis zum laufenden Betrieb.',
  }
}

const QUIZ_QUESTIONS = [
  {
    phase: 1, eyebrow: 'PHASE 01 · DEIN PROFIL',
    question: 'Was motiviert dich, gesellschaftlich aktiv zu werden?',
    options: [
      { id: 'a', text: 'Ich möchte schnell und unkompliziert helfen.', identity: 'catalyst' },
      { id: 'b', text: 'Ich möchte ein Projekt von Anfang an mitgestalten.', identity: 'builder' },
      { id: 'c', text: 'Ich möchte etwas schaffen, das über mich hinaus Bestand hat.', identity: 'visionary' },
    ]
  },
  {
    phase: 2, eyebrow: 'PHASE 02 · DEIN STIL',
    question: 'Wie viel Kontrolle möchtest du über die Verwendung haben?',
    options: [
      { id: 'a', text: 'Vertraue den Experten – Hauptsache, es wirkt.', identity: 'catalyst' },
      { id: 'b', text: 'Ich möchte mitentscheiden, welche Projekte gefördert werden.', identity: 'builder' },
      { id: 'c', text: 'Ich will die gesamte Strategie selbst bestimmen.', identity: 'visionary' },
    ]
  },
  {
    phase: 3, eyebrow: 'PHASE 03 · DEIN HORIZONT',
    question: 'In welchem Zeitrahmen denkst du?',
    options: [
      { id: 'a', text: 'Monat für Monat – flexibel bleiben.', identity: 'catalyst' },
      { id: 'b', text: '3–5 Jahre – ein konkretes Ziel verfolgen.', identity: 'builder' },
      { id: 'c', text: 'Generationen – ein dauerhaftes Vermächtnis.', identity: 'visionary' },
    ]
  },
]

const PROJECTS = [
  {
    id: 1, name: 'Wasserprojekt Sahel', org: 'Blue Water Initiative',
    cause: 'Wasser', impact: '12.400 Menschen versorgt',
    desc: 'Nachhaltige Brunnen und Wasseraufbereitung in der Sahelzone.',
    trackColor: DS.teal, icon: Droplets,
  },
  {
    id: 2, name: 'Bildung für Alle', org: 'EduForward Foundation',
    cause: 'Bildung', impact: '3.200 Stipendien vergeben',
    desc: 'Stipendienprogramme für benachteiligte Jugendliche in Baden-Württemberg.',
    trackColor: DS.gold, icon: BookOpen,
  },
  {
    id: 3, name: 'Grüne Städte BW', org: 'UrbanGreen Stuttgart',
    cause: 'Umwelt', impact: '48 Hektar begrünt',
    desc: 'Stadtbegrünung und urbane Gärten in der Region Stuttgart.',
    trackColor: DS.teal, icon: TreePine,
  },
  {
    id: 4, name: 'Soziale Startups', org: 'Impact Hub BW',
    cause: 'Innovation', impact: '67 Gründungen unterstützt',
    desc: 'Inkubator für soziale Unternehmensgründungen mit LBBW-Mentoring.',
    trackColor: DS.gold, icon: Zap,
  },
]

const PHILANTHROPY_TYPES = [
  {
    id: 'fonds', name: 'Stiftungsfonds', subtitle: 'Ab €100.000',
    identity: 'catalyst', color: DS.teal, colorHi: DS.tealhi,
    benefits: [
      { bold: 'Kein Overhead.', text: ' LBBW verwaltet alles – du konzentrierst dich auf die Wirkung.' },
      { bold: 'Sofort aktiv.', text: ' Dein Kapital wirkt vom ersten Tag an in geprüften Projekten.' },
      { bold: 'Steueroptimiert.', text: ' Volle Spendenabzugsfähigkeit, professionell dokumentiert.' },
    ],
  },
  {
    id: 'treuhand_classic', name: 'Treuhandstiftung', subtitle: 'Ab €100.000',
    identity: 'builder', color: DS.gold, colorHi: DS.goldhi,
    benefits: [
      { bold: 'Dein Name, deine Vision.', text: ' Die Stiftung trägt deinen Namen und deinen Zweck.' },
      { bold: 'Mitgestaltung.', text: ' Du entscheidest mit, welche Projekte gefördert werden.' },
      { bold: 'LBBW-Netzwerk.', text: ' Zugang zu exklusiven Philanthropie-Events und Partnerprojekten.' },
    ],
  },
  {
    id: 'legal', name: 'Rechtsfähige Stiftung', subtitle: 'Ab €500.000',
    identity: 'visionary', color: DS.visionary.main, colorHi: DS.visionary.hi,
    benefits: [
      { bold: 'Volle Unabhängigkeit.', text: ' Eigene Rechtspersönlichkeit mit eigenem Vorstand.' },
      { bold: 'Generationsübergreifend.', text: ' Dein Vermächtnis überdauert Generationen.' },
      { bold: 'Maximale Gestaltungsfreiheit.', text: ' Eigene Satzung, eigene Strategie, eigenes Team.' },
    ],
  },
]

// ═══════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════
const formatEuro = (n) => Math.round(n).toLocaleString('de-DE')

const calculateIdentity = (answers) => {
  const counts = { catalyst: 0, builder: 0, visionary: 0 }
  Object.values(answers).forEach(a => { if (a) counts[a]++ })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

const getAnnualImpact = (amount, mode) => {
  if (mode === 'monthly') return amount * 12
  return Math.round(amount * 0.025)
}

const generateShareText = (identity, amount, cause, annualImpact) => {
  const id = IDENTITY_DATA[identity]
  return `Ich bin ein ${id.nameDE} ${id.emoji}\nMein Kapital: €${formatEuro(amount)}\nFokus: ${cause || 'Noch offen'}\nWirkung: ~€${formatEuro(annualImpact)} / Jahr\nPowered by LBBW ImpactPath`
}

// ═══════════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════
const AmbientGlow = ({ color = 'teal', size = 'w-96 h-96', position = '-top-32 -left-24' }) => {
  const classes = { teal: 'ambient-teal', gold: 'ambient-gold', purple: 'ambient-purple' }
  return (
    <motion.div
      className={`absolute ${size} ${position} ${classes[color]} pointer-events-none z-0`}
      aria-hidden="true"
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: color === 'gold' ? 7 : color === 'purple' ? 6 : 5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

const ScreenWrapper = ({ children, gradient, glows = [['teal', '-top-48 -left-24'], ['gold', '-bottom-48 -right-24']] }) => (
  <div className="relative overflow-hidden min-h-screen" style={{ background: gradient || DS.grad.page }}>
    {glows.map(([c, p], i) => <AmbientGlow key={i} color={c} position={p} size="w-96 h-96" />)}
    <div className="grain-overlay absolute inset-0 opacity-60 z-0 pointer-events-none" aria-hidden="true" />
    <div className="relative z-10">{children}</div>
  </div>
)

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.42, ease: [0.25, 0.1, 0.25, 1] },
}

const LBBWBadge = () => (
  <div className="flex items-center gap-3">
    <div style={{
      width: 36, height: 36, borderRadius: 8,
      border: `1px solid ${DS.gold}66`,
      display: 'grid', placeItems: 'center',
      fontFamily: 'Fraunces, Georgia, serif',
      color: DS.gold, fontSize: 18,
    }}>L</div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.05em', color: DS.paper }}>LBBW</div>
      <div style={{ fontSize: 10, letterSpacing: '.25em', color: DS.teal, textTransform: 'uppercase' }}>Impact Ecosystem</div>
    </div>
  </div>
)

const Eyebrow = ({ text, color = DS.gold }) => (
  <div className="inline-flex items-center gap-2 mb-4"
    style={{ fontSize: 11, letterSpacing: '.28em', color: `${color}e6`, textTransform: 'uppercase' }}>
    <span style={{ width: 24, height: 1, background: `${color}60`, display: 'inline-block' }} />
    {text}
  </div>
)

const GoldeneLine = ({ color = DS.gold, delay = 0 }) => (
  <motion.div
    style={{ height: 1, background: `${color}40`, margin: '24px auto', maxWidth: 120 }}
    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
    transition={{ duration: 0.6, delay }}
    style={{ transformOrigin: 'left', height: 1, background: `${color}40`, margin: '24px auto', maxWidth: 120 }}
  />
)

const FeatureListItem = ({ bold, text, color, colorHi }) => (
  <li className="flex gap-4 mb-4">
    <span style={{
      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
      background: `${color}20`, border: `1px solid ${color}40`,
      display: 'grid', placeItems: 'center', color: colorHi,
      fontSize: 14,
    }}><Check size={14} /></span>
    <p style={{ fontSize: 13, color: `${DS.sand}bf` }}>
      <span style={{ color: DS.paper, fontWeight: 600 }}>{bold}</span>{text}
    </p>
  </li>
)

const PhoneFrame = ({ variant = 'dark', children, className = '' }) => {
  const bg = variant === 'light'
    ? 'linear-gradient(160deg,#2a3942,#11212a)'
    : 'linear-gradient(160deg,#0a151b,#05090c)'
  return (
    <div className={`relative mx-auto ${className}`} style={{
      width: 280, height: 580, borderRadius: 40, padding: 10, background: bg,
      boxShadow: '0 50px 90px -30px rgba(0,0,0,.7), 0 0 0 2px rgba(255,255,255,.04) inset',
    }}>
      <div style={{ position: 'absolute', left: -3, top: 105, width: 3, height: 32, borderRadius: 3, background: 'rgba(255,255,255,.1)' }} />
      <div style={{ position: 'absolute', left: -3, top: 150, width: 3, height: 48, borderRadius: 3, background: 'rgba(255,255,255,.1)' }} />
      <div style={{ position: 'absolute', right: -3, top: 130, width: 3, height: 64, borderRadius: 3, background: 'rgba(255,255,255,.1)' }} />
      <div style={{
        position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
        width: 88, height: 24, background: '#04090c', borderRadius: 16, zIndex: 40,
      }}>
        <div style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          width: 7, height: 7, borderRadius: '50%', background: '#0f2a30',
          boxShadow: '0 0 0 2px rgba(91,184,177,.25)',
        }} />
      </div>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 32,
        overflow: 'hidden', background: variant === 'light' ? '#f3f1ea' : '#0a151b',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 40, zIndex: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', paddingTop: 6,
          color: variant === 'light' ? '#0B2A3A' : '#E8E1D5', fontSize: 11, fontWeight: 600,
        }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 6, opacity: .8 }}>
            <svg width="16" height="11" viewBox="0 0 16 11">
              {[0, 4, 8, 12].map((x, i) => (
                <rect key={x} x={x} y={10 - i * 2} width="3" height={i * 2 + 2} rx="1"
                  fill={variant === 'light' ? '#0B2A3A' : '#E8E1D5'} />
              ))}
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11">
              <rect x=".5" y=".5" width="18" height="10" rx="2.5" fill="none"
                stroke={variant === 'light' ? '#0B2A3A' : '#E8E1D5'} opacity=".5" />
              <rect x="2" y="2" width="13" height="7" rx="1"
                fill={variant === 'light' ? '#0B2A3A' : '#E8E1D5'} />
              <rect x="19.5" y="3.5" width="1.6" height="4" rx="1"
                fill={variant === 'light' ? '#0B2A3A' : '#E8E1D5'} />
            </svg>
          </div>
        </div>
        <div className="hide-scroll absolute inset-0 overflow-y-auto" style={{ paddingTop: 40 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

const PhoneNavBar = ({ tabs, activeTab, onTabChange, variant = 'dark' }) => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, zIndex: 30,
    background: variant === 'light' ? 'rgba(255,255,255,.9)' : 'rgba(10,21,27,.9)',
    backdropFilter: 'blur(12px)',
    borderTop: variant === 'light' ? '1px solid rgba(11,42,58,.08)' : '1px solid rgba(255,255,255,.06)',
    display: 'flex',
  }}>
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onTabChange(tab.id)} style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 3, border: 'none', background: 'transparent', cursor: 'pointer',
        color: activeTab === tab.id
          ? (variant === 'light' ? '#3E8E8A' : '#D2B07A')
          : (variant === 'light' ? 'rgba(11,42,58,.35)' : 'rgba(232,225,213,.35)'),
      }}>
        {tab.icon}
        <span style={{ fontSize: 10, fontWeight: 600 }}>{tab.label}</span>
      </button>
    ))}
  </div>
)

const PushNotification = ({ title, body, cta, accentColor, onTap, appName = 'LBBW Impact' }) => (
  <motion.div
    className="notif-tap rounded-3xl p-4 backdrop-blur-xl w-full cursor-pointer"
    style={{
      background: 'rgba(20,32,38,.72)',
      boxShadow: `0 12px 30px -12px rgba(0,0,0,.6), 0 0 0 1px ${accentColor}40 inset`,
    }}
    onClick={onTap}
    whileHover={{ scale: 1.015 }}
    whileTap={{ scale: 0.985 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-9 h-9 rounded-xl grid place-items-center text-base font-semibold"
        style={{ background: DS.grad.goldFull, color: DS.paper }}>L</div>
      <div className="flex-1">
        <div className="text-xs font-semibold" style={{ color: DS.paper }}>{appName}</div>
        <div className="text-xs" style={{ color: `${DS.sand}73` }}>jetzt</div>
      </div>
    </div>
    <div className="font-display text-sm leading-snug font-medium" style={{ color: DS.paper, fontFamily: 'Fraunces, Georgia, serif' }}>
      {title}
    </div>
    <div className="text-xs mt-2 flex items-center gap-1" style={{ color: accentColor }}>
      {cta} <span>→</span>
    </div>
  </motion.div>
)

// ═══════════════════════════════════════════════════
// SVG COMPONENTS
// ═══════════════════════════════════════════════════
const WassertropfenSVG = ({ color = DS.teal, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <motion.path
      d="M16 4 C16 4 8 14 8 20 C8 24.4 11.6 28 16 28 C20.4 28 24 24.4 24 20 C24 14 16 4 16 4Z"
      stroke={color} strokeWidth="1.5" fill={`${color}20`}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
  </svg>
)

const PhoneSVGScene = () => (
  <svg width="220" height="120" viewBox="0 0 220 120" fill="none" className="mx-auto mb-3">
    {/* Ground */}
    <rect x="0" y="100" width="220" height="20" rx="4" fill={`${DS.teal}15`} />
    {/* Mountains */}
    <path d="M0 100 L40 50 L80 100Z" fill={`${DS.stone}90`} />
    <path d="M60 100 L110 30 L160 100Z" fill={`${DS.stone2}90`} />
    <path d="M130 100 L180 55 L220 100Z" fill={`${DS.stone}90`} />
    {/* Sun */}
    <circle cx="180" cy="30" r="16" fill={`${DS.gold}40`} />
    <circle cx="180" cy="30" r="10" fill={`${DS.goldhi}60`} />
    {/* Solar panels */}
    <rect x="30" y="82" width="24" height="16" rx="2" fill={DS.teal} opacity=".5" />
    <rect x="32" y="84" width="9" height="5" rx="1" fill={DS.tealhi} opacity=".3" />
    <rect x="43" y="84" width="9" height="5" rx="1" fill={DS.tealhi} opacity=".3" />
    <rect x="32" y="91" width="9" height="5" rx="1" fill={DS.tealhi} opacity=".3" />
    <rect x="43" y="91" width="9" height="5" rx="1" fill={DS.tealhi} opacity=".3" />
    {/* Well/Brunnen */}
    <rect x="140" y="85" width="20" height="15" rx="2" fill={`${DS.gold}50`} />
    <rect x="147" y="78" width="6" height="7" rx="1" fill={`${DS.gold}40`} />
    <circle cx="150" cy="76" r="3" fill={`${DS.goldhi}50`} />
    {/* Water drops */}
    <motion.circle cx="150" cy="95" r="2" fill={DS.tealhi}
      animate={{ y: [0, 5, 0], opacity: [1, 0.3, 1] }}
      transition={{ duration: 2, repeat: Infinity }} />
    {/* Trees */}
    <rect x="95" y="85" width="4" height="15" rx="1" fill={`${DS.gold}40`} />
    <circle cx="97" cy="80" r="8" fill={`${DS.teal}40`} />
    <rect x="115" y="88" width="3" height="12" rx="1" fill={`${DS.gold}40`} />
    <circle cx="116.5" cy="84" r="6" fill={`${DS.teal}30`} />
  </svg>
)

// ═══════════════════════════════════════════════════
// SCREEN 0: SPLASH
// ═══════════════════════════════════════════════════
const SplashScreen = ({ onStart }) => (
  <ScreenWrapper gradient={DS.grad.splash}>
    <motion.div className={C.pageWrap} {...pageTransition}>
      <div className="flex items-center justify-between mb-20">
        <LBBWBadge />
        <div style={{ fontSize: 11, letterSpacing: '.22em', color: `${DS.sand}70`, textTransform: 'uppercase' }}>
          Philanthropy Challenge
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Eyebrow text="The future of giving" />
      </motion.div>

      <motion.h1
        style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 'clamp(36px, 10vw, 56px)', lineHeight: 1.05, color: DS.paper }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      >
        Zwei Wege.<br />
        <span style={{ fontStyle: 'italic', color: DS.teal }}>Ein</span> Ökosystem der Wirkung.
      </motion.h1>

      <motion.p
        className="mt-6 mb-10" style={{ fontSize: 16, color: `${DS.sand}b3`, lineHeight: 1.6, maxWidth: 480 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
      >
        Ein persönlicher Weg von deinem ersten flexiblen Euro bis zu deiner eigenen Stiftung. Komplett digital. Vollständig transparent.
      </motion.p>

      <motion.div className="flex flex-col sm:flex-row gap-3 mb-8"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
        <div className="inline-flex items-center gap-3 rounded-full px-5 py-3 cursor-pointer"
          style={{ background: `${DS.teal}20`, border: `1px solid ${DS.teal}50`, color: DS.tealhi, fontSize: 13 }}>
          <span className="w-2 h-2 rounded-full" style={{ background: DS.tealhi }} />
          Der Einsteiger · Ab €25/Monat
          <span>↓</span>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full px-5 py-3 cursor-pointer"
          style={{ background: `${DS.gold}18`, border: `1px solid ${DS.gold}50`, color: DS.goldhi, fontSize: 13 }}>
          <span className="w-2 h-2 rounded-full" style={{ background: DS.goldhi }} />
          Der Gründer · Ab €100.000
          <span>↓</span>
        </div>
      </motion.div>

      <motion.button
        className={C.btnPrimary}
        style={{ background: DS.teal, color: DS.ink }}
        onClick={onStart}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
      >
        Jetzt starten →
      </motion.button>

      <motion.p
        className="mt-16" style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 15, color: `${DS.sand}66`, maxWidth: 400 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
      >
        "Wirkung entsteht nicht durch eine Geste, sondern durch eine Struktur, die trägt."
      </motion.p>
    </motion.div>
  </ScreenWrapper>
)

// ═══════════════════════════════════════════════════
// SCREEN 1-3: QUIZ
// ═══════════════════════════════════════════════════
const QuizScreen = ({ data, answer, onAnswer, onNext, onBack, stepIndex }) => (
  <ScreenWrapper>
    <motion.div className={C.pageWrap} {...pageTransition} key={`quiz-${data.phase}`}>
      {/* Phase watermark */}
      <div className="absolute top-8 right-8 font-display text-8xl font-light pointer-events-none select-none"
        style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${DS.paper}0d`, zIndex: 0 }}>
        0{data.phase}
      </div>

      <div className="flex items-center justify-between mb-12">
        <LBBWBadge />
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-1 rounded-full transition-all duration-300"
              style={{ background: i <= data.phase ? DS.teal : `${DS.sand}20` }} />
          ))}
        </div>
      </div>

      <Eyebrow text={data.eyebrow} color={DS.teal} />

      <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 'clamp(26px, 7vw, 38px)', lineHeight: 1.15, color: DS.paper }}
        className="mb-10">
        {data.question}
      </h2>

      <div className="space-y-4 mb-12">
        {data.options.map((opt, i) => {
          const selected = answer === opt.identity
          return (
            <motion.button
              key={opt.id}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${C.card}`}
              style={{
                background: selected ? `${DS.teal}1a` : 'rgba(11,42,58,.6)',
                borderColor: selected ? DS.teal : 'rgba(255,255,255,.08)',
                cursor: 'pointer',
              }}
              onClick={() => onAnswer(opt.identity)}
              whileHover={{ scale: 1.012 }} whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex justify-between items-start">
                <p style={{ color: DS.paper, fontSize: 15, lineHeight: 1.5, paddingRight: 16 }}>{opt.text}</p>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: `${DS.gold}66` }}>
                  0{i + 1}
                </span>
              </div>
              {selected && (
                <motion.div className="mt-3 flex items-center gap-2"
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                  <Check size={14} style={{ color: DS.tealhi }} />
                  <span style={{ color: DS.tealhi, fontSize: 12 }}>Ausgewählt</span>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="flex gap-4">
        {stepIndex > 1 && (
          <motion.button className={C.btnGhost} onClick={onBack}
            style={{ borderColor: `${DS.sand}30`, color: DS.sand }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <ArrowLeft size={16} />
          </motion.button>
        )}
        <motion.button
          className={C.btnPrimary + ' flex-1 flex items-center justify-center gap-2'}
          style={{ background: answer ? DS.teal : `${DS.sand}20`, color: answer ? DS.ink : `${DS.sand}40`, pointerEvents: answer ? 'auto' : 'none' }}
          onClick={onNext}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
        >
          Weiter <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  </ScreenWrapper>
)

// ═══════════════════════════════════════════════════
// SCREEN 4: IDENTITY REVEAL
// ═══════════════════════════════════════════════════
const IdentityRevealScreen = ({ identity, onNext }) => {
  const [phase, setPhase] = useState(0)
  const id = IDENTITY_DATA[identity]

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500)
    const t2 = setTimeout(() => setPhase(2), 2200)
    const t3 = setTimeout(() => setPhase(3), 2900)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <ScreenWrapper glows={[['teal', '-top-48 -left-24'], ['gold', '-bottom-32 right-0'], ['purple', 'top-1/3 -right-32']]}>
      <div className={C.pageWrap + ' flex flex-col items-center justify-center min-h-screen text-center'}>
        {phase === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="w-16 h-16 rounded-full border-2 mx-auto mb-6"
              style={{ borderColor: DS.teal, borderTopColor: 'transparent' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p style={{ color: `${DS.sand}99`, fontSize: 14, letterSpacing: '.1em' }}>Analysiere dein Profil...</p>
          </motion.div>
        )}

        {phase >= 1 && (
          <motion.div className="text-6xl mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {id.emoji}
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(36px, 10vw, 56px)', fontWeight: 300, color: id.trackColor, lineHeight: 1.1 }}>
              {id.nameDE}
            </h1>
            <p className="mt-2" style={{ color: `${DS.sand}66`, fontSize: 14 }}>{id.name}</p>
            <div className="flex gap-2 justify-center mt-6 flex-wrap">
              {id.tags.map((tag, i) => (
                <motion.span key={tag} className={C.chip}
                  style={{ background: `${id.trackColor}20`, color: id.trackHi, border: `1px solid ${id.trackColor}40` }}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div className="mt-10 w-full max-w-md"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {/* Letter card */}
            <div className="rounded-3xl p-6 text-left backdrop-blur-xl"
              style={{
                background: 'rgba(20,32,38,.72)',
                border: `1px solid ${id.trackColor}40`,
                boxShadow: `0 12px 30px -12px rgba(0,0,0,.6)`,
              }}>
              <p className="mb-3" style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', color: `${DS.paper}e6`, fontSize: 14 }}>
                {id.letterSalutation}
              </p>
              <p style={{ color: `${DS.sand}99`, fontSize: 13, lineHeight: 1.7 }}>
                {id.letterOpener}
              </p>
              <GoldeneLine color={id.trackColor} delay={0.3} />
              <p style={{ color: `${DS.sand}66`, fontSize: 12 }}>{id.desc}</p>
            </div>

            <motion.button className={C.btnPrimary + ' w-full mt-8'}
              style={{ background: id.trackColor, color: DS.ink }}
              onClick={onNext}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Weiter zu den Projekten →
            </motion.button>
          </motion.div>
        )}
      </div>
    </ScreenWrapper>
  )
}

// ═══════════════════════════════════════════════════
// SCREEN 5: PROJECT DISCOVERY
// ═══════════════════════════════════════════════════
const ProjectDiscoveryScreen = ({ followedProjects, setFollowedProjects, selectedCause, setSelectedCause, onNext, onBack, identity }) => {
  const id = IDENTITY_DATA[identity]
  const toggleFollow = (pid) => {
    setFollowedProjects(prev => prev.includes(pid) ? prev.filter(x => x !== pid) : [...prev, pid])
  }
  return (
    <ScreenWrapper>
      <motion.div className={C.pageWrap} {...pageTransition}>
        <div className="flex items-center justify-between mb-8">
          <LBBWBadge />
          <Eyebrow text="PHASE 04 · PROJEKTE" color={id.trackColor} />
        </div>

        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 'clamp(28px, 8vw, 40px)', color: DS.paper, lineHeight: 1.15 }}
          className="mb-3">
          Entdecke Projekte,<br />die zu dir passen.
        </h2>
        <p className="mb-8" style={{ color: `${DS.sand}99`, fontSize: 14 }}>
          Wähle einen Bereich, der dich bewegt – oder lass dich inspirieren.
        </p>

        {/* Cause filter chips */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['Alle', 'Wasser', 'Bildung', 'Umwelt', 'Innovation'].map(c => (
            <button key={c}
              className={C.chip + ' cursor-pointer transition-all'}
              style={{
                background: (selectedCause === c || (c === 'Alle' && !selectedCause)) ? `${id.trackColor}30` : `${DS.sand}10`,
                color: (selectedCause === c || (c === 'Alle' && !selectedCause)) ? id.trackHi : `${DS.sand}80`,
                border: `1px solid ${(selectedCause === c || (c === 'Alle' && !selectedCause)) ? id.trackColor + '60' : DS.sand + '20'}`,
              }}
              onClick={() => setSelectedCause(c === 'Alle' ? null : c)}
            >{c}</button>
          ))}
        </div>

        <div className="space-y-4 mb-10">
          {PROJECTS.filter(p => !selectedCause || p.cause === selectedCause).map((project, i) => {
            const followed = followedProjects.includes(project.id)
            const Icon = project.icon
            return (
              <motion.div key={project.id} className="rounded-2xl p-5 border"
                style={{ background: 'rgba(16,32,39,.3)', borderColor: followed ? `${project.trackColor}50` : 'rgba(255,255,255,.06)' }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.012 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl grid place-items-center"
                      style={{ background: `${project.trackColor}20`, border: `1px solid ${project.trackColor}40` }}>
                      <Icon size={18} style={{ color: project.trackColor }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: '.2em', color: `${DS.sand}60`, textTransform: 'uppercase' }}>
                        {project.org}
                      </div>
                      <div style={{ color: DS.paper, fontWeight: 600, fontSize: 15 }}>{project.name}</div>
                    </div>
                  </div>
                  <button onClick={() => toggleFollow(project.id)} className="cursor-pointer"
                    style={{ background: 'transparent', border: 'none' }}>
                    {followed
                      ? <Heart size={20} fill={project.trackColor} color={project.trackColor} />
                      : <Heart size={20} color={`${DS.sand}50`} />
                    }
                  </button>
                </div>
                <p style={{ color: `${DS.sand}80`, fontSize: 13, lineHeight: 1.6 }}>{project.desc}</p>
                <div className="mt-3">
                  <span className={C.chip} style={{ background: `${project.trackColor}20`, color: project.trackColor }}>
                    {project.impact}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="flex gap-4">
          <motion.button className={C.btnGhost} onClick={onBack}
            style={{ borderColor: `${DS.sand}30`, color: DS.sand }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <ArrowLeft size={16} />
          </motion.button>
          <motion.button className={C.btnPrimary + ' flex-1'}
            style={{ background: id.trackColor, color: DS.ink }}
            onClick={onNext}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Weiter →
          </motion.button>
        </div>
      </motion.div>
    </ScreenWrapper>
  )
}

// ═══════════════════════════════════════════════════
// SCREEN 6: EDUCATION
// ═══════════════════════════════════════════════════
const EducationScreen = ({ identity, onNext, onBack }) => {
  const id = IDENTITY_DATA[identity]
  const [openCard, setOpenCard] = useState(null)

  return (
    <ScreenWrapper>
      <motion.div className={C.pageWrap} {...pageTransition}>
        <div className="flex items-center justify-between mb-8">
          <LBBWBadge />
          <Eyebrow text="PHASE 05 · WISSEN" color={id.trackColor} />
        </div>

        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 'clamp(28px, 8vw, 40px)', color: DS.paper, lineHeight: 1.15 }}
          className="mb-3">
          Was passt zu deinem Weg?
        </h2>
        <p className="mb-10" style={{ color: `${DS.sand}99`, fontSize: 14 }}>
          Drei Wege, ein Ziel: nachhaltige Wirkung mit deinem Kapital.
        </p>

        <div className="space-y-4 mb-10">
          {PHILANTHROPY_TYPES.map((type, idx) => {
            const isOpen = openCard === type.id
            const isMatch = type.identity === identity
            return (
              <motion.div key={type.id} className="rounded-2xl border overflow-hidden"
                style={{
                  background: isMatch ? `${type.color}0d` : 'rgba(16,32,39,.3)',
                  borderColor: isMatch ? `${type.color}50` : 'rgba(255,255,255,.06)',
                }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <button className="w-full text-left p-5 cursor-pointer flex items-center justify-between"
                  style={{ background: 'transparent', border: 'none' }}
                  onClick={() => setOpenCard(isOpen ? null : type.id)}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: DS.paper, fontWeight: 600, fontSize: 16 }}>{type.name}</span>
                      {isMatch && (
                        <span className={C.chip} style={{ background: `${type.color}25`, color: type.colorHi, fontSize: 10 }}>
                          Empfohlen
                        </span>
                      )}
                    </div>
                    <span style={{ color: `${DS.sand}66`, fontSize: 13 }}>{type.subtitle}</span>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={18} style={{ color: `${DS.sand}66` }} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <ul className="list-none p-0 m-0">
                          {type.benefits.map((b, i) => (
                            <FeatureListItem key={i} bold={b.bold} text={b.text} color={type.color} colorHi={type.colorHi} />
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <div className="flex gap-4">
          <motion.button className={C.btnGhost} onClick={onBack}
            style={{ borderColor: `${DS.sand}30`, color: DS.sand }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <ArrowLeft size={16} />
          </motion.button>
          <motion.button className={C.btnPrimary + ' flex-1'}
            style={{ background: id.trackColor, color: DS.ink }}
            onClick={onNext}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Zum Impact-Rechner →
          </motion.button>
        </div>
      </motion.div>
    </ScreenWrapper>
  )
}

// ═══════════════════════════════════════════════════
// SCREEN 7: CALCULATOR
// ═══════════════════════════════════════════════════
const CalculatorScreen = ({ identity, investmentAmount, setInvestmentAmount, givingMode, setGivingMode, onNext, onBack }) => {
  const id = IDENTITY_DATA[identity]
  const annualImpact = getAnnualImpact(investmentAmount, givingMode)
  const sliderPercent = givingMode === 'monthly'
    ? ((investmentAmount - 25) / (500 - 25)) * 100
    : ((investmentAmount - 50000) / (1000000 - 50000)) * 100

  const chartData = [
    { year: 'Jahr 1', value: annualImpact },
    { year: 'Jahr 3', value: annualImpact * 3.2 },
    { year: 'Jahr 5', value: annualImpact * 5.8 },
    { year: 'Jahr 10', value: annualImpact * 12.5 },
  ]

  return (
    <ScreenWrapper>
      <motion.div className="max-w-4xl mx-auto px-4 py-8 relative z-10" {...pageTransition}>
        <div className="flex items-center justify-between mb-8">
          <LBBWBadge />
          <Eyebrow text="PHASE 06 · RECHNER" color={id.trackColor} />
        </div>

        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 'clamp(28px, 8vw, 40px)', color: DS.paper, lineHeight: 1.15 }}
          className="mb-3">
          Berechne deine Wirkung.
        </h2>
        <p className="mb-10" style={{ color: `${DS.sand}99`, fontSize: 14 }}>
          Bewege den Regler und sieh, was dein Kapital bewirken kann.
        </p>

        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Left: Controls */}
          <div>
            {/* Mode toggle */}
            <div className="flex gap-2 mb-8">
              {[['lumpsum', 'Einmalanlage'], ['monthly', 'Monatlich']].map(([m, label]) => (
                <button key={m} className={C.btnSmall + ' cursor-pointer'}
                  style={{
                    background: givingMode === m ? `${id.trackColor}25` : 'transparent',
                    borderColor: givingMode === m ? id.trackColor : `${DS.sand}30`,
                    color: givingMode === m ? id.trackHi : `${DS.sand}80`,
                  }}
                  onClick={() => {
                    setGivingMode(m)
                    setInvestmentAmount(m === 'monthly' ? 100 : 100000)
                  }}
                >{label}</button>
              ))}
            </div>

            {/* Amount display */}
            <div className="mb-6">
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 48, color: DS.paper, fontWeight: 300 }}>
                €{formatEuro(investmentAmount)}
              </div>
              <div style={{ color: `${DS.sand}66`, fontSize: 13 }}>
                {givingMode === 'monthly' ? 'pro Monat' : 'Einmalanlage'}
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <input
                type="range"
                className="impact-range w-full"
                min={givingMode === 'monthly' ? 25 : 50000}
                max={givingMode === 'monthly' ? 500 : 1000000}
                step={givingMode === 'monthly' ? 5 : 10000}
                value={investmentAmount}
                onChange={e => setInvestmentAmount(Number(e.target.value))}
                style={{ '--p': `${sliderPercent}%` }}
              />
              <div className="flex justify-between mt-2" style={{ color: `${DS.sand}50`, fontSize: 11 }}>
                <span>€{formatEuro(givingMode === 'monthly' ? 25 : 50000)}</span>
                <span>€{formatEuro(givingMode === 'monthly' ? 500 : 1000000)}</span>
              </div>
            </div>
          </div>

          {/* Right: Impact card + Chart */}
          <div>
            {/* Impact card */}
            <div className="rounded-3xl p-5 mb-6 relative overflow-hidden" style={{ background: DS.grad.tealCard }}>
              <div style={{
                position: 'absolute', right: -24, top: -32, width: 128, height: 128,
                borderRadius: '50%', background: `${DS.tealhi}20`, filter: 'blur(32px)',
              }} />
              <div style={{ fontSize: 11, letterSpacing: '.1em', color: `${DS.sand}b3` }}>Jährliche Wirkung</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 40, color: DS.paper, marginTop: 4 }}>
                €{formatEuro(annualImpact)}
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="rounded-full px-3 py-0.5" style={{ background: `${DS.tealhi}25`, fontSize: 11, color: DS.tealhi }}>
                  +{id.nameDE}
                </span>
                <span style={{ color: `${DS.sand}99`, fontSize: 11 }}>
                  · {givingMode === 'monthly' ? '12× jährlich' : '2,5% LBBW-Ausschüttung'}
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-2xl p-4" style={{ background: 'rgba(11,42,58,.5)', border: '1px solid rgba(255,255,255,.06)' }}>
              <div className="mb-3" style={{ color: `${DS.sand}80`, fontSize: 12, fontWeight: 600 }}>Kumulierte Wirkung</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData}>
                  <XAxis dataKey="year" tick={{ fill: `${DS.sand}80`, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: `${DS.sand}60`, fontSize: 10 }} axisLine={false} tickLine={false}
                    tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(11,42,58,.9)', border: `1px solid ${DS.teal}40`,
                      borderRadius: 12, color: DS.paper, fontFamily: 'Fraunces, Georgia, serif',
                    }}
                    formatter={(v) => [`€${formatEuro(v)}`, 'Impact']}
                    cursor={{ fill: 'rgba(255,255,255,.04)' }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={i === chartData.length - 1 ? DS.tealhi : DS.teal} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <motion.button className={C.btnGhost} onClick={onBack}
            style={{ borderColor: `${DS.sand}30`, color: DS.sand }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <ArrowLeft size={16} />
          </motion.button>
          <motion.button className={C.btnPrimary + ' flex-1'}
            style={{ background: id.trackColor, color: DS.ink }}
            onClick={onNext}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Meine Empfehlung →
          </motion.button>
        </div>
      </motion.div>
    </ScreenWrapper>
  )
}

// ═══════════════════════════════════════════════════
// SCREEN 8: RECOMMENDATION
// ═══════════════════════════════════════════════════
const RecommendationScreen = ({ identity, investmentAmount, givingMode, selectedCause, followedProjects, onNext, onBack }) => {
  const id = IDENTITY_DATA[identity]
  const annualImpact = getAnnualImpact(investmentAmount, givingMode)
  const product = PHILANTHROPY_TYPES.find(p => p.id === id.recommendedProduct)
  const [showBusiness, setShowBusiness] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const text = generateShareText(identity, investmentAmount, selectedCause, annualImpact)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }

  return (
    <ScreenWrapper>
      <motion.div className={C.pageWrap} {...pageTransition}>
        <div className="flex items-center justify-between mb-8">
          <LBBWBadge />
          <Eyebrow text="PHASE 07 · EMPFEHLUNG" color={id.trackColor} />
        </div>

        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 'clamp(28px, 8vw, 40px)', color: DS.paper, lineHeight: 1.15 }}
          className="mb-8">
          Dein persönlicher Plan.
        </h2>

        {/* Profile summary card */}
        <div className="rounded-3xl p-6 mb-6 relative overflow-hidden"
          style={{ background: identity === 'catalyst' ? DS.grad.tealCard : identity === 'builder' ? DS.grad.goldCard : 'rgba(16,32,39,.4)', border: `1px solid ${id.trackColor}30` }}>
          <div style={{
            position: 'absolute', right: -24, top: -32, width: 128, height: 128,
            borderRadius: '50%', background: `${id.trackColor}20`, filter: 'blur(32px)',
          }} />
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl">{id.emoji}</span>
            <div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, color: id.trackColor }}>{id.nameDE}</div>
              <div style={{ color: `${DS.sand}66`, fontSize: 12 }}>{id.name}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div style={{ color: `${DS.sand}60`, fontSize: 11 }}>Kapital</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, color: DS.paper }}>€{formatEuro(investmentAmount)}</div>
            </div>
            <div>
              <div style={{ color: `${DS.sand}60`, fontSize: 11 }}>Jährliche Wirkung</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, color: DS.paper }}>€{formatEuro(annualImpact)}</div>
            </div>
          </div>
          {selectedCause && (
            <div className="mt-4">
              <span className={C.chip} style={{ background: `${id.trackColor}20`, color: id.trackHi }}>
                Fokus: {selectedCause}
              </span>
            </div>
          )}
        </div>

        {/* Recommended product */}
        <div className="rounded-2xl p-5 mb-6 border" style={{ background: 'rgba(16,32,39,.4)', borderColor: `${id.trackColor}30` }}>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} style={{ color: id.trackHi }} />
            <span style={{ color: DS.paper, fontWeight: 600, fontSize: 15 }}>Empfohlen: {product?.name}</span>
          </div>
          <p style={{ color: `${DS.sand}80`, fontSize: 13, lineHeight: 1.7 }}>{id.forwardMessage}</p>
        </div>

        {/* Share button */}
        <motion.button className={C.btnGhost + ' w-full mb-6 flex items-center justify-center gap-2'}
          style={{ borderColor: `${id.trackColor}40`, color: id.trackHi }}
          onClick={handleShare}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          {copied ? <><Check size={16} /> Kopiert!</> : <><Share2 size={16} /> Profil teilen</>}
        </motion.button>

        {/* Business logic accordion */}
        <div className="rounded-2xl border overflow-hidden mb-10"
          style={{ borderColor: 'rgba(255,255,255,.06)', background: 'rgba(16,32,39,.2)' }}>
          <button className="w-full text-left p-4 flex items-center justify-between cursor-pointer"
            style={{ background: 'transparent', border: 'none' }}
            onClick={() => setShowBusiness(!showBusiness)}>
            <span style={{ color: `${DS.sand}80`, fontSize: 13, fontWeight: 600 }}>Wie LBBW profitiert</span>
            <motion.div animate={{ rotate: showBusiness ? 180 : 0 }}>
              <ChevronDown size={16} style={{ color: `${DS.sand}50` }} />
            </motion.div>
          </button>
          <AnimatePresence>
            {showBusiness && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4" style={{ borderLeft: `2px solid ${id.trackColor}40`, marginLeft: 16 }}>
                  <p style={{ color: `${DS.sand}99`, fontSize: 12, lineHeight: 2 }}>
                    LBBW generiert Einnahmen durch transparente Verwaltungsgebühren: 0,6% p.a. auf verwaltetes Stiftungsvermögen.
                    <br /><br />
                    Stiftungsfonds €150.000 = €900 / Jahr Verwaltungsgebühr.
                    <br /><br />
                    Langfristig: Kunden, die heute mit €100k starten, verwalten in 10–15 Jahren oft €500k+. ImpactPath pflanzt den LBBW-Flag beim frühestmöglichen Zeitpunkt — und baut Markenloyalität in den formativen Jahren einer philanthropischen Identität.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4">
          <motion.button className={C.btnGhost} onClick={onBack}
            style={{ borderColor: `${DS.sand}30`, color: DS.sand }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <ArrowLeft size={16} />
          </motion.button>
          <motion.button className={C.btnPrimary + ' flex-1'}
            style={{ background: id.trackColor, color: DS.ink }}
            onClick={onNext}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Zum Abschluss →
          </motion.button>
        </div>
      </motion.div>
    </ScreenWrapper>
  )
}

// ═══════════════════════════════════════════════════
// SCREEN 9: CTA
// ═══════════════════════════════════════════════════
const CTAScreen = ({ identity, onNext }) => {
  const id = IDENTITY_DATA[identity]
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const circumference = 2 * Math.PI * 28
  const dashOffset = circumference * (countdown / 10)

  return (
    <ScreenWrapper gradient={DS.grad.cta} glows={[['teal', 'top-1/4 -left-32'], ['gold', '-bottom-24 right-0']]}>
      <motion.div className={C.pageWrap + ' flex flex-col items-center justify-center min-h-screen text-center'}
        {...pageTransition}>
        <LBBWBadge />

        <div className="mt-16 mb-10" style={{
          border: `1px solid ${DS.gold}35`, borderRadius: 4,
          padding: '40px 32px', maxWidth: 480, margin: '40px auto',
        }}>
          <WassertropfenSVG color={DS.gold} size={40} />

          <motion.div style={{ height: 1, background: `${DS.gold}40`, margin: '24px auto', maxWidth: 80 }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />

          <h2 style={{
            fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300,
            fontSize: 'clamp(22px, 6vw, 32px)', color: DS.paper, lineHeight: 1.3,
            whiteSpace: 'pre-line',
          }}>
            {id.closingStatement}
          </h2>

          <motion.div style={{ height: 1, background: `${DS.gold}40`, margin: '24px auto', maxWidth: 80 }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />

          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', color: `${DS.sand}80`, fontSize: 14, lineHeight: 1.7 }}>
            {id.heroTagline}
          </p>

          <p className="mt-4" style={{ color: `${DS.sand}60`, fontSize: 13, lineHeight: 1.7 }}>
            {id.forwardMessage}
          </p>

          <div className="mt-6 text-xs" style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${DS.gold}80` }}>
            — LBBW / BW-Bank
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {['🏆 Platz 1 · 2025', '🏛️ 40 J. Erfahrung', '📊 1.500+ Stiftungen'].map(badge => (
            <span key={badge} className={C.chipGold}
              style={{ borderColor: `${DS.gold}30`, color: `${DS.sand}99`, fontSize: 11 }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Countdown */}
        <div className="mb-8 flex flex-col items-center">
          <svg width="68" height="68" viewBox="0 0 68 68" className="mb-2">
            <circle cx="34" cy="34" r="28" fill="none" stroke={`${DS.sand}15`} strokeWidth="3" />
            <motion.circle cx="34" cy="34" r="28" fill="none" stroke={id.trackColor} strokeWidth="3"
              strokeDasharray={circumference} strokeDashoffset={circumference - dashOffset}
              strokeLinecap="round" transform="rotate(-90 34 34)"
            />
            <text x="34" y="38" textAnchor="middle" fill={DS.paper} fontSize="18"
              fontFamily="Fraunces, Georgia, serif">{countdown}</text>
          </svg>
          <span style={{ color: `${DS.sand}50`, fontSize: 11 }}>Dein Zeitfenster</span>
        </div>

        <motion.button className={C.btnPrimary + ' mb-4'}
          style={{ background: id.trackColor, color: DS.ink }}
          onClick={() => window.location.href = '#beratung'}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          Beratungsgespräch vereinbaren →
        </motion.button>

        <motion.button className={C.btnGhost + ' mb-8'}
          style={{ borderColor: `${DS.sand}20`, color: `${DS.sand}80` }}
          onClick={onNext}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          Dashboard-Vorschau ansehen →
        </motion.button>

        <div style={{ color: `${DS.sand}73`, fontSize: 11 }}>
          <a href="mailto:impact@lbbw.de" style={{ color: DS.teal, textDecoration: 'none' }}>
            impact@lbbw.de
          </a>
          {' '} · Tel. 0711 127-0
        </div>
      </motion.div>
    </ScreenWrapper>
  )
}

// ═══════════════════════════════════════════════════
// SCREEN 10: DASHBOARD ROADMAP
// ═══════════════════════════════════════════════════
const DashboardRoadmapScreen = ({ identity, onBack }) => {
  const id = IDENTITY_DATA[identity]
  const [phoneTab1, setPhoneTab1] = useState('dashboard')
  const [phoneTab2, setPhoneTab2] = useState('locked')
  const [fotwOpen, setFotwOpen] = useState(false)
  const [deployCount, setDeployCount] = useState(0)
  const [threadActive, setThreadActive] = useState(false)
  const barRefs = useRef([])

  // Thread animation
  useEffect(() => {
    const t = setTimeout(() => setThreadActive(true), 500)
    return () => clearTimeout(t)
  }, [])

  // Deployment counter animation
  useEffect(() => {
    if (phoneTab2 !== 'tracker') return
    const target = 50000
    const duration = 1400
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out
      setDeployCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [phoneTab2])

  // Bar fill animations
  useEffect(() => {
    if (phoneTab1 !== 'milestones') return
    const t = setTimeout(() => {
      barRefs.current.forEach((el, i) => {
        if (el) el.style.width = [72, 45, 18][i] + '%'
      })
    }, 200)
    return () => clearTimeout(t)
  }, [phoneTab1])

  const transactions = [
    { name: 'Edeka Round-up', amount: '+€0,60', time: 'Heute, 14:23' },
    { name: 'dm Round-up', amount: '+€0,35', time: 'Gestern' },
    { name: 'Tankstelle', amount: '+€0,80', time: 'Mo, 09:15' },
    { name: 'Bäckerei', amount: '+€0,12', time: 'So, 08:40' },
  ]

  return (
    <ScreenWrapper glows={[['teal', '-top-32 -left-32'], ['gold', '-bottom-32 -right-32'], ['purple', 'top-1/2 left-1/3']]}>
      <motion.div className="max-w-5xl mx-auto px-4 py-8 relative z-10" {...pageTransition}>
        <div className="flex items-center justify-between mb-8">
          <LBBWBadge />
          <Eyebrow text="PHASE 10 · AUSBLICK" color={id.trackColor} />
        </div>

        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 'clamp(28px, 8vw, 40px)', color: DS.paper, lineHeight: 1.15 }}
          className="mb-2">
          Phase 2: Dein persönliches Impact-Dashboard
        </h2>
        <p className="mb-12" style={{ color: `${DS.sand}99`, fontSize: 14, maxWidth: 520 }}>
          So könnte deine Wirkung aussehen — in Echtzeit, direkt in der LBBW App.
        </p>

        {/* PHONES */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-12">
          {/* Phone 1: Light / Micro-Giver */}
          <div className="relative">
            <div className="text-center mb-4">
              <span className={C.chip} style={{ background: `${DS.teal}20`, color: DS.tealhi, border: `1px solid ${DS.teal}40` }}>
                Micro-Giver Track
              </span>
            </div>
            <PhoneFrame variant="light">
              <AnimatePresence mode="wait">
                {phoneTab1 === 'dashboard' && (
                  <motion.div key="dash" className="p-4 screen-in"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}>
                    {/* Balance card */}
                    <div className="rounded-2xl p-4 mb-4 relative overflow-hidden"
                      style={{ background: DS.grad.tealFull }}>
                      <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: `${DS.tealhi}25`, filter: 'blur(24px)' }} />
                      <div style={{ fontSize: 10, color: `${DS.paper}b3`, letterSpacing: '.08em' }}>Gesammelter Betrag</div>
                      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 32, color: DS.paper, marginTop: 2 }}>€128,40</div>
                      <div className="mt-2 rounded-full px-2 py-0.5 inline-flex items-center gap-1"
                        style={{ background: `${DS.paper}20`, fontSize: 10, color: DS.paper }}>
                        <TrendingUp size={10} /> +€0,60 heute
                      </div>
                    </div>

                    {/* Round-up slider */}
                    <div className="mb-4 rounded-xl p-3" style={{ background: 'rgba(11,42,58,.08)' }}>
                      <div className="flex justify-between mb-2">
                        <span style={{ fontSize: 11, color: '#0B2A3A', fontWeight: 600 }}>Round-up Betrag</span>
                        <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 13, color: DS.teal }}>€0,60</span>
                      </div>
                      <input type="range" className="impact-range w-full" min="10" max="200" defaultValue="60"
                        style={{ '--p': '30%' }} readOnly />
                    </div>

                    {/* Transactions */}
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#0B2A3A', letterSpacing: '.1em', marginBottom: 8 }}>
                      LETZTE TRANSAKTIONEN
                    </div>
                    {transactions.map((tx, i) => (
                      <div key={i} className="flex items-center justify-between py-2"
                        style={{ borderBottom: i < 3 ? '1px solid rgba(11,42,58,.06)' : 'none' }}>
                        <div>
                          <div style={{ fontSize: 12, color: '#0B2A3A', fontWeight: 500 }}>{tx.name}</div>
                          <div style={{ fontSize: 10, color: '#0B2A3A80' }}>{tx.time}</div>
                        </div>
                        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 13, color: DS.teal }}>
                          {tx.amount}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
                {phoneTab1 === 'milestones' && (
                  <motion.div key="miles" className="p-4 screen-in"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                    {/* Achievement card */}
                    <div className="rounded-2xl p-4 mb-4" style={{ background: DS.grad.goldFull }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Award size={16} color={DS.paper} />
                        <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 14, color: DS.paper }}>€100 Meilenstein erreicht!</span>
                      </div>
                      <div style={{ fontSize: 10, color: `${DS.paper}b3` }}>Du hast dein erstes Ziel geschafft.</div>
                    </div>

                    {/* Progress bars */}
                    {[['€250 Spendenziel', 72], ['Erstes Projekt unterstützt', 45], ['Community Beitritt', 18]].map(([label, pct], i) => (
                      <div key={label} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span style={{ fontSize: 11, color: '#0B2A3A', fontWeight: 500 }}>{label}</span>
                          <span style={{ fontSize: 10, color: '#0B2A3A80' }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: 'rgba(11,42,58,.08)' }}>
                          <div ref={el => barRefs.current[i] = el}
                            className="bar-fill h-full rounded-full"
                            style={{ background: DS.grad.tealFull }} />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <PhoneNavBar variant="light"
                tabs={[
                  { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
                  { id: 'milestones', label: 'Milestones', icon: <Award size={18} /> },
                ]}
                activeTab={phoneTab1} onTabChange={setPhoneTab1}
              />
            </PhoneFrame>
          </div>

          {/* Phone 2: Dark / Founder */}
          <div className="relative">
            <div className="text-center mb-4">
              <span className={C.chip} style={{ background: `${DS.gold}20`, color: DS.goldhi, border: `1px solid ${DS.gold}40` }}>
                Founder Track
              </span>
            </div>
            <PhoneFrame variant="dark">
              <AnimatePresence mode="wait">
                {phoneTab2 === 'locked' && (
                  <motion.div key="lock" className="p-4 flex flex-col items-center justify-center h-full"
                    style={{ background: 'radial-gradient(circle at 50% 40%, rgba(62,142,138,.08), transparent 70%)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.42 }}>
                    <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 56, fontWeight: 300, color: DS.paper, marginBottom: 4 }}>
                      20:14
                    </div>
                    <div style={{ color: `${DS.sand}50`, fontSize: 12, marginBottom: 40 }}>Freitag, 27. Juni</div>
                    <PushNotification
                      title={`${id.nameDE} Fund — Bau-Phase 2 gestartet 🏗️`}
                      cta="Tippe zum Verfolgen"
                      accentColor={DS.gold}
                      onTap={() => setPhoneTab2('tracker')}
                    />
                    <div className="mt-8 w-3 h-3 rounded-full pulse-dot" style={{ background: DS.goldhi }} />
                  </motion.div>
                )}
                {phoneTab2 === 'tracker' && (
                  <motion.div key="track" className="p-4 screen-in"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                    <div style={{ fontSize: 9, letterSpacing: '.25em', color: `${DS.gold}cc`, textTransform: 'uppercase', marginBottom: 4 }}>
                      MAX MÜLLER IMPACT FUND
                    </div>
                    <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, color: DS.paper, marginBottom: 8 }}>
                      Regionale Wasserinitiative
                    </div>

                    <PhoneSVGScene />

                    <div className="flex items-center gap-2 mb-4">
                      <span className="rounded-full px-2 py-0.5 flex items-center gap-1"
                        style={{ background: 'rgba(220,50,50,.15)', fontSize: 9, color: '#f87171' }}>
                        <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#f87171' }} />
                        LIVE
                      </span>
                      <span style={{ fontSize: 10, color: `${DS.sand}60` }}>Standort B</span>
                    </div>

                    {/* Deploy counter */}
                    <div className="rounded-xl p-3 mb-4" style={{ background: 'rgba(176,141,87,.08)', border: `1px solid ${DS.gold}25` }}>
                      <div style={{ fontSize: 10, color: `${DS.sand}70` }}>Eingesetzt</div>
                      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 28, color: DS.paper }}>
                        €{formatEuro(deployCount)}
                      </div>
                      <div className="h-1.5 rounded-full mt-2" style={{ background: 'rgba(255,255,255,.08)' }}>
                        <div className="bar-fill h-full rounded-full" style={{ background: DS.grad.goldFull, width: `${(deployCount / 50000) * 100}%`, transition: 'none' }} />
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-3">
                      {[
                        { label: 'Phase 1: Planung', done: true },
                        { label: 'Phase 2: Bau', active: true },
                        { label: 'Phase 3: Test', upcoming: true },
                        { label: 'Phase 4: Betrieb', upcoming: true },
                      ].map((p, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full grid place-items-center flex-shrink-0" style={{
                            background: p.done ? DS.gold : p.active ? 'transparent' : 'transparent',
                            border: p.done ? 'none' : `1.5px solid ${p.active ? DS.gold : `${DS.sand}25`}`,
                          }}>
                            {p.done && <Check size={10} color={DS.ink} />}
                            {p.active && <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: DS.goldhi }} />}
                          </div>
                          <span style={{ fontSize: 11, color: p.done ? DS.goldhi : p.active ? DS.paper : `${DS.sand}40` }}>
                            {p.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {phoneTab2 === 'network' && (
                  <motion.div key="net" className="p-4 screen-in"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                    {/* Foundation of the week */}
                    <motion.div className="notif-tap rounded-2xl p-4 mb-4 cursor-pointer"
                      style={{ background: 'rgba(176,141,87,.08)', border: `1px solid ${DS.gold}30` }}
                      onClick={() => setFotwOpen(!fotwOpen)}
                      whileTap={{ scale: 0.985 }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={14} color={DS.goldhi} />
                        <span style={{ fontSize: 10, letterSpacing: '.15em', color: DS.goldhi, textTransform: 'uppercase' }}>Foundation of the Week</span>
                      </div>
                      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 14, color: DS.paper }}>
                        Schneider Umweltstiftung
                      </div>
                      <div style={{ fontSize: 10, color: `${DS.sand}60`, marginTop: 4 }}>
                        €2.4M · Regionale Biodiversität
                      </div>
                      <AnimatePresence>
                        {fotwOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${DS.gold}20` }}>
                              <p style={{ fontSize: 10, color: `${DS.sand}80`, lineHeight: 1.6 }}>
                                Die Schneider Stiftung fördert seit 2018 regionale Biodiversitätsprojekte. Exklusiv bei der LBBW Gala im Oktober vorgestellt.
                              </p>
                              <div className="mt-2 rounded-full px-3 py-1 inline-flex items-center gap-1"
                                style={{ background: `${DS.gold}20`, fontSize: 9, color: DS.goldhi }}>
                                <Calendar size={10} /> Zur LBBW Gala einladen
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Feed items */}
                    {[
                      { user: 'A. Weber', action: 'hat Wasserinitiative unterstützt', time: 'Vor 2h' },
                      { user: 'K. Schmidt', action: 'hat Bildungsfonds gegründet', time: 'Vor 1 Tag' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 py-3"
                        style={{ borderBottom: i === 0 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>
                        <div className="w-7 h-7 rounded-full grid place-items-center flex-shrink-0"
                          style={{ background: `${DS.gold}15`, border: `1px solid ${DS.gold}30` }}>
                          <Users size={12} color={DS.goldhi} />
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: DS.paper }}>
                            <span style={{ fontWeight: 600 }}>{item.user}</span> {item.action}
                          </div>
                          <div style={{ fontSize: 9, color: `${DS.sand}50`, marginTop: 2 }}>{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {phoneTab2 !== 'locked' && (
                <PhoneNavBar variant="dark"
                  tabs={[
                    { id: 'tracker', label: 'My Fund', icon: <Layers size={18} /> },
                    { id: 'network', label: 'Network', icon: <Users size={18} /> },
                  ]}
                  activeTab={phoneTab2} onTabChange={setPhoneTab2}
                />
              )}
            </PhoneFrame>
          </div>
        </div>

        {/* Thread connection */}
        <div className="flex flex-col items-center my-8">
          <div className="rounded-full px-4 py-2 flex items-center gap-2 mb-3"
            style={{ background: `${DS.teal}15`, border: `1px solid ${DS.teal}30` }}>
            <div className="w-2 h-2 rounded-full" style={{ background: DS.tealhi }} />
            <span style={{ fontSize: 11, color: DS.tealhi }}>€0,60 / Monat</span>
          </div>
          <div className={`w-0.5 h-16 thread-line ${threadActive ? 'active' : ''}`}
            style={{ background: DS.grad.tealGold }} />
          <div className="rounded-full px-4 py-2 flex items-center gap-2 mt-3"
            style={{ background: `${DS.gold}15`, border: `1px solid ${DS.gold}30` }}>
            <div className="w-2 h-2 rounded-full" style={{ background: DS.goldhi }} />
            <span style={{ fontSize: 11, color: DS.goldhi }}>€100.000 / Fund</span>
          </div>
        </div>

        <p className="text-center mt-8 mb-8" style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', color: `${DS.sand}60`, fontSize: 12 }}>
          Diese Features befinden sich in der gemeinsamen Entwicklung mit LBBW.
        </p>

        <div className="flex justify-center">
          <motion.button className={C.btnGhost} onClick={onBack}
            style={{ borderColor: `${DS.sand}30`, color: DS.sand }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <ArrowLeft size={16} className="inline mr-2" /> Zurück
          </motion.button>
        </div>
      </motion.div>
    </ScreenWrapper>
  )
}

// ═══════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════
const App = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [giverIdentity, setGiverIdentity] = useState(null)
  const [followedProjects, setFollowedProjects] = useState([])
  const [givingMode, setGivingMode] = useState('lumpsum')
  const [investmentAmount, setInvestmentAmount] = useState(100000)
  const [selectedCause, setSelectedCause] = useState(null)

  // Font injection
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap'
    document.head.appendChild(link)

    const style = document.createElement('style')
    style.textContent = `
      * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
      .font-display { font-family: 'Fraunces', Georgia, serif !important; }
      .grain-overlay {
        background-image: radial-gradient(rgba(255,255,255,.018) 1px, transparent 1px);
        background-size: 3px 3px;
        pointer-events: none;
      }
      .ambient-teal {
        background: radial-gradient(circle, rgba(62,142,138,.22), transparent 70%);
        filter: blur(90px); border-radius: 9999px; pointer-events: none;
      }
      .ambient-gold {
        background: radial-gradient(circle, rgba(176,141,87,.18), transparent 70%);
        filter: blur(90px); border-radius: 9999px; pointer-events: none;
      }
      .ambient-purple {
        background: radial-gradient(circle, rgba(167,140,191,.15), transparent 70%);
        filter: blur(90px); border-radius: 9999px; pointer-events: none;
      }
      @keyframes screenIn {
        from { opacity:0; transform:translateY(8px) scale(.99); }
        to   { opacity:1; transform:none; }
      }
      .screen-in { animation: screenIn .38s cubic-bezier(.2,.7,.2,1); }
      @keyframes pulseDot {
        0%,100% { box-shadow: 0 0 0 0 rgba(210,176,122,.5); }
        50%      { box-shadow: 0 0 0 7px rgba(210,176,122,0); }
      }
      .pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }
      .impact-range {
        -webkit-appearance: none; appearance: none;
        width: 100%; height: 6px; border-radius: 6px; outline: none;
        background: linear-gradient(90deg, #3E8E8A var(--p,50%), rgba(255,255,255,.12) var(--p,50%));
      }
      .impact-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 26px; height: 26px; border-radius: 50%;
        background: #fff; border: 5px solid #3E8E8A;
        box-shadow: 0 6px 14px -4px rgba(62,142,138,.7);
        cursor: pointer; transition: transform .15s;
      }
      .impact-range::-webkit-slider-thumb:active { transform: scale(1.12); }
      .bar-fill {
        width: 0;
        transition: width 1.3s cubic-bezier(.3,0,.15,1);
      }
      .thread-line {
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 1.1s cubic-bezier(.4,0,.2,1);
      }
      .thread-line.active { transform: scaleY(1); }
      .hide-scroll::-webkit-scrollbar { width: 0; height: 0; }
      .notif-tap { transition: transform .25s ease; cursor: pointer; }
      .notif-tap:hover { transform: scale(1.015); }
      .notif-tap:active { transform: scale(.985); }
      @media (prefers-reduced-motion: reduce) {
        .screen-in, .pulse-dot, .bar-fill,
        .thread-line { animation: none !important; transition: none !important; }
      }
    `
    document.head.appendChild(style)
  }, [])

  const goNext = () => {
    if (currentStep === 3) {
      const identity = calculateIdentity(quizAnswers)
      setGiverIdentity(identity)
    }
    setCurrentStep(prev => prev + 1)
  }
  const goBack = () => setCurrentStep(prev => Math.max(0, prev - 1))

  const handleQuizAnswer = (questionIndex, identity) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: identity }))
  }

  return (
    <div style={{ minHeight: '100vh', background: DS.ink }}>
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div key="splash" {...pageTransition}>
            <SplashScreen onStart={goNext} />
          </motion.div>
        )}
        {currentStep >= 1 && currentStep <= 3 && (
          <motion.div key={`quiz-${currentStep}`} {...pageTransition}>
            <QuizScreen
              data={QUIZ_QUESTIONS[currentStep - 1]}
              answer={quizAnswers[currentStep - 1]}
              onAnswer={(id) => handleQuizAnswer(currentStep - 1, id)}
              onNext={goNext}
              onBack={goBack}
              stepIndex={currentStep}
            />
          </motion.div>
        )}
        {currentStep === 4 && giverIdentity && (
          <motion.div key="reveal" {...pageTransition}>
            <IdentityRevealScreen identity={giverIdentity} onNext={goNext} />
          </motion.div>
        )}
        {currentStep === 5 && giverIdentity && (
          <motion.div key="projects" {...pageTransition}>
            <ProjectDiscoveryScreen
              followedProjects={followedProjects} setFollowedProjects={setFollowedProjects}
              selectedCause={selectedCause} setSelectedCause={setSelectedCause}
              onNext={goNext} onBack={goBack} identity={giverIdentity}
            />
          </motion.div>
        )}
        {currentStep === 6 && giverIdentity && (
          <motion.div key="education" {...pageTransition}>
            <EducationScreen identity={giverIdentity} onNext={goNext} onBack={goBack} />
          </motion.div>
        )}
        {currentStep === 7 && giverIdentity && (
          <motion.div key="calculator" {...pageTransition}>
            <CalculatorScreen
              identity={giverIdentity} investmentAmount={investmentAmount}
              setInvestmentAmount={setInvestmentAmount} givingMode={givingMode}
              setGivingMode={setGivingMode} onNext={goNext} onBack={goBack}
            />
          </motion.div>
        )}
        {currentStep === 8 && giverIdentity && (
          <motion.div key="recommendation" {...pageTransition}>
            <RecommendationScreen
              identity={giverIdentity} investmentAmount={investmentAmount}
              givingMode={givingMode} selectedCause={selectedCause}
              followedProjects={followedProjects} onNext={goNext} onBack={goBack}
            />
          </motion.div>
        )}
        {currentStep === 9 && giverIdentity && (
          <motion.div key="cta" {...pageTransition}>
            <CTAScreen identity={giverIdentity} onNext={goNext} />
          </motion.div>
        )}
        {currentStep === 10 && giverIdentity && (
          <motion.div key="dashboard" {...pageTransition}>
            <DashboardRoadmapScreen identity={giverIdentity} onBack={goBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
