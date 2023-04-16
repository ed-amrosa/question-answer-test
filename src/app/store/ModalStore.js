import React, { useState } from "react";
import ShareModal from "../common/ShareModal";

const ModalContext = React.createContext([{}, () => {}]);

const ModalProvider = (props) => {
  const [state, setState] = useState({ isOpen: false, contentUrl: null });

  return (
    <ModalContext.Provider value={[state, setState]}>
        {state.isOpen ? <ShareModal contentUrl={state.contentUrl}></ShareModal> : null}
        {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };