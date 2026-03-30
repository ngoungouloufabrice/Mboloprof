import { Card, CardActions, CardContent } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function AdCard({ ad }) {
  const router = useRouter();
  const handelClick = () => {
    router.push(`/ad/${ad._id}`);
  }
  return (
    <Card className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      {/* Content */}
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="font-bold text-[18px] text-[#111827] group-hover:text-[#2463eb] transition-colors line-clamp-1">
              {ad.title}
            </h1>
            <div className="inline-block px-2.5 py-1 bg-blue-50 text-[#2463eb] text-[11px] font-bold rounded-full mt-1 uppercase tracking-wider">
              {ad.subject?.name || ad.subject}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mb-4 font-medium">
          <LocationOn className="text-[18px] text-gray-400" />
          <span>{ad.city}, {ad.province}</span>
        </div>

        <div className="flex items-center gap-2 mb-6 text-[13px] text-gray-600">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-semibold">{ad.level}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
          <div>
            <span className="text-[12px] text-gray-400 block font-medium">À partir de</span>
            <span className="text-[17px] font-black text-[#111827]">{ad.price?.toLocaleString('fr-FR')} FCFA</span>
            <span className="text-[12px] text-gray-400 font-medium"> /mois</span>
          </div>
        </div>
      </CardContent>

      <CardActions className="p-4 pt-0">
        <button onClick={() => handelClick()} className="w-full bg-[#2463eb] text-white py-3 rounded-xl text-[14px] font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-gray-200">
          Voir l'annonce
        </button>
      </CardActions>
    </Card>
  );
}