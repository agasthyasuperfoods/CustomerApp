import React from 'react';
import Guestnav from '@/components/Guestnav';
import Gfooter from '@/components/Gfooter';
import Glogin from '@/components/Glogin';


function Gwallet() {
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

export default Gwallet;
