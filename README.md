# 🌿 Freskura — agua, sombra y aseos en Bilbao

**Live: <https://aerotsunami.github.io/freskura-bilbao/>**

Mapa PWA para gente corredora y turista: dónde beber agua, dónde refrescarse,
dónde hay sombra y dónde encontrar un aseo en Bilbao.

*Freskura* significa «frescor» en euskera.

## Capas · Layers

- 💧 **534 fuentes de agua potable** (Ayuntamiento, WFS `OyS_Aguas:Fuentes`, tipos Consumo/Mixta)
- 🚿 **28 duchas urbanas** (mismo dataset, tipo Ducha)
- 🚻 **~114 aseos públicos** (OpenStreetMap vía Overpass, caché local 7 días, con etiquetas gratis/de pago/accesible)
- 🌳 **Sombra**: arbolado municipal (35.570 árboles) + zonas verdes oficiales, servidos como WMS
  (`OyS_ParquesJardines:Arbolado`, `Mam_Biodiversidad:VerdeUrbano`)
- ❄️ **141 refugios climáticos oficiales**: 75 interiores (con horario) + 66 zonas verdes
  exteriores (WFS `Mam_CambioClimatico:RefugioClimaticoInterior/Exterior`) — la red municipal
  contra olas de calor

## Funciones

- **Modo corredor** (agua + duchas + sombra) y **modo turista** (agua + aseos) — presets de un toque
- **«Agua más cercana»**: geolocalización → vuela a la fuente más próxima con la distancia
- **Modo calor**: con sensación térmica ≥ 27° (Open-Meteo) aparece el aviso y se activan
  automáticamente las capas de sombra y refugios climáticos
- **Aseos robustos**: tres espejos de Overpass con reintento automático y caché local
- ES / EU / EN, PWA instalable, funciona sin conexión con los últimos datos guardados
- Paleta: verdes, amarillos, turquesas y celestes; leyenda y estadísticas bajo el mapa

## Datos · Data

| Capa | Fuente | Acceso |
|---|---|---|
| Fuentes y duchas | GeoBilbao (Ayto. de Bilbao) | WFS GeoJSON, CORS abierto |
| Sombra (árboles, verde) | GeoBilbao | WMS tiles |
| Aseos | OpenStreetMap | Overpass API |
| Tiempo | Open-Meteo | JSON, sin clave |

Sin backend, sin build, sin claves API — un `index.html` estático.

## Desplegar · Deploy

Subir todos los archivos a un repositorio → Settings → Pages → branch `main` / root.

```
index.html · manifest.webmanifest · sw.js · icon-192.png · icon-512.png · icon-512-maskable.png
```

## Proyecto hermano

🛗 [Bilbao Vertical](https://aerotsunami.github.io/bilbao-vertical/) — estado en tiempo real
de los ascensores y escaleras mecánicas municipales.
