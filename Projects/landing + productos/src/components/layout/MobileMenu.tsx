"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { navigation } from "@/config/navigation";
import { company } from "@/data/company";
import { getTelHref } from "@/lib/contact";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-x-4 top-16 rounded-2xl border border-neutral-200 bg-white p-3 shadow-2xl shadow-neutral-950/10 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="min-h-12 rounded-xl px-4 py-3 text-base font-medium text-neutral-800 transition hover:bg-neutral-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={getTelHref()}
            className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 text-sm font-semibold text-white"
          >
            <Phone size={17} aria-hidden="true" />
            {company.phoneDisplay}
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
