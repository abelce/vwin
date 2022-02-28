import React, { useEffect, useRef } from 'react';
import ImageViewer from '../../src/ImageViewer';

export default () => {
  const _ref = useRef();
  useEffect(() => {
    new ImageViewer({
      container: _ref.current,
      srcList: ['https://static.vwood.xyz/blog/WX20211217-215252@2x.png'],
    });
  }, []);

  return <div ref={_ref} style={{ width: '100%', height: '400px' }}></div>;
};
