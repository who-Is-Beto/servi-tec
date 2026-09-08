<script setup lang="ts">
import { usePageSeo, useJsonLd } from '@/composables/useSeo'
import { SITE, SITE_URL } from '@/data/config'
import { MARCAS } from '@/data/marcas'
import { areaServed } from '@/data/zonas'
import HeroSection from '@/components/sections/HeroSection.vue'
import BrandsSection from '@/components/sections/BrandsSection.vue'
import WhySection from '@/components/sections/WhySection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import CoverageSection from '@/components/sections/CoverageSection.vue'
import SchedulingSection from '@/components/sections/SchedulingSection.vue'
import MetodosPagoSection from '@/components/sections/MetodosPagoSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'

usePageSeo({
  title: 'Reparación de Línea Blanca a Domicilio en CDMX',
  description:
    'Reparación de lavadoras, refrigeradores, estufas y secadoras a domicilio en CDMX y zona metropolitana. Revisión de $200 MXN y garantía de 90 días.',
  path: '/',
})

// Schema.org: negocio local + áreas servidas. Mantener en sincronía con
// el copy visible (evitar prometer zonas no confirmadas en Google).
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#negocio`,
  name: SITE.nombreLegal,
  url: SITE_URL,
  telephone: SITE.telefono,
  email: SITE.email,
  priceRange: '$$',
  // Marcas que atendemos (mantener en sincronía con /src/data/marcas.ts).
  knowsAbout: MARCAS.map((m) => m.nombre),
  areaServed: [
    {
      '@type': 'City',
      name: SITE.region,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ciudad de México',
        addressRegion: 'CDMX',
        addressCountry: 'MX',
      },
    },
    ...areaServed().map((z) => ({
      '@type': 'AdministrativeArea',
      name: z.nombre,
      address: {
        '@type': 'PostalAddress',
        addressLocality: z.nombre,
        addressRegion: z.estado,
        addressCountry: 'MX',
      },
    })),
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '19:00',
    },
  ],
})
</script>

<template>
  <HeroSection />
  <BrandsSection />
  <WhySection />
  <ServicesSection />
  <CoverageSection />
  <SchedulingSection />
  <MetodosPagoSection />
  <TestimonialsSection />
  <FaqSection />
</template>