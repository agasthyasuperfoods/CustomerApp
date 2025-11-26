import Image from 'next/image';

export default function FarmFreshBanner() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 850, // match typical banner width
        margin: '0 auto',
        padding:'1rem',
        borderRadius: '22px',
        overflow: 'hidden',
        boxShadow: '0 4px 18px rgba(55,70,101,.09)',
        background: '#ecedf3'
      }}
    >
      <Image
        src="/mainbanner.png" 
        alt="Agasthya Farm Fresh Products Banner"
        width={890}
        height={368}
        layout="responsive"
        style={{ display: 'block', width: "100%", height: "auto" }}
        priority
      />
    </div>
  );
}
