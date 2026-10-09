import { useEffect, useRef, useState } from 'react'
import FixiAvatar from './FixiAvatar'
import { useFixi } from './FixiTour'

export function Boton({ tipo = 'solido', className = '', ...p }) {
  const estilos = {
    solido: 'bg-marca text-white dark:text-stone-900 hover:bg-marca-fuerte shadow-sm',
    ghost: 'bg-transparent text-marca border border-borde hover:bg-campo',
    peligro: 'bg-transparent text-red-600 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950',
  }
  return (
    <button
      {...p}
      className={`min-h-12 rounded-2xl px-5 font-semibold transition active:scale-[.98] disabled:opacity-40 disabled:pointer-events-none ${estilos[tipo]} ${className}`}
    />
  )
}

export const Tarjeta = ({ className = '', ...p }) => (
  <div {...p} className={`rounded-3xl bg-tarjeta border border-borde p-4 ${className}`} />
)

export function Campo({ etiqueta, ...p }) {
  return (
    <label className="block">
      <span className="text-sm text-suave">{etiqueta}</span>
      <input
        {...p}
        className="mt-1 w-full min-h-12 rounded-2xl bg-campo border border-borde px-4 text-base outline-none focus:border-marca"
      />
    </label>
  )
}

// Alerta accionable: problema + porqué + próximo paso + botón que lo corrige.
export function Aviso({ aviso, cerrar }) {
  if (!aviso) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-[1200] p-3" role="alert">
      <div className="mx-auto max-w-md rounded-3xl bg-tarjeta border border-borde shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <FixiAvatar size={36} />
          <div className="min-w-0">
            <p className="font-semibold">{aviso.problema}</p>
            {aviso.porque && <p className="text-sm text-suave mt-1">{aviso.porque}</p>}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {aviso.accion && (
            <Boton className="flex-1" onClick={() => { cerrar(); aviso.accion.hacer() }}>{aviso.accion.txt}</Boton>
          )}
          <Boton tipo="ghost" className={aviso.accion ? '' : 'flex-1'} onClick={cerrar}>
            {aviso.accion ? 'Ahora no' : 'Entendido, sigo'}
          </Boton>
        </div>
      </div>
    </div>
  )
}

