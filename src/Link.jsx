import { EVENTS } from "./consts";

export function navigate(href) {
  window.history.pushState({}, "", href);
  //create a custom event to trigger the event listener
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ resetScroll = true, target, to, ...props }) {
  const handleClick = (e) => {
    //left click
    const isMainEvent = e.button === 0;
    //modifier key
    const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    //open accordion to the target
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      e.preventDefault();
      navigate(to); //navigation SPA
      resetScroll && window.scrollTo(0, 0);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props}></a>;
}
