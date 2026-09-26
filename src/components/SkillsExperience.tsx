import { experience, skills } from "@/data/seed";

export function SkillsExperience() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mt-24 scroll-mt-20">
      <div className="flex items-baseline justify-between">
        <h2 id="skills-heading" className="font-display text-3xl font-bold tracking-tight">
          Skills & Experience
        </h2>
        <span className="font-mono text-xs text-muted">02</span>
      </div>

      <table className="mt-8 w-full border border-border text-sm max-md:block">
        <caption className="sr-only">Skills by category</caption>
        <tbody className="max-md:block">
          {skills.map((s) => (
            <tr
              key={s.category}
              className="border-b border-border transition-colors last:border-b-0 hover:bg-surface max-md:flex max-md:flex-col max-md:gap-1"
            >
              <th
                scope="row"
                className="w-36 px-5 py-4 text-left align-top font-mono text-xs font-normal uppercase tracking-widest text-muted max-md:w-auto max-md:px-4 max-md:pb-0"
              >
                {s.category}
              </th>
              <td className="px-5 py-4 max-md:px-4 max-md:pt-0">
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="mt-6 w-full border border-border text-sm max-md:block">
        <caption className="sr-only">Work experience</caption>
        <tbody className="max-md:block">
          {experience.map((e) => (
            <tr
              key={e.company}
              className="border-b border-border transition-colors last:border-b-0 hover:bg-surface max-md:flex max-md:flex-col max-md:gap-1"
            >
              <td className="w-32 px-5 py-4 align-top font-mono text-xs text-muted max-md:w-auto max-md:px-4 max-md:pb-0">
                {e.period}
              </td>
              <td className="px-5 py-4 align-top max-md:px-4 max-md:py-1">
                <p className="font-medium">{e.role}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">{e.company}</p>
              </td>
              <td className="px-5 py-4 leading-relaxed text-muted max-md:px-4 max-md:pt-1">
                {e.summary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
