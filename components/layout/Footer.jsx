import { Box, Container } from '@mui/material';
import Link from 'next/link';
export default function Footer() {
  return (
    <Box component="footer" className="bg-white border-t border-gray-100 pt-16 pb-8 mt-20">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Colonne Logo & Texte */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg font-extrabold text-[#2463eb]">Mboloprof</span>
            </div>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
              Fournir des cours de qualité et des services d'enseignement de qualité.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="font-bold text-[15px] text-[#111827] mb-6">Marketplace</h4>
            <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
              <li><a href="#" className="hover:text-[#2463eb]">Trouver un professeur</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-[15px] text-[#111827] mb-6">Support</h4>
            <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
              <li><Link href="/help" className="hover:text-[#2463eb] no-underline">Centre d'assistance</Link></li>
              <li><Link href="/terms" className="hover:text-[#2463eb] no-underline">Conditions d'utilisation</Link></li>
              <li><Link href="/privacy" className="hover:text-[#2463eb] no-underline">Politique de confidentialité</Link></li>            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-[15px] text-[#111827] mb-6">Company</h4>
            <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
              <li><Link href="/about" className="hover:text-[#2463eb] no-underline">A propos</Link></li>
              <li><Link href="/contact" className="hover:text-[#2463eb] no-underline">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Barre du bas : Copyright */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[13px] text-gray-400 font-medium italic">
            © 2026 Mboloprof. Tout droits reservés.
          </p>
          <p className="text-[13px] text-gray-400 font-medium italic">
            Développé par <a href="https://www.linkedin.com/in/moussa-diarra-0b8b3b3b3/" target="_blank" rel="noopener noreferrer">Junior YACOUBAH</a>
          </p>
        </div>
      </Container>
    </Box>
  );
}