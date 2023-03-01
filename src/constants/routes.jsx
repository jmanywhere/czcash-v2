import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

import Czog from '../pages/Czog';
import CzusdNotes from '../pages/CzusdNotes';
import FairLaunch from '../pages/FairLaunch';
import FairTribes from '../pages/FairTribes';
import Liquidity from '../pages/Liquidity';
import NftLaunch from '../pages/NftLaunch';
import NftPools from '../pages/NftPools';
import OneBadRabbit from '../pages/OneBadRabbit';
import Pools from '../pages/Pools';
import Rewards from '../pages/Rewards';
import Swap from '../pages/Swap';
import Ustsd from '../pages/Ustsd';

export const MENU_HOME = [
  {
    title: 'Trade',
    route: '/trade',
    icon: <CurrencyExchangeIcon />,
    pages: [
      {
        title: 'Swap',
        route: '/swap',
        component: <Swap />,
      },
      {
        title: 'Liquidity',
        route: '/liquidity',
        component: <Liquidity />,
      },
    ],
  },
  {
    title: 'Stake',
    route: '/stake',
    icon: <SavingsOutlinedIcon />,
    pages: [
      {
        title: 'High Yield Pools',
        route: '/pools',
        component: <Pools />,
      },
      {
        title: 'NFT Stash',
        route: '/nft-pools',
        component: <NftPools />,
      },
      {
        title: 'Stable Interest',
        route: '/czusd-notes',
        component: <CzusdNotes />,
      },
    ],
  },
  {
    title: 'Collect',
    route: '/collect',
    icon: <CollectionsOutlinedIcon />,
    pages: [
      {
        title: 'Silver Dollars',
        route: '/ustsd',
        component: <Ustsd />,
      },
      {
        title: 'Bad Rabbits',
        route: '/1bad',
        component: <OneBadRabbit />,
      },
      {
        title: 'CZ Originals',
        route: '/czog',
        component: <Czog />,
      },
    ],
  },
  {
    title: 'Refer',
    route: '/refer',
    icon: <PeopleOutlineOutlinedIcon />,
    pages: [
      {
        title: 'Refer To Earn',
        route: '/rewards',
        component: <Rewards />,
      },
    ],
  },
  {
    title: 'Launch',
    route: '/launch',
    icon: <RocketLaunchOutlinedIcon />,
    pages: [
      {
        title: 'View Launches',
        route: '/view',
        component: <FairTribes />,
      },
      {
        title: 'Fair Token Launch',
        route: '/token',
        component: <FairLaunch />,
      },
      {
        title: 'NFT Launch',
        route: '/nft',
        component: <NftLaunch />,
      },
    ],
  },
];
