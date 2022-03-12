import React, { useEffect, useRef } from 'react';
import { Upload } from '../../src/index';

export default () => {
  return (
    <Upload
      action="https://api.vwood.xyz/v1/File/upload"
      listType="picture-card"
      data={{
        bucketName: 'blog',
      }}
      headers={{
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoie1wiVXNlcklEXCI6XCI3ZmJhZDZhZC1iNzM5LTRkYTItYjI2ZC00ZmM4NmI5OTMxYTFcIixcIlBhc3N3b3JkXCI6XCJjNTZkMGU5YTdjY2VjNjdiNGVhMTMxNjU1MDM4ZDYwNFwiLFwiQ3JlYXRlVGltZVwiOjE2NDcwMTMyNDEsXCJEZWFkbGluZVwiOjE2NDk2MDUyNDEsXCJSb2xlXCI6XCJvcGVyYXRvclwifSJ9.BzBwG18RwHJDLmVa8CYYV1XlQ3kuQhLWgL6aOf0RiX4',
        'X-Requested-With': null,
      }}
    />
  );
};
