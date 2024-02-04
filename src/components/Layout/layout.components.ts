import { styled, Box } from '@mui/material';

export const StyledMainContentDiv = styled('div', {
  shouldForwardProp: (prop: any) => prop !== 'open' && prop !== 'noSideNav',
})<{ open?: boolean, noSideNav?: boolean }>(({ open, noSideNav }) => ({
  marginLeft: noSideNav ? "0px": open ? '245px' : '144px',
  height: '100%'
}));

export const StyledContentBox = styled(Box)(() => ({
  flexGrow: 1,
  height: 'calc(100vh - 125px)',
  overflowY: 'auto',
  padding: 10,
  paddingLeft: 30,
  paddingTop: 30,
  margin: 10,
}));


