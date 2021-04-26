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
        background: '#FFFFFF',
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
      border: '1px solid #999999',
      borderRadius: '4px',
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      display: 'none',
      opacity: '0'
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
    tableGame: {
      width: '100px',
      border: '1px solid #555555',
      borderCollapse: 'collapse',
      '& th, td': {
        borderTop: '1px solid #999999'
      }
    },
    tableWins: {
      marginTop: '20px',
      width: '100px',
      border: '1px solid #555555',
      borderCollapse: 'collapse',
      '& th, td': {
        borderTop: '1px solid #999999'
      }
    },
    buttonGame: {
      width: '120px',
      padding: '10px 6px',
      fontSize: '12px'
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


// .button-game {
//   display: inline-block;
//   position: relative;
//   cursor: pointer;
//   padding: 10px 6px;
//   border-width: 1px;
//   border-style: solid;
//   border-color: #7a7a7a;
//   border-radius: 4px;
//   box-sizing: border-box;
//   text-decoration: none;
//   text-transform: uppercase;
//   text-align: center;
//   width: 120px;
//   font-size: 12px;
//   font-weight: bold;
//   color: #161616;
//   background-color: #CCCCCC;
// }
// .button-game:hover{
//   border-color: #8f8f8f;
// }
// .button-game:active{
//   background-color: #999999;
// }

// .button-new {
//   margin-top: 0px;
// }

// .button-reset {
//   margin-top: 10px;
// }
