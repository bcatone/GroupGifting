// sidebarLinksConfig.js

export const getSidebarLinks = (pathname) => {
  if (pathname === "/donation-info") {
    return [
      {
        label: "Main",
        links: [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/profile", label: "Profile" },
        ],
      },
    ];
  } else if (pathname === "/items/all") {
    return [
      {
        label: "Eventual Filter Options",
        links: [
          { to: "/", label: "Example Link 1" },
          { to: "/", label: "Example Link 2" },
        ],
      },
    ];
  } else {
    return [
      {
        label: "Default",
        links: [{ to: "/default", label: "Default Link" }],
      },
    ];
  }
};
