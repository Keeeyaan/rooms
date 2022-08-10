import React, { useEffect } from "react";

import { Container } from "@mui/system";

const Page = (props) => {
  useEffect(() => {
    document.title = `${props.title} ROOMS`;
    window.scrollTo(0, 0);
  }, [props.title]);

  return (
    <Container maxWidth={props.maxWidth || "xl"}>{props.children}</Container>
  );
};

export default Page;
