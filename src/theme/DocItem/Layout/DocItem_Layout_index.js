import React from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import SyncButton from '@site/src/components/SyncButton';

export default function DocItemLayoutWrapper(props) {
  return (
    <>
      <DocItemLayout {...props} />
      <SyncButton />
    </>
  );
}
