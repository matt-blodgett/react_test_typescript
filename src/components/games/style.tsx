import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      fontSize: '12px'
    },
    square: {
      background: '#EEEEEE',
      borderColor: '#999999',
      borderWidth: '1px',
      borderStyle: 'solid',
      float: 'left',
      fontSize: '38px',
      fontWeight: 'bold',
      lineHeight: '76px',
      height: '76px',
      width: '76px',
      marginRight: '-1px',
      marginTop: '-1px',
      padding: '0px',
      textAlign: 'center',
      '&:hover': {
        color: '#ADADAD',
        background: '#FFFFFF',
        cursor: 'pointer'
      }
    },
    squareLocked: {
      background: '#EEEEEE',
      borderColor: '#999999',
      borderWidth: '1px',
      borderStyle: 'solid',
      float: 'left',
      fontSize: '38px',
      fontWeight: 'bold',
      lineHeight: '76px',
      height: '76px',
      width: '76px',
      marginRight: '-1px',
      marginTop: '-1px',
      padding: '0px',
      textAlign: 'center',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    gameTitle: {
      textAlign: 'center'
    },
    gameParent: {
      border: '1px solid #000000',
      padding: '0px 20px 20px 20px',
      display: 'inline-block'
    },
    gameAlert: {
      margin: '20px 0px 20px 0px',
      border: '1px solid #c78100',
      borderRadius: '4px',
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      display: 'none',
      opacity: '0',
      color: '#FFFFFF',
      background: 'radial-gradient(#fcc258, #ffaf1c)'
    },
    gameContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    gameButtons: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    gameLeft: {
      marginRight: '20px'
    },
    gameRight: {
      marginLeft: '20px'
    },
    gameBottom: {
      marginTop: '10px',
      display: 'inline-flex'
    },
    tableWinsContainer: {
      border: '1px solid #555555'
    },
    tableWins: {
      width: '120px',
      fontSize: '14px',
      borderCollapse: 'collapse',
      '& th': {
        fontSize: '16px',
        padding: '4px'
      },
      '& td': {
        padding: '2px',
        borderTop: '1px solid #999999'
      }
    },
    tableWinsCol1: {
      borderRight: '1px solid #999999'
    },
    tableWinsCol2: {
      textAlign: 'center'
    },
    buttonGame: {
      width: '120px',
      padding: '10px 6px',
      fontSize: '14px'
    },
    buttonNew: {
      marginTop: '0px'
    },
    buttonReset: {
      marginTop: '10px'
    }
  })
);

export default useStyles;
