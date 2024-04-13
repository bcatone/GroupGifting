import { useSelector } from "react-redux";

const useSideBarLinks = (pathname) => {
  const currentUser = useSelector((state) => state.auth.user);


  const getSideBarLinks = () => {
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
          label: "Filter Options",
          links: [
            // { to: "/", label: "Example Link 1" },
            // { to: "/", label: "Example Link 2" },
          ],
        },
      ];
    } else if (currentUser && pathname === `/users/${currentUser.username}`) {
      return [
        {
          label: "User",
          links: [
            {
              to: `/users/${currentUser.username}/my-listed-items`,
              label: "My Listed Items",
            },
            // Add more links related to the user profile if needed
          ],
        },
      ];
    } else {
      return [
        {
          // label: "Default",
          // links: [{ to: "/default", label: "Default Link" }],
        },
      ];
    }
  };

  const sideBarLinks = getSideBarLinks();
  console.log("sideBarLinks from USB", sideBarLinks);

  return sideBarLinks;
};

export default useSideBarLinks;
