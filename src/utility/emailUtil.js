import emailProviders from 'email-providers/all.json';
import {Linking} from 'react-native';
import parser from 'tld-extract';

export const isPersonalEmail = email => {
  // 2. Extract the domain
  if (!email) return;
  const broken = email.split('@');
  const address = `http://${broken[broken.length - 1]}`;
  const {domain} = parser(address);

  // 3. And check!
  return emailProviders.includes(domain);
};

export const openEmail = email => Linking.openURL(`mailto:${email}`);
