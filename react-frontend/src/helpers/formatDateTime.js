function formatDateTime(datetimeString) {
  // Parse the datetime string as an ISO 8601 date
  const utcDate = new Date(datetimeString);

  // Get the user's local timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // console.log("Time Zone: ", userTimezone);

  // Convert the UTC datetime to the user's local timezone
  const userDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimezone }));
  // console.log("User Date: ", userDate)

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // console.log("Today: ", today);

  // Get yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the date is today
  if (userDate.toDateString() === today.toDateString()) {
    return `Today at ${userDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Check if the date is yesterday
  if (userDate.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${userDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Format the date as 'mm/dd/yyyy hh:mm AM/PM'
  return userDate.toLocaleString([], { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
}

export default formatDateTime;