export function Vacio({ emoji, titulo, texto, children }) {
  return (
    <div className="text-center py-10 px-6">
      <div className="text-5xl flex justify-center">{emoji || <FixiAvatar size={64} />}</div>
      <p className="font-semibold mt-3">{titulo}</p>
      {texto && <p className="text-sm text-suave mt-1">{texto}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

// Hoja inferior: el contenido se desplaza y la acción principal (pie) queda fija abajo sin taparlo.
export function Hoja({ abierta, cerrar, titulo, children, pie }) {
  if (!abierta) return null
  return (
    <div className="fixed inset-0 z-[1160] bg-black/40 flex items-end" onClick={cerrar}>
      <div
        className="w-full max-w-md mx-auto bg-tarjeta rounded-t-3xl max-h-[90dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
          <h2 className="text-lg font-bold truncate min-w-0">{titulo}</h2>
          <button onClick={cerrar} aria-label="Cerrar" className="h-10 w-10 shrink-0 rounded-full bg-campo">✕</button>
        </div>
        <div className={`overflow-y-auto overscroll-contain px-5 ${pie ? 'pb-4' : 'pb-8'}`}>{children}</div>
        {pie && <div className="border-t border-borde bg-tarjeta px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">{pie}</div>}
      </div>
    </div>
  )
}


// Fixi: botón flotante discreto. Al tocarlo muestra un globo con el consejo de ESTA pantalla, ofrece el recorrido
// paso a paso, el buscador de intenciones y el rescate. La voz es opcional: cada usuario elige solo texto o texto y voz.
// ── Fixi arrastrable (sin librerías) ──
// Pointer Events cubren dedo, mouse y lápiz con un solo código. Un movimiento menor a UMBRAL px es un TOQUE (abre el
// globo); si lo supera es un ARRASTRE: el botón sigue al dedo, se limita a la pantalla visible, al soltar se pega al
// borde más cercano (como las burbujas de chat), se guarda en localStorage y el clic que llega al soltar se descarta.
const TAM = 56, MARGEN = 12, UMBRAL = 8, ARRIBA = 64
// Por defecto en la esquina inferior derecha (zona de pulgar), lejos del texto de las tarjetas.
const posDefecto = () => ({ x: innerWidth - TAM - MARGEN, y: innerHeight - TAM - 20 })
const limitar = ({ x, y }) => ({
  x: Math.min(Math.max(MARGEN, x), innerWidth - TAM - MARGEN),
  y: Math.min(Math.max(ARRIBA, y), innerHeight - TAM - MARGEN),
})
const leerPos = () => { try { const p = JSON.parse(localStorage.getItem('everest.pos')); return p && Number.isFinite(p.x) ? p : null } catch { return null } }

function useArrastre(alTocar) {
  const [pos, setPos] = useState(() => limitar(leerPos() || posDefecto()))
  const posRef = useRef(pos)
  const g = useRef({ activo: false, movio: false })
  const suprimir = useRef(false)
  posRef.current = pos
  useEffect(() => {
    const ajustar = () => setPos((p) => limitar(p))
    addEventListener('resize', ajustar)
    return () => removeEventListener('resize', ajustar)
  }, [])
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    g.current = { activo: true, movio: false, x0: e.clientX, y0: e.clientY, dx: e.clientX - posRef.current.x, dy: e.clientY - posRef.current.y }
  }
  const onPointerMove = (e) => {
    const a = g.current
    if (!a.activo) return
    if (!a.movio && Math.hypot(e.clientX - a.x0, e.clientY - a.y0) < UMBRAL) return
    a.movio = true
    setPos(limitar({ x: e.clientX - a.dx, y: e.clientY - a.dy }))
  }
  const onPointerUp = () => {
    const a = g.current
    if (!a.activo) return
    a.activo = false
    if (!a.movio) return
    const p = posRef.current
    const final = limitar({ x: p.x + TAM / 2 < innerWidth / 2 ? MARGEN : innerWidth - TAM - MARGEN, y: p.y })
    setPos(final)
    try { localStorage.setItem('everest.pos', JSON.stringify(final)) } catch { /* sin almacenamiento */ }
    suprimir.current = true // el "click" que el navegador dispara al soltar no debe abrir el globo
  }
  const onClick = () => { if (suprimir.current) { suprimir.current = false; return } alTocar() }
  return { pos, eventos: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, onClick } }
}

export function Fixi({ pantalla, intenciones = [], panico, recorrido }) {
  const ev = useFixi()
  const [globo, setGlobo] = useState(false)
  const { pos, eventos } = useArrastre(() => setGlobo((v) => !v))
  const [abierta, setAbierta] = useState(false)
  const [q, setQ] = useState('')
  const lista = intenciones.filter((i) => (i.txt + ' ' + (i.claves || '')).toLowerCase().includes(q.toLowerCase()))
  useEffect(() => { if (globo && ev?.voz) ev.hablar(pantalla) }, [globo]) // eslint-disable-line react-hooks/exhaustive-deps
  // Mientras se escribe en un campo de texto, el botón flotante se aparta: nunca tapa lo que el usuario está escribiendo.
  const [escribiendo, setEscribiendo] = useState(false)
  // Mientras la página se desplaza, el botón se vuelve casi transparente y más pequeño para dejar leer lo de abajo.
  const [desplazando, setDesplazando] = useState(false)
  useEffect(() => {
    let t
    const mover = () => { setDesplazando(true); clearTimeout(t); t = setTimeout(() => setDesplazando(false), 700) }
    addEventListener('scroll', mover, { passive: true })
    return () => { removeEventListener('scroll', mover); clearTimeout(t) }
  }, [])
  useEffect(() => {
    const esCampo = (el) => el?.matches?.('textarea, input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range])')
    const entra = (e) => { if (esCampo(e.target)) setEscribiendo(true) }
    const sale = (e) => { if (esCampo(e.target)) setEscribiendo(false) }
    document.addEventListener('focusin', entra)
    document.addEventListener('focusout', sale)
    return () => { document.removeEventListener('focusin', entra); document.removeEventListener('focusout', sale) }
  }, [])
  if (ev?.isTourActive || (escribiendo && !globo && !abierta)) return null
  return (
    <>
      {globo && (
        <div role="dialog" aria-label="Consejo de Fixi"
          className="fixed z-[1151] w-[min(20rem,calc(100vw-2rem))] rounded-3xl bg-tarjeta border border-borde shadow-2xl p-4"
          style={{
            ...(pos.x + TAM / 2 < innerWidth / 2 ? { left: 16 } : { right: 16 }),
            ...(pos.y > innerHeight / 2 ? { bottom: innerHeight - pos.y + 8 } : { top: pos.y + TAM + 8 }),
          }}>
          <p className="text-sm leading-snug">{pantalla}</p>
          <div className="grid gap-2 mt-3">
            {recorrido && <Boton className="min-h-10 text-sm" onClick={() => { setGlobo(false); ev?.iniciar(recorrido) }}>🧭 Guíame paso a paso</Boton>}
            <Boton tipo="ghost" className="min-h-10 text-sm" onClick={() => { setGlobo(false); setAbierta(true) }}>🔎 ¿Qué quieres hacer?</Boton>
          </div>
          <div className="flex items-center justify-between mt-2">
            <button onClick={() => ev?.setVoz(!ev.voz)} className="h-9 px-3 rounded-full bg-campo text-xs" aria-label={ev?.voz ? 'Pasar a solo texto' : 'Activar la voz'}>
              {ev?.voz ? '🔊 Voz activada' : '🔇 Solo texto'}
            </button>
            <button onClick={() => setGlobo(false)} className="h-9 px-3 text-xs text-suave">Entendido</button>
          </div>
        </div>
      )}
      <button
        {...eventos}
        aria-label="Ayuda de Fixi (puedes arrastrarlo)" aria-expanded={globo} title="Toca para ayuda · arrástrame si estorbo"
        style={{ left: pos.x, top: pos.y, touchAction: 'none' }}
        className={`fixed z-[1150] grid h-14 w-14 place-items-center rounded-full bg-tarjeta shadow-lg shadow-black/30 ring-2 ring-marca select-none transition-[opacity,scale] duration-200 ${desplazando ? 'opacity-30 scale-75' : 'opacity-95 hover:opacity-100'}`}
      ><FixiAvatar size={52} titulo="Fixi" /></button>
      <Hoja abierta={abierta} cerrar={() => setAbierta(false)} titulo="Fixi te guía">
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="¿Qué quieres hacer?"
          className="w-full min-h-12 rounded-2xl bg-campo border border-borde px-4 outline-none focus:border-marca"
        />
        <div className="mt-2 divide-y divide-borde">
          {lista.map((i) => (
            <button key={i.txt} onClick={() => { setAbierta(false); i.hacer() }} className="w-full text-left py-3 hover:text-marca">
              {i.txt} →
            </button>
          ))}
          {!lista.length && <p className="py-3 text-sm text-suave">No encontré eso. Prueba con otra palabra o usa el botón de abajo.</p>}
        </div>
        <Boton tipo="ghost" className="w-full mt-4" onClick={() => { setAbierta(false); panico() }}>
          🆘 Estoy perdido: volver al inicio
        </Boton>
      </Hoja>
    </>
  )
}

// Foto que se amplía dentro de la app (las URL de datos no se pueden abrir en otra pestaña).
export function Ampliable({ src, alt, className }) {
  const [grande, setGrande] = useState(false)
  return (
    <>
      <img src={src} alt={alt} className={`cursor-zoom-in ${className}`} onClick={(e) => { e.stopPropagation(); setGrande(true) }} />
      {grande && (
        <div className="fixed inset-0 z-[1400] bg-black/90 grid place-items-center p-4" onClick={(e) => { e.stopPropagation(); setGrande(false) }}>
          <img src={src} alt={alt} className="max-h-full max-w-full rounded-2xl" />
          <button aria-label="Cerrar" className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/20 text-white">✕</button>
        </div>
      )}
    </>
  )
}
