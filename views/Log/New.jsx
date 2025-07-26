const React = require('react');

function New() {
  return (
    <html>
      <head>
        <title>New Log Entry</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="form-container">
          <h1 className="form-title">Create New Log Entry</h1>

          <form action="/log" method="POST">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />

            <label htmlFor="entry">Entry:</label>
            <textarea id="entry" name="entry" rows="5" required></textarea>

            <label htmlFor="shipIsBroken">
              Ship is Broken:
              <input type="checkbox" id="shipIsBroken" name="shipIsBroken" />
            </label>

            <input className="form-btn" type="submit" value="Create Log" />
          </form>
        </div>
      </body>
    </html>
  );
}

module.exports = New;
