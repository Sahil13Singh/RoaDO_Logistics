// Function to load JSON data
async function loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to load JSON data:", error);
      return null;
    }
  }
  
  // Function to Arrange data by userId
  function transformDataByUserId(data) {
    const transformedData = {};
  
    data.forEach(session => {
      const { userId, deviceId, logged_in, logged_out, lastOpenedAt } = session;
  
      if (!transformedData[userId]) {
        transformedData[userId] = [];
      }
  
      transformedData[userId].push({
        deviceId,
        logged_in,
        logged_out,
        lastOpenedAt
      });
    });
  
    return transformedData;
  }
  

  const jsonUrl = 'path/to/data.json'; 
  
  //Displayin the data where user id is primary key
  loadJSON(jsonUrl).then(data => {
    const transformedData = transformDataByUserId(data);
    console.log(transformedData);
  });
  // Initialize counters
const activeUsers = {};
const monthlyLogins = {};
// I have taken year 2023 as an example
// Initialize counters for each month of 2023
for (let month = 0; month < 12; month++) {
  activeUsers[month] = new Set(); // Use a Set to store unique users
  monthlyLogins[month] = 0;
}

// Function to get month and year from a date string
function getMonthYear(dateStr) {
  const date = new Date(dateStr);
  return { month: date.getUTCMonth(), year: date.getUTCFullYear() };
}

for (const user in data) {
  data[user].forEach(session => {
    const { month: loginMonth, year: loginYear } = getMonthYear(session.logged_in);
    if (loginYear === 2023) {
      monthlyLogins[loginMonth]++;
      activeUsers[loginMonth].add(user);
    }
  });
}

// Convert Sets to counts of unique active users
for (let month = 0; month < 12; month++) {
  activeUsers[month] = activeUsers[month].size;
}

// Output results
console.log('Monthly Active Users in 2023:', activeUsers);
console.log('Monthly Logins in 2023:', monthlyLogins);