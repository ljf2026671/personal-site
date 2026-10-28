import { profile } from '../content'

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1483ff1f] py-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="font-mono-tech">
          © {new Date().getFullYear()} <span className="text-slate-300">{profile.enName}</span> · EE·LAB
        </div>
        <div className="flex gap-5">
          <a href={profile.socials.github} className="hover:text-cyan-300">GitHub</a>
          <a href={profile.socials.gitee} className="hover:text-cyan-300">Gitee</a>
          <a href={profile.socials.csdn} className="hover:text-cyan-300">CSDN</a>
          <a href={profile.socials.email} className="hover:text-cyan-300">Email</a>
        </div>
      </div>
    </footer>
  )
}
