import React, { useEffect, useState } from 'react';
import { useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import { BottomWrapper } from 'components/styles/BottomWrapper';

function Loader() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const transitions = useTransition(isMounted, null, {
    from: { opacity: 0, transform: 'translateY(110%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(110%)' },
  });

  return transitions.map(
    ({ item, props, key }) =>
      item && (
        <BottomWrapper width={145} style={props} key={key}>
          <FontAwesomeIcon icon={faSpinnerThird} spin={true} fixedWidth={true} />
          &nbsp;Loading...
        </BottomWrapper>
      )
  );
}

export default Loader;
