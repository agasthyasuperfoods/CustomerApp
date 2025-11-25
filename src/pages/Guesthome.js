import Gfooter from '@/components/Gfooter'
import Guestnav from '@/components/Guestnav'
import PopularDeliveryPlaces from '@/components/PopularDeliveryPlaces'
import Productcard from '@/components/Productcard'
import React from 'react'

function Guesthome() {
  return (
    <div>

<Guestnav />   
<Productcard />
<PopularDeliveryPlaces />
<Productcard />
<Productcard />

<Gfooter />
 </div>
  )
}

export default Guesthome
