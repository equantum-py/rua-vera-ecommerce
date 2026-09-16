"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className="grid min-h-screen bg-[#f7f4ef] text-[#201e1c] lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-[#8f8a87] p-14 text-white lg:flex">
        <Link href="/" className="font-serif text-4xl tracking-[-0.05em]">RUA <em className="text-xl font-normal">vera</em></Link>
        <div className="max-w-xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-white/60">Asunción · Paraguay</p>
          <h1 className="font-serif text-6xl leading-[0.98] tracking-[-0.04em]">{isSignUp ? "Creá tu cuenta RUA." : "Volvé a descubrir RUA."}</h1>
          <p className="mt-7 max-w-md text-base leading-7 text-white/70">Moda, lifestyle, diseño y marcas con identidad reunidas en una experiencia curada.</p>
        </div>
        <p className="text-xs text-white/45">© {new Date().getFullYear()} RUA Vera · Asunción, Paraguay</p>
      </section>

      <section className="flex flex-col justify-center px-6 py-12 sm:px-14 lg:px-20">
        <Link href="/" className="mb-12 font-serif text-3xl tracking-[-0.05em] lg:hidden">RUA <em className="text-base font-normal">vera</em></Link>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10 grid grid-cols-2 border border-[#d9d2cb] p-1 text-xs uppercase tracking-[0.12em]">
            <button type="button" onClick={() => setIsSignUp(false)} className={`py-3 ${!isSignUp ? "bg-white" : "text-[#6e6965]"}`}>Ingresar</button>
            <button type="button" onClick={() => setIsSignUp(true)} className={`py-3 ${isSignUp ? "bg-white" : "text-[#6e6965]"}`}>Crear cuenta</button>
          </div>

          <div className="mb-8">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#6e6965]">Mi cuenta</p>
            <h2 className="font-serif text-4xl tracking-[-0.03em]">{isSignUp ? "Crear una cuenta" : "Ingresar a RUA Vera"}</h2>
            <p className="mt-3 text-sm text-[#6e6965]">{isSignUp ? "¿Ya tenés una cuenta? " : "¿Todavía no tenés una cuenta? "}<button type="button" onClick={() => setIsSignUp(!isSignUp)} className="border-b border-[#201e1c] text-[#201e1c]">{isSignUp ? "Ingresar" : "Crear cuenta"}</button></p>
          </div>

          <form className="space-y-5">
            <input type="hidden" name="redirectTo" value="/" />
            {isSignUp && <div><label className="mb-2 block text-xs uppercase tracking-[0.12em]">Nombre completo</label><input name="fullName" type="text" required={isSignUp} placeholder="Tu nombre" className="w-full border border-[#d9d2cb] bg-white px-4 py-4 text-sm outline-none focus:border-[#8f8a87]" /></div>}
            <div><label className="mb-2 block text-xs uppercase tracking-[0.12em]">Correo electrónico</label><input name="email" type="email" required placeholder="tu@email.com" className="w-full border border-[#d9d2cb] bg-white px-4 py-4 text-sm outline-none focus:border-[#8f8a87]" /></div>
            <div>
              <div className="mb-2 flex items-center justify-between"><label className="text-xs uppercase tracking-[0.12em]">Contraseña</label>{!isSignUp && <Link href="/forgot-password" className="text-xs text-[#6e6965] hover:text-[#201e1c]">¿Olvidaste tu contraseña?</Link>}</div>
              <div className="relative"><input name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••" className="w-full border border-[#d9d2cb] bg-white px-4 py-4 pr-12 text-sm outline-none focus:border-[#8f8a87]" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6965]" aria-label="Mostrar contraseña">{showPassword ? <EyeClosed size={17} /> : <Eye size={17} />}</button></div>
            </div>
            {isSignUp && <div><label className="mb-2 block text-xs uppercase tracking-[0.12em]">Confirmar contraseña</label><input name="confirmPassword" type={showPassword ? "text" : "password"} required={isSignUp} placeholder="••••••••" className="w-full border border-[#d9d2cb] bg-white px-4 py-4 text-sm outline-none focus:border-[#8f8a87]" /></div>}
            <Button type="submit" formAction={isSignUp ? signup : login} className="flex w-full items-center justify-center gap-2 rounded-none bg-[#201e1c] py-6 text-[10px] uppercase tracking-[0.18em] text-white hover:bg-[#8f8a87]">{isSignUp ? "Crear cuenta" : "Ingresar"}<ArrowRight size={15} /></Button>
          </form>
          <p className="mt-8 text-center text-xs leading-5 text-[#6e6965]">Al continuar aceptás los <Link href="/terms" className="border-b border-[#6e6965]">Términos</Link> y la <Link href="/privacy" className="border-b border-[#6e6965]">Política de privacidad</Link>.</p>
        </div>
      </section>
    </main>
  );
}
