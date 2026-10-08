import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CENTRO } from '../negocio' // coordenadas del municipio (no incluido)

// Mapa liviano con OpenStreetMap. puntos: [{id, pos:[lat,lng], color, txt}]
export default function Mapa({ puntos = [], yo, alTocar, alto = 'h-56' }) {
  const caja = useRef(null)
  const mapa = useRef(null)
  const capa = useRef(null)
  useEffect(() => {
    mapa.current = L.map(caja.current, { zoomControl: false, attributionControl: false }).setView(CENTRO, 14)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapa.current)
    capa.current = L.layerGroup().addTo(mapa.current)
    return () => mapa.current.remove()
  }, [])
  useEffect(() => {
    capa.current.clearLayers()
    puntos.forEach((p) => {
      L.circleMarker(p.pos, { radius: 11, color: '#fff', weight: 3, fillColor: p.color || '#f59e0b', fillOpacity: 1 })
        .addTo(capa.current).bindTooltip(p.txt, { direction: 'top' })
        .on('click', () => alTocar?.(p.id))
    })
    if (yo) L.circleMarker(yo, { radius: 8, color: '#fff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }).addTo(capa.current)
    const todos = [...puntos.map((p) => p.pos), ...(yo ? [yo] : [])]
    if (todos.length > 1) mapa.current.fitBounds(todos, { padding: [30, 30], maxZoom: 15 })
    else if (todos.length === 1) mapa.current.setView(todos[0], 15)
  }, [puntos, yo, alTocar])
  return <div ref={caja} className={`${alto} w-full rounded-3xl overflow-hidden border border-borde z-0`} />
}
