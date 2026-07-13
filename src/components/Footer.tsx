import { useLanguage } from '../i18n/LanguageContext'
import LogoMark from './Logo'

// lucide-react ya no incluye iconos de marcas; se usan abreviaturas de texto
const socials = [
  { label: 'Instagram', href: '#', abbr: 'IG' },
  { label: 'LinkedIn', href: '#', abbr: 'in' },
  { label: 'GitHub', href: '#', abbr: 'GH' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="flex items-center justify-center gap-2 font-display font-bold tracking-[0.18em] md:justify-start">
            <LogoMark className="size-5" />
            DELTA APPS
          </p>
          <p className="mt-2 text-sm text-ink/50">{t.footer.tagline}</p>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ label, href, abbr }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-full border border-ink/10 text-sm font-semibold text-ink/60 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:text-accent"
            >
              {abbr}
            </a>
          ))}
        </div>
      </div>
      <p className="border-t border-ink/5 py-4 text-center text-xs text-ink/40">
        © {new Date().getFullYear()} DeltaApps. {t.footer.rights}
      </p>
    </footer>
  )
}
