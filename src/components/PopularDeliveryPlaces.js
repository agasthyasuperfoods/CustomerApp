import Image from 'next/image';

const PLACES = [
  { name: "Manikonda",     img: "/manikonda.jpg" },
  { name: "Narsing",       img: "/narsingi.jpg" },
  { name: "Chitrapuri",    img: "/chitrapuri.jpg" },
  { name: "Jubilee Hills", img: "/Jubilee_hills.jpg" },
  { name: "OU Colony",     img: "/ou.jpg" }
];

export default function PopularDeliveryPlaces() {
  return (
    <section
      className="
        mt-6 mb-4 mx-2
        rounded-3xl bg-white shadow-lg 
        p-4
        flex flex-col gap-2
        "
      style={{
        borderRadius: '26px',
        boxShadow: '0 6px 24px 0 rgba(55,70,101,.09)',
      }}
    >
      <div className="flex items-start justify-between mb-1">
        <span className="text-lg font-semibold text-gray-900">We Deliver Here</span>
        <button className="text-amber-600 text-sm font-semibold hover:underline">Show all</button>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pt-1 pb-2">
        {PLACES.map((p) => (
          <div key={p.name} className="flex flex-col items-center min-w-[75px]">
            <div
              className="overflow-hidden rounded-2xl shadow-sm bg-slate-50"
              style={{
                width: 62,
                height: 62,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: "18px",
                background: "#f8fafc"
              }}
            >
              <Image
                src={p.img}
                alt={p.name}
                width={62}
                height={62}
                style={{
                  objectFit: 'cover',
                  width: "62px",
                  height: "62px",
                  borderRadius: "18px"
                }}
              />
            </div>
            <span className="mt-2 text-xs font-semibold text-gray-900">{p.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
