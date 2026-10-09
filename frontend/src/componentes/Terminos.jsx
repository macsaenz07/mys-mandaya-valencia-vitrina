import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { TERMINOS_FECHA, TERMINOS_VERSION, terminos } from './terminosTexto'
import { Boton, Hoja } from './ui'

// Términos y Condiciones (modelo de menor fricción): sin casilla. El aviso va pegado al botón que crea la cuenta y la
// aceptación queda registrada en usuarios/{uid} (terminosVersion + terminosAceptados) como prueba. Los datos sensibles
// (selfie biométrica) conservan su autorización expresa y separada en Verificacion.jsx.
export const aceptacionTerminos = () => ({ terminosVersion: TERMINOS_VERSION, terminosAceptados: serverTimestamp() })

export function TextoTerminos({ soporte }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed" data-fixi="terminos">
      <p className="text-xs text-suave">Versión {TERMINOS_VERSION} · vigente desde el {TERMINOS_FECHA}</p>
      {terminos(soporte).map((s) => (
        <section key={s.t}>
          <h3 className="font-black text-base mb-1">{s.t}</h3>
          {s.p.map((x, i) => (typeof x === 'string'
            ? <p key={i} className="mb-2">{x}</p>
            : <ul key={i} className="mb-2 list-disc space-y-1 pl-5">{x.lista.map((l) => <li key={l}>{l}</li>)}</ul>))}
        </section>
      ))}
    </div>
  )
}

export function HojaTerminos({ abierta, cerrar, soporte }) {
  return (
    <Hoja abierta={abierta} cerrar={cerrar} titulo="Términos y Condiciones" pie={<Boton className="w-full" onClick={cerrar}>Entendido</Boton>}>
      <TextoTerminos soporte={soporte} />
    </Hoja>
  )
}

// Texto pequeño junto al botón de registro.
export function AvisoTerminos({ abrir, accion = 'Al continuar' }) {
  return (
    <p className="text-xs text-suave text-center leading-snug" data-fixi="aviso-terminos">
      {accion}, aceptas los <button type="button" onClick={abrir} className="font-semibold text-marca underline underline-offset-2">Términos y Condiciones</button> y
      autorizas el tratamiento de tus datos personales (Ley 1581 de 2012).
    </p>
  )
}

// Cuentas creadas antes de esta versión (o de una versión anterior): aviso no bloqueante. «Entendido» deja la prueba.
export function BannerTerminos({ uid, perfil, abrir }) {
  if (!uid || !perfil || perfil.terminosVersion === TERMINOS_VERSION) return null
  const aceptar = () => updateDoc(doc(db, 'usuarios', uid), aceptacionTerminos()).catch(() => {})
  return (
    <div className="mx-4 mb-2 rounded-2xl border border-borde bg-tarjeta px-3 py-2.5 flex items-center gap-3 text-sm aparecer" role="region" aria-label="Términos actualizados">
      <span className="text-xl" aria-hidden="true">📜</span>
      <span className="min-w-0 flex-1 leading-snug">Actualizamos los <button onClick={abrir} className="font-semibold text-marca underline underline-offset-2">Términos y Condiciones</button>. Al seguir usando Fixi los aceptas.</span>
      <button className="shrink-0 rounded-full bg-marca px-3 py-1.5 text-xs font-bold text-white dark:text-stone-900" onClick={aceptar}>Entendido</button>
    </div>
  )
}
