# RUA Vera — migración a Ruby on Rails

Este repositorio inicia su migración progresiva de Next.js a Ruby on Rails.

## Stack objetivo
- Ruby 3.3
- Rails 8
- PostgreSQL
- Hotwire (Turbo + Stimulus)
- Active Storage para imágenes
- Panel administrativo propio
- Integración ERP vía servicios/API
- Pasarela de pagos mediante adaptador de servicio

## Estrategia
La tienda Next.js actual permanece temporalmente disponible mientras se reconstruyen en Rails la Home, catálogo, PDP, carrito, checkout y administración. Esto evita perder el diseño y los assets ya preparados durante la migración.

## Primera fase
Se incorporó la base Rails, rutas, modelos y esquema inicial para categorías, productos y pedidos.

Categorías iniciales:
- Moda
- Lifestyle
- Objetos & Diseño
- Aromas & Fragancias
