import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

import CzusdNotes from '../pages/CzusdNotes';
import FairLaunch from '../pages/FairLaunch';
import FairTribes from '../pages/FairTribes';
import Liquidity from '../pages/Liquidity';
import NftLaunch from '../pages/NftLaunch';
import NftPools from '../pages/NftPools';
import NftTrade from '../pages/NftTrade';
import Pools from '../pages/Pools';
import Rewards from '../pages/Rewards';
import Swap from '../pages/Swap';

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
      {
        title: 'NFTs',
        route: '/nft',
        component: <NftTrade />,
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
