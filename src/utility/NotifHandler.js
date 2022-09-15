import {NOTIFDATA, setNotifData} from '../constant/AppConstant';
import NavigationService from '../Navigator/NavigationService';
import routes from '../Navigator/routes';

export const NotifHandler = async () => {
  if (NOTIFDATA.activity_open === 'profile') {
    console.log('cmcmqq', NOTIFDATA);
    setTimeout(() => {
      NavigationService.navigate(routes.Options, {
        callback: () => {
          NavigationService.replace(routes.HomeScreen, {});
        },
      });
      setNotifData(null);
    }, 100);
  }
};
