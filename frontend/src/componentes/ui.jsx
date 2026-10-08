import { useEffect, useState } from 'react'

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
        <p className="font-semibold">🐕 {aviso.problema}</p>
        {aviso.porque && <p className="text-sm text-suave mt-1">{aviso.porque}</p>}
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

export function Vacio({ emoji = '🐕', titulo, texto, children }) {
  return (
    <div className="text-center py-10 px-6">
      <div className="text-5xl">{emoji}</div>
      <p className="font-semibold mt-3">{titulo}</p>
      {texto && <p className="text-sm text-suave mt-1">{texto}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

export function Hoja({ abierta, cerrar, titulo, children }) {
  if (!abierta) return null
  return (
    <div className="fixed inset-0 z-[1100] bg-black/40 flex items-end" onClick={cerrar}>
      <div
        className="w-full max-w-md mx-auto bg-tarjeta rounded-t-3xl p-5 pb-8 max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{titulo}</h2>
          <button onClick={cerrar} aria-label="Cerrar" className="h-10 w-10 rounded-full bg-campo">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

const TEMAS = ['auto', 'claro', 'oscuro']
export function useTema() {
  const [tema, setTema] = useState(() => { try { return localStorage.getItem('tema') || 'auto' } catch { return 'auto' } })
  useEffect(() => {
    const m = matchMedia('(prefers-color-scheme: dark)')
    const aplicar = () => document.documentElement.classList.toggle('dark', tema === 'oscuro' || (tema === 'auto' && m.matches))
    aplicar(); m.addEventListener('change', aplicar)
    try { localStorage.setItem('tema', tema) } catch { /* sin almacenamiento */ }
    return () => m.removeEventListener('change', aplicar)
  }, [tema])
  return [tema, () => setTema(TEMAS[(TEMAS.indexOf(tema) + 1) % 3])]
}
export const ICONO_TEMA = { auto: '🌓', claro: '☀️', oscuro: '🌙' }

// Everest: guía contextual + buscador de intenciones + botón de pánico.
export function Everest({ pantalla, intenciones = [], panico }) {
  const [abierta, setAbierta] = useState(false)
  const [q, setQ] = useState('')
  const lista = intenciones.filter((i) => (i.txt + ' ' + (i.claves || '')).toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <button
        onClick={() => setAbierta(true)}
        aria-label="Ayuda de Everest"
        className="fixed right-4 bottom-24 z-[1000] h-14 w-14 rounded-full bg-acento text-2xl shadow-lg active:scale-95"
      >🐕</button>
      <Hoja abierta={abierta} cerrar={() => setAbierta(false)} titulo="Everest te guía">
        <div className="rounded-2xl bg-campo p-4 text-sm">{pantalla}</div>
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="¿Qué quieres hacer?"
          className="mt-4 w-full min-h-12 rounded-2xl bg-campo border border-borde px-4 outline-none focus:border-marca"
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
