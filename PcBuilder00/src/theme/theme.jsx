import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  noExpand: {
    fontSize: "inherit",
    lineHeight: "inherit",
    letterSpacing: "inherit"
  }
}));

// const App = () => {
//   const classes = useStyles();

//   return (
//     <Typography
//       variant="body1"
//       variantMapping={{ body1: "span" }}
//       className={classes.noExpand}
//     >
//       This text will not expand.
//     </Typography>
//   );
// };

export default useStyles;
