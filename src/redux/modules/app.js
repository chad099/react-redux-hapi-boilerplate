const LEFT_NAV_OPEN = 'app/LEFT_NAV_OPEN';
const LEFT_NAV_CLOSE = 'app/LEFT_NAV_CLOSE';

const SEARCH_SHOW = 'app/SEARCH_SHOW';
const SEARCH_HIDE = 'app/SEARCH_HIDE';

const PROGRESS_START = 'app/PROGRESS_START';
const PROGRESS_END = 'app/PROGRESS_END';

const defaultState = {
  progress: false,
  leftBarOpen: false,
  showSearch: false,
  windowResize: Date.now(), // time stamp of last window resize
  windowScroll: Date.now(), // time stamp of last window scroll
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case LEFT_NAV_OPEN:
      return { ...state, leftBarOpen: true };
    case LEFT_NAV_CLOSE:
      return { ...state, leftBarOpen: false };

    case SEARCH_SHOW:
      return { ...state, showSearch: true };
    case SEARCH_HIDE:
      return { ...state, showSearch: false };

    case PROGRESS_START:
      return { ...state, progress: true };
    case PROGRESS_END:
      return { ...state, progress: false };

    default:
      return state;
  }
}

export function openLefNavBar() {
  return { type: LEFT_NAV_OPEN };
}

export function closeLefNavBar() {
  return { type: LEFT_NAV_CLOSE };
}

export function showSearch() {
  return { type: SEARCH_SHOW };
}

export function hideSearch() {
  return { type: SEARCH_HIDE };
}

export function showProgress() {
  return { type: PROGRESS_START };
}

export function hideProgress() {
  return { type: PROGRESS_END };
}
