const React = require('react');

function Home() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="home-container">
          <h1>Create Your Log Entries</h1>
          <a href="/log">
            <button className="view-btn">View Entries</button>
          </a>
        </div>
      </body>
    </html>
  );
}

module.exports = Home;
