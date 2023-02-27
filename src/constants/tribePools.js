import { utils } from 'ethers';
const { parseEther } = utils;

export const TRIBE_POOLS = [
    {
        address: "0x73e203e23785bcd6bd060a4a0a40de4c36ce20bb",
        wrapperAddress: "0xd06217a2d18c2b26fae3e649cd2de133f573ab43",
        rewardAssetName: "DGOD",
        feeBasis: 1498
    },
    {
        address: "0x0f03a13620c9b87b5eee6ca99aa9c76bafd41a26",
        wrapperAddress: "0x003cccc78ebe57c6dcd57e4c49b24d7dec074893",
        rewardAssetName: "DGOD",
        feeBasis: 998,
        lrtDuty: parseEther("50")
    },
    {
        address: "0x7741f33db7f3a7322a167200a6f191f3cdfeb704",
        wrapperAddress: "0x989d7c902c1c33af1a6018b6f2713c49c5052677",
        rewardAssetName: "GEM",
        feeBasis: 1498
    },
    {
        address: "0x27dbaa53afdc7e6f0eff9c1fe07a8d01e5e93139",
        wrapperAddress: "0xf24ee6519c14d60e8b97ef802f5fac53d323e7fc",
        rewardAssetName: "GEM",
        feeBasis: 998,
        lrtDuty: parseEther("50")
    },
    {
        address: "0x5f5f82503d54b70190afca003C4B4D81080117aD",
        wrapperAddress: "0x770Ca266f6eFf94880e60D4276fE708FF498a61F",
        rewardAssetName: "LSDT",
        feeBasis: 1498
    },
    {
        address: "0x11509E61BA6069A2EF67A30BAA1878b9E7248375",
        wrapperAddress: "0xBeFE5F7c282c9Cb5A333892E2e600b28d80699c7",
        rewardAssetName: "LSDT",
        feeBasis: 998,
        lrtDuty: parseEther("50")
    }

];