import { useTheme } from '@emotion/react';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { LINK_TELEGRAM, LINK_TWITTER } from '../../constants/links';

export default function UnderConstruction({ label }) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.text.primary,
          paddingBottom: '5em',
        }}
      >
        <Typography
          as="h2"
          sx={{
            fontSize: '2em',
            paddingTop: '2em',
            color: theme.palette.secondary.light,
          }}
        >
          👷‍♀️👷‍♂️ Devs Building
          <br />
          The Future!
          <br />
        </Typography>
        <Typography as="h3">Coding Up: {label}</Typography>
        <Box
          as="img"
          src="./images/clips/devatwork.png"
          sx={{ maxWidth: '100%', marginTop: '1em', width: 360 }}
        />
        <Typography as="p">
          Are you ready to join the CZ.Cash construction crew? The Devs are hard
          at work building the next big thing and you are invited!
          <br />
          <br />
          So follow us on{' '}
          <Link href={LINK_TWITTER} color="accent.light" target="_blank">
            <TwitterIcon
              color="accent"
              sx={{ height: '0.6em', width: '0.6em' }}
            />
            Twitter
          </Link>{' '}
          and join our{' '}
          <Link href={LINK_TELEGRAM} color="accent.light">
            <TelegramIcon
              color="accent"
              sx={{ height: '0.6em', width: '0.6em' }}
            />
            Telegram
          </Link>{' '}
          group to get all the updates on the project's progress!
          <br />
          <br />
          Don't miss out on the fun and excitement - let's build the future
          together! 🚀
          <br />
          <br />
          🌒 Do it before The Future arrives! 🌒
          <br />
          Follow{' '}
          <Link href={LINK_TWITTER} color="accent.light" target="_blank">
            <TwitterIcon
              color="accent"
              sx={{ height: '0.6em', width: '0.6em' }}
            />
            Twitter
          </Link>{' '}
          and chat on{' '}
          <Link href={LINK_TELEGRAM} color="accent.light">
            <TelegramIcon
              color="accent"
              sx={{ height: '0.6em', width: '0.6em' }}
            />
            Telegram
          </Link>{' '}
          NOW!!
        </Typography>
      </Box>
    </>
  );
}
