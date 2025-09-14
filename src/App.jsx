import { useEffect, useState } from "react";

// Util: simple hash router
function useHashRoute() {
  const [hash, setHash] = useState(
    () =>
      (typeof window !== "undefined" &&
        window.location.hash.replace("#", "")) ||
      "inicio"
  );
  useEffect(() => {
    const onHash = () =>
      setHash(window.location.hash.replace("#", "") || "inicio");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [
    hash,
    (h) => {
      if (typeof window !== "undefined") window.location.hash = h;
    },
  ];
}

// Reusable UI bits
const Section = ({ title, subtitle, children, right }) => (
  <section className="py-14 lg:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
      <div>
        {title ? (
          <>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
          </>
        ) : null}
        <div className={title ? "mt-8" : ""}>{children}</div>
      </div>
      <aside className="lg:sticky lg:top-20 space-y-4">{right}</aside>
    </div>
  </section>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border bg-white shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">
    {children}
  </span>
);

// Dropdown
const Menu = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(!open)}
        className="hover:text-emerald-700 font-medium"
      >
        {label}
      </button>
      {open && (
        <div className="absolute mt-2 w-64 rounded-2xl border bg-white shadow-lg p-2 z-50">
          {items.map((it) => (
            <a
              key={it.hash}
              href={`#${it.hash}`}
              className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-sm"
            >
              {it.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default function KallariSite() {
  const [route] = useHashRoute();

  // ACTUALIDAD sidebar
  const Actualidad = (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold">ACTUALIDAD</h3>
        <p className="mt-1 text-sm text-slate-600">
          Novedades, convocatorias y publicaciones.
        </p>
      </Card>
      <Card>
        <h4 className="font-semibold">Blog</h4>
        <ul className="mt-2 text-sm space-y-2">
          <li>
            <a className="hover:underline" href="#blog">
              5 acciones de resiliencia climática en Caylloma →
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#blog">
              Salud Oral 60+: prótesis y prevención →
            </a>
          </li>
        </ul>
      </Card>
      <Card>
        <h4 className="font-semibold">Sala de prensa</h4>
        <ul className="mt-2 text-sm space-y-2">
          <li>Nota: Alianza con UGEL Caylloma</li>
          <li>Reporte trimestral de impacto</li>
        </ul>
      </Card>
      <Card>
        <h4 className="font-semibold">Podcast y videos</h4>
        <p className="mt-2 text-sm text-slate-600">
          Historias de comunidad y episodios de seguridad escolar.
        </p>
      </Card>
      <Card>
        <h4 className="font-semibold">Revista</h4>
        <p className="mt-2 text-sm">Próxima edición: "Escuela Segura 360°"</p>
      </Card>
    </div>
  );

  // HOME
  const Home = (
    <div>
      {/* Hero con imagen de portada (portada.png) */}
      <section
        id="inicio-hero"
        className="relative h-[600px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/portada.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Comunidades que prosperan con educación, salud y resiliencia
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-200">
            Intervenimos en Arequipa y La Libertad con programas 360°: escuelas
            seguras, salud bucal para adultos mayores, discapacidad e inclusión,
            resiliencia climática y desarrollo económico local.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="#proyectos"
              className="rounded-xl px-6 py-3 bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700"
            >
              Ver proyectos
            </a>
            <a
              href="#involucrate"
              className="rounded-xl px-6 py-3 border border-white text-white font-semibold hover:bg-white/10"
            >
              Involúcrate
            </a>
            <a
              href="#dona"
              className="rounded-xl px-6 py-3 border border-white text-white font-semibold hover:bg-white/10"
            >
              Dona
            </a>
          </div>
        </div>
      </section>

      {/* Aliados */}
      <Section
        title="Alianzas"
        subtitle="Trabajamos en red con instituciones públicas, privadas y comunitarias."
        right={<div />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {[
            { alt: "APRAD", src: "/alianzas/aprad.png" },
            { alt: "Fundación Valore", src: "/alianzas/valore.jpg" },
            { alt: "Priority Safety Perú", src: "/alianzas/priority.jpg" },
            { alt: "CETPAR", src: "/alianzas/cetpar.jpg" },
            { alt: "Kallari", src: "/alianzas/kallari.png" },
          ].map((l, i) => (
            <div
              key={i}
              className="aspect-[3/1] rounded-xl border grid place-content-center bg-white p-2"
            >
              <img src={l.src} alt={l.alt} className="max-h-12 object-contain" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  // SOBRE NOSOTROS (título reemplazado por imagen, contenido original intacto)
  const SobreNosotros = (
    <Section title="" subtitle="" right={Actualidad}>
      <div className="space-y-8">
        {/* Aquí va la imagen que reemplaza el título */}
        <img
          src="/sobre-nosotros.png"
          alt="Sobre Nosotros — Kallari"
          className="w-full rounded-2xl shadow-lg"
        />

        <Card>
          <h3 className="font-semibold">Quiénes somos</h3>
          <p className="mt-2 text-sm text-slate-600">
En Kallari — Asociación Civil, somos una organización sin fines de lucro comprometida con el desarrollo integral y sostenible de las comunidades del Perú, con énfasis en las regiones de Arequipa y La Libertad. Nuestro propósito es construir entornos más justos, seguros y resilientes a través de programas que integran educación, salud, inclusión social, equidad de género, prevención de riesgos y desarrollo económico local.
Creemos que el cambio duradero solo es posible si se trabaja desde un enfoque 360°, involucrando a estudiantes, docentes, familias, instituciones públicas, organizaciones privadas y a la comunidad en general. Por eso, nuestros proyectos están diseñados para fortalecer capacidades locales, fomentar la participación activa y garantizar la sostenibilidad a largo plazo.
Nuestros ejes de acción:
•	Educación segura y de calidad: En Alianza con la Fundación Valore, instituciones públicas y privadas, implementamos el Sistema de Gestión en Seguridad y Salud en el Trabajo (Ley 29783) en instituciones educativas, promoviendo una Cultura de Prevención 360° que implica no solo la seguridad y salud en la comunidad educativa, también la lucha contra el bullyng y el hostigamiento sexual y laboral a través de patrullas escolares, formación docente y entornos de aprendizaje inclusivos.
•	Salud y bienestar comunitario: desarrollamos el programa “Salud Oral 60+”, que brinda atención odontológica integral, prevención y prótesis dentales para adultos mayores en situación de vulnerabilidad.
•	Inclusión y discapacidad: En convenio con Asociación Peruana de Rehabilitación y Asistencia a las personas con Discapacidad APRAD, impulsamos el Centro de Desarrollo Inclusivo, con talleres de capacitación productiva en joyería, panadería, carpintería, metalmecánica y otras áreas, para promover la autonomía y la empleabilidad de personas con discapacidad.
•	Equidad de género y prevención de la violencia: trabajamos con escuelas, familias y comunidades para integrar un enfoque de género, prevenir el acoso escolar y laboral, y generar espacios de respeto e igualdad de oportunidades.
•	Resiliencia climática y gestión de riesgos: implementamos sistemas comunitarios de alerta temprana, capacitación en gestión de riesgos, gestión inteligente del agua y adaptación al cambio climático, especialmente en el Geoparque Colca y Volcanes de Andagua (UNESCO).
•	Empoderamiento y emprendimiento local: fortalecemos cadenas de valor con identidad territorial, promoviendo el turismo responsable a través del Geoturismo y desarrollando la marca “Geoproducto Solidario” como fuente de ingresos para mujeres y jóvenes emprendedores.
•	Amazonía para el Futuro: apoyamos la educación ambiental, la vigilancia comunitaria, el desarrollo económico sostenible y sobre todo el empoderamiento y liderazgo de jóvenes y mujeres en zonas de alta biodiversidad.
          </p>
        </Card>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h4 className="font-semibold">Misión y valores</h4>
            <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-slate-600">
              <li>Promover bienestar y oportunidades para todas las personas.</li>
              <li>Trabajo colaborativo con instituciones locales.</li>
              <li>Transparencia, respeto e igualdad.</li>
            </ul>
          </Card>
          <Card>
            <h4 className="font-semibold">Nuestros objetivos</h4>
            <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-slate-600">
              <li>Escuelas con SG-SST y cultura de prevención 360°.</li>
              <li>Atención de salud bucal a adultos mayores vulnerables.</li>
              <li>Inclusión y empleabilidad de personas con discapacidad.</li>
            </ul>
          </Card>
          <Card>
            <h4 className="font-semibold">Nuestro equipo</h4>
            <p className="mt-2 text-sm text-slate-600">
              Red interdisciplinaria de educadores, profesionales de salud,
              ingenieros, gestores sociales y voluntariado.
            </p>
          </Card>
        </div>
        <Card>
          <h4 className="font-semibold">Nuestras alianzas</h4>
          <p className="mt-2 text-sm text-slate-600">
            APRAD, Fundación Valore, Priority Safety Perú, CETPAR, UGEL
            Caylloma, SENAMHI, INGEMMET, entre otras.
          </p>
        </Card>
      </div>
    </Section>
  );

  // PROYECTOS
  const Proyectos = (
    <Section
      title="Proyectos"
      subtitle="Líneas programáticas y carteras activas"
      right={Actualidad}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            t: "Proyectos Educativos",
            d: "SG-SST escolar (Ley 29783), patrullas, materiales pedagógicos, simulacros y formación docente.",
          },
          {
            t: "Proyectos de Salud",
            d: "Salud Oral 60+: prevención, prótesis, campañas y atención domiciliaria en zonas rurales y urbanas.",
          },
          {
            t: "Discapacidad",
            d: "Centro de Desarrollo Inclusivo y talleres productivos: joyería, panadería, carpintería, metalmecánica.",
          },
          {
            t: "Equidad e Igualdad de Género",
            d: "Prevención de violencia y acoso laboral/sexual, enfoque de género en escuelas y comunidades.",
          },
          {
            t: "Desastres y Resiliencia",
            d: "Sistemas comunitarios de alerta temprana, gestión de riesgo y anticipación.",
          },
          {
            t: "Empoderamiento y Emprendimiento",
            d: "Cadenas de valor local y “Gema Solidaria” para turismo responsable.",
          },
          {
            t: "Cambio Climático",
            d: "Gestión inteligente del agua/sequías, capacitación en datos y sensores.",
          },
          {
            t: "Amazonía para el Futuro",
            d: "Educación ambiental, vigilancia comunitaria y economía sostenible con identidad local.",
          },
        ].map((p) => (
          <Card key={p.t}>
            <Pill>Programa</Pill>
            <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
            <p className="mt-2 text-sm text-slate-600">{p.d}</p>
            <a
              href="#contactos"
              className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline"
            >
              Quiero saber más →
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );

  // TRANSPARENCIA
  const Transparencia = (
    <Section
      title="Transparencia"
      subtitle="Rendición de cuentas y cumplimiento"
      right={Actualidad}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-semibold">Rendición de cuentas</h4>
          <p className="mt-2 text-sm text-slate-600">
            Reportes trimestrales de ejecución y resultados, indicadores clave e
            hitos por programa.
          </p>
          <a
            className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline"
            href="#"
          >
            Ver reportes →
          </a>
        </Card>
        <Card>
          <h4 className="font-semibold">Memoria anual</h4>
          <p className="mt-2 text-sm text-slate-600">
            Síntesis de impacto, aprendizajes y proyección.
          </p>
          <a
            className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline"
            href="#"
          >
            Descargar PDF →
          </a>
        </Card>
        <Card>
          <h4 className="font-semibold">Compliance</h4>
          <p className="mt-2 text-sm text-slate-600">
            Políticas de integridad, anticorrupción, protección de datos y salvaguardas.
          </p>
        </Card>
        <Card>
          <h4 className="font-semibold">Canal de denuncias</h4>
          <p className="mt-2 text-sm text-slate-600">
            Mecanismo confidencial para alertar incumplimientos éticos o de seguridad.
          </p>
          <a
            className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline"
            href="#"
          >
            Completar formulario →
          </a>
        </Card>
      </div>
    </Section>
  );

  // INVOLÚCRATE
  const Involucrate = (
    <Section
      title="Involúcrate"
      subtitle="Tu apoyo multiplica el impacto"
      right={Actualidad}
    >
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            t: "Voluntariado",
            d: "Participa en campañas, formación y operaciones de campo.",
          },
          { t: "Padrinazgo", d: "Apoya equipamiento, prótesis y materiales educativos." },
          { t: "¿Tienes un proyecto?", d: "Propón alianzas y pilotos en tu comunidad." },
        ].map((x) => (
          <Card key={x.t}>
            <h4 className="font-semibold">{x.t}</h4>
            <p className="mt-2 text-sm text-slate-600">{x.d}</p>
            <a
              className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline"
              href="#contactos"
            >
              Contactar →
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );

  // DONA
  const Dona = (
    <Section title="Dona" subtitle="Transparencia y trazabilidad de aportes" right={Actualidad}>
      <Card>
        <ul className="text-sm space-y-2">
          <li>• Cuenta para donaciones nacionales (placeholder)</li>
          <li>• Donaciones internacionales (SWIFT/IBAN) (placeholder)</li>
          <li>• Recibos y beneficios tributarios (si aplica)</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="rounded-xl bg-emerald-600 text-white font-semibold px-5 py-3 shadow hover:bg-emerald-700"
            href="#contactos"
          >
            Quiero donar
          </a>
          <a
            className="rounded-xl border font-semibold px-5 py-3 hover:bg-slate-50"
            href="#transparencia"
          >
            Ver transparencia
          </a>
        </div>
      </Card>
    </Section>
  );

  // CONTACTOS (con Formspree)
  const Contactos = (
    <Section title="Contactos" subtitle="Estamos atentos a nuevas alianzas" right={Actualidad}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <form
            action="https://formspree.io/f/xandkdol"
            method="POST"
            className="grid grid-cols-1 gap-4"
          >
            <input
              className="rounded-xl border px-4 py-3"
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              required
            />
            <input
              className="rounded-xl border px-4 py-3"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
            />
            <textarea
              className="rounded-xl border px-4 py-3 min-h-[120px]"
              name="mensaje"
              placeholder="Cuéntanos sobre tu propuesta"
              required
            />
            <button
              type="submit"
              className="rounded-xl px-5 py-3 bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
            >
              Enviar
            </button>
            <p className="text-xs text-slate-500">
              También disponible por WhatsApp y correo institucional.
            </p>
          </form>
        </Card>
        <Card>
          <h4 className="font-semibold">Sedes y ámbito</h4>
          <p className="mt-2 text-sm text-slate-600">
            Arequipa (Caylloma / Colca) • La Libertad (La Esperanza)
          </p>
          <div className="mt-4 aspect-video rounded-2xl overflow-hidden ring-1 ring-slate-200">
            <img
              alt="Mapa"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1535448588105-9e5a9c4b9078?q=80&w=1200&auto=format&fit=crop"
            />
          </div>
        </Card>
      </div>
    </Section>
  );

  // route map
  const routes = {
    inicio: Home,
    "sobre-nosotros": SobreNosotros,
    proyectos: Proyectos,
    transparencia: Transparencia,
    involucrate: Involucrate,
    dona: Dona,
    contactos: Contactos,
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/kallari-logo.png"
              alt="Kallari logo"
              className="h-10 w-auto object-contain flex-shrink-0"
            />
            <div className="leading-tight">
              <p className="font-semibold">KALLARI</p>
              <p className="text-xs text-slate-500">Asociación Civil • Perú</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#inicio" className="hover:text-emerald-700">
              Inicio
            </a>
            <Menu
              label="Sobre nosotros"
              items={[
                { title: "Quiénes somos", hash: "sobre-nosotros" },
                { title: "Misión y valores", hash: "sobre-nosotros" },
                { title: "Nuestros objetivos", hash: "sobre-nosotros" },
                { title: "Nuestro equipo", hash: "sobre-nosotros" },
                { title: "Nuestras alianzas", hash: "sobre-nosotros" },
              ]}
            />
            <Menu
              label="Proyectos"
              items={[
                { title: "Educativos", hash: "proyectos" },
                { title: "Salud", hash: "proyectos" },
                { title: "Discapacidad", hash: "proyectos" },
                { title: "Equidad de género", hash: "proyectos" },
                { title: "Desastres y resiliencia", hash: "proyectos" },
                { title: "Emprendimiento", hash: "proyectos" },
                { title: "Cambio climático", hash: "proyectos" },
                { title: "Amazonía para el Futuro", hash: "proyectos" },
              ]}
            />
            <Menu
              label="Transparencia"
              items={[
                { title: "Rendición de cuentas", hash: "transparencia" },
                { title: "Memoria anual", hash: "transparencia" },
                { title: "Compliance", hash: "transparencia" },
                { title: "Canal de denuncias", hash: "transparencia" },
              ]}
            />
            <Menu
              label="Involúcrate"
              items={[
                { title: "Voluntariado", hash: "involucrate" },
                { title: "Padrinazgo", hash: "involucrate" },
                { title: "¿Tienes un proyecto?", hash: "involucrate" },
              ]}
            />
            <a href="#dona" className="hover:text-emerald-700">
              Dona
            </a>
            <a href="#contactos" className="hover:text-emerald-700">
              Contactos
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#dona"
              className="rounded-2xl px-4 py-2 bg-emerald-600 text-white text-sm font-semibold shadow-sm hover:bg-emerald-700"
            >
              Donar
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      {routes[route] || Home}

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} KALLARI — Asociación Civil
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#transparencia" className="hover:text-emerald-700">
              Transparencia
            </a>
            <a href="#" className="hover:text-emerald-700">
              Privacidad
            </a>
            <a href="#" className="hover:text-emerald-700">
              Términos
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}