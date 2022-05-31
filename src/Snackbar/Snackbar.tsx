import { useReactiveVar } from "@apollo/client";
import {
  Alert,
  Slide,
  SlideProps,
  Snackbar as MuiSnackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { alertVar } from "../../graphql/chache";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionUp(props: TransitionProps) {
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <Slide {...props} direction="up" />;
}

export default function Snackbar() {
  const alert = useReactiveVar(alertVar);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(alert.open);

    return () => {
      setOpen(false);
    };
  }, [alert]);

  function handleClose() {
    alertVar({ ...alert, open: false });
  }

  return (
    <div>
      <MuiSnackbar
        open={open}
        autoHideDuration={6000}
        TransitionComponent={TransitionUp}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => handleClose()}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </MuiSnackbar>
    </div>
  );
}
