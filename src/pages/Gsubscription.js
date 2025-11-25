import React from 'react';
import Image from 'next/image';
import Guestnav from '@/components/Guestnav';
import Gfooter from '@/components/Gfooter';
import Glogin from '@/components/Glogin';



function Gsubscription() {
  return (
    <div>
      {/* Fixed header */}
      <Guestnav />
      {/* Fixed+centered content */}
      <Glogin />
      {/* Fixed footer */}
      <Gfooter />
    </div>
  );
}

export default Gsubscription;
