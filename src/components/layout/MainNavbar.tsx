"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

// Elementos de navegación simples
const simpleNavigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
] as const;

// Sub-items para Programación
const programmingSubItems = [
  { href: "/programacion", label: "Horarios", description: "Ver la programación completa de radio" },
  { href: "/podcasts", label: "Podcasts", description: "Descubre nuestros programas de audio" }
] as const;

export default function MainNavbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  const isProgrammingSection = pathname === "/programacion" || pathname === "/podcasts";

  return (
    <NavigationMenu.Root className="hidden md:block relative" orientation="horizontal">
      <NavigationMenu.List className="flex items-center space-x-1 lg:space-x-2">
        {/* Inicio */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild active={isActive("/")}>
            <Link
              href="/"
              className={`relative px-4 py-2 rounded-xl font-medium text-sm lg:text-base transition-all duration-300 group ${
                isActive("/")
                  ? "text-primary bg-primary/10 font-semibold shadow-sm"
                  : "text-body dark:text-white hover:text-primary hover:bg-primary/5"
              }`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              <span className="relative z-10">Inicio</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* Dropdown de Programación */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger 
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm lg:text-base transition-all duration-300 ${
              isProgrammingSection
                ? "text-primary bg-primary/10 font-semibold shadow-sm"
                : "text-body dark:text-white hover:text-primary hover:bg-primary/5"
            } data-[state=open]:text-primary data-[state=open]:bg-primary/5`}
            aria-current={isProgrammingSection ? "page" : undefined}
          >
            <span className="relative z-10">Programación</span>
            <ChevronDown 
              className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" 
              aria-hidden 
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-52 data-[motion=from-end]:animate-in data-[motion=from-end]:slide-in-from-right-52 data-[motion=to-start]:animate-out data-[motion=to-start]:slide-out-to-left-52 data-[motion=to-end]:animate-out data-[motion=to-end]:slide-out-to-right-52 data-[motion=from-start]:fade-in data-[motion=to-start]:fade-out data-[motion=from-end]:fade-in data-[motion=to-end]:fade-out">
            <div className="grid gap-3">
              {programmingSubItems.map(({ href, label, description }) => (
                <NavigationMenu.Link key={href} asChild active={isActive(href)}>
                  <Link
                    href={href}
                    className={`block p-3 rounded-lg transition-all duration-200 group ${
                      isActive(href)
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-body dark:text-white"
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">
                      {label}
                    </div>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/70">
                      {description}
                    </p>
                  </Link>
                </NavigationMenu.Link>
              ))}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Resto de elementos de navegación simples */}
        {simpleNavigationItems.slice(1).map(({ href, label }) => (
          <NavigationMenu.Item key={href}>
            <NavigationMenu.Link asChild active={isActive(href)}>
              <Link
                href={href}
                className={`relative px-4 py-2 rounded-xl font-medium text-sm lg:text-base transition-all duration-300 group ${
                  isActive(href)
                    ? "text-primary bg-primary/10 font-semibold shadow-sm"
                    : "text-body dark:text-white hover:text-primary hover:bg-primary/5"
                }`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                <span className="relative z-10">{label}</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}