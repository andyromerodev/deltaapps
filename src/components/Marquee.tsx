import { useLanguage } from '../i18n/LanguageContext'

export default function Marquee() {
  const { t } = useLanguage()

  const renderItems = (copy: string) =>
    t.marquee.map((item) => (
      <span key={`${copy}-${item}`} className="flex items-center gap-8 whitespace-nowrap">
        <span className="font-display text-lg text-ink/40">{item}</span>
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Δ
        </span>
      </span>
    ))

  return (
    <div
      className="marquee-shell relative overflow-hidden border-y border-ink/10 py-5 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      aria-hidden
    >
      <div className="marquee-track">
        <div className="marquee-set">{renderItems('primary')}</div>
        <div className="marquee-set marquee-set-duplicate">{renderItems('duplicate')}</div>
      </div>
    </div>
  )
}
