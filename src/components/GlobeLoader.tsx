import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const GLOBE_LOTTIE_SRC =
  'https://lottie.host/a6672d00-cc8f-49df-9cda-59474d575a02/vqOb16BER9.lottie';

export function GlobeLoader() {
  return (
    <div className="loader-globe" aria-hidden="true">
      <DotLottieReact
        src={GLOBE_LOTTIE_SRC}
        loop
        autoplay
        renderConfig={{ devicePixelRatio: 2 }}
      />
    </div>
  );
}
