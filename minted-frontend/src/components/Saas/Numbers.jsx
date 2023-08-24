import { useState, useRef, useEffect } from 'react';
import CountTo from '../CountTo';
import numbers from '@data/Saas/numbers.json';
import numbersRTL from '@data/Saas/numbers-rtl.json';

const Numbers = ({ rtl }) => {
  const numbersSectionRef = useRef(null);
  const [position, setPosition] = useState({ from: 3000, to: 3340 });
  const data = rtl ? numbersRTL : numbers;

  useEffect(() => {
    const numbersSection = numbersSectionRef.current;
    const numbersSectionHeight = numbersSection.offsetHeight;
    const numbersSectionTop = numbersSection.offsetTop;
    
    const Position = { from: numbersSectionTop - numbersSectionHeight - 850, to: numbersSectionTop + numbersSectionHeight };

    setPosition(Position);
  }, []);

  return (
    <section className="numbers style-6" ref={numbersSectionRef}>
      <div className="container">
        <div className="content pb-100 border-1 border-bottom brd-gray">
          <div className="row">
            {
              data.map((number, index) => (
                <div className="col-lg-4" key={index}>
                  <div className="number-card style-6">
                    <h2 className="me-4 color-blue5">
                      <CountTo className="counter" from={0} to={number.value} speed={1500} position={position} />
                      { number.operator && <span> +</span> }
                    </h2>
                    <div className="text">
                      { number.title.part1 } <br /> { number.title.part2 }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Numbers