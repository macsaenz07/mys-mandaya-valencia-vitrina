import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CENTRO } from './negocio'

// Mapa liviano con OpenStreetMap. puntos: [{id, pos:[lat,lng], color, txt}]
export default function Mapa({ puntos = [], yo, alTocar, alto = 'h-56' }) {
  const caja = useRef(null)
  const mapa = useRef(null)
  const capa = useRef(null)
  const encuadre = useRef(null)
  const encuadrar = () => {
    const todos = encuadre.current
    if (!todos?.length || !caja.current?.offsetWidth) return
    if (todos.length > 1) mapa.current.fitBounds(todos, { padding: [30, 30], maxZoom: 15 })
    else mapa.current.setView(todos[0], 15)
  }
  useEffect(() => {
    mapa.current = L.map(caja.current, { zoomControl: false, attributionControl: false }).setView(CENTRO, 14)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapa.current)
    capa.current = L.layerGroup().addTo(mapa.current)
    // Si el mapa nace oculto (otra pestaña) o cambia de tamaño, Leaflet queda midiendo 0 px y pinta solo una esquina:
    // se recalcula el tamaño y se vuelve a encuadrar cada vez que la caja cambia.
    const ro = new ResizeObserver(() => { if (!caja.current?.offsetWidth) return; mapa.current.invalidateSize(); encuadrar() })
    ro.observe(caja.current)
    return () => { ro.disconnect(); mapa.current.remove() }
  }, [])
  useEffect(() => {
    capa.current.clearLayers()
    puntos.forEach((p) => {
      // Pedido con precio mejorado: un halo rojo debajo del marcador para que se note de lejos.
      if (p.caliente) L.circleMarker(p.pos, { radius: 20, color: '#dc2626', weight: 2, fillColor: '#dc2626', fillOpacity: 0.18, className: 'animate-pulse' }).addTo(capa.current)
      L.circleMarker(p.pos, { radius: 11, color: '#fff', weight: 3, fillColor: p.color || '#f59e0b', fillOpacity: 1 })
        .addTo(capa.current).bindTooltip(p.txt, { direction: 'top' })
        .on('click', () => alTocar?.(p.id))
    })
    if (yo) L.circleMarker(yo, { radius: 8, color: '#fff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }).addTo(capa.current)
    encuadre.current = [...puntos.map((p) => p.pos), ...(yo ? [yo] : [])]
    encuadrar()
  }, [puntos, yo, alTocar])
  return <div ref={caja} className={`${alto} w-full rounded-3xl overflow-hidden border border-borde z-0`} />
}
