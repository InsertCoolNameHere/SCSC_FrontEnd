import { useState } from "react";


export default function useXAxis(){


  
   const [defaultValues, setDefaultValues] = useState(
       {
           "tickCount": 5,
           "domain": [0,100], //[min,max] TODO grab from metadata
           "scale": "linear",
           "axis": "x"
       }
   );


   const [domain, setDomain] = useState(defaultValues.domain);
   const [tickCount, setTickCount] = useState(defaultValues.tickCount);
   const [scale, setScale] = useState(defaultValues.scale);


   return {
       defaultValues,
       domain,
       tickCount,
       scale,
       setTickCount: (event) => setTickCount(parseInt(event.target.value)),
       setDomainMin: (event) => setDomain([parseInt(event.target.value), domain[1]]),
       setDomainMax: (event) => setDomain([domain[0], parseInt(event.target.value)]),
       setScale: (event) => setScale(event.target.value)
   }
}
