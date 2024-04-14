import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import {useTranslation} from "react-i18next";

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'dashboard',
    description: 'dashboardFeatureDescription',
    imageLight: 'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'availableOnAllPlatform',
    description: 'availableOnAllPlatformDescription',
    imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const { t } = useTranslation()

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
                {t('productFeatures')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
                {t('productFeaturesGeneralDescription')}
            </Typography>
          </div>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={(theme) => ({
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  ...(selectedItemIndex === index && {
                    backgroundColor: 'action.selected',
                    borderColor:
                      theme.palette.mode === 'light'
                        ? 'primary.light'
                        : 'primary.dark',
                  }),
                  '&:hover': {
                    background:
                      theme.palette.mode === 'light'
                        ? 'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)'
                        : 'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
                    borderColor:
                      theme.palette.mode === 'light'
                        ? 'primary.light'
                        : 'primary.dark',
                    boxShadow:
                      theme.palette.mode === 'light'
                        ? '0px 2px 8px hsla(0, 0%, 0%, 0.1)'
                        : '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
                  },
                })}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      color:
                        theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
                      ...(selectedItemIndex === index && {
                        color: 'primary.main',
                      }),
                    })}
                  >
                    {icon}
                  </Box>
                  <div>
                    <Typography
                      color="text.primary"
                      fontWeight="medium"
                      gutterBottom
                    >
                      {t(title)}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ mb: 1.5 }}
                    >
                      {t(description)}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>{t('learnMore')}</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </div>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
