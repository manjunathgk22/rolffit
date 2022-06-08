import {Text} from 'native-base';
import React from 'react';
import {useEffect, useState} from 'react/cjs/react.production.min';

function AppView() {
  const [render, setrender] = useState(true);
  return render ? <Text>sadasd</Text> : null;
}

export default AppView;
