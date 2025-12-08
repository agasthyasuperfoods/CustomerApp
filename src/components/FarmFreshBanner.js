import Image from 'next/image';

export default function FarmFreshBanner() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 850, // match typical banner width
        margin: '0 auto',
        padding:'8px',
        borderRadius: '22px',
        overflow: 'hidden',
        boxShadow: '0 4px 18px rgba(55,70,101,.09)',
        background: '#ecedf3'
      }}
    >
      <Image
        src="/banner.webp" 
        alt="Agasthya Farm Fresh Products Banner"
        width={890}
        height={368}
        className="object-cover"  
        style={{ display: 'block',borderRadius:"20px", width: "100%", height: "auto" }}
        priority
      />
    </div>
  );
}