import React, { useEffect, useRef } from 'react';
import ImageViewer from '../src/ImageViewer';

export default () => {
  const _ref = useRef();
  useEffect(() => {
    new ImageViewer({
      container: _ref.current,
      srcList: [],
    });
  }, []);

  return <div ref={_ref} style={{ width: '100%', height: '400px' }}></div>;
};
