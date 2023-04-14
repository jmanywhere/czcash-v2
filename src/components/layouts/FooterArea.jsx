import { Box, Button, Container, Stack, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { LINK_PRIVACY_POLICY, LINK_TERMS_OF_USE } from '../../constants/links';
import MenuLinkSocialIcon from '../styled/MenuLinkSocialIcon';

export default function FooterArea() {
  const theme = useTheme();
  const bp = theme.breakpoints.values;
  const mq = (bp) => `@media (min-width: ${bp}px)`;
  return (
    <>
      <Box
        css={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.secondary,
          padding: '100px 0px',
          width: '100%',
        }}
      >
        <Container>
          <Grid2
            container
            justifyContent="center"
            alignItems="center"
            rowSpacing={3}
            columnSpacing={3}
            maxWidth={1440}
          >
            <Grid2
              item
              tem
              xs={12}
              sm={4}
              css={{
                textAlign: 'left',
              }}
            >
              <a href="./">
                <img
                  src="./images/logo-colored.png"
                  alt="CZ.CASH"
                  width={180}
                  height="auto"
                />
              </a>
            </Grid2>
            <Grid2
              item
              xs={12}
              sm={8}
              css={{
                [mq(bp.xs)]: { textAlign: 'center' },
                [mq(bp.sm)]: { textAlign: 'right' },
              }}
            >
              <Stack
                direction="row"
                spacing={4}
                alignItems="center"
                justifyContent="flex-end"
              >
                <MenuLinkSocialIcon
                  href="https://twitter.com/zodiacs_c"
                  src="./images/icons/Twitter-Blue-Light.svg"
                  alt="Twitter"
                  width={30}
                  height={25}
                />
                <MenuLinkSocialIcon
                  href="https://t.me/CZodiacofficial"
                  src="./images/icons/TG-Blue-Light.svg"
                  alt="Telegram"
                  width={27}
                  height={23}
                />
                <MenuLinkSocialIcon
                  href="https://czodiac.medium.com/"
                  src="./images/icons/Medium-Blue-Light.svg"
                  alt="Medium"
                  width={30}
                  height={25}
                />
                <MenuLinkSocialIcon
                  href="https://github.com/chinese-zodiac"
                  src="./images/icons/Github-Blue-Light.svg"
                  alt="Github"
                  width={30}
                  height={25}
                />
                <MenuLinkSocialIcon
                  href="https://discord.gg/Tg9JFQxzbs"
                  src="./images/icons/Discord-Blue-Light.svg"
                  alt="Discord"
                  width={30}
                  height={25}
                />
              </Stack>
            </Grid2>
            <Grid2 item xs={12}>
              <h1>Terms of Use</h1>
            </Grid2>
            <Grid2 item xs={12}>
              <p>
                By accessing any CZODIAC website, including but not limited to
                CZODIAC's decentralized applications and services, and engaging
                in any activities related to the CZODIAC ecosystem, including
                buying, selling, trading, holding CZODIAC tokens, or
                participating in the CZODIAC community, users acknowledge that
                they have read, understood, and agreed to be bound by the terms
                and conditions set forth in CZODIAC's Terms of Use. The Terms of
                Use, available at{' '}
                <a css={{ color: 'lime' }} href={LINK_TERMS_OF_USE}>
                  {LINK_TERMS_OF_USE}
                </a>
                , constitute a legally binding agreement between users and
                CZODIAC, and users should review them carefully before engaging
                in any activities related to the CZODIAC ecosystem. If users do
                not agree to the terms and conditions set forth in the Terms of
                Use, they should not access or use CZODIAC's websites, dapps,
                tokens, or other offerings. By using any CZODIAC website, users
                represent and warrant that they have the legal capacity to enter
                into a binding agreement with CZODIAC and that they comply with
                all applicable laws and regulations.
                <br />
                <br />
                <a css={{ color: 'lime' }} href={LINK_TERMS_OF_USE}>
                  LINK TO TERMS OF USE
                </a>
              </p>
            </Grid2>
            <Grid2 item xs={12}>
              <h1>Privacy Policy</h1>
            </Grid2>
            <Grid2 item xs={12}>
              <p>
                At CZODIAC, we are committed to protecting the privacy and
                personal information of our users. We encourage you to read our
                Privacy Policy, which can be found at{' '}
                <a css={{ color: 'lime' }} href={LINK_PRIVACY_POLICY}>
                  {LINK_PRIVACY_POLICY}
                </a>
                . This policy outlines the types of personal information that
                CZODIAC may collect, the purposes for which this information is
                used, and the steps taken to ensure the security and
                confidentiality of your personal data. By using CZODIAC's
                websites or services, you acknowledge that you have read and
                understood our Privacy Policy and consent to the collection,
                use, and disclosure of your personal information as described
                therein. If you have any questions or concerns about our privacy
                practices, please contact us at team@czodiac.com.
                <br />
                <br />
                <a css={{ color: 'lime' }} href={LINK_PRIVACY_POLICY}>
                  LINK TO PRIVACY POLICY
                </a>
              </p>
            </Grid2>
            <Grid2 item xs={12}>
              <h3>Contact</h3>
              <p css={{ fontSize: 14, fontWeight: 400 }}>team@czodiac.com</p>
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                href="https://czodiac.gitbook.io/czodiac-litepaper/"
                css={{
                  marginTop: '15px !important',
                  fontSize: 16,
                  borderRadius: 10,
                  color: theme.palette.text.dark,
                }}
              >
                Whitepaper
              </Button>
            </Grid2>
            <Grid2 item xs={12}>
              <p css={{ fontSize: 14, fontWeight: 400 }}>
                © 2023 CZodiac. All rights reserved
              </p>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </>
  );
}
