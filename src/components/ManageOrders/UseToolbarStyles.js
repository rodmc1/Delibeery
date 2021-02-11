import { lighten, makeStyles } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.text.primary,
          backgroundColor: lighten(theme.palette.primary.main, 0.5)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.info.light
        },
  title: {
    flex: '1 1 100%'
  },
  delivered: {
    backgroundColor: '#69f0ae',
    color: '#1a237e',
    width: 175,
    marginRight: 10
  },
  ontheway: {
    width: 200,
    marginRight: 10
  },
  delete: {
    width: 150
  }
}));

export default useToolbarStyles;
