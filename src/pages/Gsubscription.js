import React from 'react';
import Image from 'next/image';
import Guestnav from '@/components/Guestnav';
import Gfooter from '@/components/Gfooter';
import Glogin from '@/components/Glogin';
import SubscriptionPage from '@/components/sub';



function Gsubscription() {
  return (
    <div>
      {/* Fixed header */}
      <Guestnav />
      {/* Fixed+centered content */}
   <SubscriptionPage />
      {/* Fixed footer */}
      <Gfooter />
    </div>
  );
}

export default Gsubscription;
