import React from 'react';

export const initialState = {
  full: false,
  active: 'home',
  navOpen: false,
  dpDropdown: {
    open: false,
  },
  adminDropdown: {
    open: false,
  },
  dropdown: {
    activeClass: 'bg-gray-800 text-gray-200',
    expandedClass: 'border-l border-gray-400 ml-4 pl-4',
    shrinkClass:
      'sm:absolute top-0 left-20 sm:shadow-md sm:z-10 sm:bg-gray-900 sm:rounded-md sm:p-4 border-l sm:border-none border-gray-400 ml-4 pl-4 sm:ml-0 w-28',
  },
};

export const actions = {
  TOGGLE_FULL: 'TOGGLE_FULL',
  TOGGLE_DROPDOWN: 'TOGGLE_DROPDOWN',
  SWITCH_TAB: 'SWITCH_TAB',
  TOGGLE_NAV_MOBILE: 'TOGGLE_NAV_MOBILE',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.TOGGLE_FULL:
      return {
        ...state,
        full: !state.full,
        navOpen: false,
        dpDropdown: {
          open: false,
        },
        adminDropdown: {
          open: false,
        },
        dropdown: {
          ...state.dropdown,
          open: false,
        },
      };
    case actions.TOGGLE_DROPDOWN:
      const whichDropdown = action.payload; // 'adminDropdown' or 'dpDropdown'
      return {
        ...state,
        [whichDropdown]: {
          open: !state[whichDropdown].open,
        },
      };
    case actions.SWITCH_TAB:
      return {
        ...state,
        navOpen: false,
        full: false,
        dpDropdown: {
          open: false,
        },
        adminDropdown: {
          open: false,
        },
        active: action.payload,
      };
    case actions.TOGGLE_NAV_MOBILE:
      return { ...state, full: false, navOpen: !state.navOpen };
    default:
      console.log(`You tried to use action of type ${action.type}`);
      throw new Error("Shouldn't be here?");
  }
};
